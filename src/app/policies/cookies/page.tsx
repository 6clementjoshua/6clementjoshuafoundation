// src/app/policies/cookies/page.tsx
import PolicyShell from "../_components/PolicyShell";

export default function CookiesPage() {
    return (
        <PolicyShell
            title="Cookies Policy"
            subtitle="This policy explains how cookies and similar technologies are used on our websites and services, how they protect users globally, and how you can control them across devices, browsers, and jurisdictions."
            updatedISO="2026-02-01"
            badges={[
                { label: "User control", tone: "good" },
                { label: "Security & fraud prevention", tone: "neutral" },
                { label: "Global compliance", tone: "neutral" },
            ]}
            toc={[
                { id: "what", label: "What Cookies Are" },
                { id: "why", label: "Why We Use Cookies" },
                { id: "types", label: "Types of Cookies We Use" },
                { id: "legal", label: "Legal Bases & Global Laws" },
                { id: "choices", label: "Your Choices & Controls" },
                { id: "third", label: "Third-Party Cookies" },
                { id: "do-not-track", label: "Do Not Track Signals" },
                { id: "updates", label: "Policy Updates" },
            ]}
            crossRefs={[
                { href: "/policies/privacy", label: "Privacy Policy" },
                { href: "/policies/anti-fraud", label: "Anti-Fraud Policy" },
                { href: "/policies/donor-privacy", label: "Donor Privacy" },
            ]}
            quickCards={[
                {
                    title: "Security",
                    body: "Cookies help detect abuse, prevent fraud, and protect accounts, donations, and beneficiaries.",
                },
                {
                    title: "Transparency",
                    body: "We clearly disclose cookie usage and do not use hidden tracking or deceptive consent methods.",
                },
                {
                    title: "Control",
                    body: "You can manage, restrict, or delete cookies using browser and device settings at any time.",
                },
            ]}
        >
            {/* 1. What cookies are */}
            <section id="what" className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">
                    1. What Cookies Are
                </h2>
                <p className="text-black/75 leading-relaxed">
                    Cookies are small text files placed on your device (computer, phone, tablet)
                    when you visit a website. They allow systems to remember information about
                    your visit, such as security status, preferences, or session identifiers.
                </p>
                <p className="text-black/75 leading-relaxed">
                    Similar technologies may include local storage, session storage, pixels,
                    tags, and device identifiers. For simplicity, all such technologies are
                    referred to as “cookies” in this policy.
                </p>
            </section>

            {/* 2. Why we use cookies */}
            <section id="why" className="mt-10 space-y-3">
                <h2 className="font-display text-2xl font-semibold">
                    2. Why We Use Cookies
                </h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• To maintain secure sessions and prevent unauthorized access</li>
                    <li>• To protect donation flows from fraud, bots, and abuse</li>
                    <li>• To remember user preferences and accessibility settings</li>
                    <li>• To measure site reliability and performance</li>
                    <li>• To comply with legal and regulatory obligations worldwide</li>
                </ul>
            </section>

            {/* 3. Types */}
            <section id="types" className="mt-10 space-y-3">
                <h2 className="font-display text-2xl font-semibold">
                    3. Types of Cookies We Use
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="steel rounded-2xl p-4">
                        <div className="font-semibold text-black/85">Essential Cookies</div>
                        <p className="mt-1 text-sm text-black/70 leading-relaxed">
                            Required for site security, authentication, and basic functionality.
                            These cookies cannot be disabled without impairing the service.
                        </p>
                    </div>

                    <div className="steel rounded-2xl p-4">
                        <div className="font-semibold text-black/85">Security & Fraud Cookies</div>
                        <p className="mt-1 text-sm text-black/70 leading-relaxed">
                            Used to detect suspicious behavior, prevent payment abuse, and protect
                            donors, beneficiaries, and platforms.
                        </p>
                    </div>

                    <div className="steel rounded-2xl p-4">
                        <div className="font-semibold text-black/85">Preference Cookies</div>
                        <p className="mt-1 text-sm text-black/70 leading-relaxed">
                            Remember language, region, or display settings to improve usability.
                        </p>
                    </div>

                    <div className="steel rounded-2xl p-4">
                        <div className="font-semibold text-black/85">Analytics Cookies</div>
                        <p className="mt-1 text-sm text-black/70 leading-relaxed">
                            Help us understand site performance and reliability in aggregated,
                            non-intrusive ways.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. Legal */}
            <section id="legal" className="mt-10 space-y-3">
                <h2 className="font-display text-2xl font-semibold">
                    4. Legal Bases & Global Laws
                </h2>
                <p className="text-black/75 leading-relaxed">
                    Cookie usage is governed by international and regional laws, including but
                    not limited to GDPR (EU/EEA), UK GDPR, CCPA/CPRA (United States), NDPR
                    (Nigeria), PIPEDA (Canada), LGPD (Brazil), POPIA (South Africa), and
                    equivalent regulations worldwide.
                </p>
                <p className="text-black/75 leading-relaxed">
                    Where required, cookies are used based on user consent. Where permitted,
                    essential and security cookies are used based on legitimate interest to
                    protect users, funds, and services.
                </p>
            </section>

            {/* 5. Choices */}
            <section id="choices" className="mt-10 space-y-3">
                <h2 className="font-display text-2xl font-semibold">
                    5. Your Choices & Controls
                </h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• You can block or delete cookies via browser settings</li>
                    <li>• You can limit third-party cookies independently</li>
                    <li>• You can use private browsing modes where supported</li>
                    <li>• Some security cookies cannot be disabled for safety reasons</li>
                </ul>
            </section>

            {/* 6. Third party */}
            <section id="third" className="mt-10 space-y-3">
                <h2 className="font-display text-2xl font-semibold">
                    6. Third-Party Cookies
                </h2>
                <p className="text-black/75 leading-relaxed">
                    Some cookies may be set by trusted third-party services that support
                    payments, security, or infrastructure. These currently include payment
                    processors such as <strong>Stripe</strong> and <strong>Flutterwave</strong>.
                </p>
                <p className="text-black/75 leading-relaxed">
                    Third-party cookies are governed by the privacy policies of those providers.
                    We do not permit unauthorized advertising trackers.
                </p>
            </section>

            {/* 7. DNT */}
            <section id="do-not-track" className="mt-10 space-y-3">
                <h2 className="font-display text-2xl font-semibold">
                    7. Do Not Track Signals
                </h2>
                <p className="text-black/75 leading-relaxed">
                    Some browsers transmit “Do Not Track” (DNT) signals. As there is no global
                    standard, we currently respond by limiting non-essential tracking where
                    technically feasible.
                </p>
            </section>

            {/* 8. Updates */}
            <section id="updates" className="mt-10 space-y-3">
                <h2 className="font-display text-2xl font-semibold">
                    8. Policy Updates
                </h2>
                <p className="text-black/75 leading-relaxed">
                    This Cookies Policy may be updated to reflect legal, technical, or operational
                    changes. Updates will be published on this page with a revised “Last updated”
                    date.
                </p>
            </section>
        </PolicyShell>
    );
}