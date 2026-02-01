// src/app/api/webhooks/flutterwave/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from "resend";
import { donationEmailHTML } from "@/lib/email/donationConfirmation";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        // Flutterwave sends a signature header you compare with your hash
        const signature = req.headers.get("verif-hash");
        const expected = process.env.FLUTTERWAVE_HASH;
        if (!expected || !signature || signature !== expected) {
            return NextResponse.json({ ok: false }, { status: 401 });
        }

        const payload = await req.json();

        // Only act on successful charge events
        const eventType = payload?.event;
        if (!eventType) return NextResponse.json({ ok: true }, { status: 200 });

        // Typical: "charge.completed"
        if (eventType !== "charge.completed") {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        const data = payload?.data;
        if (!data) return NextResponse.json({ ok: true }, { status: 200 });

        const status = String(data?.status || "").toLowerCase();
        if (status !== "successful") return NextResponse.json({ ok: true }, { status: 200 });

        const tx_ref = String(data?.tx_ref || "");
        const transaction_id = String(data?.id || "");

        if (!tx_ref) return NextResponse.json({ ok: true }, { status: 200 });

        const sb = supabaseAdmin();

        const { data: donation } = await sb
            .from("donations")
            .select("*")
            .eq("flw_tx_ref", tx_ref)
            .single();

        if (!donation) return NextResponse.json({ ok: true }, { status: 200 });
        if (donation.status === "paid") return NextResponse.json({ ok: true }, { status: 200 });

        await sb
            .from("donations")
            .update({
                status: "paid",
                flw_transaction_id: transaction_id || null,
            })
            .eq("id", donation.id);

        const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
        const logoUrl = `${siteUrl}/6logo.PNG`;

        const resend = new Resend(process.env.RESEND_API_KEY!);
        const from = process.env.CONTACT_FROM_EMAIL!;

        const html = donationEmailHTML({
            siteUrl,
            logoUrl,
            donorName: donation.donor_name,
            amountText: String(donation.amount ?? 0),
            currency: donation.currency,
            provider: "flutterwave",
            ref: String(donation.id),
        });

        await resend.emails.send({
            from,
            to: donation.donor_email,
            subject: "Donation confirmed — Clement Joshua Foundation",
            html,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}