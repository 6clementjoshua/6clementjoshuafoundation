"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
    startRange = { from: 20, to: 30 },
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

            {/* Push CTA to bottom so all cards align */}
            <div className="relative z-[2] mt-4 pt-1">
                <Link
                    href={href}
                    className="water-btn donate-glow inline-flex px-5 py-2.5 text-sm font-semibold"
                >
                    {cta}
                </Link>
            </div>

            <div className="mt-auto" />
        </div>
    );
}

type ImageCardProps = {
    href: string;
    title: string;
    desc: string;
    images: { src: string; alt: string }[];
    cta: string;
};

function ImageCard({ href, title, desc, images, cta }: ImageCardProps) {
    const [index, setIndex] = useState(0);

    // Invisible auto-rotate (no dots/counter)
    useEffect(() => {
        const t = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, 4200);
        return () => clearInterval(t);
    }, [images.length]);

    const current = images[index];

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
                    <Image
                        src={current.src}
                        alt={current.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 420px"
                        priority={index === 0}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
                </div>
            </div>

            {/* Push CTA to bottom so all cards align */}
            <div className="relative z-[2] mt-4 pt-1">
                <Link
                    href={href}
                    className="water-btn donate-glow inline-flex px-5 py-2.5 text-sm font-semibold"
                >
                    {cta}
                </Link>
            </div>

            <div className="mt-auto" />
        </div>
    );
}

export default function ImpactShowcase() {
    const donateHref = "/donate";

    const sportsImages = useMemo(
        () => [
            { src: "/impact/sports-1.png", alt: "Youth football talent support" },
            { src: "/impact/sports-2.png", alt: "Sports gifts and kits for young talents" },
            { src: "/impact/sports-3.png", alt: "Community football event and competition" },
            { src: "/impact/sports-4.png", alt: "Young athletes receiving support" },
            { src: "/impact/sports-5.png", alt: "Training and development for talents" },
        ],
        []
    );

    return (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 pb-16 items-stretch">
            <VideoCard
                href={donateHref}
                title="Experience love in action"
                desc="We gave people the opportunity to feel dignity through food, drinks, and sponsorship support. Your donation helps us repeat this impact—again and again—for humanity."
                videoSrc="/impact/experience-love.mp4"
                startRange={{ from: 20, to: 30 }}
                cta="Donate to keep this going"
            />

            <ImageCard
                href={donateHref}
                title="Sports talent sponsorship"
                desc="We support young football talents with gifts, organized games, and competitions that push their craft forward. Sponsorships fund equipment, kits, training support, and safe events."
                images={sportsImages}
                cta="Sponsor equipment & programs"
            />

            <VideoCard
                href={donateHref}
                title="Feeding street kids with joy"
                desc="We feed street kids meals they may only imagine—paired with fun challenges and games to bring real happiness. Everyone gets fed, even if they don’t win."
                videoSrc="/impact/street-kids.mp4"
                startRange={{ from: 20, to: 30 }}
                cta="Donate meals & support"
            />
        </div>
    );
}