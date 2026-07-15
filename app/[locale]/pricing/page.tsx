import { PricingPage } from "@/components/billing/pricing-page";
import type { Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const description =
    "Compare GoAI Free, Pro and Business plans for AI tools, playbooks, premium resources and global market insights.";

  return {
    title: "Pricing | GoAI",
    description,
    alternates: { canonical: `${siteUrl}/${locale}/pricing` },
    openGraph: { title: "Pricing | GoAI", description, url: `/${locale}/pricing`, type: "website" },
    twitter: { card: "summary_large_image", title: "Pricing | GoAI", description }
  };
}

export default async function PricingRoute({ params }: PageProps) {
  const { locale } = await params;
  return <PricingPage locale={locale} />;
}
