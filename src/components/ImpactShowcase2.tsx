"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type VideoCardProps = {
    href: string;
    title: string;
    desc: string;
    videoSrc: string;
    startRange?: { from: number; to: number };
    cta: string;
};

function VideoCard({ href, title, desc, videoSrc, startRange = { from: 20, to: 30 }, cta }: VideoCardProps) {
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

type ImageCardProps = {
    href: string;
    title: string;
    desc: string;
    images: { src: string; alt: string }[];
    cta: string;
};

function ImageCard({ href, title, desc, images, cta }: ImageCardProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, 3800);
        return () => clearInterval(t);
    }, [images.length]);

    const current = images[index];

    return (
        <div className="relative glass rounded-3xl p-5 sm:p-6 overflow-hidden h-full flex flex-col">
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

            <div className="relative z-[2] mt-4 pt-1">
                <Link href={href} className="water-btn donate-glow inline-flex px-5 py-2.5 text-sm font-semibold">
                    {cta}
                </Link>
            </div>

            <div className="mt-auto" />
        </div>
    );
}

export default function ImpactShowcase2() {
    const donateHref = "/donate";

    const businessImages = useMemo(
        () => [
            { src: "/impact-2/business-1.jpg", alt: "Business support with umbrellas and capital boost" },
            { src: "/impact-2/business-2.jpg", alt: "Foundation support for small businesses" },
            { src: "/impact-2/business-3.jpg", alt: "Sister organizations partnering to empower businesses" },
            { src: "/impact-2/business-4.jpg", alt: "Umbrella support to reduce heat and rain damage" },
            { src: "/impact-2/business-5.jpg", alt: "Cash benefits to boost business capital" },
            { src: "/impact-2/business-6.jpg", alt: "Small business growth support" },
            { src: "/impact-2/business-7.jpg", alt: "Market protection and business resilience" },
            { src: "/impact-2/business-8.jpg", alt: "Community business empowerment outreach" },
            { src: "/impact-2/business-9.jpg", alt: "Scaling support for entrepreneurs" },
        ],
        []
    );

    return (
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-4 pb-16 items-stretch">
            <VideoCard
                href={donateHref}
                title="Hospital support when it matters most"
                desc="We supported a woman in the hospital with urgent assistance—relief that restores dignity and hope. With your donations, we can reach more families faster."
                videoSrc="/impact-2/hospital-assistance.mp4"
                startRange={{ from: 20, to: 30 }}
                cta="Donate to help more patients"
            />

            <ImageCard
                href={donateHref}
                title="Business scale support & protection"
                desc="Through our sister organizations, we help businesses scale and stay protected from heat and rain damage—providing umbrellas plus cash benefits to boost capital and resilience."
                images={businessImages}
                cta="Sponsor business support"
            />

            <VideoCard
                href={donateHref}
                title="Education materials delivered with care"
                desc="We deliver essential materials to students and people who need them to keep learning. Your support equips futures—one resource at a time."
                videoSrc="/impact-2/education-materials.mp4"
                startRange={{ from: 20, to: 30 }}
                cta="Donate to support education"
            />
        </div>
    );
}