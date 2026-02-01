// src/app/policies/privacy/page.tsx
import PolicyShell from "../_components/PolicyShell";

export default function PrivacyPolicyPage() {
    return (
        <PolicyShell
            title="Privacy Policy"
            subtitle="How we collect, use, store, share, and protect personal information across all countries. This policy is designed to meet global privacy expectations and to minimize data collection while maximizing safety and accountability."
            updatedISO="2026-02-01"
            badges={[
                { label: "Data minimization", tone: "good" },
                { label: "Security-first handling", tone: "good" },
                { label: "Global applicability", tone: "neutral" },
            ]}
            toc={[
                { id: "scope", label: "Scope & Definitions", note: "Who this applies to and key terms" },
                { id: "collection", label: "Information We Collect", note: "What we collect and why" },
                { id: "use", label: "How We Use Information", note: "Operational, safety, and compliance" },
                { id: "legal", label: "Legal Bases & Global Rights", note: "International privacy expectations" },
                { id: "sharing", label: "Sharing & Disclosures", note: "When we share and with whom" },
                { id: "security", label: "Security & Retention", note: "Protection, retention, deletion" },
                { id: "children", label: "Children & Vulnerable Persons", note: "Extra safeguards" },
                { id: "international", label: "International Transfers", note: "Cross-border data flows" },
                { id: "contact", label: "Contact & Requests", note: "Access, correction, deletion" },
            ]}
            crossRefs={[
                { href: "/policies/donor-privacy", label: "Donor Privacy" },
                { href: "/policies/cookies", label: "Cookies" },
                { href: "/policies/anti-fraud", label: "Anti-Fraud" },
            ]}
            quickCards={[
                { title: "We minimize data", body: "We collect the least amount needed to operate, protect users, and comply with law." },
                { title: "We protect donors", body: "Sensitive donor details are restricted and accessed only on a need-to-know basis." },
                { title: "We act against abuse", body: "We may use information to prevent fraud, scams, and misuse of humanitarian support." },
            ]}
        >
            <section id="scope" className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">1. Scope & Definitions</h2>
                <p className="text-black/75 leading-relaxed">
                    This Privacy Policy applies to visitors, donors, beneficiaries, volunteers, partners,
                    and any person interacting with our websites, forms, communications, and donation flows.
                    “Personal information” means data that can identify a person directly or indirectly.
                </p>
                <div className="steel rounded-2xl p-4 text-sm text-black/75 leading-relaxed">
                    <div className="font-semibold">Key definitions</div>
                    <ul className="mt-2 space-y-1">
                        <li>• <span className="font-semibold">Donor</span>: a person or organization providing funds or resources.</li>
                        <li>• <span className="font-semibold">Beneficiary</span>: a person receiving aid or support.</li>
                        <li>• <span className="font-semibold">Processing</span>: collecting, storing, using, sharing, or deleting data.</li>
                    </ul>
                </div>
            </section>

            <section id="collection" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">2. Information We Collect</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• <span className="font-semibold">Identity & contact</span>: name, email, phone (where needed for receipts, updates, verification, or support).</li>
                    <li>• <span className="font-semibold">Donation metadata</span>: amount, currency, timestamps, transaction references, payment status (processed by Stripe/Flutterwave).</li>
                    <li>• <span className="font-semibold">Communications</span>: messages you send to us, support requests, or reports of abuse.</li>
                    <li>• <span className="font-semibold">Technical data</span>: device/browser signals, IP-derived region (for security, fraud prevention, rate limiting).</li>
                    <li>• <span className="font-semibold">Program eligibility signals</span> (where relevant): limited information needed to deliver aid fairly and safely.</li>
                </ul>
                <div className="steel rounded-2xl p-4 text-sm text-black/75 leading-relaxed">
                    <div className="font-semibold">We avoid collecting:</div>
                    <div className="mt-1">
                        unnecessary sensitive details (e.g., health/biometrics) unless required by a program, consented to, and protected with strict access controls.
                    </div>
                </div>
            </section>

            <section id="use" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">3. How We Use Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="steel rounded-2xl p-4">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Operations</div>
                        <div className="mt-2 text-sm text-black/75 leading-relaxed">
                            Provide receipts, confirm donations, run programs, respond to inquiries, and manage donor/partner relationships.
                        </div>
                    </div>
                    <div className="steel rounded-2xl p-4">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Safety & Integrity</div>
                        <div className="mt-2 text-sm text-black/75 leading-relaxed">
                            Detect fraud, prevent scams, block laundering attempts, protect beneficiaries, and enforce our Anti-Fraud policy.
                        </div>
                    </div>
                    <div className="steel rounded-2xl p-4">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Compliance</div>
                        <div className="mt-2 text-sm text-black/75 leading-relaxed">
                            Meet lawful requests, maintain records for auditing, and comply with sanctions/AML requirements where applicable.
                        </div>
                    </div>
                    <div className="steel rounded-2xl p-4">
                        <div className="text-[11px] uppercase tracking-wide text-black/55">Improvements</div>
                        <div className="mt-2 text-sm text-black/75 leading-relaxed">
                            Improve usability, stability, and program effectiveness using aggregated insights (not personal profiling for harm).
                        </div>
                    </div>
                </div>
            </section>

            <section id="legal" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">4. Legal Bases & Global Rights</h2>
                <p className="text-black/75 leading-relaxed">
                    Depending on your region, our processing may rely on consent, contractual necessity,
                    legitimate interests (such as fraud prevention), and legal obligations.
                    We respect core privacy rights globally, including access, correction, deletion, and objection where applicable.
                </p>
                <ul className="text-black/75 leading-relaxed space-y-1">
                    <li>• Request access to your data</li>
                    <li>• Request correction of inaccurate data</li>
                    <li>• Request deletion (subject to legal/audit retention)</li>
                    <li>• Withdraw consent (where processing is based on consent)</li>
                </ul>
            </section>

            <section id="sharing" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">5. Sharing & Disclosures</h2>
                <p className="text-black/75 leading-relaxed">
                    We do not sell personal information. We may share limited data with:
                </p>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• <span className="font-semibold">Payment processors</span> (Stripe/Flutterwave) to process donations and manage disputes.</li>
                    <li>• <span className="font-semibold">Service providers</span> (hosting, email, analytics) under confidentiality and security controls.</li>
                    <li>• <span className="font-semibold">Authorities</span> when required by law, or to prevent harm/fraud.</li>
                </ul>
            </section>

            <section id="security" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">6. Security & Retention</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Access controls (least-privilege), audit logs where feasible</li>
                    <li>• Encryption in transit; encryption at rest where supported</li>
                    <li>• Retention only as long as needed for operations, compliance, and fraud defense</li>
                    <li>• Controlled deletion/archiving procedures</li>
                </ul>
            </section>

            <section id="children" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">7. Children & Vulnerable Persons</h2>
                <p className="text-black/75 leading-relaxed">
                    We apply extra safeguards when services impact children or vulnerable persons.
                    See <a className="underline" href="/policies/child-safeguarding">Child Safety</a> for prevention and reporting.
                </p>
            </section>

            <section id="international" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">8. International Transfers</h2>
                <p className="text-black/75 leading-relaxed">
                    We may process data in multiple countries due to hosting and service providers.
                    We use contractual and technical safeguards to protect data across borders.
                </p>
            </section>

            <section id="contact" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">9. Contact & Requests</h2>
                <p className="text-black/75 leading-relaxed">
                    For privacy requests (access/correction/deletion) or concerns, contact us via the website Contact page.
                    We may request verification to protect you from impersonation and fraud.
                </p>
            </section>
        </PolicyShell>
    );
}