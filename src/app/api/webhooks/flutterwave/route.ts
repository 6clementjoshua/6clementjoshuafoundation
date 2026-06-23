import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from "resend";
import { donationEmailHTML } from "@/lib/email/donationConfirmation";

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

async function verifyFlutterwaveTransaction(params: {
  transactionId: string;
  txRef: string;
}) {
  const secret = getFlutterwaveSecretKey();

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

async function sendDonationEmail(params: {
  donorEmail: string;
  donorName: string | null;
  amount: number;
  currency: string;
  donationId: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!resendKey || !from) {
    console.warn(
      "Donation email skipped: missing RESEND_API_KEY or CONTACT_FROM_EMAIL",
    );
    return;
  }

  const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  const logoUrl = `${siteUrl}/6logo.PNG`;

  const resend = new Resend(resendKey);

  const html = donationEmailHTML({
    siteUrl,
    logoUrl,
    donorName: params.donorName,
    amountText: String(params.amount ?? 0),
    currency: params.currency,
    provider: "flutterwave",
    ref: params.donationId,
  });

  await resend.emails.send({
    from,
    to: params.donorEmail,
    subject: "Donation confirmed — Clement Joshua Foundation",
    html,
  });
}

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("verif-hash");
    const expected = process.env.FLUTTERWAVE_HASH;

    if (!expected || !signature || signature !== expected) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const payload = await req.json().catch(() => null);

    if (!payload) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 },
      );
    }

    const eventType = clean(payload?.event, 100);

    if (eventType !== "charge.completed") {
      return NextResponse.json(
        { ok: true, ignored: eventType },
        { status: 200 },
      );
    }

    const webhookData = payload?.data ?? {};

    const webhookStatus = clean(webhookData?.status, 100).toLowerCase();

    if (webhookStatus !== "successful") {
      return NextResponse.json(
        { ok: true, ignored_status: webhookStatus },
        { status: 200 },
      );
    }

    const txRef = clean(webhookData?.tx_ref, 300);

    const transactionId =
      clean(webhookData?.id, 100) || clean(webhookData?.transaction_id, 100);

    if (!txRef && !transactionId) {
      return NextResponse.json(
        { ok: false, error: "Missing tx_ref or transaction_id" },
        { status: 400 },
      );
    }

    const sb = supabaseAdmin();

    let donationQuery = sb
      .from("donations")
      .select("*")
      .eq("provider", "flutterwave")
      .limit(1);

    if (txRef) {
      donationQuery = donationQuery.eq("flw_tx_ref", txRef);
    } else {
      donationQuery = donationQuery.eq("flw_transaction_id", transactionId);
    }

    const { data: donationRows, error: findError } = await donationQuery;

    if (findError) throw findError;

    const donation = donationRows?.[0];

    if (!donation) {
      return NextResponse.json(
        { ok: true, warning: "Donation record not found", tx_ref: txRef },
        { status: 200 },
      );
    }

    const previousStatus = String(donation.status ?? "").toLowerCase();
    const shouldSendEmail =
      previousStatus !== "successful" && previousStatus !== "paid";

    const verified = await verifyFlutterwaveTransaction({
      transactionId,
      txRef: txRef || String(donation.flw_tx_ref ?? ""),
    });

    const flwData = verified.json?.data ?? {};

    const flwStatus = String(flwData?.status ?? "").toLowerCase();
    const flwTxRef = String(flwData?.tx_ref ?? "");
    const flwCurrency = String(flwData?.currency ?? "").toUpperCase();
    const flwAmount = Number(flwData?.amount ?? 0);

    const expectedTxRef = String(donation.flw_tx_ref || txRef);
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

      return NextResponse.json(
        {
          ok: false,
          error: "Flutterwave verification failed",
          flutterwave_status: flwStatus,
          tx_ref_matches: txRefMatches,
          currency_matches: currencyMatches,
          amount_matches: amountMatches,
        },
        { status: 400 },
      );
    }

    const card = flwData?.card ?? {};
    const expiry = splitExpiry(card?.expiry);
    const cardToken = extractCardToken(flwData);

    const { error: updateError } = await sb
      .from("donations")
      .update({
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
        flw_verified_response: verified.json,
      })
      .eq("id", donation.id);

    if (updateError) throw updateError;

    if (shouldSendEmail) {
      await sendDonationEmail({
        donorEmail: donation.donor_email,
        donorName: donation.donor_name,
        amount: donation.amount,
        currency: donation.currency,
        donationId: donation.id,
      });
    }

    return NextResponse.json(
      {
        ok: true,
        status: "successful",
        donation_id: donation.id,
        tx_ref: expectedTxRef,
        token_saved: Boolean(cardToken),
        email_sent: shouldSendEmail,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Flutterwave webhook failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Webhook failed",
      },
      { status: 500 },
    );
  }
}
