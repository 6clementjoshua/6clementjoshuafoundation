// src/app/contact/page.tsx
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

const CAC_NUMBER = "8447002";
const FOUNDED_YEAR = "2011";

const EMAIL_MAIN = "info@6clementjoshuafoundation.com";
const EMAIL_SUPPORT = "support@6clementjoshuafoundation.com";
const EMAIL_REPORT = "report@6clementjoshuafoundation.com";

const POLICY_LINKS = [
    { href: "/policies/privacy", label: "Privacy" },
    { href: "/policies/terms", label: "Terms" },
    { href: "/policies/donor-privacy", label: "Donor Privacy" },
    { href: "/policies/refund", label: "Refunds" },
    { href: "/policies/transparency", label: "Transparency" },
    { href: "/policies/anti-fraud", label: "Anti-Fraud" },
    { href: "/policies/child-safeguarding", label: "Child Safety" },
    { href: "/policies/whistleblowing", label: "Whistleblowing" },
    { href: "/policies/cookies", label: "Cookies" },
];

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full bg-black/[0.04] px-3 py-1 text-xs font-semibold text-black/70">
            {children}
        </span>
    );
}

function SectionTitle({
    overline,
    title,
    desc,
}: {
    overline: string;
    title: string;
    desc?: string;
}) {
    return (
        <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wide text-black/55">{overline}</div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
            {desc && <p className="text-black/70 leading-relaxed max-w-3xl">{desc}</p>}
        </div>
    );
}

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState<null | boolean>(null);
    const [err, setErr] = useState<string | null>(null);
    const [refId, setRefId] = useState<string | null>(null);

    async function submitContact(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setOk(null);
        setErr(null);
        setRefId(null);

        const fd = new FormData(e.currentTarget);

        const payload = {
            name: String(fd.get("name") || ""),
            email: String(fd.get("email") || ""),
            topic: String(fd.get("topic") || "General inquiry"),
            message: String(fd.get("message") || ""),
            company: String(fd.get("company") || ""), // honeypot
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = await res.json();

            if (!res.ok || !json.ok) {
                setOk(false);
                setErr(json.error || "Failed to send. Please try again.");
            } else {
                setOk(true);
                setRefId(json.id || null);
                (e.currentTarget as HTMLFormElement).reset();
            }
        } catch {
            setOk(false);
            setErr("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>
            <Header />

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
                {/* HERO */}
                <div className="relative overflow-hidden rounded-[2rem] glass-strong p-6 sm:p-10 lg:p-12">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

                    <div className="relative">
                        <div className="flex flex-wrap gap-2">
                            <Pill>Incorporated Trustees</Pill>
                            <Pill>Founded {FOUNDED_YEAR}</Pill>
                            <Pill>CAC No. {CAC_NUMBER}</Pill>
                            <Pill>HQ: Cross River, Nigeria</Pill>
                        </div>

                        <h1 className="mt-6 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                            Contact Us
                        </h1>

                        <p className="mt-4 text-black/70 leading-relaxed max-w-3xl">
                            Reach Clement Joshua Foundation for humanitarian assistance, partnerships,
                            verification, media, or general inquiries. We operate transparently and respond responsibly.
                        </p>
                    </div>
                </div>

                {/* CONTACT GRID */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* FORM */}
                    <div className="glass rounded-[2rem] p-6 sm:p-10">
                        <SectionTitle
                            overline="Direct message"
                            title="Send us a message"
                            desc="Submit securely. We will email you a confirmation with our policies and a donate link."
                        />

                        {ok === true ? (
                            <div className="mt-6 rounded-2xl border border-black/10 bg-black/[0.03] p-6">
                                <div className="font-semibold text-black/80">✅ Message sent</div>
                                <p className="mt-2 text-sm text-black/70">
                                    We’ve sent a confirmation email to you (check spam/junk if you don’t see it).
                                </p>
                                {refId ? (
                                    <div className="mt-3 text-xs text-black/55">
                                        Reference ID: <span className="font-semibold text-black/70">{refId}</span>
                                    </div>
                                ) : null}

                                <div className="mt-5 flex flex-wrap gap-2">
                                    <Link href="/donate" className="water-btn donate-glow px-5 py-2.5 text-sm font-semibold">
                                        Donate
                                    </Link>
                                    <button
                                        className="water-btn px-5 py-2.5 text-sm font-semibold"
                                        onClick={() => {
                                            setOk(null);
                                            setErr(null);
                                            setRefId(null);
                                        }}
                                    >
                                        Send another message
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form className="mt-6 space-y-4" onSubmit={submitContact}>
                                {/* Honeypot */}
                                <input
                                    name="company"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    className="hidden"
                                    aria-hidden="true"
                                />

                                <input
                                    name="name"
                                    required
                                    placeholder="Your full name"
                                    className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                />

                                <input
                                    name="email"
                                    required
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                />

                                <select
                                    name="topic"
                                    className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                    defaultValue="General inquiry"
                                >
                                    <option>General inquiry</option>
                                    <option>Request assistance</option>
                                    <option>Partnership / collaboration</option>
                                    <option>Media / press</option>
                                    <option>Report abuse or fraud</option>
                                </select>

                                <textarea
                                    name="message"
                                    required
                                    placeholder="Write your message"
                                    rows={5}
                                    className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="water-btn donate-glow px-6 py-3 text-sm font-semibold disabled:opacity-60"
                                >
                                    {loading ? "Sending..." : "Send message"}
                                </button>

                                {ok === false ? (
                                    <div className="text-sm text-black/75">
                                        ❌ {err ?? "Failed to send. Please try again."}
                                    </div>
                                ) : null}

                                <div className="text-xs text-black/55 leading-relaxed">
                                    By contacting us, you agree to our policies. For urgent emergencies, include your location and
                                    safe contact details.
                                </div>
                            </form>
                        )}
                    </div>

                    {/* CONTACT OPTIONS */}
                    <div className="glass rounded-[2rem] p-6 sm:p-10 space-y-6">
                        <SectionTitle
                            overline="Other ways"
                            title="Contact options"
                            desc="Choose the best channel for faster response."
                        />

                        <div className="steel rounded-2xl p-5">
                            <div className="text-sm font-semibold text-black/85">General inquiries</div>
                            <a href={`mailto:${EMAIL_MAIN}`} className="mt-1 block text-sm text-black/70 hover:text-black">
                                {EMAIL_MAIN}
                            </a>
                        </div>

                        <div className="steel rounded-2xl p-5">
                            <div className="text-sm font-semibold text-black/85">Support & assistance</div>
                            <a href={`mailto:${EMAIL_SUPPORT}`} className="mt-1 block text-sm text-black/70 hover:text-black">
                                {EMAIL_SUPPORT}
                            </a>
                        </div>

                        <div className="steel rounded-2xl p-5">
                            <div className="text-sm font-semibold text-black/85">
                                Report fraud, abuse, or safeguarding issues
                            </div>
                            <a href={`mailto:${EMAIL_REPORT}`} className="mt-1 block text-sm text-black/70 hover:text-black">
                                {EMAIL_REPORT}
                            </a>
                        </div>

                        <div className="steel rounded-2xl p-5">
                            <div className="text-sm font-semibold text-black/85">Social</div>
                            <a
                                href="https://www.tiktok.com/@6clementjoshua"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 block text-sm text-black/70 hover:text-black"
                            >
                                TikTok: @6clementjoshua
                            </a>
                        </div>

                        <div className="text-xs text-black/55 leading-relaxed">
                            We operate across Nigeria (Cross River, Lagos, Abuja, Port Harcourt, Enugu, Onitsha) with
                            international support links in the UK, USA, Australia, and India.
                        </div>
                    </div>
                </div>

                {/* POLICIES */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Policies"
                        title="Read our policies (opens in a new tab)"
                        desc="These explain how we protect donors, beneficiaries, data, and funds."
                    />

                    <div className="mt-6 flex flex-wrap gap-2">
                        {POLICY_LINKS.map((p) => (
                            <Link
                                key={p.href}
                                href={p.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="water-btn px-4 py-2 text-sm font-semibold"
                            >
                                {p.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}