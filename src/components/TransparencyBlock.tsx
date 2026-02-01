"use client";

import Link from "next/link";

type Pill = {
    title: string;
    body: string;
};

export default function TransparencyBlock() {
    const donateHref = "/donate";

    const pills: Pill[] = [
        {
            title: "Direct impact",
            body: "Donations are deployed into verified needs—meals, care support, education materials, youth programs, and small-business protection.",
        },
        {
            title: "Receipts & updates",
            body: "We publish clear updates with photos/videos and outcomes so supporters can see what was funded and who was helped.",
        },
        {
            title: "Sponsor-ready",
            body: "Brands and partners can sponsor a program lane with visibility, reporting, and a structured deployment plan.",
        },
        {
            title: "Community-first",
            body: "We prioritize dignity, safety, and equal access—support reaches people even when challenges or competitions are involved.",
        },
    ];

    return (
        <section className="mt-6">
            <div className="relative glass-strong rounded-[2rem] p-6 sm:p-8 overflow-hidden">
                {/* neutral premium accents (no blue/pink) */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

                {/* Full-card click target */}
                <Link
                    href={donateHref}
                    aria-label="Transparency & accountability — donate"
                    className="absolute inset-0 z-[1]"
                />

                <div className="relative z-[2] flex flex-col gap-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-black/70 w-fit">
                                <span className="h-2 w-2 rounded-full bg-black/70" />
                                <span>Transparency & accountability</span>
                            </div>

                            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                                Built to earn trust — and keep it
                            </h2>

                            <p className="mt-2 text-sm sm:text-base text-black/70 leading-relaxed max-w-2xl">
                                Supporters deserve clarity. We treat donations like a responsibility: structured
                                deployments, visible outcomes, and sponsor-friendly reporting.
                            </p>
                        </div>

                        <div className="shrink-0">
                            <Link
                                href={donateHref}
                                className="water-btn donate-glow inline-flex px-6 py-3 text-sm font-semibold"
                            >
                                Donate with confidence
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {pills.map((p) => (
                            <div key={p.title} className="steel rounded-2xl p-4">
                                <div className="text-[11px] tracking-wide text-black/55 uppercase">
                                    {p.title}
                                </div>
                                <div className="mt-1 text-sm text-black/80 leading-relaxed">
                                    {p.body}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link href={donateHref} className="water-link">
                            Sponsor a program lane →
                        </Link>
                        <Link href={donateHref} className="water-link">
                            Fund meals, care, or education →
                        </Link>
                        <Link href={donateHref} className="water-link">
                            Support youth sports & talent →
                        </Link>
                        <Link href={donateHref} className="water-link">
                            Donate today - To impact lives
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}