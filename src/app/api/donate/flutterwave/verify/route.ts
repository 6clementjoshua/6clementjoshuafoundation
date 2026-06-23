import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function extractCardToken(data: any): string | null {
  const card = data?.card ?? data?.authorization ?? null;

  if (!card) return null;

  const token =
    card?.token ?? card?.card_token ?? card?.authorization_code ?? null;

  if (typeof token !== "string") return null;

  const clean = token.trim();
  return clean.length > 0 ? clean : null;
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const txRef = typeof body?.tx_ref === "string" ? body.tx_ref.trim() : "";

    const transactionId =
      typeof body?.transaction_id === "string"
        ? body.transaction_id.trim()
        : "";

    if (!txRef && !transactionId) {
      return NextResponse.json(
        { ok: false, error: "Missing tx_ref or transaction_id" },
        { status: 400 },
      );
    }

    const flwSecretKey = process.env.FLW_SECRET_KEY;
    if (!flwSecretKey) {
      return NextResponse.json(
        { ok: false, error: "Missing FLW_SECRET_KEY" },
        { status: 500 },
      );
    }

    const supabase = getSupabaseAdmin();

    let donationQuery = supabase
      .from("donations")
      .select("id, donor_email, amount, currency, flw_tx_ref, status")
      .eq("provider", "flutterwave")
      .limit(1);

    if (txRef) {
      donationQuery = donationQuery.eq("flw_tx_ref", txRef);
    } else {
      donationQuery = donationQuery.eq("flw_transaction_id", transactionId);
    }

    const { data: existingRows, error: donationError } = await donationQuery;

    if (donationError) throw donationError;

    const donation = existingRows?.[0];

    if (!donation) {
      return NextResponse.json(
        { ok: false, error: "Donation record not found" },
        { status: 404 },
      );
    }

    let verifyUrl: string;

    if (transactionId) {
      verifyUrl = `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(
        transactionId,
      )}/verify`;
    } else {
      const url = new URL(
        "https://api.flutterwave.com/v3/transactions/verify_by_reference",
      );
      url.searchParams.set("tx_ref", txRef);
      verifyUrl = url.toString();
    }

    const verifyRes = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${flwSecretKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const verifyJson = await verifyRes.json().catch(() => ({}));
    const flwData = verifyJson?.data ?? {};

    const flwStatus = String(flwData?.status ?? "").toLowerCase();
    const flwTxRef = String(flwData?.tx_ref ?? "");
    const flwCurrency = String(flwData?.currency ?? "").toUpperCase();
    const flwAmount = Number(flwData?.amount ?? 0);

    const expectedTxRef = String(donation.flw_tx_ref ?? "");
    const expectedCurrency = String(donation.currency ?? "").toUpperCase();
    const expectedAmount = Number(donation.amount ?? 0);

    const txRefMatches = !expectedTxRef || flwTxRef === expectedTxRef;
    const currencyMatches = flwCurrency === expectedCurrency;
    const amountMatches = flwAmount >= expectedAmount;

    const isSuccessful =
      verifyRes.ok &&
      flwStatus === "successful" &&
      txRefMatches &&
      currencyMatches &&
      amountMatches;

    if (!isSuccessful) {
      await supabase
        .from("donations")
        .update({
          flw_verified_response: verifyJson,
        })
        .eq("id", donation.id);

      return NextResponse.json(
        {
          ok: false,
          error: "Flutterwave payment was not verified as successful",
          flutterwave_status: flwStatus,
          tx_ref_matches: txRefMatches,
          currency_matches: currencyMatches,
          amount_matches: amountMatches,
        },
        { status: 400 },
      );
    }

    const card = flwData?.card ?? {};
    const cardToken = extractCardToken(flwData);
    const expiry = splitExpiry(card?.expiry);

    const updatePayload = {
      status: "successful",
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

    const { error: updateError } = await supabase
      .from("donations")
      .update(updatePayload)
      .eq("id", donation.id);

    if (updateError) throw updateError;

    return NextResponse.json({
      ok: true,
      status: "successful",
      donation_id: donation.id,
      tx_ref: expectedTxRef,
      flw_transaction_id: updatePayload.flw_transaction_id,
      token_saved: Boolean(cardToken),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Verification failed",
      },
      { status: 500 },
    );
  }
}
