"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type VideoCardProps = {
    href: string;
    title: string;
    desc: string;
    videoSrc: string;
    startRange?: { from: number; to: number }; // seconds
    cta: string;
};

function VideoCard({
    href,
    title,
    desc,
    videoSrc,
    startRange = { from: 12, to: 28 },
    cta,
}: VideoCardProps) {
    const vref = useRef<HTMLVideoElement | null>(null);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        const v = vref.current;
        if (!v) return;

        const onMeta = () => {
            const d = Number.isFinite(v.duration) ? v.duration : 0;
            const maxSafe = Math.max(0, d - 1);
            const from = Math.min(startRange.from, maxSafe);
            const to = Math.min(startRange.to, maxSafe);
            const start = to > from ? from + Math.random() * (to - from) : from;

            try {
                v.currentTime = start;
            } catch { }

            const p = v.play();
            if (p) p.catch(() => { });
        };

        v.addEventListener("loadedmetadata", onMeta);
        return () => v.removeEventListener("loadedmetadata", onMeta);
    }, [startRange.from, startRange.to]);

    return (
        <div className="relative glass rounded-3xl p-5 sm:p-6 overflow-hidden h-full flex flex-col">
            {/* Full-card click target */}
            <Link href={href} aria-label={`${title} — donate`} className="absolute inset-0 z-[1]" />

            <div className="relative z-[2]">
                <div className="font-display text-lg font-semibold">{title}</div>
                <p className="mt-2 text-sm text-black/70 leading-relaxed">{desc}</p>
            </div>

            <div className="relative z-[2] mt-4 rounded-2xl overflow-hidden steel">
                <div className="relative h-44 sm:h-48">
                    <video
                        ref={vref}
                        className="absolute inset-0 h-full w-full object-cover"
                        src={videoSrc}
                        muted
                        playsInline
                        autoPlay
                        loop
                        preload="auto"
                        controls={showControls}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowControls((s) => !s);
                        }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
                </div>
            </div>

            <div className="relative z-[2] mt-4 pt-1">
                <Link href={href} className="water-btn donate-glow inline-flex px-5 py-2.5 text-sm font-semibold">
                    {cta}
                </Link>
            </div>

            <div className="mt-auto" />
        </div>
    );
}

export default function ImpactEventsShowcase() {
    const donateHref = "/donate";

    return (
        <section className="mt-2">
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 pb-16 items-stretch">

                <VideoCard
                    href={donateHref}
                    title="Music opportunity for rising talents"
                    desc="We created real opportunities for young talents through our music lane—giving them a stage, visibility, and belief. Donations help us open doors for more creatives."
                    videoSrc="/events/music-opportunity.mp4"
                    startRange={{ from: 12, to: 30 }}
                    cta="Donate to support talents"
                />

                <VideoCard
                    href={donateHref}
                    title="Community empowerment outreach"
                    desc="We stepped into communities with direct support—listening, helping, and restoring dignity where it was needed most. They all loved our presence. And they feel blessed."
                    videoSrc="/events/community-empowerment.mp4"
                    startRange={{ from: 10, to: 28 }}
                    cta="Donate to empower communities"
                />

                <VideoCard
                    href={donateHref}
                    title="Education empowerment support"
                    desc="From learning materials to educational access, we helped children and youths stay in school and keep hope alive, And its our responsibility to put smiles on humanity faces."
                    videoSrc="/events/education-empowerment.mp4"
                    startRange={{ from: 10, to: 28 }}
                    cta="Donate to support education"
                />

                <VideoCard
                    href={donateHref}
                    title="Cash empowerment assistance"
                    desc="We provided direct financial assistance to individuals and families to stabilize lives and unlock opportunity."
                    videoSrc="/events/cash-empowerment.mp4"
                    startRange={{ from: 10, to: 28 }}
                    cta="Donate to provide relief"
                />

                <VideoCard
                    href={donateHref}
                    title="Household empowerment support"
                    desc="We supported households with essential needs—helping families stay strong during difficult moments."
                    videoSrc="/events/house-hold-empowerment.mp4"
                    startRange={{ from: 10, to: 28 }}
                    cta="Donate to support families"
                />

                 <VideoCard
                    href={donateHref}
                    title="Kids empowerment support"
                    desc="We supported kids with essential needs—they had to feel the benefits as well. Since the foundation funds covers them too."
                    videoSrc="/events/kids-cash-support.mp4"
                    startRange={{ from: 10, to: 28 }}
                    cta="Donate to support Kids"
                />

            </div>
        </section>
    );
}