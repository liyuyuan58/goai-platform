import { MarketingPage } from "@/components/pages/marketing-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import { pageContent } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = pageContent.resources;

  return createSeoMetadata({
    canonicalPath: `/${locale}/resources`,
    description: content.description,
    keywords: ["AI resources", "templates", "business checklists"],
    locale,
    title: "Resources | GoAI"
  });
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale } = await params;
  return <MarketingPage locale={locale} {...pageContent.resources} />;
}
