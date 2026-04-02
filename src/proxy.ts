// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge proxy goals:
 * - Block obvious malicious scanner paths
 * - Block suspicious user agents (conservative)
 * - Light query-string abuse filtering
 * - Add baseline security headers
 *
 * Notes:
 * - This is a lightweight first filter, not a full WAF
 * - Let Cloudflare handle heavy bot/rate-limit protection
 * - Keep rules conservative so you do not block normal users
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
  "python-requests",
  "libwww-perl",
  "httpclient",
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

function isBadUserAgent(ua: string): boolean {
  const value = ua.toLowerCase().trim();

  if (!value) return false;

  return BAD_UA_PARTS.some((part) => value.includes(part));
}

function isBadPath(pathname: string): boolean {
  const value = pathname.toLowerCase();
  return BAD_PATH_PARTS.some((part) => value.includes(part));
}

function isBadQuery(fullUrlFragment: string): boolean {
  const value = fullUrlFragment.toLowerCase();

  return (
    value.includes("union+select") ||
    value.includes("union%20select") ||
    value.includes("sleep(") ||
    value.includes("%2e%2e%2f") ||
    value.includes("../") ||
    value.includes("<script") ||
    value.includes("%3cscript")
  );
}

function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()",
  );
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  res.headers.set("Cross-Origin-Resource-Policy", "same-site");
  res.headers.set("Cross-Origin-Embedder-Policy", "credentialless");

  /**
   * Conservative CSP baseline.
   * If your app uses inline scripts, external scripts, Google fonts,
   * payment embeds, analytics, or frames, you may need to expand this later.
   */
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline' https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
      "connect-src 'self' https: wss:",
      "media-src 'self' blob: data: https:",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  );

  return res;
}

function deny(status: 403 | 404, message: string): NextResponse {
  const res = new NextResponse(message, { status });
  return applySecurityHeaders(res);
}

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const ua = req.headers.get("user-agent") || "";

  /**
   * Avoid exposing client IP back to the browser response.
   * If you need IP logging, do it in server logs / Cloudflare / platform logs.
   */

  // 1) Block obvious scanner / exploit probe paths
  if (isBadPath(pathname)) {
    return deny(404, "Not found");
  }

  // 2) Block suspicious user agents conservatively
  if (ua && isBadUserAgent(ua)) {
    return deny(403, "Forbidden");
  }

  // 3) Light query abuse filtering
  const query = searchParams.toString();
  const full = `${pathname}?${query}`;

  if (isBadQuery(full)) {
    return deny(403, "Forbidden");
  }

  // 4) Allow valid request through
  const res = NextResponse.next();

  // 5) Add security headers on all allowed responses
  return applySecurityHeaders(res);
}

/**
 * Apply to almost everything except Next internals and common static files.
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
