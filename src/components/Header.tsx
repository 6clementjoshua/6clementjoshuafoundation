"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/impact", label: "Impact" },
    { href: "/contact", label: "Contact" },
    // add more items here if you want
];

export default function SiteHeader() {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);

    // Close on outside click
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (!open) return;
            const t = e.target as Node;
            if (panelRef.current && !panelRef.current.contains(t)) setOpen(false);
        };
        window.addEventListener("mousedown", onDown);
        return () => window.removeEventListener("mousedown", onDown);
    }, [open]);

    // Close on Esc
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
                        {/* Replace with your logo */}
                        <div className="h-10 w-10 rounded-2xl border border-black/10 bg-white shadow-sm flex items-center justify-center font-bold">
                            6
                        </div>
                        <div className="leading-tight">
                            <div className="text-sm font-semibold text-black">6Clement Joshua Foundation</div>
                            <div className="text-xs text-black/60">ELIXIR OF FOUNDATIONS</div>
                        </div>
                    </Link>

                    {/* Desktop: Donate button stays on header */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="/donate"
                            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-black/[0.03]"
                        >
                            Donate
                        </Link>
                    </div>

                    {/* Mobile: Menu icon (Donate removed from header on mobile) */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            aria-label="Open menu"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="rounded-2xl border border-black/10 bg-white p-2 shadow-sm active:scale-[0.99]"
                        >
                            {/* Simple hamburger icon */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Desktop: inline nav/about row */}
                <div className="hidden md:flex items-center justify-end gap-2 pt-3">
                    {NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm text-black/80 hover:bg-black/[0.03]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile dropdown menu (holds About row + Donate) */}
            {open && (
                <div className="md:hidden border-t border-black/10 bg-white/80 backdrop-blur">
                    <div ref={panelRef} className="mx-auto max-w-6xl px-4 py-4">
                        <div className="grid gap-2">
                            {/* About row buttons inside menu */}
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

                            {/* Donate inside menu */}
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
            )}
        </header>
    );
}