import { siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GoAI",
    short_name: "GoAI",
    description: "Build your global business with AI tools, playbooks and resources.",
    start_url: "/en",
    display: "standalone",
    background_color: "#F7F9FC",
    theme_color: "#3157D5",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" }
    ],
    scope: siteConfig.url
  };
}
