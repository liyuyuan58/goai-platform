import { MarketingPage } from "@/components/pages/marketing-page";
import type { Locale } from "@/lib/i18n";
import { pageContent, siteUrl } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = pageContent.tools;

  return {
    title: "AI Tools | GoAI",
    description: content.description,
    alternates: { canonical: `${siteUrl}/${locale}/tools` },
    openGraph: {
      title: "AI Tools | GoAI",
      description: content.description,
      url: `/${locale}/tools`,
      type: "website"
    },
    twitter: { card: "summary_large_image", title: "AI Tools | GoAI", description: content.description }
  };
}

export default async function ToolsPage({ params }: PageProps) {
  const { locale } = await params;
  return <MarketingPage locale={locale} {...pageContent.tools} />;
}
