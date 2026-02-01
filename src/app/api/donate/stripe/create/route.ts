// src/app/api/donate/stripe/create/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

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

        // Stripe expects minor units
        const amount = Math.round(amountMajor * 100);

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
                provider: "stripe",
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

        // Stripe SDK (minimal: dynamic import to avoid bundling issues)
        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-01-28.clover", });

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            customer_email: donor_email,
            success_url: `${siteUrl}/donate?status=success&ref=${donationId}`,
            cancel_url: `${siteUrl}/donate?status=canceled&ref=${donationId}`,
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: currency.toLowerCase(),
                        unit_amount: amount,
                        product_data: {
                            name: "Donation — Clement Joshua Foundation",
                            description: message ? `Message: ${message}` : undefined,
                        },
                    },
                },
            ],
            metadata: {
                donation_id: donationId,
            },
        });

        await sb
            .from("donations")
            .update({ status: "pending", stripe_session_id: session.id })
            .eq("id", donationId);

        return NextResponse.json({ ok: true, url: session.url }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 });
    }
}