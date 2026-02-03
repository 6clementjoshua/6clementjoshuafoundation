// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Goals:
 * - Block obvious malicious scanners (common patterns)
 * - Block suspicious user agents
 * - Add security headers
 *
 * Notes:
 * - This runs at the Edge (fast).
 * - It is NOT a complete WAF; Cloudflare will do heavier lifting.
 */

const BAD_UA_PARTS = [
    "sqlmap",
    "nikto",
    "acunetix",
    "nessus",
    "masscan",
    "nmap",
    "zgrab",
    "dirbuster",
    "gobuster",
    "wpscan",
    "curl/",
    "python-requests",
    "httpclient",
    "libwww-perl",
];

const BAD_PATH_PARTS = [
    "/wp-admin",
    "/wp-login.php",
    "/xmlrpc.php",
    "/.env",
    "/.git",
    "/phpmyadmin",
    "/vendor/phpunit",
    "/cgi-bin",
];

function isBadUserAgent(ua: string) {
    const u = ua.toLowerCase();
    return BAD_UA_PARTS.some((p) => u.includes(p));
}

function isBadPath(pathname: string) {
    const p = pathname.toLowerCase();
    return BAD_PATH_PARTS.some((x) => p.includes(x));
}

export function middleware(req: NextRequest) {
    const { pathname, searchParams } = req.nextUrl;
    const ua = req.headers.get("user-agent") || "";
    const ip =
        req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown";

    // Block obvious scanner paths
    if (isBadPath(pathname)) {
        return new NextResponse("Not found", { status: 404 });
    }

    // Block suspicious user agents (keep this list conservative)
    if (ua && isBadUserAgent(ua)) {
        return new NextResponse("Forbidden", { status: 403 });
    }

    // Basic query abuse patterns (very light)
    const full = `${pathname}?${searchParams.toString()}`.toLowerCase();
    if (full.includes("union+select") || full.includes("sleep(") || full.includes("../")) {
        return new NextResponse("Forbidden", { status: 403 });
    }

    // Allow request through
    const res = NextResponse.next();

    // Security headers (good baseline)
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
    res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    res.headers.set("Cross-Origin-Resource-Policy", "same-site");
    res.headers.set("Cross-Origin-Embedder-Policy", "credentialless");

    // Helpful for logs (optional)
    res.headers.set("X-Request-IP", ip);

    return res;
}

// Apply to “everything except” next internals & static
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};