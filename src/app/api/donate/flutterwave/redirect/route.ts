// src/app/api/donate/flutterwave/redirect/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const donationId = url.searchParams.get("ref");
    const status = url.searchParams.get("status"); // typically "successful" or "cancelled"
    const transaction_id = url.searchParams.get("transaction_id");

    const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");

    if (!donationId) {
        return NextResponse.redirect(`${siteUrl}/donate?status=canceled`);
    }

    // Do NOT trust redirect alone; webhook will verify.
    // But we can show nicer UI based on status:
    if (status === "successful") {
        return NextResponse.redirect(`${siteUrl}/donate?status=success&ref=${donationId}`);
    }
    return NextResponse.redirect(`${siteUrl}/donate?status=canceled&ref=${donationId}`);
}