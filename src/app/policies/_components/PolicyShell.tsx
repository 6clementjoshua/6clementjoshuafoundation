// src/app/policies/_components/PolicyShell.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type TocItem = { id: string; label: string; note?: string };
type Badge = { label: string; tone?: "neutral" | "good" | "warn" };
type QuickCard = { title: string; body: string };

type Props = {
    title: string;
    subtitle: string;
    updatedISO: string; // "2026-02-01"
    badges?: Badge[];
    toc: TocItem[];
    quickCards?: QuickCard[];
    crossRefs?: { href: string; label: string }[];
    children: React.ReactNode;
};

const easeOut = [0.16, 1, 0.3, 1] as const;

function formatDate(iso: string) {
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
        ? iso
        : d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

// Small inline icons (no dependency)
function IconShield() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 2l8 4v6c0 5-3.5 9.7-8 10c-4.5-.3-8-5-8-10V6l8-4zm0 2.2L6 6.8V12c0 4.1 2.8 7.9 6 8.2c3.2-.3 6-4.1 6-8.2V6.8l-6-2.6z"
            />
        </svg>
    );
}
function IconGlobe() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 2a10 10 0 100 20a10 10 0 000-20zm7.9 9h-3.2a15.6 15.6 0 00-1.2-6A8.1 8.1 0 0119.9 11zM12 4c.9 1.2 1.7 3.4 2.1 7H9.9C10.3 7.4 11.1 5.2 12 4zM4.1 13h3.2a15.6 15.6 0 001.2 6A8.1 8.1 0 014.1 13zM4.1 11A8.1 8.1 0 018.5 5a15.6 15.6 0 00-1.2 6H4.1zm7.9 9c-.9-1.2-1.7-3.4-2.1-7h4.2c-.4 3.6-1.2 5.8-2.1 7zm3.5-1a15.6 15.6 0 001.2-6h3.2a8.1 8.1 0 01-4.4 6z"
            />
        </svg>
    );
}

export default function PolicyShell({
    title,
    subtitle,
    updatedISO,
    badges = [],
    toc,
    quickCards = [],
    crossRefs = [],
    children,
}: Props) {
    return (
        <div className="relative">
            {/* soft glows */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: easeOut }}
                className="glass-strong rounded-[2rem] p-6 sm:p-10"
            >
                <div className="flex flex-wrap items-center gap-2 text-xs text-black/60">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-1">
                        <IconShield />
                        Global policy
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-1">
                        <IconGlobe />
                        Applies across all countries & continents
                    </span>
                    <span className="inline-flex items-center rounded-full bg-black/[0.04] px-3 py-1">
                        Last updated: <span className="ml-1 font-semibold text-black/70">{formatDate(updatedISO)}</span>
                    </span>
                </div>

                <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                    {title}
                </h1>
                <p className="mt-3 text-black/70 leading-relaxed max-w-3xl">{subtitle}</p>

                {badges.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {badges.map((b) => (
                            <span
                                key={b.label}
                                className={[
                                    "rounded-full px-3 py-1 text-xs font-semibold",
                                    b.tone === "good"
                                        ? "bg-black/[0.06] text-black/80"
                                        : b.tone === "warn"
                                            ? "bg-black/[0.06] text-black/80"
                                            : "bg-black/[0.04] text-black/70",
                                ].join(" ")}
                            >
                                {b.label}
                            </span>
                        ))}
                    </div>
                )}

                {quickCards.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
                        {quickCards.map((c) => (
                            <div key={c.title} className="steel rounded-2xl p-4">
                                <div className="text-[11px] uppercase tracking-wide text-black/55">{c.title}</div>
                                <div className="mt-1 text-sm text-black/75 leading-relaxed">{c.body}</div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.section>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                {/* TOC */}
                <aside className="lg:sticky lg:top-[110px] h-fit">
                    <div className="glass rounded-[1.75rem] p-5">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">On this page</div>
                        <div className="mt-3 space-y-2">
                            {toc.map((t) => (
                                <a
                                    key={t.id}
                                    href={`#${t.id}`}
                                    className="block rounded-xl px-3 py-2 text-sm text-black/70 hover:text-black hover:bg-black/[0.04] transition"
                                >
                                    <div className="font-semibold">{t.label}</div>
                                    {t.note && <div className="text-xs text-black/55 mt-0.5">{t.note}</div>}
                                </a>
                            ))}
                        </div>

                        {crossRefs.length > 0 && (
                            <div className="mt-6 pt-5 border-t border-black/10">
                                <div className="text-[11px] uppercase tracking-wide text-black/55">Related</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {crossRefs.map((c) => (
                                        <Link
                                            key={c.href}
                                            href={c.href}
                                            className="rounded-full glass px-3 py-1.5 text-xs font-semibold text-black/70 hover:text-black hover:glass-strong transition"
                                        >
                                            {c.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Content */}
                <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: easeOut, delay: 0.05 }}
                    className="space-y-6"
                >
                    <div className="glass rounded-[1.75rem] p-6 sm:p-8">
                        {children}
                    </div>

                    <div className="glass rounded-[1.75rem] p-6 sm:p-8">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Payments</div>
                        <div className="mt-2 text-sm text-black/75 leading-relaxed">
                            Donations are processed via <span className="font-semibold">Stripe</span> and{" "}
                            <span className="font-semibold">Flutterwave</span>. We do not store full card details.
                            Additional payment methods (e.g., PayPal) may be added in future updates.
                        </div>
                    </div>
                </motion.article>
            </div>
        </div>
    );
}