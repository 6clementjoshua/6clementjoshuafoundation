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
            <Link href={href} className="absolute inset-0 z-[1]" />

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
        }, 4200);
        return () => clearInterval(t);
    }, [images.length]);

    const current = images[index];

    return (
        <div className="relative glass rounded-3xl p-5 sm:p-6 overflow-hidden h-full flex flex-col">
            <Link href={href} className="absolute inset-0 z-[1]" />

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

export default function ImpactShowcase3() {
    const donateHref = "/donate";

    const streetEduImages = useMemo(
        () => [
            { src: "/impact-3/street-edu-1.png", alt: "Street education outreach" },
            { src: "/impact-3/street-edu-2.png", alt: "Providing education to street kids" },
        ],
        []
    );

    return (
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-4 pb-16 items-stretch">
            <VideoCard
                href={donateHref}
                title="Supporting NYSC graduates"
                desc="We sponsored NYSC graduates on their final day in the field—recognizing service, easing transition, and restoring hope. Your donations help us support more graduates."
                videoSrc="/impact-3/nysc-sponsorship.mp4"
                cta="Donate to support graduates"
            />

            <ImageCard
                href={donateHref}
                title="Education for street children"
                desc="We took education directly to children on the streets.We saw the potentials burning inside them all.Donations help provide uniforms, learning materials, and registration into proper institutions."
                images={streetEduImages}
                cta="Sponsor education"
            />

            <VideoCard
                href={donateHref}
                title="Responding to calls for aid"
                desc="During JAMB registrations, we noticed exhaustion and stepped in—providing water and care to keep candidates strong while waiting.It gave joy seeing them respond to the offer assist."
                videoSrc="/impact-3/jamb-water-support.mp4"
                cta="Donate to emergency outreach"
            />
        </div>
    );
}