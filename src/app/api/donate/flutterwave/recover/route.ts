import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value: unknown, max = 500) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

function getFlutterwaveSecretKey() {
  const key =
    process.env.FLUTTERWAVE_SECRET_KEY || process.env.FLW_SECRET_KEY || "";

  if (!key) {
    throw new Error("Missing FLUTTERWAVE_SECRET_KEY or FLW_SECRET_KEY");
  }

  return key;
}

function getRecoverySecret() {
  return process.env.FLUTTERWAVE_RECOVERY_SECRET || "";
}

function splitExpiry(expiry: unknown) {
  if (typeof expiry !== "string") {
    return { month: null, year: null };
  }

  const parts = expiry.split("/");

  return {
    month: parts[0] || null,
    year: parts[1] || null,
  };
}

function extractCardToken(flwData: any): string | null {
  const card = flwData?.card ?? null;

  const token =
    card?.token ?? flwData?.token ?? flwData?.authorization?.token ?? null;

  if (typeof token !== "string") return null;

  const trimmed = token.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function extractCustomerEmail(flwData: any): string {
  return String(
    flwData?.customer?.email ?? flwData?.customer_email ?? flwData?.email ?? "",
  )
    .trim()
    .toLowerCase();
}

async function verifyFlutterwaveTransaction(params: {
  secret: string;
  txRef?: string;
  transactionId?: string;
}) {
  let url: URL;

  if (params.transactionId) {
    url = new URL(
      `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(
        params.transactionId,
      )}/verify`,
    );
  } else {
    url = new URL(
      "https://api.flutterwave.com/v3/transactions/verify_by_reference",
    );
    url.searchParams.set("tx_ref", params.txRef || "");
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.secret}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();

  let json: any = {};
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }

  return {
    ok: res.ok,
    httpStatus: res.status,
    json,
    verifyUrlUsed: params.transactionId ? "transaction_id" : "tx_ref",
  };
}

