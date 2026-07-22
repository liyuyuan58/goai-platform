import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsletterCta } from "@/components/sections/homepage-v2-sections";
import { ButtonLink } from "@/components/ui/button-link";
import { founderContact } from "@/lib/contact-config";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const description =
    "Learn what GoAI is, why it exists and how it helps businesses grow globally with AI.";

  return createSeoMetadata({
    canonicalPath: `/${locale}/about`,
    description,
    keywords: ["GoAI", "AI for global business", "contact GoAI"],
    locale,
    title: "About | GoAI"
  });
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
          <div className="container-page">
            <div className="mb-5 rounded-[2rem] border border-border bg-surface p-8 shadow-sm sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                    Founder Contact
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-primary">
                    Contact the Founder
                  </h2>
                  <p className="mt-4 max-w-2xl whitespace-pre-line text-base leading-7 text-secondary">
                    Have a question, partnership opportunity, or feedback?{"\n"}Feel free to
                    reach out. I'd be happy to connect.
                  </p>

                  <div className="mt-7 rounded-3xl border border-border bg-background p-5">
                    <p className="text-xl font-semibold text-primary">{founderContact.name}</p>
                    <p className="mt-1 text-sm font-semibold text-brand">{founderContact.title}</p>
                    <p className="mt-4 text-sm leading-6 text-secondary">
                      {founderContact.mission}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-border bg-background p-5">
                      <p className="text-sm font-semibold text-primary">📧 Email</p>
                      <a
                        className="focus-ring mt-3 inline-flex rounded-md text-sm font-semibold text-brand transition hover:text-primary"
                        href={`mailto:${founderContact.email}`}
                      >
                        {founderContact.email}
                      </a>
                    </div>
                    <div className="rounded-3xl border border-border bg-background p-5">
                      <p className="text-sm font-semibold text-primary">💬 WeChat</p>
                      <p className="mt-3 text-sm text-secondary">WeChat ID:</p>
                      <p className="mt-1 text-sm font-semibold text-primary">
                        {founderContact.wechatId}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-secondary">
                        {founderContact.wechatDescription}
                      </p>
                    </div>
                  </div>
                </div>

                <aside className="rounded-[2rem] border border-border bg-background p-6 text-center">
                  <div className="mx-auto w-full max-w-[220px] rounded-3xl border border-border bg-white p-4 shadow-sm">
                    <Image
                      alt={`WeChat QR code for ${founderContact.name}`}
                      className="h-auto w-full"
                      height={347}
                      sizes="(max-width: 640px) 70vw, 220px"
                      src={founderContact.wechatQrCode}
                      width={220}
                    />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-primary">
                    Scan to connect on WeChat
                  </p>

                  <div className="mt-7 text-left">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                      Business Inquiries
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {founderContact.businessAreas.map((area) => (
                        <span
                          className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-secondary"
                          key={area}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-7 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-secondary">
                    {founderContact.responseTime}
                  </p>
                </aside>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-sm sm:p-10">
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
                { label: "Contact", value: "hello@goaihub.xyz" },
                { label: "Feedback", value: "Share product ideas and launch feedback." },
                { label: "Suggest Tool", value: "Recommend an AI tool for the GoAI directory." },
                { label: "Business Inquiry", value: "Partnerships, media and commercial questions." }
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
          </div>
        </section>
        <section className="sr-only" id="privacy-policy">
          Privacy Policy
        </section>
        <section className="sr-only" id="terms-of-service">
          Terms of Service
        </section>
        <section className="sr-only" id="cookie-policy">
          Cookie Policy
        </section>
        <section className="sr-only" id="suggest-tool">
          Suggest Tool
        </section>
        <NewsletterCta />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
