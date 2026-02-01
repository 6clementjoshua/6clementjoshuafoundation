// src/app/impact/page.tsx
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CAC_NUMBER = "8447002";
const FOUNDED_YEAR = "2011";

// Videos you mentioned
// NOTE: make sure the Abuja hero file path matches what you actually have in /public
// Example: /public/impact/abuja-hero.mp4 -> "/impact/abuja-hero.mp4"
const HERO_VIDEO = "/impact/abuja-hero.mp4";

// You said impact-1 is in public/impact/impact-1 (no extension shown)
// Put the correct extension (mp4 / webm) here:
const RECOGNITION_VIDEO = "/impact/impact-1.mp4";

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
        <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}
        >
            {children}
        </span>
    );
}

function SectionTitle({
    overline,
    title,
    desc,
}: {
    overline: string;
    title: string;
    desc?: string;
}) {
    return (
        <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wide text-black/55">{overline}</div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
            {desc ? <p className="text-black/70 leading-relaxed max-w-3xl">{desc}</p> : null}
        </div>
    );
}

function MiniCard({
    title,
    body,
    bullets,
}: {
    title: string;
    body?: string;
    bullets?: string[];
}) {
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

// inline icons (no libs)
function IconCheck() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" aria-hidden="true">
            <path
                fill="currentColor"
                d="M9.2 16.6L4.8 12.2l1.4-1.4l3 3l8.6-8.6l1.4 1.4z"
            />
        </svg>
    );
}
function IconShield() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 2l8 4v6c0 5-3.5 9.7-8 10c-4.5-.3-8-5-8-10V6l8-4zm0 2.2L6 6.8V12c0 4.1 2.8 7.9 6 8.2c3.2-.3 6-4.1 6-8.2V6.8l-6-2.6z"
            />
        </svg>
    );
}
function IconGlobe() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 2a10 10 0 100 20a10 10 0 000-20zm7.9 9h-3.2a15.6 15.6 0 00-1.2-6A8.1 8.1 0 0119.9 11zM12 4c.9 1.2 1.7 3.4 2.1 7H9.9C10.3 7.4 11.1 5.2 12 4zM4.1 13h3.2a15.6 15.6 0 001.2 6A8.1 8.1 0 014.1 13zM4.1 11A8.1 8.1 0 018.5 5a15.6 15.6 0 00-1.2 6H4.1zm7.9 9c-.9-1.2-1.7-3.4-2.1-7h4.2c-.4 3.6-1.2 5.8-2.1 7zm3.5-1a15.6 15.6 0 001.2-6h3.2a8.1 8.1 0 01-4.4 6z"
            />
        </svg>
    );
}

