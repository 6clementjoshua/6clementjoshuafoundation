// src/app/policies/refund/page.tsx
import PolicyShell from "../_components/PolicyShell";

export default function RefundPolicyPage() {
    return (
        <PolicyShell
            title="Refund Policy"
            subtitle="Clear rules for refunds, chargebacks, duplicate donations, and fraud cases—written for international donors across all currencies and regions."
            updatedISO="2026-02-01"
            badges={[
                { label: "Chargeback-aware", tone: "good" },
                { label: "Fraud-first response", tone: "good" },
                { label: "Global donors", tone: "neutral" },
            ]}
            toc={[
                { id: "general", label: "General Rule" },
                { id: "eligible", label: "Eligible Refund Scenarios" },
                { id: "ineligible", label: "Ineligible Scenarios" },
                { id: "process", label: "How Refunds Work" },
                { id: "chargebacks", label: "Chargebacks & Disputes" },
                { id: "fraud", label: "Fraud & Suspicious Activity" },
            ]}
            crossRefs={[
                { href: "/policies/terms", label: "Terms" },
                { href: "/policies/anti-fraud", label: "Anti-Fraud" },
                { href: "/policies/transparency", label: "Transparency" },
            ]}
            quickCards={[
                { title: "Duplicates", body: "We prioritize correcting accidental duplicate donations." },
                { title: "Processor rules", body: "Refund timing depends on Stripe/Flutterwave processing and banks." },
                { title: "Fraud blocks", body: "We may pause action if we suspect laundering, scams, or identity theft." },
            ]}
        >
            <section id="general" className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">1. General Rule</h2>
                <p className="text-black/75 leading-relaxed">
                    Donations may be non-refundable once allocated or used for humanitarian activity. However, we review requests fairly,
                    especially for mistakes, duplicates, or unauthorized payments, subject to legal and processor constraints.
                </p>
            </section>

            <section id="eligible" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">2. Eligible Refund Scenarios</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Duplicate donation (same donor, same amount, near-same time)</li>
                    <li>• Obvious donation amount error (e.g., extra zero)</li>
                    <li>• Unauthorized payment (credible evidence required)</li>
                    <li>• Processor technical error resulting in incorrect capture</li>
                </ul>
            </section>

            <section id="ineligible" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">3. Ineligible Scenarios</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Donation already fully allocated or delivered to programs</li>
                    <li>• Change of mind after confirmation (unless required by local law)</li>
                    <li>• Requests linked to abusive behavior, laundering, or scam patterns</li>
                </ul>
            </section>

            <section id="process" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">4. How Refunds Work</h2>
                <p className="text-black/75 leading-relaxed">
                    If approved, refunds are issued back to the original payment method through Stripe/Flutterwave. Banks may take time to post credits.
                    We may request verification to prevent fraud.
                </p>
            </section>

            <section id="chargebacks" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">5. Chargebacks & Disputes</h2>
                <p className="text-black/75 leading-relaxed">
                    Chargebacks are handled through the processor dispute system. We may provide transaction logs, confirmations, and communications as evidence.
                    Fraudulent chargebacks may lead to restriction and reporting where legally appropriate.
                </p>
            </section>

            <section id="fraud" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">6. Fraud & Suspicious Activity</h2>
                <p className="text-black/75 leading-relaxed">
                    If we suspect money laundering, structuring, stolen cards, impersonation, or scam activity, we may delay or deny refunds while investigating,
                    and may report to processors or authorities as required.
                </p>
            </section>
        </PolicyShell>
    );
}