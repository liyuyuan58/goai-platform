import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

type SeoInput = {
  canonicalPath: string;
  description: string;
  keywords?: string[];
  locale: string;
  publishedTime?: string;
  title: string;
  type?: "article" | "website";
  updatedTime?: string;
};

export function createSeoMetadata({
  canonicalPath,
  description,
  keywords,
  locale,
  publishedTime,
  title,
  type = "website",
  updatedTime
}: SeoInput): Metadata {
  const canonical = `${siteConfig.url}${canonicalPath}`;
  const image = `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: canonicalPath.replace(`/${locale}`, "/en"),
        zh: canonicalPath.replace(`/${locale}`, "/zh")
      }
    },
    authors: [{ name: "GoAI" }],
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: "GoAI" }],
      locale,
      publishedTime,
      siteName: siteConfig.name,
      type,
      url: canonical,
      modifiedTime: updatedTime
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      description,
      images: [image],
      title
    }
  };
}
