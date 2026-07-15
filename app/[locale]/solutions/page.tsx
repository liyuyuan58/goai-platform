import { MarketingPage } from "@/components/pages/marketing-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import { pageContent } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = pageContent.solutions;

  return createSeoMetadata({
    canonicalPath: `/${locale}/solutions`,
    description: content.description,
    keywords: ["AI solutions", "global business growth", "market entry"],
    locale,
    title: "Solutions | GoAI"
  });
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  return <MarketingPage locale={locale} {...pageContent.solutions} />;
}
