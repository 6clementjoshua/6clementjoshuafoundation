// src/components/PolicyExternalLink.tsx
import Link from "next/link";

export default function PolicyExternalLink({
    href,
    children,
    className,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Link href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {children}
        </Link>
    );
}