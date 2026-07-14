import { siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/en/admin", "/zh/admin", "/api/admin"]
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
