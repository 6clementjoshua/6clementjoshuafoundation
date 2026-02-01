// src/app/api/donate/flutterwave/init/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import crypto from "crypto";

function clean(s: any, max = 300) {
    return String(s ?? "").trim().slice(0, max);
}
function isEmail(s: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const donor_name = clean(body.donor_name, 120);
        const donor_email = clean(body.donor_email, 220);
        const message = clean(body.message, 800);
        const currency = clean(body.currency, 10).toUpperCase();
        const amountMajor = Number(body.amount);

        if (!donor_email || !isEmail(donor_email)) {
            return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
        }
        if (!Number.isFinite(amountMajor) || amountMajor <= 0) {
            return NextResponse.json({ ok: false, error: "Invalid amount" }, { status: 400 });
        }

        // Flutterwave takes major units typically (e.g., 5000 NGN)
        const amount = Math.round(amountMajor);

        const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            req.headers.get("x-real-ip") ??
            null;

        const ua = req.headers.get("user-agent") ?? null;

        const sb = supabaseAdmin();

        const { data, error } = await sb
            .from("donations")
            .insert({
                provider: "flutterwave",
                status: "created",
                donor_name,
                donor_email,
                amount,
                currency,
                message,
                country: clean(body.country, 8) || null,
                ip,
                user_agent: ua,
            })
            .select("id")
            .single();

        if (error || !data?.id) {
            return NextResponse.json({ ok: false, error: "DB insert failed" }, { status: 500 });
        }

        const donationId = data.id as string;

        const tx_ref = `don_${donationId}_${crypto.randomBytes(6).toString("hex")}`;

        // Call Flutterwave initialize endpoint
        const secret = process.env.FLUTTERWAVE_SECRET_KEY!;
        const res = await fetch("https://api.flutterwave.com/v3/payments", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tx_ref,
                amount,
                currency,
                redirect_url: `${siteUrl}/api/donate/flutterwave/redirect?ref=${encodeURIComponent(donationId)}`,
                customer: { email: donor_email, name: donor_name || donor_email },
                customizations: {
                    title: "Clement Joshua Foundation",
                    description: "Donation",
                    logo: `${siteUrl}/6logo.PNG`,
                },
                meta: { donation_id: donationId },
            }),
        });

        const j = await res.json();

        if (!res.ok || j?.status !== "success" || !j?.data?.link) {
            return NextResponse.json({ ok: false, error: "Flutterwave init failed" }, { status: 500 });
        }

        await sb
            .from("donations")
            .update({ status: "pending", flw_tx_ref: tx_ref })
            .eq("id", donationId);

        return NextResponse.json({ ok: true, link: j.data.link }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 });
    }
}