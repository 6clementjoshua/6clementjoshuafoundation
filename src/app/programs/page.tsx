// src/app/programs/page.tsx
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CAC_NUMBER = "8447002";
const FOUNDED_YEAR = "2011";

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

type Program = {
    id: string;
    title: string;
    summary: string;
    includes: string[];
    eligibility: string[];
    verification: string[];
    exclusions: string[];
};

const PROGRAMS: Program[] = [
    {
        id: "emergency",
        title: "Emergency Relief",
        summary:
            "Rapid support for urgent situations—focused on dignity, safety, and stabilization.",
        includes: [
            "Emergency essentials (case-by-case)",
            "Crisis response support and referrals",
            "Time-sensitive humanitarian assistance",
        ],
        eligibility: [
            "Verified urgent need",
            "Local context and safety considerations",
            "Availability of funds and supplies",
        ],
        verification: [
            "Identity and context checks where feasible",
            "Basic documentation or community verification",
            "Fraud screening and duplicate-request checks",
        ],
        exclusions: [
            "We do not operate as a hospital/clinic",
            "We do not guarantee outcomes or instant approvals",
            "We do not facilitate illegal activities",
        ],
    },
    {
        id: "education",
        title: "Education Empowerment",
        summary:
            "Learning support that strengthens opportunities—education assistance, materials, and pathways.",
        includes: [
            "Educational support (case-by-case)",
            "Learning tools/resources where feasible",
            "Mentorship/community opportunity connections",
        ],
        eligibility: [
            "Need-based support",
            "Focus on impact and feasibility",
            "Availability of funds and program capacity",
        ],
        verification: [
            "Basic checks to confirm student/learning need",
            "Anti-fraud screening",
            "Documentation may be requested depending on location",
        ],
        exclusions: [
            "No false claims or impersonation",
            "No resale/diversion of assistance",
            "No bribery or kickback requests",
        ],
    },
    {
        id: "cash",
        title: "Cash & Livelihood Empowerment",
        summary:
            "Targeted assistance that supports stability and livelihoods—delivered with strict controls.",
        includes: [
            "Micro-support (case-by-case)",
            "Livelihood assistance and opportunity support",
            "Support for recovery and stability",
        ],
        eligibility: [
            "Verified need and risk screening",
            "Feasible plan/use-case where relevant",
            "Availability of funds and policy compliance",
        ],
        verification: [
            "Higher scrutiny for cash-like support",
            "Duplicate detection + fraud screening",
            "May require additional documentation depending on risk",
        ],
        exclusions: [
            "No money laundering, scams, or prohibited use",
            "No “investment guarantees” or unrealistic promises",
            "No third-party collection on behalf of unknown persons",
        ],
    },
    {
        id: "household",
        title: "Household Empowerment",
        summary:
            "Support that helps households meet essential needs and maintain stability.",
        includes: [
            "Essentials support (case-by-case)",
            "Household stability assistance",
            "Community-based support coordination",
        ],
        eligibility: [
            "Need-based support",
            "Risk screening and resource availability",
            "Local feasibility and safeguarding checks",
        ],
        verification: [
            "Basic identity/context verification",
            "Abuse prevention checks",
            "Follow-up may be conducted for accountability",
        ],
        exclusions: [
            "No forged documents",
            "No diversion of supplies",
            "No harassment, threats, or coercion",
        ],
    },
    {
        id: "community",
        title: "Community Empowerment",
        summary:
            "Programs that strengthen communities—volunteers, outreach, partnerships, and long-term opportunity.",
        includes: [
            "Community-driven initiatives",
            "Volunteer-led outreach programs",
            "Local partnerships and coordination",
        ],
        eligibility: [
            "Community relevance and safety",
            "Availability of volunteers/resources",
            "Compliance with safeguarding standards",
        ],
        verification: [
            "Partner/community verification where used",
            "Anti-fraud controls for program resources",
            "Documentation of activities when safe",
        ],
        exclusions: [
            "No political manipulation or coercion",
            "No discriminatory or hateful actions",
            "No exploitation of beneficiaries",
        ],
    },
    {
        id: "safeguarding",
        title: "Safeguarding & Protection",
        summary:
            "Child safety, anti-exploitation practices, and secure reporting mechanisms across all programs.",
        includes: [
            "Child safeguarding standards",
            "Anti-exploitation and abuse prevention",
            "Whistleblowing and reporting routes",
        ],
        eligibility: [
            "Applies to everyone involved (staff, volunteers, partners, beneficiaries)",
            "Mandatory compliance for participation",
            "Reported violations are reviewed and acted upon",
        ],
        verification: [
            "Policy compliance checks",
            "Investigation and documentation standards",
            "Escalation when safety risks exist",
        ],
        exclusions: [
            "No harassment, sexual exploitation, or abuse",
            "No retaliation against whistleblowers",
            "No concealment of misconduct",
        ],
    },
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
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
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

export default function ProgramsPage() {
    return (
        <main>
            <Header />

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
                {/* HERO */}
                <div className="relative overflow-hidden rounded-[2rem] glass-strong">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-black/5 blur-3xl" />

                    <div className="relative p-6 sm:p-10 lg:p-12">
                        <div className="flex flex-wrap items-center gap-2">
                            <Pill>Incorporated Trustees</Pill>
                            <Pill>Founded {FOUNDED_YEAR}</Pill>
                            <Pill>CAC No. {CAC_NUMBER}</Pill>
                            <Pill tone="good">Global support • HQ: Cross River, Nigeria</Pill>
                        </div>

                        <h1 className="mt-5 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                            Programs
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-black/70 leading-relaxed max-w-3xl">
                            We provide emergency aid, empowerment, and community support. Each program is delivered
                            with safeguards designed to protect donors, beneficiaries, and funds—across countries and continents.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link href="/donate" className="water-btn donate-glow px-6 py-3 text-sm font-semibold">
                                Donate
                            </Link>
                            <Link href="/contact" className="water-btn px-6 py-3 text-sm font-semibold">
                                Request Help / Contact
                            </Link>
                            <a href="#catalog" className="px-4 py-2 text-sm text-black/70 hover:text-black transition">
                                View program catalog →
                            </a>
                        </div>

                        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <MiniCard
                                title="How assistance is decided"
                                body="We consider verified needs, risk, feasibility, safeguarding, and available resources."
                            />
                            <MiniCard
                                title="How funds are protected"
                                body="Anti-fraud screening, duplicate detection, documentation review, and policy enforcement."
                            />
                            <MiniCard
                                title="How payments work"
                                body="Donations are processed via Stripe and Flutterwave. We do not store full card details."
                            />
                        </div>
                    </div>
                </div>

                {/* PROGRAM CATALOG */}
                <div id="catalog" className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Catalog"
                        title="Program categories"
                        desc="Select a category to see what it includes, eligibility guidelines, verification steps, and exclusions."
                    />

                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {PROGRAMS.map((p) => (
                            <a
                                key={p.id}
                                href={`#${p.id}`}
                                className="steel rounded-2xl p-5 transition will-change-transform hover:-translate-y-0.5 hover:bg-black/[0.035]"
                            >
                                <div className="text-[11px] uppercase tracking-wide text-black/55">Program</div>
                                <div className="mt-2 font-semibold text-black/85">{p.title}</div>
                                <div className="mt-2 text-sm text-black/70 leading-relaxed">{p.summary}</div>
                                <div className="mt-3 text-xs text-black/55">Jump to details →</div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* DETAILS */}
                <div className="mt-10 space-y-6">
                    {PROGRAMS.map((p) => (
                        <section key={p.id} id={p.id} className="glass rounded-[2rem] p-6 sm:p-10">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="text-[11px] uppercase tracking-wide text-black/55">Program</div>
                                    <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                                        {p.title}
                                    </h2>
                                    <p className="mt-2 text-black/70 leading-relaxed max-w-3xl">{p.summary}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Pill tone="good">Safeguarded delivery</Pill>
                                    <Pill>Verification checks</Pill>
                                    <Pill>Global-ready</Pill>
                                </div>
                            </div>

                            <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <MiniCard title="What it may include" bullets={p.includes} />
                                <MiniCard title="Eligibility guidelines" bullets={p.eligibility} />
                                <MiniCard title="Verification & safety checks" bullets={p.verification} />
                                <MiniCard title="Exclusions (strict)" bullets={p.exclusions} />
                            </div>

                            <div className="mt-7 rounded-2xl border border-black/10 bg-black/[0.03] p-5">
                                <div className="text-[11px] uppercase tracking-wide text-black/55">Note</div>
                                <p className="mt-2 text-sm text-black/75 leading-relaxed">
                                    Assistance is provided based on verified need, safety, local context, and available resources.
                                    We may refuse or limit support where risk indicators exist (fraud, impersonation, diversion of aid,
                                    prohibited use, or safeguarding concerns).
                                </p>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <Link href="/contact" className="water-btn px-6 py-3 text-sm font-semibold">
                                    Request help / Contact
                                </Link>
                                <Link href="/donate" className="water-btn donate-glow px-6 py-3 text-sm font-semibold">
                                    Fund this work
                                </Link>
                                <a href="#catalog" className="px-4 py-2 text-sm text-black/70 hover:text-black transition">
                                    Back to catalog ↑
                                </a>
                            </div>
                        </section>
                    ))}
                </div>

                {/* POLICIES */}
                <div className="mt-10 glass rounded-[2rem] p-6 sm:p-10">
                    <SectionTitle
                        overline="Policies"
                        title="Read our policies (opens in a new tab)"
                        desc="These policies explain donor protections, data handling, refunds, transparency standards, fraud prevention, child safeguarding, and reporting."
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
                        title="Help us reach more people"
                        desc="Your support helps deliver emergency aid, empowerment, and community programs across Nigeria and internationally."
                    />

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Link href="/donate" className="water-btn donate-glow px-6 py-3 text-sm font-semibold">
                            Donate
                        </Link>
                        <Link href="/about" className="water-btn px-6 py-3 text-sm font-semibold">
                            About the Foundation
                        </Link>
                        <Link href="/contact" className="px-4 py-2 text-sm text-black/70 hover:text-black transition">
                            Contact →
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}