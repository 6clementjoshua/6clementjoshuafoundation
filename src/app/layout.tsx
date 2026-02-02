// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),

  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },

  description: SITE.description,
  applicationName: SITE.name,

  alternates: {
    canonical: "/",
  },

  /* 🔗 SOCIAL SHARING (LOGO WILL SHOW) */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${SITE.domain}`,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: "/og/og-foundation.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} – Official`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/og/og-foundation.png"],
  },

  /* 🖼 ICONS */
  icons: {
    icon: "/favicon.ico",
    apple: "/og/icon-512.png",
  },

  /* 🤖 SEO / ROBOTS */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-foundation text-black antialiased">
        {children}
      </body>
    </html>
  );
}