import { MarketingPage } from "@/components/pages/marketing-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import { pageContent } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = pageContent.playbooks;

  return createSeoMetadata({
    canonicalPath: `/${locale}/playbooks`,
    description: content.description,
    keywords: ["AI playbooks", "global business workflows", "market validation"],
    locale,
    title: "Playbooks | GoAI"
  });
}

export default async function PlaybooksPage({ params }: PageProps) {
  const { locale } = await params;
  return <MarketingPage locale={locale} {...pageContent.playbooks} />;
}
