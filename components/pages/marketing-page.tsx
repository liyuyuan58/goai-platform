import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsletterCta } from "@/components/sections/homepage-v2-sections";
import type { CardItem } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

type MarketingPageProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  cards: CardItem[];
};

export function MarketingPage({
  locale,
  eyebrow,
  title,
  description,
  cards
}: MarketingPageProps) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="border-b border-border py-16 sm:py-20 lg:py-24">
          <div className="container-page max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-secondary sm:text-xl sm:leading-8">
              {description}
            </p>
          </div>
        </section>
        <section className="border-b border-border bg-surface/45 py-16 sm:py-20">
          <div className="container-page">
            <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card, index) => (
                <article
                  className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft"
                  key={card.title}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-sm font-bold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="text-xl font-semibold text-primary">{card.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-secondary">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <NewsletterCta />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