export default function ImpactPage() {
    return (
        <main>
            <Header />

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
                {/* HERO VIDEO */}
                <div className="relative overflow-hidden rounded-[2rem] glass-strong">
                    {/* soft glows */}
                    <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-black/5 blur-3xl" />

                    {/* video background */}
                    <div className="absolute inset-0">
                        <video
                            className="h-full w-full object-cover"
                            src={HERO_VIDEO}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        {/* overlays for readability */}
                        <div className="absolute inset-0 bg-white/40" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/70" />
                    </div>

                    {/* hero content */}
                    <div className="relative p-6 sm:p-10 lg:p-12">
                        <div className="flex flex-wrap items-center gap-2">
                            <Pill>
                                <IconShield /> Incorporated Trustees
                            </Pill>
                            <Pill>
                                <IconCheck /> Founded {FOUNDED_YEAR}
                            </Pill>
                            <Pill>
                                <IconCheck /> CAC No. {CAC_NUMBER}
                            </Pill>
                            <Pill tone="good">
                                <IconGlobe /> Nigeria HQ • Global outreach
                            </Pill>
                        </div>

                        <h1 className="mt-6 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                            Impact
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-black/70 leading-relaxed max-w-3xl">
                            Clement Joshua Foundation (Incorporated Trustees) delivers humanitarian assistance
                            through emergency aid, empowerment, and community support. We also run outreach and
                            awareness projects—such as branded community motorcycles in Abuja—to make support
                            visible, accountable, and easy to verify.
                        </p>

                        {/* “Crystal text” style label */}
                        <div className="mt-5 inline-flex items-center rounded-full glass px-4 py-2 text-sm text-black/70">
                            <span className="font-semibold text-black/85">Abuja Outreach</span>
                            <span className="mx-2 h-1 w-1 rounded-full bg-black/30" />
                            <span className="text-black/60">
                                Branded motorcycles for awareness & community assistance
                            </span>
                        </div>

                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <Link href="/donate" className="water-btn donate-glow px-6 py-3 text-sm font-semibold">
                                Support this work
                            </Link>
                            <Link href="/programs" className="water-btn px-6 py-3 text-sm font-semibold">
                                View programs
                            </Link>
                            <a href="#evidence" className="px-4 py-2 text-sm text-black/70 hover:text-black transition">
                                See evidence & highlights →
                            </a>
                        </div>
                    </div>
                </div>

                {/* IMPACT HIGHLIGHTS */}
                <div id="evidence" className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Highlights"
                        title="Evidence-backed impact"
                        desc="We document impact through outreach footage, recognition, collaborations, community participation, and visible public acknowledgment."
                    />

                    <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <MiniCard
                            title="Recognition & credibility"
                            body="We have official recognition tied to the impact created. This builds trust and helps donors verify real-world results."
                        />
                        <MiniCard
                            title="City visibility"
                            body="Our name has been written on city walls in Cross River State—public acknowledgment that our activities are known and recognized locally."
                        />
                        <MiniCard
                            title="Responsible operations"
                            body="We protect donors and beneficiaries with anti-fraud processes, safeguarding standards, and policy-based governance."
                        />
                    </div>
                </div>

                {/* RECOGNITION VIDEO */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Recognition"
                        title="Impact recognition video"
                        desc="This clip showcases recognition we received linked to the outcomes of our outreach."
                    />

                    <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white/40">
                        <div className="relative w-full aspect-video">
                            <video
                                className="h-full w-full object-cover"
                                src={RECOGNITION_VIDEO}
                                controls
                                playsInline
                            />
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
                        <MiniCard
                            title="What this video represents"
                            bullets={[
                                "Community outcomes we delivered",
                                "Public-facing accountability",
                                "A verifiable record for donors and partners",
                            ]}
                        />
                        <MiniCard
                            title="Where we operate"
                            bullets={[
                                "HQ: Cross River, Nigeria",
                                "Additional presence: Lagos, Abuja, Port Harcourt, Enugu, Onitsha",
                                "International support links: India, Australia, UK, USA",
                            ]}
                        />
                        <MiniCard
                            title="How donors are protected"
                            bullets={[
                                "Anti-fraud screening & duplicate checks",
                                "Policy enforcement (anti-laundering, anti-scam)",
                                "Safeguarding standards across programs",
                            ]}
                        />
                    </div>
                </div>

                {/* BROADER IMPACT STORY */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Broader footprint"
                        title="Government, culture, and community collaboration"
                        desc="We support humanity in multiple formats—direct aid, empowerment programs, public partnerships, and community participation."
                    />

                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <MiniCard
                            title="Government collaborations & meetings"
                            body="We participate in collaborations and formal engagement where appropriate, including meetings connected to leadership circles (including engagements involving the Governor’s wife)."
                            bullets={[
                                "Relationship-building for humanitarian coordination",
                                "Community mobilization and awareness",
                                "Accountability through documentation and policy",
                            ]}
                        />

                        <MiniCard
                            title="Culture-driven impact (Carnival & public events)"
                            body="We participate in major cultural events and public programs that help amplify awareness, engagement, and unity across communities."
                            bullets={[
                                "Carnival participation for community connection",
                                "Public awareness and volunteer mobilization",
                                "Safe community engagement standards",
                            ]}
                        />

                        <MiniCard
                            title="Cross-brand support for humanitarian work"
                            body="Our parent group (6Clement Joshua) includes brands in fashion, restaurant, gaming, music, and other initiatives—used to fund and sustain the Foundation’s humanitarian mission."
                            bullets={[
                                "Fashion shows & charity-linked appearances",
                                "Music sponsorship and community projects",
                                "Comedy shows and community engagement",
                            ]}
                        />

                        <MiniCard
                            title="Public acknowledgment & legacy"
                            body="Our impact created lasting visibility—such as our name appearing on city walls in Cross River State—showing recognition and community memory of our work."
                            bullets={[
                                "Community trust built over time",
                                "Visible public recognition",
                                "Ongoing active operations",
                            ]}
                        />
                    </div>
                </div>

                {/* POLICIES */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Policies"
                        title="Read our policies"
                        desc="These policies explain donor protections, transparency, refunds, anti-fraud controls, child safeguarding, whistleblowing, and cookies."
                    />

                    <div className="mt-6 flex flex-wrap gap-2">
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

                    <div className="mt-3 text-xs text-black/55">
                        Donations are processed via <span className="font-semibold">Stripe</span> and{" "}
                        <span className="font-semibold">Flutterwave</span>. Additional payment methods may be added later.
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Support"
                        title="Help fund verified outreach and real community support"
                        desc="Your donation supports active operations, transparent delivery, and protected giving."
                    />

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Link href="/donate" className="water-btn donate-glow px-6 py-3 text-sm font-semibold">
                            Donate
                        </Link>
                        <Link href="/contact" className="water-btn px-6 py-3 text-sm font-semibold">
                            Contact
                        </Link>
                        <Link href="/about" className="px-4 py-2 text-sm text-black/70 hover:text-black transition">
                            About →
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}