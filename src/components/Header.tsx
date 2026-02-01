// src/components/Header.tsx
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const CAC_NUMBER = "8447002";

export default function Header() {
    return (
        <header className="sticky top-0 z-50">
            {/* A solid blur layer so text behind never shows through */}
            <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-2xl border-b border-black/10" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                <div className="glass-strong flex items-center justify-between rounded-3xl px-4 sm:px-6 py-3">
                    <Link href="/" className="group inline-flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl glass flex items-center justify-center overflow-hidden">
                            <Image
                                src="/6logo.PNG"
                                alt={`${SITE.name} logo`}
                                width={44}
                                height={44}
                                priority
                            />
                        </div>

                        <div className="leading-tight">
                            <div className="font-display text-[15px] sm:text-base font-semibold tracking-tight">
                                {SITE.name}
                            </div>

                            <div className="text-xs text-black/60">{SITE.subMotto}</div>

                            {/* CAC line (grey pill) */}
                            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[11px] text-black/60">
                                <span className="uppercase tracking-wide text-black/50">CAC No.</span>
                                <span className="font-semibold text-black/70">{CAC_NUMBER}</span>
                            </div>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-2">
                        <Link className="px-4 py-2 rounded-full glass text-sm hover:glass-strong transition" href="/about">
                            About
                        </Link>
                        <Link className="px-4 py-2 rounded-full glass text-sm hover:glass-strong transition" href="/programs">
                            Programs
                        </Link>
                        <Link className="px-4 py-2 rounded-full glass text-sm hover:glass-strong transition" href="/impact">
                            Impact
                        </Link>
                        <Link className="px-4 py-2 rounded-full glass text-sm hover:glass-strong transition" href="/contact">
                            Contact
                        </Link>

                        <Link href="/donate" className="water-btn donate-glow px-5 py-2.5 text-sm font-semibold">
                            Donate
                        </Link>
                    </nav>

                    <div className="md:hidden">
                        <Link href="/donate" className="water-btn donate-glow px-4 py-2 text-sm font-semibold">
                            Donate
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}