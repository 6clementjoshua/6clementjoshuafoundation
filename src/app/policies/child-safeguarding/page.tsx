// src/app/policies/child-safeguarding/page.tsx
import PolicyShell from "../_components/PolicyShell";

export default function ChildSafeguardingPage() {
    return (
        <PolicyShell
            title="Child Safety & Safeguarding Policy"
            subtitle="Protecting children and vulnerable persons in all programs and interactions. This policy defines prevention, reporting, and response standards globally."
            updatedISO="2026-02-01"
            badges={[
                { label: "Zero tolerance", tone: "good" },
                { label: "Mandatory reporting where required", tone: "neutral" },
                { label: "Privacy-safe handling", tone: "good" },
            ]}
            toc={[
                { id: "principles", label: "Principles" },
                { id: "prohibited", label: "Prohibited Conduct" },
                { id: "screening", label: "Staff/Volunteer Expectations" },
                { id: "report", label: "Reporting & Response" },
                { id: "privacy", label: "Privacy & Dignity" },
            ]}
            crossRefs={[
                { href: "/policies/whistleblowing", label: "Whistleblowing" },
                { href: "/policies/privacy", label: "Privacy" },
                { href: "/policies/anti-fraud", label: "Anti-Fraud" },
            ]}
            quickCards={[
                { title: "Safety first", body: "Programs must never expose children to harm, exploitation, or stigma." },
                { title: "Clear reporting", body: "We investigate and escalate credible concerns fast and responsibly." },
                { title: "Dignity", body: "We avoid publishing identifying information about children." },
            ]}
        >
            <section id="principles" className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">1. Principles</h2>
                <ul className="text-black/75 leading-relaxed space-y-2">
                    <li>• Zero tolerance for exploitation, abuse, or harmful conduct</li>
                    <li>• Safeguarding is everyone’s responsibility</li>
                    <li>• Survivor-centered, privacy-respecting response</li>
                </ul>
            </section>

            <section id="prohibited" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">2. Prohibited Conduct</h2>
                <div className="steel rounded-2xl p-4 text-sm text-black/75 leading-relaxed">
                    Any grooming, exploitation, harassment, coercion, or misuse of power is prohibited.
                    Violations result in immediate restriction and escalation where required by law.
                </div>
            </section>

            <section id="screening" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">3. Staff/Volunteer Expectations</h2>
                <p className="text-black/75 leading-relaxed">
                    We may implement screening, training, and supervision proportional to the program risk level.
                </p>
            </section>

            <section id="report" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">4. Reporting & Response</h2>
                <p className="text-black/75 leading-relaxed">
                    Report safeguarding concerns via our Contact page. We prioritize safety, rapid review, and escalation to appropriate channels where required.
                </p>
            </section>

            <section id="privacy" className="mt-8 space-y-3">
                <h2 className="font-display text-2xl font-semibold">5. Privacy & Dignity</h2>
                <p className="text-black/75 leading-relaxed">
                    We do not publish identifying information about children. We generalize details in impact reporting to prevent targeting or stigma.
                </p>
            </section>
        </PolicyShell>
    );
}