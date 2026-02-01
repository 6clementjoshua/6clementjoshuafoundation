"use client";

import Link from "next/link";

type Stat = {
    label: string;
    value: number;
    note?: string; // optional: e.g., "+", "approx"
};

function formatNaira(amount: number) {
    // Show millions cleanly: ₦5.6m, ₦560k, etc.
    if (amount >= 1_000_000) {
        const m = amount / 1_000_000;
        return `₦${m.toFixed(m % 1 === 0 ? 0 : 1)}m`;
    }
    if (amount >= 1_000) {
        const k = amount / 1_000;
        return `₦${k.toFixed(k % 1 === 0 ? 0 : 0)}k`;
    }
    return `₦${amount.toLocaleString("en-NG")}`;
}

export default function ImpactStatsStrip() {
    const donateHref = "/donate";

    const stats: Stat[] = [
        { label: "Meals", value: 5_600_000, note: "+" },
        { label: "Street kids", value: 3_500_000, note: "+" },
        { label: "Hospital", value: 560_000 },
        { label: "Students", value: 2_000_000 },
        { label: "Sports", value: 1_500_000 },
        { label: "Businesses", value: 9_600_000 },
        { label: "Sponsoring", value: 12_000_000 },
    ];

    return (
        <section className="mt-6">
            <div className="glass rounded-3xl p-5 sm:p-6 overflow-hidden">
                {/* Full-card click target */}
                <Link
                    href={donateHref}
                    aria-label="Impact at a glance — donate"
                    className="absolute inset-0"
                />

                <div className="relative">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-black/70 w-fit">
                                <span className="h-2 w-2 rounded-full bg-black/70" />
                                <span>Impact at a glance</span>
                            </div>

                            <div className="mt-3 font-display text-xl sm:text-2xl font-semibold tracking-tight">
                                Funds deployed in Nigeria (₦)
                            </div>

                            <p className="mt-2 text-sm text-black/70 max-w-2xl leading-relaxed">
                                These are real-world deployments across our key programs. Tap anywhere to donate and
                                help us scale the next wave of support.
                            </p>
                        </div>

                        <div className="shrink-0">
                            <Link
                                href={donateHref}
                                className="water-btn donate-glow inline-flex px-5 py-2.5 text-sm font-semibold"
                            >
                                Donate to scale impact
                            </Link>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                        {stats.map((s) => (
                            <Link
                                key={s.label}
                                href={donateHref}
                                className="steel rounded-2xl p-4 hover:translate-y-[-1px] transition-transform"
                            >
                                <div className="text-[11px] tracking-wide text-black/55 uppercase">
                                    {s.label}
                                </div>
                                <div className="mt-1 font-display text-base font-semibold text-black/90">
                                    {formatNaira(s.value)}
                                    {s.note ? s.note : ""}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-4 text-xs text-black/55">
                        International support: <span className="font-semibold text-black/70">$6,000+</span> USD
                        (outside sponsoring & activities).
                    </div>
                </div>
            </div>
        </section>
    );
}