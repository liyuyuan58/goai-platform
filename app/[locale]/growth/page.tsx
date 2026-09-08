import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GrowthCopilot } from "@/components/growth/growth-copilot";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createSeoMetadata({
    canonicalPath: `/${locale}/growth`,
    description: "Build a personalized AI-powered global growth plan for your business, target market and expansion goals.",
    keywords: ["AI global growth", "market entry strategy", "international expansion", "GoAI Growth Copilot"],
    locale,
    title: "GoAI Growth Copilot | Build Your Global Growth Plan"
  });
}

export default async function GrowthPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="min-h-screen border-b border-border bg-background">
        <section className="container-page py-10 sm:py-14">
          <GrowthCopilot locale={locale} />
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
