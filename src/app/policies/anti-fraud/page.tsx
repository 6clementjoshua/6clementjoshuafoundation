// src/app/policies/anti-fraud/page.tsx
import PolicyShell from "../_components/PolicyShell";

export default function AntiFraudPage() {
    return (
        <PolicyShell
            title="Anti-Fraud, AML & Anti-Scam Policy"
            subtitle="Global protections against fraud, money laundering, terrorist financing, sanctions evasion, impersonation, and donation scams—designed to protect donors and beneficiaries worldwide."
            updatedISO="2026-02-01"
            badges={[
                { label: "Anti-Money Laundering (AML)", tone: "good" },
                { label: "Sanctions awareness", tone: "good" },
                { label: "Donation scam prevention", tone: "good" },
            ]}
            toc={[
                { id: "threats", label: "Threat Model" },
                { id: "controls", label: "Core Controls" },
                { id: "donations", label: "Donation Screening & Holds" },
                { id: "kyc", label: "Verification & KYC-lite" },
                { id: "sanctions", label: "Sanctions & Restricted Parties" },
                { id: "reporting", label: "Reporting Abuse" },
                { id: "enforcement", label: "Enforcement Actions" },
            ]}
            crossRefs={[
                { href: "/policies/refund", label: "Refunds" },
                { href: "/policies/whistleblowing", label: "Whistleblowing" },
                { href: "/policies/privacy", label: "Privacy" },
            ]}
            quickCards={[
                { title: "We block laundering", body: "We investigate structuring, stolen cards, layering, and suspicious donation patterns." },
                { title: "We fight scams", body: "We take down impersonation attempts and fake fundraisers using our name." },
                { title: "We cooperate", body: "We may cooperate with processors and lawful authorities where required." },
            ]}
        >
            <section id="threats" className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">1. Threat Model</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Stolen card donations and chargeback abuse</li>
                    <li>• Structuring (splitting donations to avoid detection)</li>
                    <li>• Impersonation / “fake charity” scams</li>
                    <li>• Money laundering and sanctions evasion attempts</li>
                    <li>• Exploitation of beneficiaries or diversion of aid</li>
                </ul>
            </section>

            <section id="controls" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">2. Core Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="steel rounded-2xl p-4">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Monitoring</div>
                        <div className="mt-2 text-sm text-black/75 leading-relaxed">
                            Pattern detection, velocity limits, geo-risk flags, duplicate identity signals, and dispute trend checks.
                        </div>
                    </div>
                    <div className="steel rounded-2xl p-4">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Controls</div>
                        <div className="mt-2 text-sm text-black/75 leading-relaxed">
                            Donation holds, verification prompts, restricted access, and reporting mechanisms.
                        </div>
                    </div>
                </div>
            </section>

            <section id="donations" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">3. Donation Screening & Holds</h2>
                <p className="text-black/75 leading-relaxed">
                    We may temporarily hold or reject donations that appear suspicious (e.g., mismatched identity signals, unusual volume,
                    high-risk regions, repeated declines, abnormal chargeback history, or suspected third-party funding).
                </p>
            </section>

            <section id="kyc" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">4. Verification & KYC-lite</h2>
                <p className="text-black/75 leading-relaxed">
                    When necessary, we may request minimal verification (e.g., confirming donor identity, confirming authorization, or validating contact details).
                    We keep verification proportional—only what is needed to protect integrity.
                </p>
            </section>

            <section id="sanctions" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">5. Sanctions & Restricted Parties</h2>
                <p className="text-black/75 leading-relaxed">
                    We do not knowingly facilitate prohibited transactions. We may block transactions linked to restricted parties, sanctioned regions, or
                    unlawful purposes. Where required, we cooperate with payment processors and lawful authorities.
                </p>
            </section>

            <section id="reporting" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">6. Reporting Abuse</h2>
                <p className="text-black/75 leading-relaxed">
                    Report scams, impersonation, or suspicious donation activity via our Contact page.
                    If someone claims to represent us, verify through our official website only.
                </p>
            </section>

            <section id="enforcement" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">7. Enforcement Actions</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Block or suspend suspicious accounts and traffic</li>
                    <li>• Refuse or reverse donations where legally/operationally permitted</li>
                    <li>• Preserve logs for investigation and cooperate where required</li>
                </ul>
            </section>
        </PolicyShell>
    );
}