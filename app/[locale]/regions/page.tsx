import { MarketingPage } from "@/components/pages/marketing-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import { pageContent } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = pageContent.regions;

  return createSeoMetadata({
    canonicalPath: `/${locale}/regions`,
    description: content.description,
    keywords: ["global markets", "regions", "international expansion"],
    locale,
    title: "Regions | GoAI"
  });
}

export default async function RegionsPage({ params }: PageProps) {
  const { locale } = await params;
  return <MarketingPage locale={locale} {...pageContent.regions} />;
}
