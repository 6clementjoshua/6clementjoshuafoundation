// src/app/policies/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import PoliciesTopNav from "./_components/PoliciesTopNav";

const CAC_NUMBER = "8447002";

export default function PoliciesLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Sticky policy-only header (no site nav) */}
            <header className="sticky top-0 z-50">
                <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-2xl border-b border-black/10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    <div className="glass-strong rounded-3xl px-4 sm:px-6 py-3">
                        <div className="flex items-center justify-between gap-4">
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

                                    {/* brand tagline + CAC next to it */}
                                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                                        <div className="text-xs text-black/60">{SITE.subMotto}</div>
                                        <span className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[11px] text-black/60">
                                            <span className="uppercase tracking-wide text-black/50">CAC No.</span>
                                            <span className="font-semibold text-black/70">{CAC_NUMBER}</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    href="/donate"
                                    className="water-btn donate-glow px-5 py-2.5 text-sm font-semibold"
                                >
                                    Donate
                                </Link>
                            </div>
                        </div>

                        {/* Policy tabs/chips */}
                        <PoliciesTopNav />
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <footer className="border-t border-black/10 py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="glass rounded-3xl p-6">
                        <div className="text-sm text-black/70">
                            © {new Date().getFullYear()} {SITE.name}. Policies apply globally and are designed to
                            protect donors, beneficiaries, and our organization.
                        </div>
                        <div className="mt-3 text-xs text-black/55">
                            Payments currently supported: <span className="font-semibold">Stripe</span> and{" "}
                            <span className="font-semibold">Flutterwave</span>. Additional options (e.g., PayPal)
                            may be added later.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}