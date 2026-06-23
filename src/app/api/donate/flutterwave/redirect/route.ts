import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value: unknown, max = 500) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

function siteUrl() {
  return (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

function flutterwaveSecretKey() {
  const key =
    process.env.FLUTTERWAVE_SECRET_KEY || process.env.FLW_SECRET_KEY || "";

  if (!key) {
    throw new Error("Missing FLUTTERWAVE_SECRET_KEY or FLW_SECRET_KEY");
  }

  return key;
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

async function verifyFlutterwavePayment(params: {
  txRef: string;
  transactionId: string;
}) {
  const secret = flutterwaveSecretKey();

  let verifyUrl: string;

  if (params.transactionId) {
    verifyUrl = `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(
      params.transactionId,
    )}/verify`;
  } else {
    const url = new URL(
      "https://api.flutterwave.com/v3/transactions/verify_by_reference",
    );
    url.searchParams.set("tx_ref", params.txRef);
    verifyUrl = url.toString();
  }

  const res = await fetch(verifyUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const json = await res.json().catch(() => ({}));

  return {
    ok: res.ok,
    json,
  };
}

export async function GET(req: NextRequest) {
  const baseUrl = siteUrl();

  try {
    const url = new URL(req.url);

    const donationId = clean(url.searchParams.get("ref"), 100);

    const returnedStatus = clean(
      url.searchParams.get("status"),
      100,
    ).toLowerCase();

    const txRef =
      clean(url.searchParams.get("tx_ref"), 300) ||
      clean(url.searchParams.get("txRef"), 300);

    const transactionId =
      clean(url.searchParams.get("transaction_id"), 100) ||
      clean(url.searchParams.get("transactionId"), 100);

    const sb = supabaseAdmin();

    if (!donationId) {
      return NextResponse.redirect(
        `${baseUrl}/donate?status=canceled&reason=missing_donation_id`,
      );
    }

    const { data: donation, error: findError } = await sb
      .from("donations")
      .select("id, donor_email, amount, currency, flw_tx_ref, status")
      .eq("id", donationId)
      .eq("provider", "flutterwave")
      .maybeSingle();

    if (findError) throw findError;

    if (!donation) {
      return NextResponse.redirect(
        `${baseUrl}/donate?status=canceled&reason=donation_not_found`,
      );
    }

    if (returnedStatus === "cancelled" || returnedStatus === "canceled") {
      await sb
        .from("donations")
        .update({ status: "canceled" })
        .eq("id", donation.id);

      return NextResponse.redirect(
        `${baseUrl}/donate?status=canceled&ref=${encodeURIComponent(
          donation.flw_tx_ref || donation.id,
        )}`,
      );
    }

    const finalTxRef = txRef || donation.flw_tx_ref || "";

    if (!finalTxRef && !transactionId) {
      return NextResponse.redirect(
        `${baseUrl}/donate?status=canceled&reason=missing_flutterwave_reference`,
      );
    }

    const verified = await verifyFlutterwavePayment({
      txRef: finalTxRef,
      transactionId,
    });

    const flwData = verified.json?.data ?? {};

    const flwStatus = String(flwData?.status ?? "").toLowerCase();
    const flwTxRef = String(flwData?.tx_ref ?? "");
    const flwCurrency = String(flwData?.currency ?? "").toUpperCase();
    const flwAmount = Number(flwData?.amount ?? 0);

    const expectedTxRef = String(donation.flw_tx_ref || finalTxRef);
    const expectedCurrency = String(donation.currency ?? "").toUpperCase();
    const expectedAmount = Number(donation.amount ?? 0);

    const txRefMatches = flwTxRef === expectedTxRef;
    const currencyMatches = flwCurrency === expectedCurrency;
    const amountMatches = flwAmount >= expectedAmount;

    const isSuccessful =
      verified.ok &&
      flwStatus === "successful" &&
      txRefMatches &&
      currencyMatches &&
      amountMatches;

    if (!isSuccessful) {
      await sb
        .from("donations")
        .update({
          flw_verified_response: verified.json,
        })
        .eq("id", donation.id);

      return NextResponse.redirect(
        `${baseUrl}/donate?status=canceled&ref=${encodeURIComponent(
          expectedTxRef || donation.id,
        )}&reason=not_verified`,
      );
    }

    const card = flwData?.card ?? {};
    const expiry = splitExpiry(card?.expiry);
    const cardToken = extractCardToken(flwData);

    const { error: updateError } = await sb
      .from("donations")
      .update({
        status: "successful",
        flw_tx_ref: expectedTxRef,
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
        flw_verified_response: verified.json,
      })
      .eq("id", donation.id);

    if (updateError) throw updateError;

    return NextResponse.redirect(
      `${baseUrl}/donate?status=success&ref=${encodeURIComponent(
        expectedTxRef || donation.id,
      )}`,
    );
  } catch (error) {
    console.error("Flutterwave redirect verification failed:", error);

    return NextResponse.redirect(
      `${baseUrl}/donate?status=canceled&reason=server_error`,
    );
  }
}
