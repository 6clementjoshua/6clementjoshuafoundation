// src/app/policies/donor-privacy/page.tsx
import PolicyShell from "../_components/PolicyShell";

export default function DonorPrivacyPage() {
    return (
        <PolicyShell
            title="Donor Privacy Policy"
            subtitle="Extra protections specifically for donors: how we handle donation identity, receipts, public recognition, and confidentiality across all jurisdictions."
            updatedISO="2026-02-01"
            badges={[
                { label: "Confidential handling", tone: "good" },
                { label: "No donor list sales", tone: "good" },
                { label: "Fraud prevention", tone: "neutral" },
            ]}
            toc={[
                { id: "principles", label: "Core Principles" },
                { id: "visibility", label: "Public Recognition & Anonymity" },
                { id: "processors", label: "Payment Processing" },
                { id: "sharing", label: "When We Share Donor Data" },
                { id: "security", label: "Security Controls" },
                { id: "requests", label: "Requests & Disputes" },
            ]}
            crossRefs={[
                { href: "/policies/privacy", label: "Privacy" },
                { href: "/policies/refund", label: "Refunds" },
                { href: "/policies/anti-fraud", label: "Anti-Fraud" },
            ]}
            quickCards={[
                { title: "Need-to-know access", body: "Only authorized staff/partners can access donor info when required for receipts, audits, or disputes." },
                { title: "Anonymity supported", body: "Donors can choose to remain anonymous in public reports (where feasible)." },
                { title: "Strict sharing rules", body: "We share donor data only for payments, compliance, or legal obligations." },
            ]}
        >
            <section id="principles" className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">1. Core Principles</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• We do not sell donor information.</li>
                    <li>• We minimize donor data collection to what is needed for receipts/compliance.</li>
                    <li>• We use donor data to protect donors from scams and impersonation attempts.</li>
                </ul>
            </section>

            <section id="visibility" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">2. Public Recognition & Anonymity</h2>
                <p className="text-black/75 leading-relaxed">
                    If we publish donor acknowledgements, we aim to support anonymity options. Some disclosures may still be required
                    for legal/audit purposes, but not for public display.
                </p>
            </section>

            <section id="processors" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">3. Payment Processing</h2>
                <p className="text-black/75 leading-relaxed">
                    Donations are processed via Stripe and Flutterwave. Payment details are handled by those processors under their
                    security and compliance obligations.
                </p>
            </section>

            <section id="sharing" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">4. When We Share Donor Data</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Processor dispute management (chargebacks, card verification, fraud claims)</li>
                    <li>• Compliance checks for sanctions/AML where applicable</li>
                    <li>• Legal obligations (court orders, lawful requests)</li>
                </ul>
            </section>

            <section id="security" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">5. Security Controls</h2>
                <div className="steel rounded-2xl p-4 text-sm text-black/75 leading-relaxed">
                    We use access restriction, logging where feasible, and secure storage. Donor identity is treated as high-sensitivity information.
                </div>
            </section>

            <section id="requests" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">6. Requests & Disputes</h2>
                <p className="text-black/75 leading-relaxed">
                    For receipt corrections, refunds (where permitted), or privacy requests, contact us. We may request verification
                    to prevent impersonation and “social engineering” attacks.
                </p>
            </section>
        </PolicyShell>
    );
}