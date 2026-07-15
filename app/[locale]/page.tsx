import { HeroSection } from "@/components/sections/hero-section";
import { HomepageV2Sections } from "@/components/sections/homepage-v2-sections";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getHomepageFeaturedTools } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type HomePageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const title = "GoAI | Build Your Global Business with AI";
  const description =
    "Discover AI tools, proven business playbooks and global market insights to find customers, enter new markets and grow internationally.";

  return createSeoMetadata({
    canonicalPath: `/${locale}`,
    description,
    keywords: ["GoAI", "AI tools", "global business", "AI playbooks", "global markets"],
    locale,
    title,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const featuredTools = await getHomepageFeaturedTools();

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <HeroSection locale={locale} />
        <HomepageV2Sections featuredTools={featuredTools} locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
