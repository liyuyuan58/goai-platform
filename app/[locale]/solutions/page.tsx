import { MarketingPage } from "@/components/pages/marketing-page";
import type { Locale } from "@/lib/i18n";
import { pageContent, siteUrl } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = pageContent.solutions;

  return {
    title: "Solutions | GoAI",
    description: content.description,
    alternates: { canonical: `${siteUrl}/${locale}/solutions` },
    openGraph: {
      title: "Solutions | GoAI",
      description: content.description,
      url: `/${locale}/solutions`,
      type: "website"
    },
    twitter: { card: "summary_large_image", title: "Solutions | GoAI", description: content.description }
  };
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  return <MarketingPage locale={locale} {...pageContent.solutions} />;
}
