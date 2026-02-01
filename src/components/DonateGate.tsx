// src/components/DonateGate.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  href?: string; // default "/donate"
  className?: string;
  children: React.ReactNode;
  videoSrc?: string; // default: "/impact/impact-1.mp4"
  startAtSeconds?: number; // default 10
};

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function DonateGate({
  href = "/donate",
  className,
  children,
  videoSrc = "/impact/abuja-hero",
  startAtSeconds = 10,
}: Props) {
  const [open, setOpen] = useState(false);
  const vref = useRef<HTMLVideoElement | null>(null);

  // Random skip pattern
  const skipPlan = useMemo(() => {
    // small jumps every few seconds; feels like “skipping” highlights
    return { everyMs: 4200, jumpMin: 0.8, jumpMax: 2.4 };
  }, []);

  useEffect(() => {
    if (!open) return;

    const v = vref.current;
    if (!v) return;

    let timer: any;

    const onMeta = async () => {
      try {
        v.currentTime = startAtSeconds;
        await v.play().catch(() => {});
      } catch {}

      // start “skip” loop
      timer = setInterval(() => {
        if (!v.duration || Number.isNaN(v.duration)) return;
        const jump = skipPlan.jumpMin + Math.random() * (skipPlan.jumpMax - skipPlan.jumpMin);
        const next = Math.min(v.currentTime + jump, Math.max(startAtSeconds, v.duration - 0.5));
        v.currentTime = next;

        // if near end, bounce back to startAtSeconds
        if (v.currentTime >= v.duration - 0.6) v.currentTime = startAtSeconds;
      }, skipPlan.everyMs);
    };

    v.addEventListener("loadedmetadata", onMeta);

    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      if (timer) clearInterval(timer);
      try {
        v.pause();
      } catch {}
    };
  }, [open, skipPlan.everyMs, skipPlan.jumpMax, skipPlan.jumpMin, startAtSeconds]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              // click outside closes
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            {/* Black blur backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

            <motion.div
              initial={{ y: 18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="relative mx-auto mt-[10vh] w-[92vw] max-w-[860px] overflow-hidden rounded-[2rem] border border-white/10"
              style={{
                boxShadow: "0 30px 90px rgba(0,0,0,.55)",
              }}
            >
              {/* Video */}
              <div className="relative aspect-[16/9] bg-black">
                <video
                  ref={vref}
                  src={videoSrc}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Text legibility overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white/90 backdrop-blur-md hover:bg-black/70"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur">
                      Secure checkout
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur">
                      No card storage
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur">
                      Donor protections
                    </span>
                  </div>

                  <div className="mt-3 text-white">
                    <div className="text-xl sm:text-2xl font-semibold tracking-tight">
                      Before you donate
                    </div>
                    <p className="mt-2 max-w-2xl text-sm sm:text-[15px] text-white/85 leading-relaxed">
                      Clement Joshua Foundation does <span className="font-semibold">not</span> store your bank or card details.
                      Payments are processed securely by Stripe or Flutterwave.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <Link
                        href="/policies/privacy"
                        className="rounded-full bg-white/10 px-3 py-2 font-semibold text-white/90 backdrop-blur hover:bg-white/15"
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        href="/policies/donor-privacy"
                        className="rounded-full bg-white/10 px-3 py-2 font-semibold text-white/90 backdrop-blur hover:bg-white/15"
                      >
                        Donor Privacy
                      </Link>
                      <Link
                        href="/policies/terms"
                        className="rounded-full bg-white/10 px-3 py-2 font-semibold text-white/90 backdrop-blur hover:bg-white/15"
                      >
                        Terms
                      </Link>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        className="water-btn donate-glow px-6 py-3 text-sm font-semibold"
                      >
                        Continue to Donate →
                      </Link>

                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="water-btn px-6 py-3 text-sm font-semibold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}