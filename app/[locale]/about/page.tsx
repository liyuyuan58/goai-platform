import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsletterCta } from "@/components/sections/homepage-v2-sections";
import { ButtonLink } from "@/components/ui/button-link";
import type { Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const description =
    "Learn what GoAI is, why it exists and how it helps businesses grow globally with AI.";

  return {
    title: "About | GoAI",
    description,
    alternates: { canonical: `${siteUrl}/${locale}/about` },
    openGraph: { title: "About | GoAI", description, url: `/${locale}/about`, type: "website" },
    twitter: { card: "summary_large_image", title: "About | GoAI", description }
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  const sections = [
    {
      title: "About GoAI",
      description:
        "GoAI is one platform for AI tools, global market intelligence, business playbooks and growth resources."
    },
    {
      title: "Mission",
      description: "Empowering every business to grow globally with AI."
    },
    {
      title: "Vision",
      description:
        "To make international growth more accessible, practical and AI-enabled for businesses of every size."
    },
    {
      title: "How GoAI Helps Businesses",
      description:
        "GoAI organizes solutions, AI tools, playbooks and regional resources around the business outcomes teams want to achieve."
    }
  ];

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="border-b border-border py-16 sm:py-20 lg:py-24">
          <div className="container-page max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">About</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">
              About GoAI
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-secondary sm:text-xl sm:leading-8">
              GoAI helps every business go global with AI by bringing tools, market
              intelligence, playbooks and growth resources into one platform.
            </p>
          </div>
        </section>
        <section className="border-b border-border bg-surface/45 py-16 sm:py-20">
          <div className="container-page grid gap-4 lg:grid-cols-2">
            {sections.map((section) => (
              <article
                className="rounded-3xl border border-border bg-surface p-6 shadow-sm"
                key={section.title}
              >
                <h2 className="text-2xl font-semibold text-primary">{section.title}</h2>
                <p className="mt-4 text-sm leading-6 text-secondary">{section.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="border-b border-border py-16 sm:py-20" id="contact">
          <div className="container-page rounded-[2rem] border border-border bg-surface p-8 shadow-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-primary">
              Connect with GoAI.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-secondary">
              Reach GoAI through email, LinkedIn, X or GitHub for product updates,
              partnerships and community conversations.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Email", value: "hello@goai.ai" },
                { label: "LinkedIn", value: "GoAI" },
                { label: "GitHub", value: "goai-platform" },
                { label: "X", value: "@goai" }
              ].map((item) => (
                <div
                  className="rounded-2xl border border-border bg-background p-4"
                  key={item.label}
                >
                  <p className="text-sm font-semibold text-primary">{item.label}</p>
                  <p className="mt-2 text-sm text-secondary">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <ButtonLink href={`/${locale}/resources`}>Explore resources</ButtonLink>
            </div>
          </div>
        </section>
        <section className="sr-only" id="privacy-policy">
          Privacy Policy
        </section>
        <section className="sr-only" id="terms-of-service">
          Terms of Service
        </section>
        <NewsletterCta />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
