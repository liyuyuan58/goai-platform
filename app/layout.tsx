import "@/styles/globals.css";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";
import { GoogleAnalyticsTracker } from "@/components/analytics/google-analytics";
import { AuthProvider } from "@/components/auth/auth-provider";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "GoAI | Build Your Global Business with AI",
  description:
    "Discover AI tools, proven business playbooks and global market insights to find customers, enter new markets and grow internationally.",
  openGraph: {
    title: "GoAI | Build Your Global Business with AI",
    description:
      "Discover AI tools, proven business playbooks and global market insights to find customers, enter new markets and grow internationally.",
    siteName: "GoAI",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GoAI | Build Your Global Business with AI",
    description:
      "Discover AI tools, proven business playbooks and global market insights to find customers, enter new markets and grow internationally."
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/logo-icon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }]
  }
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
        inLanguage: "en"
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
          <script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            type="application/ld+json"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
