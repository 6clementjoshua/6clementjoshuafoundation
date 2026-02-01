// src/app/policies/transparency/page.tsx
import PolicyShell from "../_components/PolicyShell";

export default function TransparencyPage() {
    return (
        <PolicyShell
            title="Transparency Policy"
            subtitle="How we report impact, manage funds, prevent misuse, and communicate honestly with donors and communities worldwide."
            updatedISO="2026-02-01"
            badges={[
                { label: "Impact reporting", tone: "good" },
                { label: "Fund integrity", tone: "good" },
                { label: "Global accountability", tone: "neutral" },
            ]}
            toc={[
                { id: "principles", label: "Transparency Principles" },
                { id: "funds", label: "Use of Funds" },
                { id: "reporting", label: "Updates & Reports" },
                { id: "partners", label: "Partners & Vendors" },
                { id: "errors", label: "Corrections & Mistakes" },
                { id: "privacy", label: "Privacy-Safe Reporting" },
            ]}
            crossRefs={[
                { href: "/policies/donor-privacy", label: "Donor Privacy" },
                { href: "/policies/anti-fraud", label: "Anti-Fraud" },
                { href: "/policies/privacy", label: "Privacy" },
            ]}
            quickCards={[
                { title: "Truthful updates", body: "We publish updates that are accurate, dated, and corrected when needed." },
                { title: "Privacy-safe", body: "We protect beneficiary identities while proving impact responsibly." },
                { title: "Vendor integrity", body: "We avoid conflicted spending and document procurement where feasible." },
            ]}
        >
            <section id="principles" className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">1. Transparency Principles</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Show impact without endangering beneficiaries</li>
                    <li>• Maintain clear records and audit trails where feasible</li>
                    <li>• Disclose major changes, delays, or constraints</li>
                </ul>
            </section>

            <section id="funds" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">2. Use of Funds</h2>
                <p className="text-black/75 leading-relaxed">
                    Funds are used for program delivery, logistics, compliance, and essential operations.
                    We use controls to prevent diversion, bribery, and conflicts of interest.
                </p>
            </section>

            <section id="reporting" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">3. Updates & Reports</h2>
                <div className="steel rounded-2xl p-4 text-sm text-black/75 leading-relaxed">
                    We aim to provide periodic updates including:
                    <ul className="mt-2 space-y-1">
                        <li>• Program milestones (what was funded and delivered)</li>
                        <li>• Regions served (generalized where needed for safety)</li>
                        <li>• Photos/receipts when safe and appropriate</li>
                    </ul>
                </div>
            </section>

            <section id="partners" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">4. Partners & Vendors</h2>
                <p className="text-black/75 leading-relaxed">
                    We use vendors and partners for logistics and delivery. We assess risks of fraud, diversion, and exploitation,
                    and may suspend relationships if integrity concerns arise.
                </p>
            </section>

            <section id="errors" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">5. Corrections & Mistakes</h2>
                <p className="text-black/75 leading-relaxed">
                    If we publish an incorrect update, we correct it with a date-stamped note.
                    We do not hide material errors that affect donor understanding.
                </p>
            </section>

            <section id="privacy" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">6. Privacy-Safe Reporting</h2>
                <p className="text-black/75 leading-relaxed">
                    We avoid exposing beneficiaries to retaliation, stigma, or targeting. We anonymize and generalize details as needed.
                </p>
            </section>
        </PolicyShell>
    );
}