// src/app/donate/page.tsx
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Geo = { currency: string; country: string | null };

function playSuccessTone() {
    // no external file; fast + reliable
    try {
        const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext);
        const ctx = new AudioCtx();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = 880;
        g.gain.value = 0.0001;
        o.connect(g);
        g.connect(ctx.destination);
        o.start();

        const now = ctx.currentTime;
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        o.stop(now + 0.2);

        setTimeout(() => ctx.close().catch(() => { }), 300);
    } catch { }
}

export default function DonatePage() {
    const [geo, setGeo] = useState<Geo>({ currency: "USD", country: null });
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState("25");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState<null | "stripe" | "flutterwave">(null);
    const [status, setStatus] = useState<"idle" | "canceled" | "success">("idle");
    const [ref, setRef] = useState<string | null>(null);

    const providerRecommended = useMemo(() => {
        // Simple policy: NGN → Flutterwave; others → Stripe
        return currency === "NGN" ? "flutterwave" : "stripe";
    }, [currency]);

    useEffect(() => {
        // detect currency quickly
        fetch("/api/geo").then(r => r.json()).then((j) => {
            if (j?.ok && j?.currency) {
                setGeo({ currency: j.currency, country: j.country ?? null });
                setCurrency(j.currency);
            }
        }).catch(() => { });
    }, []);

    useEffect(() => {
        // read query status from redirect
        const url = new URL(window.location.href);
        const s = url.searchParams.get("status");
        const id = url.searchParams.get("ref");
        if (id) setRef(id);

        if (s === "canceled") setStatus("canceled");
        if (s === "success") {
            setStatus("success");
            // success effects
            playSuccessTone();
        }
    }, []);

    async function startStripe() {
        setLoading("stripe");
        try {
            const res = await fetch("/api/donate/stripe/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    donor_name: name,
                    donor_email: email,
                    message: note,
                    currency,
                    amount: Number(amount),
                    country: geo.country,
                }),
            });
            const j = await res.json();
            if (!res.ok || !j?.ok || !j?.url) throw new Error(j?.error || "Failed");
            window.location.href = j.url;
        } catch (e: any) {
            setLoading(null);
            alert(e?.message || "Could not start payment");
        }
    }

    async function startFlutterwave() {
        setLoading("flutterwave");
        try {
            const res = await fetch("/api/donate/flutterwave/init", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    donor_name: name,
                    donor_email: email,
                    message: note,
                    currency,
                    amount: Number(amount),
                    country: geo.country,
                }),
            });
            const j = await res.json();
            if (!res.ok || !j?.ok || !j?.link) throw new Error(j?.error || "Failed");
            window.location.href = j.link;
        } catch (e: any) {
            setLoading(null);
            alert(e?.message || "Could not start payment");
        }
    }

    const canPay = Boolean(email && amount && Number(amount) > 0);

    return (
        <main className="min-h-screen bg-white text-black">
            <Header />

            <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-6">
                <div className="relative overflow-hidden rounded-[2rem] glass-strong p-6 sm:p-10">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <div className="text-[11px] uppercase tracking-wide text-black/55">Donate</div>
                            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                                Support our humanitarian work
                            </h1>
                            <p className="mt-3 max-w-2xl text-black/70 leading-relaxed">
                                Secure checkout. We do not store bank or card information. You’ll receive a confirmation email after payment is confirmed.
                            </p>
                        </div>

                        <Link href="/policies/donor-privacy" className="water-btn px-5 py-2.5 text-sm font-semibold">
                            Donor Privacy
                        </Link>
                    </div>

                    <AnimatePresence>
                        {status === "canceled" ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-6 rounded-2xl border border-black/10 bg-black/[0.03] p-5"
                            >
                                <div className="font-semibold text-black/80">Payment not received</div>
                                <div className="mt-1 text-sm text-black/70">
                                    It looks like the payment wasn’t completed. You can try again anytime.
                                </div>
                            </motion.div>
                        ) : null}

                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-6 rounded-2xl border border-black/10 bg-black/[0.03] p-5"
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
                                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                        transition={{ duration: 0.35, ease: easeOut }}
                                        className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center"
                                    >
                                        ✓
                                    </motion.div>

                                    <div>
                                        <div className="font-semibold text-black/80">Donation received</div>
                                        <div className="text-sm text-black/70">
                                            Thank you. A confirmation email has been sent (check spam/junk if needed).
                                            {ref ? (
                                                <>
                                                    {" "}Reference: <span className="font-semibold">{ref}</span>
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="glass rounded-[2rem] p-6 sm:p-8">
                            <div className="text-[11px] uppercase tracking-wide text-black/55">Donation details</div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full name (optional)"
                                    className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                />

                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    type="email"
                                    placeholder="Email (required)"
                                    className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                />

                                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <input
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                                        inputMode="decimal"
                                        placeholder="Amount"
                                        className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                    />

                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                    >
                                        {/* Common set; you can expand */}
                                        <option value="USD">USD</option>
                                        <option value="NGN">NGN</option>
                                        <option value="GBP">GBP</option>
                                        <option value="EUR">EUR</option>
                                        <option value="CAD">CAD</option>
                                        <option value="AUD">AUD</option>
                                    </select>

                                    <div className="rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black/70">
                                        Detected: <span className="font-semibold text-black/80">{geo.currency}</span>
                                    </div>
                                </div>

                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Message (optional)"
                                    rows={4}
                                    className="sm:col-span-2 w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                />
                            </div>

                            <div className="mt-5 text-xs text-black/55 leading-relaxed">
                                By donating, you agree to our{" "}
                                <Link className="underline" href="/policies/terms">Terms</Link>,{" "}
                                <Link className="underline" href="/policies/privacy">Privacy</Link>, and{" "}
                                <Link className="underline" href="/policies/donor-privacy">Donor Privacy</Link>.
                            </div>
                        </div>

                        <div className="glass rounded-[2rem] p-6 sm:p-8">
                            <div className="text-[11px] uppercase tracking-wide text-black/55">Checkout</div>
                            <div className="mt-2 font-display text-2xl font-semibold tracking-tight">
                                Fast, secure payment
                            </div>
                            <p className="mt-2 text-sm text-black/70 leading-relaxed">
                                We never store your bank/card details. Payment is handled by the selected processor.
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-3">
                                <button
                                    disabled={!canPay || loading !== null || providerRecommended !== "flutterwave"}
                                    onClick={startFlutterwave}
                                    className="water-btn px-6 py-3 text-sm font-semibold disabled:opacity-60"
                                >
                                    {loading === "flutterwave"
                                        ? "Redirecting..."
                                        : "Pay with Flutterwave (recommended for NGN)"}
                                </button>

                                {/* Large payment contact option */}
                                <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm text-black/75 leading-relaxed">
                                    For <span className="font-semibold">large donations, corporate giving, or bank transfers</span>,
                                    please contact us directly via email:&nbsp;
                                    <a
                                        href="mailto:donate@6clementjoshuafoundation.com?subject=Large%20Donation%20Inquiry"
                                        className="font-semibold text-black underline underline-offset-2 hover:opacity-80 transition"
                                    >
                                        donate@6clementjoshuafoundation.com
                                    </a>
                                </div>

                                {/* Payment status note */}
                                <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-5 text-sm text-black/70 leading-relaxed">
                                    If you return from checkout without completing payment, this page will show
                                    “Payment not received”. Once payment is confirmed, you’ll see success and
                                    receive an email receipt/confirmation.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}