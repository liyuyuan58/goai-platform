import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ToolsDirectory } from "@/components/tools/tools-directory";
import { aiToolCategories, aiTools } from "@/lib/ai-tools";
import type { Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

const title = "AI Tools | GoAI";
const description = "Discover the world's best AI tools for global business growth.";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/${locale}/tools` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/tools`,
      type: "website"
    },
    twitter: { card: "summary_large_image", title, description }
  };
}

export default async function ToolsPage({ params }: PageProps) {
  const { locale } = await params;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GoAI AI Tools Directory",
    description,
    itemListElement: aiTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/${locale}/tools/${tool.slug}`,
      name: tool.name
    }))
  };

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="border-b border-border py-16 sm:py-20 lg:py-24">
          <div className="container-page max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              GoAI Directory
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">
              AI Tools
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-secondary sm:text-xl sm:leading-8">
              {description}
            </p>
          </div>
        </section>
        <ToolsDirectory categories={aiToolCategories} locale={locale} tools={aiTools} />
      </main>
      <SiteFooter locale={locale} />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </>
  );
}
