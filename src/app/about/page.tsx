// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const CAC_NUMBER = "8447002";
const FOUNDED_YEAR = "2011";

// ✅ Change this if your filename is different
const PARENT_BRAND_VIDEO_SRC = "/brand/parent-brand/parent-brand.mp4";

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

const LOCATIONS = [
    { group: "Nigeria (HQ & Active Services)", items: ["Cross River (HQ)", "Lagos", "Abuja", "Port Harcourt", "Enugu", "Onitsha"] },
    { group: "International (Active Services)", items: ["India", "Australia", "United Kingdom", "United States"] },
];

const PROGRAM_AREAS = [
    {
        title: "Emergency Relief",
        bullets: ["Rapid response support", "Food, essential supplies, and crisis assistance", "Safe referral and coordination where needed"],
    },
    {
        title: "Education Empowerment",
        bullets: ["Learning support and educational assistance", "Community learning resources", "Skill and opportunity pathways"],
    },
    {
        title: "Cash & Livelihood Empowerment",
        bullets: ["Micro-support where appropriate", "Entrepreneurship and livelihood assistance", "Community stability initiatives"],
    },
    {
        title: "Household Empowerment",
        bullets: ["Essentials support", "Stability for vulnerable households", "Dignity-first assistance"],
    },
    {
        title: "Community Empowerment",
        bullets: ["Local outreach and community programs", "Volunteer support and partnerships", "Long-term opportunity creation"],
    },
    {
        title: "Safeguarding & Protection",
        bullets: ["Child safeguarding standards", "Anti-exploitation practices", "Confidential reporting and accountability"],
    },
];

const ECOSYSTEM_BRANDS = [
    { key: "foundation", label: "6Clement Joshua Foundation", img: "/brands/cj-foundation.jpg", note: "Humanitarian aid & empowerment operations." },
    { key: "fashion", label: "6Clement Joshua Fashion", img: "/brands/cj-fashion.jpg", note: "A brand under the group supporting the mission." },
    { key: "restaurant", label: "6Clement Joshua Restaurant", img: "/brands/cj-restaurant.jpg", note: "A brand under the group supporting the mission." },
    { key: "gaming", label: "6Clement Joshua Gaming", img: "/brands/cj-gaming.jpg", note: "A brand under the group supporting the mission." },
    { key: "music", label: "6Clement Joshua Music", img: "/brands/cj-music.jpg", note: "A brand under the group supporting the mission." },
    { key: "water", label: "6Clement Joshua Water", img: "/brands/cj-water.jpg", note: "A brand under the group supporting the mission." },
];

const CONTACT_EMAIL = "info@6clementjoshuafoundation.com";
const OPTIONAL_DONOR_EMAIL = "donor@6clementjoshuafoundation.com";
const TIKTOK = "@6clementjoshua";

function Pill({
    children,
    tone = "neutral",
}: {
    children: React.ReactNode;
    tone?: "neutral" | "good" | "warn";
}) {
    const cls =
        tone === "good"
            ? "bg-black/[0.06] text-black/80"
            : tone === "warn"
                ? "bg-black/[0.06] text-black/80"
                : "bg-black/[0.04] text-black/70";

    return (
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
            {children}
        </span>
    );
}

function SectionTitle({ overline, title, desc }: { overline: string; title: string; desc?: string }) {
    return (
        <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wide text-black/55">{overline}</div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
            {desc ? <p className="text-black/70 leading-relaxed max-w-3xl">{desc}</p> : null}
        </div>
    );
}

