import { HeroSection } from "@/components/sections/hero-section";
import { HomepageV2Sections } from "@/components/sections/homepage-v2-sections";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getHomepageFeaturedTools } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

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
