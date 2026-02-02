"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/impact", label: "Impact" },
    { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);

    // Close on outside click/tap (mobile menu only)
    useEffect(() => {
        const onDown = (e: MouseEvent | TouchEvent) => {
            if (!open) return;
            const t = e.target as Node;
            if (panelRef.current && !panelRef.current.contains(t)) setOpen(false);
        };

        window.addEventListener("mousedown", onDown);
        window.addEventListener("touchstart", onDown, { passive: true });

        return () => {
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("touchstart", onDown as any);
        };
    }, [open]);

    // Close on Esc (desktop keyboard)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-black/10">
            <div className="mx-auto max-w-6xl px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                    {/* Left: Brand */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl border border-black/10 bg-white shadow-sm flex items-center justify-center font-bold">
                            6
                        </div>
                        <div className="leading-tight">
                            <div className="text-sm font-semibold text-black">6Clement Joshua Foundation</div>
                            <div className="text-xs text-black/60">ELIXIR OF FOUNDATIONS</div>
                        </div>
                    </Link>

                    {/* Desktop: ALL buttons in ONE row */}
                    <div className="hidden md:flex items-center gap-2">
                        {NAV.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm text-black/80 hover:bg-black/[0.03]"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            href="/donate"
                            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-black/[0.03]"
                        >
                            Donate
                        </Link>
                    </div>

                    {/* Mobile: menu icon ONLY (tap again minimizes) */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)} // <-- tap again closes
                            className="relative z-[60] rounded-2xl border border-black/10 bg-white p-2 shadow-sm active:scale-[0.99]"
                        >
                            {open ? (
                                // X icon when open
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ) : (
                                // Hamburger icon when closed
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown menu (holds NAV + Donate) */}
            {open && (
                <>
                    {/* Backdrop so tapping outside closes */}
                    <div
                        className="md:hidden fixed inset-0 z-40 bg-black/10"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Panel */}
                    <div className="md:hidden fixed left-0 right-0 top-[64px] z-50">
                        <div ref={panelRef} className="mx-auto max-w-6xl px-4 py-4">
                            <div className="rounded-3xl border border-black/10 bg-white/85 backdrop-blur p-3 shadow-sm">
                                <div className="grid gap-2">
                                    {NAV.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black/80 hover:bg-black/[0.03]"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                    <Link
                                        href="/donate"
                                        onClick={() => setOpen(false)}
                                        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black shadow-sm hover:bg-black/[0.03]"
                                    >
                                        Donate
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}