"use client";

import Image from "next/image";
import Link from "next/link";

type BrandLogo = {
    src: string;
    alt: string;
    label: string;
};

export default function BrandLogosStrip() {
    const donateHref = "/donate";

    const logos: BrandLogo[] = [
        { src: "/brands/foundation-logo.jpg", alt: "6 Clement Joshua Foundation", label: "Foundation" },
        { src: "/brands/music-logo.jpg", alt: "6 Clement Joshua Music", label: "Music" },
        { src: "/brands/fashion-logo.jpg", alt: "6 Clement Joshua Fashion", label: "Fashion" },
        { src: "/brands/gaming-logo.jpg", alt: "6 Clement Joshua Gaming", label: "Gaming" },
        { src: "/brands/restaurant-logo.jpg", alt: "6 Clement Joshua Restaurant", label: "Restaurant" },
    ];

    return (
        <section className="mt-6">
            <div className="relative glass-strong rounded-[2rem] p-6 sm:p-8 overflow-hidden">
                {/* neutral premium accents */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

                {/* Full-card click target */}
                <Link
                    href={donateHref}
                    aria-label="Powered by our operating brands — donate"
                    className="absolute inset-0 z-[1]"
                />

                <div className="relative z-[2]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-black/70 w-fit">
                                <span className="h-2 w-2 rounded-full bg-black/70" />
                                <span>Powered by our operating brands</span>
                            </div>

                            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                                How we funded impact before sponsors
                            </h2>

                            <p className="mt-2 text-sm sm:text-base text-black/70 leading-relaxed max-w-2xl">
                                These internal brands helped fund humanitarian deployments while we build long-term
                                partnerships. Tap to donate and help us scale faster.
                            </p>
                        </div>

                        <div className="shrink-0">
                            <Link
                                href={donateHref}
                                className="water-btn donate-glow inline-flex px-6 py-3 text-sm font-semibold"
                            >
                                Donate to scale impact
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {logos.map((b) => (
                            <Link
                                key={b.label}
                                href={donateHref}
                                className="relative steel rounded-2xl p-4 overflow-hidden group transition-transform hover:translate-y-[-1px]"
                                aria-label={`${b.label} — donate`}
                            >
                                <div className="relative h-10 sm:h-12">
                                    <Image
                                        src={b.src}
                                        alt={b.alt}
                                        fill
                                        className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                                        sizes="(max-width: 1024px) 50vw, 220px"
                                    />
                                </div>

                                <div className="mt-3 text-[11px] tracking-wide text-black/55 uppercase text-center">
                                    {b.label}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-4 text-xs text-black/55">
                        * We’re now opening sponsorship lanes for brands and partners who want visibility + reporting.
                    </div>
                </div>
            </div>
        </section>
    );
}