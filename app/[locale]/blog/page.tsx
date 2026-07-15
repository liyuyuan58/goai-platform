import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsletterCta } from "@/components/sections/homepage-v2-sections";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const description = "Read GoAI notes about AI tools, playbooks and global business growth.";

  return createSeoMetadata({
    canonicalPath: `/${locale}/blog`,
    description,
    keywords: ["GoAI blog", "AI business", "global growth"],
    locale,
    title: "Blog | GoAI"
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="border-b border-border py-16 sm:py-20 lg:py-24">
          <div className="container-page max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Blog</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">
              Ideas for building global business with AI
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-secondary sm:text-xl sm:leading-8">
              Practical notes on tools, workflows, playbooks and market expansion.
            </p>
          </div>
        </section>
        <section className="border-b border-border bg-surface/45 py-16 sm:py-20">
          <div className="container-page grid gap-4">
            {blogPosts.map((post) => (
              <article
                className="rounded-3xl border border-border bg-surface p-6 shadow-sm"
                key={post.slug}
              >
                <p className="text-sm font-semibold text-secondary">{post.date}</p>
                <h2 className="mt-3 text-2xl font-semibold text-primary">{post.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-secondary">
                  {post.description}
                </p>
                <Link
                  className="focus-ring mt-5 inline-flex rounded-md text-sm font-semibold text-brand"
                  href={`/${locale}/blog/${post.slug}`}
                >
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </section>
        <NewsletterCta />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
