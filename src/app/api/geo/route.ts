// src/app/api/geo/route.ts
import { NextResponse } from "next/server";

function currencyForCountry(cc?: string | null) {
    const c = (cc || "").toUpperCase();

    // Simplified mapping: you can expand anytime
    if (c === "NG") return { currency: "NGN", country: "NG" };
    if (["GB"].includes(c)) return { currency: "GBP", country: c };
    if (["CA"].includes(c)) return { currency: "CAD", country: c };
    if (["AU"].includes(c)) return { currency: "AUD", country: c };
    if (["EU", "FR", "DE", "ES", "IT", "NL", "IE", "PT", "BE", "AT", "FI", "GR"].includes(c)) return { currency: "EUR", country: c };
    if (c) return { currency: "USD", country: c };
    return { currency: "USD", country: null };
}

export function GET(req: Request) {
    const h = new Headers(req.headers);
    const country =
        h.get("x-vercel-ip-country") ||
        h.get("x-vercel-geo-country") ||
        null;

    const out = currencyForCountry(country);
    return NextResponse.json({ ok: true, ...out });
}