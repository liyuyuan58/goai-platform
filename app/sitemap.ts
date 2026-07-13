import { aiTools } from "@/lib/ai-tools";
import { blogPosts, pageContent, siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const locales = ["en", "zh"];
  const baseRoutes = ["", ...Object.keys(pageContent).map((slug) => `/${slug}`), "/about", "/blog"];
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const toolRoutes = aiTools.map((tool) => `/tools/${tool.slug}`);

  return locales.flatMap((locale) =>
    [...baseRoutes, ...blogRoutes, ...toolRoutes].map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    }))
  );
}
