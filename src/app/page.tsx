// src/app/page.tsx
"use client";

import Link from "next/link";
import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import { SITE } from "@/lib/site";
import Footer from "@/components/Footer";
import ImpactShowcase from "@/components/ImpactShowcase";
import ImpactShowcase2 from "@/components/ImpactShowcase2";
import ImpactShowcase3 from "@/components/ImpactShowcase3";
import ImpactStatsStrip from "@/components/ImpactStatsStrip";
import TransparencyBlock from "@/components/TransparencyBlock";
import BrandLogosStrip from "@/components/BrandLogosStrip";
import ImpactEventsShowcase from "@/components/ImpactEventsShowcase";

export default function HomePage() {
  return (
    <main>
      <Header />

      {/* Full-width hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative overflow-hidden rounded-[2rem] glass-strong">
          {/* soft glow accents */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-black/5 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10 lg:p-12">
            {/* Left: brand + hero message */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-black/70 w-fit">
                <span className="h-2 w-2 rounded-full bg-black/70" />
                <span>{SITE.subMotto}</span>
              </div>

              <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                {SITE.motto}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-black/70 leading-relaxed">
                We exist to support real people through humanitarian aid, empowerment, and
                community-driven programs. Your donation helps create stability, dignity, and
                long-term opportunity.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/donate"
                  className="water-btn donate-glow px-6 py-3 text-sm font-semibold"
                >
                  Donate Now
                </Link>

                <Link href="/programs" className="water-btn px-6 py-3 text-sm font-semibold">
                  Explore Programs
                </Link>

                <Link
                  href="/about"
                  className="px-4 py-2 text-sm text-black/70 hover:text-black transition"
                >
                  Learn who we are →
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="steel rounded-2xl p-4">
                  <div className="text-[11px] tracking-wide text-black/55 uppercase">Focus</div>
                  <div className="mt-1 font-display font-semibold text-black/90">
                    Humanitarian impact
                  </div>
                </div>

                <div className="steel rounded-2xl p-4">
                  <div className="text-[11px] tracking-wide text-black/55 uppercase">Approach</div>
                  <div className="mt-1 font-display font-semibold text-black/90">
                    Transparent giving
                  </div>
                </div>

                <div className="steel rounded-2xl p-4">
                  <div className="text-[11px] tracking-wide text-black/55 uppercase">Priority</div>
                  <div className="mt-1 font-display font-semibold text-black/90">
                    People-first support
                  </div>
                </div>
              </div>
            </div>

            {/* Right: slideshow */}
            <div className="flex items-center">
              <HeroSlideshow />
            </div>
          </div>
        </div>

        <ImpactStatsStrip />
        <TransparencyBlock />
        <ImpactShowcase />
        <ImpactShowcase2 />
        <ImpactShowcase3 />
        <ImpactEventsShowcase />
        <BrandLogosStrip />
      </section>

      <Footer />
    </main>
  );
}