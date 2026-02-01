// src/app/policies/_components/PoliciesTopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
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

export default function PoliciesTopNav() {
    const pathname = usePathname();

    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {items.map((it) => {
                const active = pathname === it.href;
                return (
                    <Link
                        key={it.href}
                        href={it.href}
                        className={[
                            "rounded-full px-4 py-2 text-sm transition",
                            active
                                ? "glass-strong font-semibold"
                                : "glass hover:glass-strong text-black/70 hover:text-black",
                        ].join(" ")}
                    >
                        {it.label}
                    </Link>
                );
            })}
        </div>
    );
}