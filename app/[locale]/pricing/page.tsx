import { PricingPage } from "@/components/billing/pricing-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const description =
    "Compare GoAI Free, Pro and Business plans for AI tools, playbooks, premium resources and global market insights.";

  return createSeoMetadata({
    canonicalPath: `/${locale}/pricing`,
    description,
    keywords: ["GoAI pricing", "AI tools pricing", "AI business membership"],
    locale,
    title: "Pricing | GoAI"
  });
}

export default async function PricingRoute({ params }: PageProps) {
  const { locale } = await params;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "GoAI Membership",
    description:
      "GoAI plans for AI tools, playbooks, premium resources and global market insights.",
    brand: { "@type": "Brand", name: "GoAI" },
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", url: `${siteUrl}/${locale}/pricing` },
      { "@type": "Offer", name: "Pro", price: "19", priceCurrency: "USD", url: `${siteUrl}/${locale}/pricing` },
      { "@type": "Offer", name: "Business", price: "99", priceCurrency: "USD", url: `${siteUrl}/${locale}/pricing` }
    ]
  };

  return (
    <>
      <PricingPage locale={locale} />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </>
  );
}
