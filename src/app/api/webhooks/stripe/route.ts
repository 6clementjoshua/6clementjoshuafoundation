// src/app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from "resend";
import { donationEmailHTML } from "@/lib/email/donationConfirmation";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const sig = req.headers.get("stripe-signature");
        const secret = process.env.STRIPE_WEBHOOK_SECRET!;
        if (!sig || !secret) return NextResponse.json({ ok: false }, { status: 400 });

        const rawBody = await req.text();

        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-01-28.clover", });

        let event: any;
        try {
            event = stripe.webhooks.constructEvent(rawBody, sig, secret);
        } catch {
            return NextResponse.json({ ok: false }, { status: 400 });
        }

        if (event.type !== "checkout.session.completed") {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        const session = event.data.object as any;
        const donationId = session?.metadata?.donation_id as string | undefined;
        const sessionId = session?.id as string | undefined;
        const paymentIntent = session?.payment_intent as string | undefined;

        if (!donationId || !sessionId) return NextResponse.json({ ok: true }, { status: 200 });

        const sb = supabaseAdmin();

        const { data } = await sb
            .from("donations")
            .select("*")
            .eq("id", donationId)
            .single();

        if (!data) return NextResponse.json({ ok: true }, { status: 200 });

        // idempotent: if already paid, do nothing
        if (data.status === "paid") return NextResponse.json({ ok: true }, { status: 200 });

        await sb
            .from("donations")
            .update({
                status: "paid",
                stripe_session_id: sessionId,
                stripe_payment_intent_id: paymentIntent ?? null,
            })
            .eq("id", donationId);

        const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
        const logoUrl = `${siteUrl}/6logo.PNG`;

        const resend = new Resend(process.env.RESEND_API_KEY!);
        const from = process.env.CONTACT_FROM_EMAIL!;

        const html = donationEmailHTML({
            siteUrl,
            logoUrl,
            donorName: data.donor_name,
            amountText: String((data.amount ?? 0) / 100),
            currency: data.currency,
            provider: "stripe",
            ref: donationId,
        });

        await resend.emails.send({
            from,
            to: data.donor_email,
            subject: "Donation confirmed — Clement Joshua Foundation",
            html,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}