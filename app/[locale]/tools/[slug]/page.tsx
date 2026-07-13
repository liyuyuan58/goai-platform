import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ToolCard } from "@/components/tools/tool-card";
import { ToolLogo } from "@/components/tools/tool-logo";
import { aiTools, getAiToolBySlug, getRelatedAiTools } from "@/lib/ai-tools";
import { locales, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => aiTools.map((tool) => ({ locale, slug: tool.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = getAiToolBySlug(slug);

  if (!tool) {
    return { title: "AI Tool Not Found | GoAI" };
  }

  const title = `${tool.name} | GoAI AI Tools`;
  const description = tool.shortDescription;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/${locale}/tools/${tool.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/tools/${tool.slug}`,
      type: "article"
    },
    twitter: { card: "summary_large_image", title, description }
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const tool = getAiToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedAiTools(tool);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: tool.category,
    description: tool.description,
    url: tool.website,
    offers: {
      "@type": "Offer",
      price: tool.pricing
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      bestRating: 5,
      ratingCount: 1
    }
  };

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="border-b border-border py-14 sm:py-18 lg:py-20">
          <div className="container-page">
            <Link
              className="focus-ring inline-flex rounded-md text-sm font-semibold text-brand"
              href={`/${locale}/tools`}
            >
              Back to AI Tools
            </Link>
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <ToolLogo size="lg" tool={tool} />
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  {tool.category}
                </p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">
                  {tool.name}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-secondary sm:text-xl sm:leading-8">
                  {tool.description}
                </p>
              </div>
              <aside className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
                <div className="grid gap-4 text-sm">
                  <InfoRow label="Website" value={tool.website} />
                  <InfoRow label="Pricing" value={tool.pricing} />
                  <InfoRow label="GoAI Rating" value={`${tool.rating.toFixed(1)}/5`} />
                </div>
                <a
                  className="focus-ring mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
                  href={tool.website}
                  rel="noreferrer"
                  target="_blank"
                >
                  Visit Website
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/45 py-14 sm:py-16">
          <div className="container-page grid gap-4 lg:grid-cols-3">
            <DetailPanel title="Features" items={tool.features} />
            <DetailPanel title="Pros" items={tool.pros} />
            <DetailPanel title="Cons" items={tool.cons} />
          </div>
        </section>

        <section className="border-b border-border py-14 sm:py-16">
          <div className="container-page">
            <div className="max-w-3xl rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                GoAI Review
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-primary">Best fit</h2>
              <p className="mt-4 text-base leading-7 text-secondary">{tool.review}</p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="container-page">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  Related Tools
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-primary">Explore next</h2>
              </div>
              <Link
                className="focus-ring rounded-md text-sm font-semibold text-brand"
                href={`/${locale}/tools`}
              >
                View all tools
              </Link>
            </div>
            <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((relatedTool) => (
                <ToolCard key={relatedTool.slug} locale={locale} tool={relatedTool} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border pb-4 last:border-b-0 last:pb-0">
      <span className="text-secondary">{label}</span>
      <span className="break-words font-semibold text-primary">{value}</span>
    </div>
  );
}

function DetailPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-6 text-secondary" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-growth" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