function MiniCard({ title, body, bullets }: { title: string; body?: string; bullets?: string[] }) {
    return (
        <div className="steel rounded-2xl p-5 transition will-change-transform hover:-translate-y-0.5">
            <div className="text-[11px] uppercase tracking-wide text-black/55">{title}</div>
            {body ? <div className="mt-2 text-sm text-black/75 leading-relaxed">{body}</div> : null}
            {bullets?.length ? (
                <ul className="mt-3 space-y-2 text-sm text-black/75 leading-relaxed">
                    {bullets.map((b) => (
                        <li key={b}>• {b}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

export default function AboutPage() {
    return (
        <main>
            <Header />

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
                {/* HERO */}
                <div className="relative overflow-hidden rounded-[2rem] glass-strong">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-black/5 blur-3xl" />

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10 lg:p-12">
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-2">
                                <Pill>
                                    <span className="h-2 w-2 rounded-full bg-black/70" />
                                    Incorporated Trustees
                                </Pill>
                                <Pill>Founded {FOUNDED_YEAR}</Pill>
                                <Pill> CAC No. {CAC_NUMBER}</Pill>
                            </div>

                            <h1 className="mt-5 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                                Clement Joshua Foundation
                            </h1>

                            <p className="mt-4 text-base sm:text-lg text-black/70 leading-relaxed">
                                We provide <span className="font-semibold text-black/80">emergency aid</span>,{" "}
                                <span className="font-semibold text-black/80">empowerment</span>, and{" "}
                                <span className="font-semibold text-black/80">community support</span>—with active services in Nigeria and
                                global outreach where needs arise.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <Link href="/donate" className="water-btn donate-glow px-6 py-3 text-sm font-semibold">
                                    Donate
                                </Link>
                                <Link href="/programs" className="water-btn px-6 py-3 text-sm font-semibold">
                                    Explore Programs
                                </Link>
                                <Link href="/contact" className="px-4 py-2 text-sm text-black/70 hover:text-black transition">
                                    Contact us →
                                </Link>
                            </div>

                            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <MiniCard
                                    title="What we do"
                                    body="Emergency support + empowerment programs for real people in real situations."
                                />
                                <MiniCard
                                    title="How we operate"
                                    body="Dignity-first support, safeguarding standards, and clear accountability."
                                />
                                <MiniCard
                                    title="How donations are protected"
                                    body="Anti-fraud controls, transparency policy, and payment processing via Stripe & Flutterwave."
                                />
                            </div>
                        </div>

                        {/* Right visual: Foundation logo */}
                        <div className="flex items-center justify-center">
                            <div className="glass rounded-[2rem] p-6 sm:p-8 w-full">
                                <div className="text-[11px] uppercase tracking-wide text-black/55">Identity</div>
                                <div className="mt-3 relative overflow-hidden rounded-2xl border border-black/10 bg-white/40">
                                    <div className="relative w-full aspect-square">
                                        <Image
                                            src="/brands/cj-foundation.jpg"
                                            alt="Clement Joshua Foundation logo"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 text-sm text-black/75 leading-relaxed">
                                    The Foundation is a service of the <span className="font-semibold">6Clement Joshua</span> parent
                                    group—an ecosystem of brands that help fund and sustain humanitarian operations.
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Pill tone="good">Policies open in a new tab</Pill>
                                    <Pill>Global coverage</Pill>
                                    <Pill>People-first</Pill>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WHO WE ARE */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="About us"
                        title="A foundation built for dignity, stability, and opportunity"
                        desc="Clement Joshua Foundation is an Incorporated Trustee (Nigeria). Our purpose is to support communities through emergency response and empowerment programs—locally and internationally—while maintaining strong safeguards against fraud and misuse."
                    />

                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <MiniCard
                            title="Legal status"
                            bullets={[
                                "Registered as Incorporated Trustees",
                                `CAC No. ${CAC_NUMBER}`,
                                `Founded since ${FOUNDED_YEAR}`,
                            ]}
                        />
                        <MiniCard
                            title="Mission"
                            bullets={[
                                "Provide emergency aid",
                                "Empower individuals and communities",
                                "Support long-term opportunity",
                            ]}
                        />
                        <MiniCard
                            title="Trust & protection"
                            bullets={[
                                "Anti-fraud & laundering controls",
                                "Child safeguarding standards",
                                "Whistleblowing and accountability",
                            ]}
                        />
                    </div>
                </div>

                {/* WHAT WE DO */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Programs"
                        title="What we deliver"
                        desc="We support people through a broad set of humanitarian services. The exact assistance offered depends on verified needs, local context, and safety checks."
                    />

                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {PROGRAM_AREAS.map((p) => (
                            <MiniCard key={p.title} title={p.title} bullets={p.bullets} />
                        ))}
                    </div>

                    <div className="mt-7 rounded-2xl border border-black/10 bg-black/[0.03] p-5">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Important</div>
                        <p className="mt-2 text-sm text-black/75 leading-relaxed">
                            We do not promise outcomes, and we do not operate as a bank or financial institution.
                            Assistance is provided based on verification, available funding, and safety controls.
                            We maintain documentation and internal review to reduce fraud and misuse.
                        </p>
                    </div>
                </div>

                {/* WHERE WE OPERATE */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Coverage"
                        title="Where we operate"
                        desc="HQ is in Cross River, Nigeria, with active services across multiple Nigerian cities and international support for verified humanitarian needs."
                    />

                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {LOCATIONS.map((block) => (
                            <div key={block.group} className="steel rounded-2xl p-5">
                                <div className="text-[11px] uppercase tracking-wide text-black/55">{block.group}</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {block.items.map((i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center rounded-full bg-black/[0.04] px-3 py-1 text-sm text-black/70"
                                        >
                                            {i}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ✅ NEW: PARENT COMPANY HERO VIDEO (BEFORE ECOSYSTEM) */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Who runs the Foundation"
                        title="Owned & operated under the 6Clement Joshua parent company"
                        desc="Clement Joshua Foundation is owned and operated under the 6Clement Joshua parent company. The video below introduces the parent company and explains the wider mission and brand ecosystem behind the Foundation."
                    />

                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Video card */}
                        <div className="steel rounded-2xl p-5">
                            <div className="text-[11px] uppercase tracking-wide text-black/55">Parent company overview</div>

                            <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white/40">
                                <div className="relative w-full aspect-video">
                                    <video
                                        className="h-full w-full object-cover"
                                        controls
                                        playsInline
                                        preload="metadata"
                                        poster="/brands/cj-foundation.jpg"
                                    >
                                        <source src={PARENT_BRAND_VIDEO_SRC} type="video/mp4" />
                                    </video>
                                </div>
                            </div>

                            <div className="mt-3 text-sm text-black/75 leading-relaxed">
                                This video explains the <span className="font-semibold">6Clement Joshua</span> parent company—its mission,
                                leadership structure, and how it powers long-term humanitarian impact through the Foundation.
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                <Pill>Parent company</Pill>
                                <Pill>Brand ecosystem</Pill>
                                <Pill tone="good">Mission-backed</Pill>
                            </div>
                        </div>

                        {/* Ownership clarity card */}
                        <div className="steel rounded-2xl p-5">
                            <div className="text-[11px] uppercase tracking-wide text-black/55">Governance clarity</div>

                            <div className="mt-2 text-sm text-black/75 leading-relaxed">
                                <span className="font-semibold text-black/85">Who runs the Foundation?</span>
                                <div className="mt-2">
                                    The Foundation is managed as a humanitarian service under the{" "}
                                    <span className="font-semibold">6Clement Joshua</span> parent company. The parent company provides
                                    operational support, governance oversight, and ecosystem funding—while the Foundation remains
                                    mission-directed and policy-governed.
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <MiniCard
                                    title="Why this matters"
                                    bullets={[
                                        "Transparency about leadership & ownership",
                                        "Clear accountability for operations",
                                        "Stronger trust for donors and partners",
                                    ]}
                                />
                                <MiniCard
                                    title="What stays protected"
                                    bullets={[
                                        "Donations remain mission-directed",
                                        "Anti-fraud & safeguarding controls",
                                        "No card details stored on our site",
                                    ]}
                                />
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <a href="#ecosystem" className="water-btn px-6 py-3 text-sm font-semibold">
                                    See the ecosystem →
                                </a>
                                <Link href="/contact" className="px-4 py-2 text-sm text-black/70 hover:text-black transition">
                                    Partnership inquiries →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-black/10 bg-black/[0.03] p-5">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Video location</div>
                        <p className="mt-2 text-sm text-black/75 leading-relaxed">
                            Place your MP4 here: <span className="font-semibold">public/brand/parent-brand/parent-brand.mp4</span>{" "}
                            (then it loads at <span className="font-semibold">/brand/parent-brand/parent-brand.mp4</span>).
                        </p>
                    </div>
                </div>

                {/* ECOSYSTEM */}
                <div id="ecosystem" className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Ecosystem"
                        title="How the mission is funded"
                        desc="The Foundation is a service of the 6Clement Joshua parent group. Our brands help fund humanitarian operations and cover operational needs. Donations remain mission-directed and governed by our transparency and anti-fraud rules."
                    />

                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {ECOSYSTEM_BRANDS.map((b) => (
                            <div key={b.key} className="steel rounded-2xl p-5">
                                <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/40">
                                    <div className="relative w-full aspect-square">
                                        <Image src={b.img} alt={b.label} fill className="object-contain" />
                                    </div>
                                </div>
                                <div className="mt-3 font-semibold text-black/85">{b.label}</div>
                                <div className="mt-1 text-sm text-black/70 leading-relaxed">{b.note}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-7 rounded-2xl border border-black/10 bg-black/[0.03] p-5">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Funding note</div>
                        <p className="mt-2 text-sm text-black/75 leading-relaxed">
                            These brands are owned within the 6Clement Joshua group. Donor funds are protected through policy controls,
                            internal verification, and payment processing safeguards. We use trusted processors (Stripe & Flutterwave)
                            and do not store full card details.
                        </p>
                    </div>
                </div>

                {/* TRUST + POLICIES */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Trust & safeguards"
                        title="How we protect donors, beneficiaries, and funds"
                        desc="We apply controls designed to deter fraud, diversion of aid, impersonation, and abuse—across jurisdictions and continents."
                    />

                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <MiniCard
                            title="Anti-fraud & misuse"
                            bullets={[
                                "Verification checks for sensitive assistance",
                                "Bot and abuse prevention on web flows",
                                "We investigate suspicious activity and may refuse service",
                            ]}
                        />
                        <MiniCard
                            title="Anti-laundering stance"
                            bullets={[
                                "We do not accept donations intended for illegal activity",
                                "We may limit or reject high-risk transactions",
                                "We cooperate with lawful requests when required",
                            ]}
                        />
                        <MiniCard
                            title="Safeguarding & reporting"
                            bullets={[
                                "Child safeguarding policy",
                                "Whistleblowing channel via Contact",
                                "Non-retaliation approach for good-faith reports",
                            ]}
                        />
                    </div>

                    <div className="mt-7">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Read our policies</div>
                        <div className="mt-3 flex flex-wrap gap-2">
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
                        <div className="mt-2 text-xs text-black/55">
                            Policies open in a new tab so you don’t lose your place.
                        </div>
                    </div>
                </div>

                {/* PROOF / MEDIA */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Proof of service"
                        title="Evidence, outreach, and acknowledgements"
                        desc="We document our efforts where safe and appropriate, and we welcome responsible oversight."
                    />

                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="steel rounded-2xl p-5">
                            <div className="text-[11px] uppercase tracking-wide text-black/55">Outreach video</div>
                            <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white/40">
                                <div className="relative w-full aspect-video">
                                    <video
                                        className="h-full w-full object-cover"
                                        controls
                                        preload="metadata"
                                        poster="/brands/cj-foundation.jpg"
                                    >
                                        <source src="/about/outreach-1.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>

                        <div className="steel rounded-2xl p-5">
                            <div className="text-[11px] uppercase tracking-wide text-black/55">President/ward letter</div>
                            <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white/40">
                                <div className="relative w-full aspect-video">
                                    <Image
                                        src="/about/president-letter.PNG"
                                        alt="Service recognition letter"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {["outreach-1.jpg", "outreach-2.jpg", "outreach-3.jpeg", "outreach-4.jpeg"].map((f) => (
                            <div key={f} className="overflow-hidden rounded-2xl border border-black/10 bg-white/40">
                                <div className="relative w-full aspect-square">
                                    <Image src={`/about/${f}`} alt={`Outreach ${f}`} fill className="object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONTACT */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Contact"
                        title="Reach us"
                        desc="For donor questions, partnership inquiries, or verification requests, contact the Foundation using the channels below."
                    />

                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <MiniCard title="Email (General)" body={CONTACT_EMAIL} />
                        <MiniCard title="Email (Donor support)" body={OPTIONAL_DONOR_EMAIL} />
                        <MiniCard title="TikTok" body={TIKTOK} />
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Link href="/contact" className="water-btn px-6 py-3 text-sm font-semibold">
                            Contact Form
                        </Link>
                        <Link href="/donate" className="water-btn donate-glow px-6 py-3 text-sm font-semibold">
                            Donate
                        </Link>
                        <Link href="/programs" className="px-4 py-2 text-sm text-black/70 hover:text-black transition">
                            Explore Programs →
                        </Link>
                    </div>

                    <div className="mt-3 text-xs text-black/55">
                        Site name: <span className="font-semibold">{SITE.name}</span> • CAC No.{" "}
                        <span className="font-semibold">{CAC_NUMBER}</span>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}