export async function POST(req: NextRequest) {
  try {
    const recoverySecret = getRecoverySecret();

    if (recoverySecret) {
      const incomingSecret =
        req.headers.get("x-recovery-secret") ||
        req.headers.get("authorization")?.replace("Bearer ", "") ||
        "";

      if (incomingSecret !== recoverySecret) {
        return NextResponse.json(
          { ok: false, error: "Unauthorized recovery request" },
          { status: 401 },
        );
      }
    }

    const body = await req.json().catch(() => ({}));

    const donorEmail = clean(body?.donor_email, 220).toLowerCase();
    const singleTxRef = clean(body?.tx_ref, 300);
    const transactionId = clean(body?.transaction_id, 100);
    const donationId = clean(body?.donation_id, 100);
    const limit = Math.min(Math.max(Number(body?.limit || 50), 1), 100);

    const secret = getFlutterwaveSecretKey();
    const sb = supabaseAdmin();

    let query = sb
      .from("donations")
      .select(
        "id, created_at, donor_email, amount, currency, flw_tx_ref, status",
      )
      .eq("provider", "flutterwave")
      .in("status", ["created", "pending", "failed", "canceled"])
      .order("created_at", { ascending: false })
      .limit(limit);

    if (donationId) {
      query = query.eq("id", donationId);
    }

    if (singleTxRef) {
      query = query.eq("flw_tx_ref", singleTxRef);
    }

    if (donorEmail) {
      query = query.eq("donor_email", donorEmail);
    }

    if (!donationId && !singleTxRef && !donorEmail) {
      return NextResponse.json(
        {
          ok: false,
          error: "Provide at least one of donation_id, tx_ref, or donor_email.",
        },
        { status: 400 },
      );
    }

    const { data: donations, error: fetchError } = await query;

    if (fetchError) throw fetchError;

    const results: any[] = [];

    for (const donation of donations ?? []) {
      const expectedTxRef = String(donation.flw_tx_ref ?? "");
      const expectedCurrency = String(donation.currency ?? "").toUpperCase();
      const expectedAmount = Number(donation.amount ?? 0);
      const expectedEmail = String(donation.donor_email ?? "")
        .trim()
        .toLowerCase();

      if (!expectedTxRef && !transactionId) {
        results.push({
          donation_id: donation.id,
          verified: false,
          action: "skipped",
          reason: "missing_flw_tx_ref_and_transaction_id",
        });
        continue;
      }

      const verified = await verifyFlutterwaveTransaction({
        txRef: expectedTxRef,
        transactionId,
        secret,
      });

      const verifyJson = verified.json;
      const flwData = verifyJson?.data ?? {};

      const flwStatus = String(flwData?.status ?? "").toLowerCase();
      const flwTxRef = String(flwData?.tx_ref ?? "");
      const flwCurrency = String(flwData?.currency ?? "").toUpperCase();
      const flwAmount = Number(flwData?.amount ?? 0);
      const flwCustomerEmail = extractCustomerEmail(flwData);

      const statusMatches = flwStatus === "successful";
      const currencyMatches = flwCurrency === expectedCurrency;
      const amountMatches = flwAmount >= expectedAmount;

      // If transaction_id is supplied, we allow tx_ref mismatch,
      // but only if the verified transaction email/amount/currency matches.
      const txRefMatches = transactionId
        ? Boolean(flwTxRef)
        : flwTxRef === expectedTxRef;

      const emailMatches = flwCustomerEmail
        ? flwCustomerEmail === expectedEmail
        : true;

      const isSuccessful =
        verified.ok &&
        statusMatches &&
        txRefMatches &&
        currencyMatches &&
        amountMatches &&
        emailMatches;

      if (!isSuccessful) {
        await sb
          .from("donations")
          .update({
            flw_verified_response: verifyJson,
          })
          .eq("id", donation.id);

        results.push({
          donation_id: donation.id,
          expected_tx_ref: expectedTxRef,
          verified: false,
          action: "left_as_pending",
          verify_mode: verified.verifyUrlUsed,
          verify_http_status: verified.httpStatus,
          flutterwave_response_status: verifyJson?.status ?? null,
          flutterwave_response_message: verifyJson?.message ?? null,
          flutterwave_payment_status: flwStatus || null,
          flutterwave_tx_ref: flwTxRef || null,
          flutterwave_customer_email: flwCustomerEmail || null,
          status_matches: statusMatches,
          tx_ref_matches: txRefMatches,
          currency_matches: currencyMatches,
          amount_matches: amountMatches,
          email_matches: emailMatches,
          flutterwave_amount: flwAmount || null,
          flutterwave_currency: flwCurrency || null,
          flutterwave_response: verifyJson,
        });

        continue;
      }

      const card = flwData?.card ?? {};
      const expiry = splitExpiry(card?.expiry);
      const cardToken = extractCardToken(flwData);

      const updatePayload = {
        status: "paid",
        flw_tx_ref: flwTxRef || expectedTxRef,
        flw_transaction_id:
          flwData?.id !== undefined && flwData?.id !== null
            ? String(flwData.id)
            : transactionId || null,

        flw_card_token: cardToken,
        flw_card_brand:
          card?.type ?? card?.brand ?? card?.issuer ?? card?.card_type ?? null,
        flw_card_last4: card?.last_4digits ?? card?.last4 ?? null,
        flw_card_exp_month: expiry.month,
        flw_card_exp_year: expiry.year,
        flw_verified_response: verifyJson,
      };

      const { error: updateError } = await sb
        .from("donations")
        .update(updatePayload)
        .eq("id", donation.id);

      if (updateError) throw updateError;

      results.push({
        donation_id: donation.id,
        old_tx_ref: expectedTxRef,
        new_tx_ref: updatePayload.flw_tx_ref,
        verified: true,
        action: "updated_successful",
        verify_mode: verified.verifyUrlUsed,
        flw_transaction_id: updatePayload.flw_transaction_id,
        token_saved: Boolean(cardToken),
        card_brand_saved: Boolean(updatePayload.flw_card_brand),
        card_last4_saved: Boolean(updatePayload.flw_card_last4),
      });
    }

    return NextResponse.json(
      {
        ok: true,
        checked: results.length,
        results,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Flutterwave recovery failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Recovery failed",
      },
      { status: 500 },
    );
  }
}
