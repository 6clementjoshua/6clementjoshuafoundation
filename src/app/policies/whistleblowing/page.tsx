// src/app/policies/whistleblowing/page.tsx
import PolicyShell from "../_components/PolicyShell";

export default function WhistleblowingPage() {
    return (
        <PolicyShell
            title="Whistleblowing Policy"
            subtitle="How to safely report misconduct, fraud, exploitation, bribery, diversion of aid, harassment, or policy violations—globally and confidentially."
            updatedISO="2026-02-01"
            badges={[
                { label: "Confidential reporting", tone: "good" },
                { label: "Anti-retaliation", tone: "good" },
                { label: "Investigation standards", tone: "neutral" },
            ]}
            toc={[
                { id: "what", label: "What to Report" },
                { id: "how", label: "How to Report" },
                { id: "confidential", label: "Confidentiality" },
                { id: "no-retaliation", label: "No Retaliation" },
                { id: "process", label: "Investigation Process" },
            ]}
            crossRefs={[
                { href: "/policies/anti-fraud", label: "Anti-Fraud" },
                { href: "/policies/transparency", label: "Transparency" },
                { href: "/policies/child-safeguarding", label: "Child Safety" },
            ]}
            quickCards={[
                { title: "Report safely", body: "Use official channels to avoid interception or impersonation." },
                { title: "Protected", body: "We prohibit retaliation against good-faith reports." },
                { title: "Action", body: "We document, investigate, and remediate when credible." },
            ]}
        >
            <section id="what" className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">1. What to Report</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Fraud, laundering, bribery, or diversion of aid</li>
                    <li>• Exploitation or harassment of beneficiaries</li>
                    <li>• Conflicts of interest, vendor kickbacks, or fake receipts</li>
                    <li>• Safeguarding violations involving children</li>
                </ul>
            </section>

            <section id="how" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">2. How to Report</h2>
                <p className="text-black/75 leading-relaxed">
                    Submit a report via our Contact page. Include dates, names (if known), and any evidence.
                    Avoid sharing sensitive personal data unless required.
                </p>
            </section>

            <section id="confidential" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">3. Confidentiality</h2>
                <p className="text-black/75 leading-relaxed">
                    We limit access to reports on a need-to-know basis. We may disclose information if legally required or to prevent harm.
                </p>
            </section>

            <section id="no-retaliation" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">4. No Retaliation</h2>
                <p className="text-black/75 leading-relaxed">
                    Retaliation against good-faith reporting is prohibited. Violators may be removed from programs/roles and escalated as appropriate.
                </p>
            </section>

            <section id="process" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">5. Investigation Process</h2>
                <p className="text-black/75 leading-relaxed">
                    We triage severity, preserve logs, review evidence, and take corrective action (suspension, refunds where applicable, vendor removal, reporting).
                </p>
            </section>
        </PolicyShell>
    );
}