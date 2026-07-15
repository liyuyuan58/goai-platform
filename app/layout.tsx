import "@/styles/globals.css";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";
import { ClarityTracker } from "@/components/analytics/clarity";
import { GoogleAnalyticsTracker } from "@/components/analytics/google-analytics";
import { AuthProvider } from "@/components/auth/auth-provider";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import type { Viewport } from "next";
import type { ReactNode } from "react";

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "GoAI | Build Your Global Business with AI",
  description:
    "Discover AI tools, proven business playbooks and global market insights to find customers, enter new markets and grow internationally.",
  keywords: ["AI tools", "global business", "AI playbooks", "market expansion", "GoAI"],
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: `${siteConfig.url}/en`,
      zh: `${siteConfig.url}/zh`
    }
  },
  verification: siteConfig.googleSiteVerification
    ? { google: siteConfig.googleSiteVerification }
    : undefined,
  openGraph: {
    title: "GoAI | Build Your Global Business with AI",
    description:
      "Discover AI tools, proven business playbooks and global market insights to find customers, enter new markets and grow internationally.",
    images: [{ url: `${siteConfig.url}${siteConfig.ogImage}`, width: 1200, height: 630 }],
    siteName: "GoAI",
    type: "website",
    url: siteConfig.url
  },
  twitter: {
    card: "summary_large_image",
    title: "GoAI | Build Your Global Business with AI",
    description:
      "Discover AI tools, proven business playbooks and global market insights to find customers, enter new markets and grow internationally.",
    images: [`${siteConfig.url}${siteConfig.ogImage}`]
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/logo-icon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }]
  },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#3157D5"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "GoAI",
        url: siteUrl,
        logo: `${siteUrl}/brand/logo-primary.svg`,
        slogan: "Go Global with AI",
        description: "Empowering every business to grow globally with AI."
      },
      {
        "@type": "WebSite",
        name: "GoAI",
        url: siteUrl,
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/en/tools?query={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <AnalyticsTracker />
          <GoogleAnalyticsTracker />
          <ClarityTracker />
          <script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            type="application/ld+json"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
