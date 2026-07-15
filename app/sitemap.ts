import { getPublishedTools } from "@/lib/cms-store";
import { blogPosts, pageContent, siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const locales = ["en", "zh"];
  const baseRoutes = ["", ...Object.keys(pageContent).map((slug) => `/${slug}`), "/about", "/blog", "/pricing"];
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const aiTools = await getPublishedTools();
  const toolRoutes = aiTools.map((tool) => `/tools/${tool.slug}`);

  const localizedRoutes = locales.flatMap((locale) =>
    [...baseRoutes, ...blogRoutes, ...toolRoutes].map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    }))
  );

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1
    },
    ...localizedRoutes
  ];
}
