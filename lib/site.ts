import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export const siteUrl = siteConfig.url;

export type CardItem = {
  title: string;
  description: string;
  label?: string;
};

export type MarketingPageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: CardItem[];
};

export const pageContent: Record<string, MarketingPageContent> = {
  solutions: {
    slug: "solutions",
    eyebrow: "Solutions",
    title: "AI solutions for global business growth",
    description:
      "Explore practical solution tracks for finding customers, building trust, entering markets and scaling international operations.",
    cards: [
      {
        title: "Find Customers",
        description: "Use AI-assisted research and outreach workflows to identify new buyers."
      },
      {
        title: "Build Brand",
        description: "Shape positioning, proof and content for international audiences."
      },
      {
        title: "Enter New Markets",
        description: "Compare regional opportunities and plan a focused market entry path."
      },
      {
        title: "AI Sales",
        description: "Support lead research, qualification, messaging and follow-up."
      },
      {
        title: "AI Marketing",
        description: "Create localized campaigns, SEO plans and content operations."
      },
      {
        title: "Business Automation",
        description: "Streamline repeatable research, content and operations workflows."
      }
    ]
  },
  tools: {
    slug: "tools",
    eyebrow: "AI Tools",
    title: "AI tools for practical international execution",
    description:
      "A neutral starting list of widely used AI tools that can support research, content, product and business operations.",
    cards: [
      {
        title: "ChatGPT",
        description: "General-purpose AI assistant for research, drafting and workflow support."
      },
      {
        title: "Claude",
        description: "AI assistant often used for long-form writing, analysis and planning."
      },
      {
        title: "Gemini",
        description: "Google AI assistant for productivity, research and content tasks."
      },
      {
        title: "Perplexity",
        description: "AI research tool for exploring topics and source-backed summaries."
      },
      {
        title: "Cursor",
        description: "AI coding environment for building and improving software projects."
      },
      {
        title: "Canva",
        description: "Design platform with AI-assisted creative and marketing workflows."
      },
      {
        title: "Notion",
        description: "Workspace for documents, knowledge bases and lightweight project systems."
      },
      {
        title: "Hostinger",
        description: "Website hosting platform suitable for launching simple business websites."
      }
    ]
  },
  playbooks: {
    slug: "playbooks",
    eyebrow: "Playbooks",
    title: "Step-by-step playbooks for global execution",
    description:
      "Use concise workflows to move from idea to action across market validation, websites, outreach and sales.",
    cards: [
      {
        title: "Find Overseas Customers with AI",
        description: "A practical process for researching, qualifying and prioritizing prospects."
      },
      {
        title: "Build a Global Website",
        description: "Plan messaging, structure and launch steps for an international website."
      },
      {
        title: "LinkedIn Outreach",
        description: "Create a focused outreach workflow for global B2B relationship building."
      },
      {
        title: "Cold Email Framework",
        description: "Draft, test and improve outbound emails for new markets."
      }
    ]
  },
  regions: {
    slug: "regions",
    eyebrow: "Regions",
    title: "Regional market previews for global growth",
    description:
      "Start with high-level regional context before deciding where to invest deeper research and execution.",
    cards: [
      {
        title: "Middle East",
        description: "Explore fast-moving trade, services and digital business opportunities."
      },
      {
        title: "Europe",
        description: "Understand market differences, buyer expectations and trust requirements."
      },
      {
        title: "North America",
        description: "Review mature B2B channels and demand signals for growth planning."
      },
      {
        title: "Asia Pacific",
        description: "Map diverse market opportunities across high-growth economies."
      }
    ]
  },
  resources: {
    slug: "resources",
    eyebrow: "Resources",
    title: "Resources for building global business with AI",
    description:
      "Browse practical templates, prompts, checklists and directories for international business workflows.",
    cards: [
      {
        title: "Templates",
        description: "Reusable planning formats for market research, outreach and execution."
      },
      {
        title: "Prompt Library",
        description: "Prompt starters for research, localization, sales and marketing."
      },
      {
        title: "Checklists",
        description: "Simple launch and validation checklists for global business tasks."
      },
      {
        title: "Directories",
        description: "Curated lists for tools, channels, regions and growth resources."
      },
      {
        title: "Downloads",
        description: "Future downloadable assets for teams building international growth systems."
      }
    ]
  }
};

export const blogPosts = [
  {
    slug: "how-ai-helps-businesses-go-global",
    title: "How AI helps businesses go global",
    description:
      "A short overview of how AI can support market research, localization and international customer acquisition.",
    date: "2026-07-12"
  }
];

export function localizedPath(locale: Locale, path: string) {
  return `/${locale}${path}`;
}
