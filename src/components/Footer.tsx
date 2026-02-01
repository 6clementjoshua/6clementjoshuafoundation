// src/components/Footer.tsx
import Link from "next/link";
import { SITE } from "@/lib/site";

const policies = [
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

export default function Footer() {
    return (
        <footer className="mt-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="glass rounded-2xl px-4 sm:px-6 py-4">
                    {/* Policies (open in new tab – no back button) */}
                    <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
                        {policies.map((p) => (
                            <Link
                                key={p.href}
                                href={p.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="water-btn px-3 py-1.5 text-[12px] font-medium text-black/70 hover:text-black"
                            >
                                {p.label}
                            </Link>
                        ))}
                    </div>

                    {/* Trademark */}
                    <div className="mt-2 text-center text-[11px] text-black/40">
                        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}