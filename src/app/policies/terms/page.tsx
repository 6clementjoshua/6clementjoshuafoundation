// src/app/policies/terms/page.tsx
import PolicyShell from "../_components/PolicyShell";

export default function TermsPage() {
    return (
        <PolicyShell
            title="Terms of Service"
            subtitle="Rules for using our website, donation flows, and program interactions. Designed to protect donors and beneficiaries globally, prevent abuse, and define acceptable conduct."
            updatedISO="2026-02-01"
            badges={[
                { label: "Global use", tone: "neutral" },
                { label: "Anti-scam enforcement", tone: "good" },
                { label: "Program integrity", tone: "good" },
            ]}
            toc={[
                { id: "acceptance", label: "Acceptance & Eligibility" },
                { id: "donations", label: "Donations & Receipts" },
                { id: "conduct", label: "Acceptable Use" },
                { id: "ip", label: "Intellectual Property" },
                { id: "disclaimers", label: "Disclaimers" },
                { id: "limits", label: "Limitation of Liability" },
                { id: "termination", label: "Suspension & Termination" },
                { id: "law", label: "Governing Principles" },
                { id: "contact", label: "Contact" },
            ]}
            crossRefs={[
                { href: "/policies/refund", label: "Refunds" },
                { href: "/policies/anti-fraud", label: "Anti-Fraud" },
                { href: "/policies/transparency", label: "Transparency" },
            ]}
            quickCards={[
                { title: "No scams", body: "We actively block fraudulent, laundering, and impersonation activities." },
                { title: "Fair programs", body: "Aid decisions prioritize safety, eligibility, and impact—not manipulation." },
                { title: "Clear receipts", body: "Donation confirmations depend on processor status (Stripe/Flutterwave)." },
            ]}
        >
            <section id="acceptance" className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">1. Acceptance & Eligibility</h2>
                <p className="text-black/75 leading-relaxed">
                    By using our services, you agree to these Terms and our policies. You must not use the platform
                    to commit fraud, launder money, finance harm, exploit beneficiaries, or impersonate others.
                </p>
            </section>

            <section id="donations" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">2. Donations & Receipts</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Donations are processed by Stripe/Flutterwave and may be subject to their checks.</li>
                    <li>• Receipts are issued based on successful processor confirmation.</li>
                    <li>• We may request additional verification for high-risk or suspicious activity.</li>
                </ul>
            </section>

            <section id="conduct" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">3. Acceptable Use</h2>
                <div className="steel rounded-2xl p-4 text-sm text-black/75 leading-relaxed">
                    You must not:
                    <ul className="mt-2 space-y-1">
                        <li>• Run scams, phishing, or “fake fundraising” campaigns through our name</li>
                        <li>• Attempt laundering (layering, structuring, chargeback abuse)</li>
                        <li>• Harass, exploit, or endanger beneficiaries</li>
                        <li>• Submit false documents or impersonate any person/organization</li>
                    </ul>
                </div>
            </section>

            <section id="ip" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">4. Intellectual Property</h2>
                <p className="text-black/75 leading-relaxed">
                    Our brand, content, and materials are protected. You may not misuse them to mislead donors.
                </p>
            </section>

            <section id="disclaimers" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">5. Disclaimers</h2>
                <p className="text-black/75 leading-relaxed">
                    Humanitarian work operates in real-world conditions. We strive for accuracy and fairness, but cannot guarantee
                    outcomes in every situation (e.g., access constraints, security risks, emergencies).
                </p>
            </section>

            <section id="limits" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">6. Limitation of Liability</h2>
                <p className="text-black/75 leading-relaxed">
                    To the maximum extent allowed by law, we limit liability for indirect damages and events beyond our control.
                </p>
            </section>

            <section id="termination" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">7. Suspension & Termination</h2>
                <p className="text-black/75 leading-relaxed">
                    We may suspend or block access to protect donors/beneficiaries, to stop fraud, or to comply with legal requirements.
                </p>
            </section>

            <section id="law" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">8. Governing Principles</h2>
                <p className="text-black/75 leading-relaxed">
                    These Terms are written to apply globally. Where local law provides stronger consumer rights, those rights apply.
                </p>
            </section>

            <section id="contact" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">9. Contact</h2>
                <p className="text-black/75 leading-relaxed">
                    For support or legal questions, contact us via the Contact page. We may request verification to protect against impersonation.
                </p>
            </section>
        </PolicyShell>
    );
}