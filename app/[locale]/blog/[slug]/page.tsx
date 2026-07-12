import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NewsletterCta } from "@/components/sections/homepage-v2-sections";
import type { Locale } from "@/lib/i18n";
import { blogPosts, siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return blogPosts.flatMap((post) => [
    { locale: "en", slug: post.slug },
    { locale: "zh", slug: post.slug }
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | GoAI`,
    description: post.description,
    alternates: { canonical: `${siteUrl}/${locale}/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | GoAI`,
      description: post.description,
      url: `/${locale}/blog/${post.slug}`,
      type: "article"
    },
    twitter: { card: "summary_large_image", title: `${post.title} | GoAI`, description: post.description }
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <article className="border-b border-border py-16 sm:py-20 lg:py-24">
          <div className="container-page max-w-3xl">
            <p className="text-sm font-semibold text-secondary">{post.date}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-primary sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-secondary sm:text-xl sm:leading-8">
              {post.description}
            </p>
            <div className="mt-10 space-y-6 rounded-3xl border border-border bg-surface p-6 text-base leading-8 text-secondary shadow-sm">
              <p>
                AI can help businesses reduce the friction of going global by supporting
                research, localization, customer discovery and repeatable operations.
              </p>
              <p>
                The best starting point is not a tool list. It is a clear business goal,
                a focused market hypothesis and a practical workflow that your team can
                repeat.
              </p>
              <p>
                GoAI is being built to organize these tools and methods around real global
                business outcomes.
              </p>
            </div>
          </div>
        </article>
        <NewsletterCta />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
