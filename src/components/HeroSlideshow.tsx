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

        // force immediate start
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
        <div className="relative w-full">
            <div className="grid gap-3">
                {/* Main video card */}
                <div className="glass-strong rounded-3xl overflow-hidden">
                    <div className="relative h-[320px] sm:h-[380px]">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/25 to-transparent" />
                        <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end">
                            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs w-fit">
                                <span className="h-2 w-2 rounded-full bg-black/70" />
                                <span className="text-black/80">{current.tag}</span>
                            </div>

                            <div className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                                {current.headline}
                            </div>
                            <p className="mt-2 text-sm sm:text-base text-black/75 max-w-md">
                                {current.sub}
                            </p>

                            <div className="mt-5 flex gap-2">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        aria-label={`Slide ${i + 1}`}
                                        onClick={() => setIndex(i)}
                                        className={`h-2.5 rounded-full transition-all ${i === index ? "w-10 bg-black/70" : "w-3 bg-black/20 hover:bg-black/35"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next up preview (small video) */}
                <div className="glass rounded-3xl p-5 sm:p-7 flex items-center gap-4">
                    <div className="relative h-14 w-20 rounded-2xl overflow-hidden glass">
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