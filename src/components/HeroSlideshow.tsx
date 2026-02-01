"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
    src: string;
    tag: string;
    headline: string;
    sub: string;
};

export default function HeroSlideshow() {
    const slides = useMemo<Slide[]>(
        () => [
            {
                src: "/slides/video-1.mp4",
                tag: "Humanitarian Aid",
                headline: "Hope that reaches people fast.",
                sub: "Emergency support, relief, and dignity-first assistance.",
            },
            {
                src: "/slides/video-2.mp4",
                tag: "Empowerment",
                headline: "Opportunity is a human right.",
                sub: "Tools, skills, and support for stable futures.",
            },
            {
                src: "/slides/video-3.mp4",
                tag: "Education",
                headline: "Support learning, Talents & unlock lives.",
                sub: "Scholarships and learning resources for growth.",
            },
        ],
        []
    );

    const [index, setIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const nextVideoRef = useRef<HTMLVideoElement | null>(null);

    // autoplay current slide whenever it changes
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        v.currentTime = 0;
        const p = v.play();
        if (p) p.catch(() => { });
    }, [index]);

    // auto-advance (slower for video)
    useEffect(() => {
        const t = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, 6500);
        return () => clearInterval(t);
    }, [slides.length]);

    const current = slides[index];
    const next = slides[(index + 1) % slides.length];

    return (
        <div className="relative w-full min-w-0">
            <div className="grid gap-3 min-w-0">
                {/* Main video card */}
                <div className="glass-strong rounded-3xl overflow-hidden min-w-0">
                    {/* MOBILE FIX:
              - Use min-height on mobile so overlay content never gets clipped.
              - Keep a comfortable height at larger breakpoints.
          */}
                    <div className="relative min-h-[420px] h-[420px] sm:h-[380px] lg:h-[420px]">
                        <video
                            key={current.src}
                            ref={videoRef}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={current.src}
                            muted
                            playsInline
                            autoPlay
                            loop
                            preload="auto"
                        />

                        {/* Overlay content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent" />

                        {/* MOBILE FIX:
                - Give the overlay safe padding + extra bottom space for dots.
                - Clamp headline/sub so they don't push dots out of view.
            */}
                        <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end pb-6 sm:pb-7">
                            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs w-fit">
                                <span className="h-2 w-2 rounded-full bg-black/70" />
                                <span className="text-black/80">{current.tag}</span>
                            </div>

                            <div
                                className="
                  mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight
                  leading-tight
                  line-clamp-2
                "
                            >
                                {current.headline}
                            </div>

                            <p
                                className="
                  mt-2 text-sm sm:text-base text-black/75 max-w-md
                  leading-snug
                  line-clamp-2
                "
                            >
                                {current.sub}
                            </p>

                            {/* Dots */}
                            <div className="mt-5 flex gap-2">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        aria-label={`Slide ${i + 1}`}
                                        onClick={() => setIndex(i)}
                                        className={`h-2.5 rounded-full transition-all ${i === index
                                                ? "w-10 bg-black/70"
                                                : "w-3 bg-black/20 hover:bg-black/35"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next up preview (small video) */}
                {/* MOBILE FIX:
            - Ensure it never overflows horizontally
            - Allow text to truncate properly
        */}
                <div className="glass rounded-3xl p-5 sm:p-7 flex items-center gap-4 min-w-0 overflow-hidden">
                    <div className="relative h-14 w-20 flex-none rounded-2xl overflow-hidden glass">
                        <video
                            ref={nextVideoRef}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={next.src}
                            muted
                            playsInline
                            autoPlay
                            loop
                            preload="auto"
                        />
                    </div>

                    <div className="min-w-0">
                        <div className="text-xs text-black/60">Next up</div>
                        <div className="mt-1 font-display text-base font-semibold truncate">
                            {next.tag}
                        </div>
                        <div className="mt-1 text-sm text-black/70 truncate">
                            {next.headline}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}