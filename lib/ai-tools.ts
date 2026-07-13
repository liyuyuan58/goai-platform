export type AiToolCategory = {
  slug: string;
  label: string;
};

export type AiTool = {
  slug: string;
  name: string;
  categorySlug: string;
  category: string;
  shortDescription: string;
  pricing: string;
  rating: number;
  website: string;
  description: string;
  features: string[];
  pros: string[];
  cons: string[];
  review: string;
};

export const aiToolCategories: AiToolCategory[] = [
  { slug: "all", label: "All" },
  { slug: "ai-chatbots", label: "AI Chatbots" },
  { slug: "ai-coding", label: "AI Coding" },
  { slug: "ai-website-builders", label: "AI Website Builders" },
  { slug: "ai-automation", label: "AI Automation" },
  { slug: "ai-design", label: "AI Design" },
  { slug: "ai-video", label: "AI Video" },
  { slug: "ai-audio", label: "AI Audio" },
  { slug: "ai-marketing", label: "AI Marketing" },
  { slug: "ai-business", label: "AI Business" },
  { slug: "ai-productivity", label: "AI Productivity" }
];

export const aiTools: AiTool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    categorySlug: "ai-chatbots",
    category: "AI Chatbots",
    shortDescription: "General-purpose AI assistant for research, writing and business workflows.",
    pricing: "Free and paid plans",
    rating: 4.8,
    website: "https://chatgpt.com",
    description:
      "ChatGPT helps teams research markets, draft content, analyze information and build repeatable workflows for global business tasks.",
    features: ["Research support", "Writing assistance", "Data analysis", "Workflow ideation"],
    pros: ["Broad use cases", "Strong writing support", "Useful for fast market exploration"],
    cons: ["Outputs still need review", "Best results require clear prompts"],
    review:
      "A strong foundation tool for teams that need flexible AI support across research, content, sales and operations."
  },
  {
    slug: "claude",
    name: "Claude",
    categorySlug: "ai-chatbots",
    category: "AI Chatbots",
    shortDescription: "AI assistant for long-form writing, analysis and structured planning.",
    pricing: "Free and paid plans",
    rating: 4.7,
    website: "https://claude.ai",
    description:
      "Claude is useful for reviewing long documents, shaping strategy notes and producing polished business writing.",
    features: ["Long-form analysis", "Document review", "Business writing", "Planning support"],
    pros: ["Strong at structured writing", "Handles complex context well", "Good for strategy documents"],
    cons: ["Availability varies by region", "Requires human validation for factual claims"],
    review:
      "A high-quality assistant for companies creating plans, briefs, playbooks and international business content."
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    categorySlug: "ai-business",
    category: "AI Business",
    shortDescription: "AI research tool for source-backed answers and market exploration.",
    pricing: "Free and paid plans",
    rating: 4.6,
    website: "https://www.perplexity.ai",
    description:
      "Perplexity helps teams explore markets, competitors and trends with answers that are easier to trace back to sources.",
    features: ["Source-backed research", "Market exploration", "Competitive research", "Topic discovery"],
    pros: ["Good for fast research", "Source visibility", "Useful starting point for market intelligence"],
    cons: ["Sources still need judgment", "Not a replacement for primary research"],
    review:
      "A practical research layer for teams that need quick orientation before deeper market validation."
  },
  {
    slug: "cursor",
    name: "Cursor",
    categorySlug: "ai-coding",
    category: "AI Coding",
    shortDescription: "AI coding workspace for building and improving software projects.",
    pricing: "Free and paid plans",
    rating: 4.6,
    website: "https://www.cursor.com",
    description:
      "Cursor supports engineering teams with AI-assisted coding, refactoring and codebase navigation.",
    features: ["AI code editing", "Codebase Q&A", "Refactoring support", "Developer workflow assistance"],
    pros: ["Useful inside real codebases", "Speeds up common engineering tasks", "Good for product teams"],
    cons: ["Requires engineering review", "Best for teams with coding experience"],
    review:
      "A valuable tool for companies building software, internal tools or AI-enabled products for global markets."
  },
  {
    slug: "hostinger-ai-website-builder",
    name: "Hostinger AI Website Builder",
    categorySlug: "ai-website-builders",
    category: "AI Website Builders",
    shortDescription: "Website builder for launching simple business websites quickly.",
    pricing: "Paid plans",
    rating: 4.3,
    website: "https://www.hostinger.com",
    description:
      "Hostinger can help small businesses launch lightweight websites and landing pages without a large technical setup.",
    features: ["Website builder", "Hosting", "Templates", "AI-assisted setup"],
    pros: ["Fast launch path", "Beginner-friendly", "Useful for simple company sites"],
    cons: ["Less flexible than custom development", "Advanced workflows may need extra tools"],
    review:
      "A practical option for early-stage businesses that need to establish an international web presence quickly."
  },
  {
    slug: "zapier",
    name: "Zapier",
    categorySlug: "ai-automation",
    category: "AI Automation",
    shortDescription: "Automation platform for connecting apps and streamlining business workflows.",
    pricing: "Free and paid plans",
    rating: 4.5,
    website: "https://zapier.com",
    description:
      "Zapier helps teams automate repetitive work across sales, marketing, operations and customer workflows.",
    features: ["App integrations", "Workflow automation", "AI-assisted automation", "No-code setup"],
    pros: ["Large integration ecosystem", "Accessible to non-technical teams", "Good for operations workflows"],
    cons: ["Complex automations require planning", "Costs can grow with usage"],
    review:
      "A useful automation layer for global teams that want repeatable processes without building custom software first."
  },
  {
    slug: "canva",
    name: "Canva",
    categorySlug: "ai-design",
    category: "AI Design",
    shortDescription: "Design platform for marketing assets, presentations and brand content.",
    pricing: "Free and paid plans",
    rating: 4.5,
    website: "https://www.canva.com",
    description:
      "Canva helps business teams create branded visuals, sales materials and localized marketing assets.",
    features: ["Design templates", "Brand kits", "AI creative tools", "Presentation design"],
    pros: ["Easy for business users", "Strong template library", "Useful for international content production"],
    cons: ["Can feel template-heavy", "Advanced design control is limited"],
    review:
      "A strong creative operations tool for teams that need to produce global marketing assets quickly."
  },
  {
    slug: "runway",
    name: "Runway",
    categorySlug: "ai-video",
    category: "AI Video",
    shortDescription: "AI video creation and editing platform for creative teams.",
    pricing: "Free and paid plans",
    rating: 4.4,
    website: "https://runwayml.com",
    description:
      "Runway supports video generation, editing and creative experimentation for campaigns and product storytelling.",
    features: ["AI video generation", "Video editing", "Creative effects", "Asset production"],
    pros: ["Powerful creative workflows", "Useful for campaign concepts", "Good for rapid video testing"],
    cons: ["Output quality varies by prompt", "May require creative direction"],
    review:
      "A good fit for marketing teams exploring faster video production for international campaigns."
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    categorySlug: "ai-audio",
    category: "AI Audio",
    shortDescription: "AI voice platform for narration, localization and audio content.",
    pricing: "Free and paid plans",
    rating: 4.5,
    website: "https://elevenlabs.io",
    description:
      "ElevenLabs helps teams create voiceovers and audio assets that can support multilingual content workflows.",
    features: ["AI voice generation", "Voiceover production", "Audio localization", "Speech tools"],
    pros: ["High-quality voice output", "Useful for localization", "Good for content teams"],
    cons: ["Requires responsible usage", "Voice quality depends on setup and language"],
    review:
      "A capable audio tool for companies producing global training, marketing or product explanation content."
  },
  {
    slug: "semrush",
    name: "Semrush",
    categorySlug: "ai-marketing",
    category: "AI Marketing",
    shortDescription: "Marketing and SEO platform for visibility, keyword and competitor research.",
    pricing: "Paid plans",
    rating: 4.4,
    website: "https://www.semrush.com",
    description:
      "Semrush supports international SEO, competitor analysis and demand discovery for market expansion.",
    features: ["Keyword research", "Competitor analysis", "SEO tracking", "Content planning"],
    pros: ["Strong SEO dataset", "Useful for market demand signals", "Good for content strategy"],
    cons: ["Can be expensive for small teams", "Requires SEO knowledge to use well"],
    review:
      "A serious marketing intelligence tool for teams investing in organic growth across multiple markets."
  },
  {
    slug: "hubspot-ai",
    name: "HubSpot AI",
    categorySlug: "ai-business",
    category: "AI Business",
    shortDescription: "AI features inside HubSpot for sales, marketing and customer workflows.",
    pricing: "Varies by plan",
    rating: 4.3,
    website: "https://www.hubspot.com",
    description:
      "HubSpot AI helps teams improve CRM, content, sales and customer operations inside a broader growth platform.",
    features: ["CRM support", "Sales workflows", "Marketing assistance", "Customer operations"],
    pros: ["Works inside a mature CRM", "Good for sales and marketing teams", "Scales with business workflows"],
    cons: ["Best value for HubSpot users", "Setup complexity depends on team process"],
    review:
      "A relevant option for teams that want AI capabilities connected to their customer and growth operations."
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    categorySlug: "ai-productivity",
    category: "AI Productivity",
    shortDescription: "AI-powered workspace for notes, docs, knowledge bases and team planning.",
    pricing: "Varies by plan",
    rating: 4.4,
    website: "https://www.notion.so/product/ai",
    description:
      "Notion AI helps teams organize documents, summarize knowledge and create lightweight operating systems.",
    features: ["AI writing", "Knowledge organization", "Summaries", "Team documentation"],
    pros: ["Good for team knowledge", "Flexible workspace", "Useful for playbooks and operating docs"],
    cons: ["Needs structure to avoid clutter", "Advanced reporting requires other tools"],
    review:
      "A useful productivity layer for keeping global business research, playbooks and decisions organized."
  }
];

export function getAiToolBySlug(slug: string) {
  return aiTools.find((tool) => tool.slug === slug);
}

export function getRelatedAiTools(tool: AiTool, limit = 3) {
  const sameCategory = aiTools.filter(
    (candidate) => candidate.slug !== tool.slug && candidate.categorySlug === tool.categorySlug
  );
  const fallback = aiTools.filter(
    (candidate) => candidate.slug !== tool.slug && candidate.categorySlug !== tool.categorySlug
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

export function filterAiTools(tools: AiTool[], query: string, categorySlug: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return tools.filter((tool) => {
    const matchesCategory = categorySlug === "all" || tool.categorySlug === categorySlug;
    const searchableText = [
      tool.name,
      tool.category,
      tool.shortDescription,
      tool.pricing,
      tool.description
    ]
      .join(" ")
      .toLowerCase();

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
}
