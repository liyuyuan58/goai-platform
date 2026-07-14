export type AiToolCategory = {
  slug: string;
  label: string;
};

export type AiTool = {
  slug: string;
  name: string;
  categorySlug: string;
  category: string;
  logo: string;
  logoAlt: string;
  shortDescription: string;
  pricing: string;
  rating: number;
  website: string;
  overview: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  platform: string[];
  languages: string[];
  api: string;
  lastUpdated: string;
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

const lastUpdated = "2026-07-13";

export const aiTools: AiTool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    categorySlug: "ai-chatbots",
    category: "AI Chatbots",
    logo: "/brand/tools/chatgpt.png",
    logoAlt: "OpenAI official logo",
    shortDescription: "General-purpose AI assistant for research, writing and business workflows.",
    pricing: "Free and paid plans",
    rating: 4.8,
    website: "https://chatgpt.com",
    overview:
      "ChatGPT helps teams research markets, draft content, analyze information and build repeatable workflows for global business tasks.",
    features: ["Research support", "Writing assistance", "Data analysis", "Workflow ideation"],
    pros: ["Broad use cases", "Strong writing support", "Useful for fast market exploration"],
    cons: ["Outputs still need review", "Best results require clear prompts"],
    bestFor: ["Market research", "Content drafting", "Sales enablement", "General productivity"],
    platform: ["Web", "iOS", "Android", "Desktop"],
    languages: ["Multilingual"],
    api: "Available through OpenAI API",
    lastUpdated,
    review:
      "A strong foundation tool for teams that need flexible AI support across research, content, sales and operations."
  },
  {
    slug: "claude",
    name: "Claude",
    categorySlug: "ai-chatbots",
    category: "AI Chatbots",
    logo: "/brand/tools/claude.png",
    logoAlt: "Anthropic Claude official logo",
    shortDescription: "AI assistant for long-form writing, analysis and structured planning.",
    pricing: "Free and paid plans",
    rating: 4.7,
    website: "https://claude.ai",
    overview:
      "Claude is useful for reviewing long documents, shaping strategy notes and producing polished business writing.",
    features: ["Long-form analysis", "Document review", "Business writing", "Planning support"],
    pros: ["Strong at structured writing", "Handles complex context well", "Good for strategy documents"],
    cons: ["Availability varies by region", "Requires human validation for factual claims"],
    bestFor: ["Strategy documents", "Long-form analysis", "Policy review", "Team planning"],
    platform: ["Web", "iOS", "Android"],
    languages: ["Multilingual"],
    api: "Available through Anthropic API",
    lastUpdated,
    review:
      "A high-quality assistant for companies creating plans, briefs, playbooks and international business content."
  },
  {
    slug: "gemini",
    name: "Gemini",
    categorySlug: "ai-chatbots",
    category: "AI Chatbots",
    logo: "/brand/tools/gemini.png",
    logoAlt: "Google Gemini official logo",
    shortDescription: "Google AI assistant for search, productivity and multimodal tasks.",
    pricing: "Free and paid plans",
    rating: 4.5,
    website: "https://gemini.google.com",
    overview:
      "Gemini connects Google's AI capabilities with research, content and productivity workflows for business users.",
    features: ["AI chat", "Multimodal assistance", "Google ecosystem support", "Research workflows"],
    pros: ["Useful with Google products", "Good multimodal direction", "Accessible to broad teams"],
    cons: ["Feature availability can vary", "Business workflows may need additional setup"],
    bestFor: ["Google Workspace users", "Research", "Content support", "Productivity"],
    platform: ["Web", "iOS", "Android"],
    languages: ["Multilingual"],
    api: "Available through Google AI developer platforms",
    lastUpdated,
    review:
      "A practical AI assistant for teams already working in Google's productivity and research ecosystem."
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    categorySlug: "ai-business",
    category: "AI Business",
    logo: "/brand/tools/perplexity.png",
    logoAlt: "Perplexity official logo",
    shortDescription: "AI research tool for source-backed answers and market exploration.",
    pricing: "Free and paid plans",
    rating: 4.6,
    website: "https://www.perplexity.ai",
    overview:
      "Perplexity helps teams explore markets, competitors and trends with answers that are easier to trace back to sources.",
    features: ["Source-backed research", "Market exploration", "Competitive research", "Topic discovery"],
    pros: ["Good for fast research", "Source visibility", "Useful starting point for market intelligence"],
    cons: ["Sources still need judgment", "Not a replacement for primary research"],
    bestFor: ["Market discovery", "Competitive research", "Trend monitoring", "Executive briefs"],
    platform: ["Web", "iOS", "Android"],
    languages: ["Multilingual"],
    api: "API availability varies by plan and product access",
    lastUpdated,
    review:
      "A practical research layer for teams that need quick orientation before deeper market validation."
  },
  {
    slug: "cursor",
    name: "Cursor",
    categorySlug: "ai-coding",
    category: "AI Coding",
    logo: "/brand/tools/cursor.png",
    logoAlt: "Cursor official logo",
    shortDescription: "AI coding workspace for building and improving software projects.",
    pricing: "Free and paid plans",
    rating: 4.6,
    website: "https://www.cursor.com",
    overview:
      "Cursor supports engineering teams with AI-assisted coding, refactoring and codebase navigation.",
    features: ["AI code editing", "Codebase Q&A", "Refactoring support", "Developer workflow assistance"],
    pros: ["Useful inside real codebases", "Speeds up common engineering tasks", "Good for product teams"],
    cons: ["Requires engineering review", "Best for teams with coding experience"],
    bestFor: ["Software teams", "Internal tools", "AI product development", "Codebase maintenance"],
    platform: ["Desktop"],
    languages: ["Programming languages"],
    api: "No public product API required for core editor use",
    lastUpdated,
    review:
      "A valuable tool for companies building software, internal tools or AI-enabled products for global markets."
  },
  {
    slug: "grok",
    name: "Grok",
    categorySlug: "ai-chatbots",
    category: "AI Chatbots",
    logo: "/brand/tools/grok.png",
    logoAlt: "Grok official logo",
    shortDescription: "AI assistant from xAI for real-time conversation and research workflows.",
    pricing: "Varies by plan",
    rating: 4.3,
    website: "https://x.ai",
    overview:
      "Grok is an AI assistant designed for conversational support, research and information workflows connected to the xAI ecosystem.",
    features: ["AI chat", "Research support", "Real-time information workflows", "Content assistance"],
    pros: ["Useful for current-topic exploration", "Fast conversational workflow", "Strong brand momentum"],
    cons: ["Access may depend on product plan", "Business workflow maturity is still evolving"],
    bestFor: ["Research", "Social trend monitoring", "Fast ideation", "Content teams"],
    platform: ["Web", "Mobile"],
    languages: ["Multilingual"],
    api: "Available through xAI developer platform where supported",
    lastUpdated,
    review:
      "A relevant assistant to watch for teams that care about current information, social context and rapid ideation."
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    categorySlug: "ai-design",
    category: "AI Design",
    logo: "/brand/tools/midjourney.png",
    logoAlt: "Midjourney official logo",
    shortDescription: "AI image generation tool for concept visuals and creative exploration.",
    pricing: "Paid plans",
    rating: 4.6,
    website: "https://www.midjourney.com",
    overview:
      "Midjourney helps teams create high-quality concept imagery, visual directions and campaign explorations.",
    features: ["AI image generation", "Creative direction", "Visual concepting", "Style exploration"],
    pros: ["High visual quality", "Strong creative range", "Good for campaign ideation"],
    cons: ["Requires prompt craft", "Production usage needs brand and legal review"],
    bestFor: ["Creative teams", "Campaign concepts", "Brand exploration", "Product visuals"],
    platform: ["Web", "Discord"],
    languages: ["Prompt-based"],
    api: "Public API availability is limited",
    lastUpdated,
    review:
      "A premium creative tool for teams that need polished visual directions before final production."
  },
  {
    slug: "lovable",
    name: "Lovable",
    categorySlug: "ai-website-builders",
    category: "AI Website Builders",
    logo: "/brand/tools/lovable.png",
    logoAlt: "Lovable official logo",
    shortDescription: "AI app builder for turning product ideas into working web applications.",
    pricing: "Free and paid plans",
    rating: 4.4,
    website: "https://lovable.dev",
    overview:
      "Lovable helps founders and teams generate web apps from product prompts, making it easier to validate ideas quickly.",
    features: ["AI app generation", "Frontend development", "Product prototyping", "Iteration workflows"],
    pros: ["Fast prototyping", "Accessible to non-engineers", "Useful for MVP validation"],
    cons: ["Complex apps still need engineering", "Generated code needs review before production"],
    bestFor: ["Founders", "MVPs", "Internal tools", "Prototype validation"],
    platform: ["Web"],
    languages: ["English"],
    api: "No public API required for core builder workflow",
    lastUpdated,
    review:
      "A useful launch tool for teams that want to test product ideas before investing in a larger build."
  },
  {
    slug: "bolt",
    name: "Bolt",
    categorySlug: "ai-coding",
    category: "AI Coding",
    logo: "/brand/tools/bolt.png",
    logoAlt: "Bolt official logo",
    shortDescription: "AI coding environment for building web apps directly in the browser.",
    pricing: "Free and paid plans",
    rating: 4.4,
    website: "https://bolt.new",
    overview:
      "Bolt helps users create, edit and run web applications from a browser-based AI development environment.",
    features: ["Browser coding", "AI app generation", "Live preview", "Frontend development"],
    pros: ["Fast setup", "Good for web prototypes", "No local environment required"],
    cons: ["Advanced production apps need deeper engineering", "Usage limits can matter for larger projects"],
    bestFor: ["Web prototypes", "Landing pages", "MVPs", "Developer acceleration"],
    platform: ["Web"],
    languages: ["Programming languages"],
    api: "No public API required for core builder workflow",
    lastUpdated,
    review:
      "A strong option for teams that need quick web app prototypes and lightweight product experiments."
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    categorySlug: "ai-coding",
    category: "AI Coding",
    logo: "/brand/tools/windsurf.png",
    logoAlt: "Windsurf official logo",
    shortDescription: "AI coding editor for software teams and agentic development workflows.",
    pricing: "Free and paid plans",
    rating: 4.4,
    website: "https://windsurf.com",
    overview:
      "Windsurf provides an AI coding environment for developers who want assisted editing, context-aware workflows and faster iteration.",
    features: ["AI code editing", "Agentic workflows", "Codebase assistance", "Developer productivity"],
    pros: ["Developer-focused", "Good for iterative coding", "Useful for product engineering teams"],
    cons: ["Requires technical review", "Best value for active software teams"],
    bestFor: ["Software teams", "AI-assisted development", "Refactoring", "Product iteration"],
    platform: ["Desktop"],
    languages: ["Programming languages"],
    api: "No public product API required for core editor use",
    lastUpdated,
    review:
      "A useful AI coding option for teams comparing next-generation development environments."
  },
  {
    slug: "hostinger-ai-website-builder",
    name: "Hostinger AI Website Builder",
    categorySlug: "ai-website-builders",
    category: "AI Website Builders",
    logo: "/brand/tools/hostinger.png",
    logoAlt: "Hostinger official logo",
    shortDescription: "Website builder for launching simple business websites quickly.",
    pricing: "Paid plans",
    rating: 4.3,
    website: "https://www.hostinger.com",
    overview:
      "Hostinger can help small businesses launch lightweight websites and landing pages without a large technical setup.",
    features: ["Website builder", "Hosting", "Templates", "AI-assisted setup"],
    pros: ["Fast launch path", "Beginner-friendly", "Useful for simple company sites"],
    cons: ["Less flexible than custom development", "Advanced workflows may need extra tools"],
    bestFor: ["Small businesses", "Landing pages", "Company sites", "Early web presence"],
    platform: ["Web"],
    languages: ["Multilingual"],
    api: "Hosting APIs and integrations vary by product",
    lastUpdated,
    review:
      "A practical option for early-stage businesses that need to establish an international web presence quickly."
  },
  {
    slug: "zapier",
    name: "Zapier",
    categorySlug: "ai-automation",
    category: "AI Automation",
    logo: "/brand/tools/zapier.png",
    logoAlt: "Zapier official logo",
    shortDescription: "Automation platform for connecting apps and streamlining business workflows.",
    pricing: "Free and paid plans",
    rating: 4.5,
    website: "https://zapier.com",
    overview:
      "Zapier helps teams automate repetitive work across sales, marketing, operations and customer workflows.",
    features: ["App integrations", "Workflow automation", "AI-assisted automation", "No-code setup"],
    pros: ["Large integration ecosystem", "Accessible to non-technical teams", "Good for operations workflows"],
    cons: ["Complex automations require planning", "Costs can grow with usage"],
    bestFor: ["Operations", "Sales workflows", "Marketing automation", "No-code teams"],
    platform: ["Web"],
    languages: ["English"],
    api: "Developer platform and integrations available",
    lastUpdated,
    review:
      "A useful automation layer for global teams that want repeatable processes without building custom software first."
  },
  {
    slug: "canva",
    name: "Canva",
    categorySlug: "ai-design",
    category: "AI Design",
    logo: "/brand/tools/canva.png",
    logoAlt: "Canva official logo",
    shortDescription: "Design platform for marketing assets, presentations and brand content.",
    pricing: "Free and paid plans",
    rating: 4.5,
    website: "https://www.canva.com",
    overview:
      "Canva helps business teams create branded visuals, sales materials and localized marketing assets.",
    features: ["Design templates", "Brand kits", "AI creative tools", "Presentation design"],
    pros: ["Easy for business users", "Strong template library", "Useful for international content production"],
    cons: ["Can feel template-heavy", "Advanced design control is limited"],
    bestFor: ["Marketing teams", "Sales collateral", "Social assets", "Presentations"],
    platform: ["Web", "iOS", "Android", "Desktop"],
    languages: ["Multilingual"],
    api: "Developer platform and integrations available",
    lastUpdated,
    review:
      "A strong creative operations tool for teams that need to produce global marketing assets quickly."
  },
  {
    slug: "runway",
    name: "Runway",
    categorySlug: "ai-video",
    category: "AI Video",
    logo: "/brand/tools/runway.png",
    logoAlt: "Runway official logo",
    shortDescription: "AI video creation and editing platform for creative teams.",
    pricing: "Free and paid plans",
    rating: 4.4,
    website: "https://runwayml.com",
    overview:
      "Runway supports video generation, editing and creative experimentation for campaigns and product storytelling.",
    features: ["AI video generation", "Video editing", "Creative effects", "Asset production"],
    pros: ["Powerful creative workflows", "Useful for campaign concepts", "Good for rapid video testing"],
    cons: ["Output quality varies by prompt", "May require creative direction"],
    bestFor: ["Video teams", "Campaign concepts", "Product storytelling", "Creative testing"],
    platform: ["Web", "iOS"],
    languages: ["English"],
    api: "API availability varies by product access",
    lastUpdated,
    review:
      "A good fit for marketing teams exploring faster video production for international campaigns."
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    categorySlug: "ai-audio",
    category: "AI Audio",
    logo: "/brand/tools/elevenlabs.png",
    logoAlt: "ElevenLabs official logo",
    shortDescription: "AI voice platform for narration, localization and audio content.",
    pricing: "Free and paid plans",
    rating: 4.5,
    website: "https://elevenlabs.io",
    overview:
      "ElevenLabs helps teams create voiceovers and audio assets that can support multilingual content workflows.",
    features: ["AI voice generation", "Voiceover production", "Audio localization", "Speech tools"],
    pros: ["High-quality voice output", "Useful for localization", "Good for content teams"],
    cons: ["Requires responsible usage", "Voice quality depends on setup and language"],
    bestFor: ["Audio localization", "Training content", "Video voiceovers", "Product narration"],
    platform: ["Web"],
    languages: ["Multilingual"],
    api: "API available",
    lastUpdated,
    review:
      "A capable audio tool for companies producing global training, marketing or product explanation content."
  },
  {
    slug: "semrush",
    name: "Semrush",
    categorySlug: "ai-marketing",
    category: "AI Marketing",
    logo: "/brand/tools/semrush.png",
    logoAlt: "Semrush official logo",
    shortDescription: "Marketing and SEO platform for visibility, keyword and competitor research.",
    pricing: "Paid plans",
    rating: 4.4,
    website: "https://www.semrush.com",
    overview:
      "Semrush supports international SEO, competitor analysis and demand discovery for market expansion.",
    features: ["Keyword research", "Competitor analysis", "SEO tracking", "Content planning"],
    pros: ["Strong SEO dataset", "Useful for market demand signals", "Good for content strategy"],
    cons: ["Can be expensive for small teams", "Requires SEO knowledge to use well"],
    bestFor: ["SEO teams", "Content marketing", "Competitor research", "Demand analysis"],
    platform: ["Web"],
    languages: ["Multilingual"],
    api: "API availability varies by plan",
    lastUpdated,
    review:
      "A serious marketing intelligence tool for teams investing in organic growth across multiple markets."
  },
  {
    slug: "hubspot-ai",
    name: "HubSpot AI",
    categorySlug: "ai-business",
    category: "AI Business",
    logo: "/brand/tools/hubspot.png",
    logoAlt: "HubSpot official logo",
    shortDescription: "AI features inside HubSpot for sales, marketing and customer workflows.",
    pricing: "Varies by plan",
    rating: 4.3,
    website: "https://www.hubspot.com",
    overview:
      "HubSpot AI helps teams improve CRM, content, sales and customer operations inside a broader growth platform.",
    features: ["CRM support", "Sales workflows", "Marketing assistance", "Customer operations"],
    pros: ["Works inside a mature CRM", "Good for sales and marketing teams", "Scales with business workflows"],
    cons: ["Best value for HubSpot users", "Setup complexity depends on team process"],
    bestFor: ["CRM teams", "Sales operations", "Marketing automation", "Customer workflows"],
    platform: ["Web", "iOS", "Android"],
    languages: ["Multilingual"],
    api: "Developer APIs available across HubSpot platform",
    lastUpdated,
    review:
      "A relevant option for teams that want AI capabilities connected to their customer and growth operations."
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    categorySlug: "ai-productivity",
    category: "AI Productivity",
    logo: "/brand/tools/notion.png",
    logoAlt: "Notion official logo",
    shortDescription: "AI-powered workspace for notes, docs, knowledge bases and team planning.",
    pricing: "Varies by plan",
    rating: 4.4,
    website: "https://www.notion.so/product/ai",
    overview:
      "Notion AI helps teams organize documents, summarize knowledge and create lightweight operating systems.",
    features: ["AI writing", "Knowledge organization", "Summaries", "Team documentation"],
    pros: ["Good for team knowledge", "Flexible workspace", "Useful for playbooks and operating docs"],
    cons: ["Needs structure to avoid clutter", "Advanced reporting requires other tools"],
    bestFor: ["Knowledge bases", "Team docs", "Playbooks", "Project planning"],
    platform: ["Web", "iOS", "Android", "Desktop"],
    languages: ["Multilingual"],
    api: "Notion API available; AI access varies by product capability",
    lastUpdated,
    review:
      "A useful productivity layer for keeping global business research, playbooks and decisions organized."
  }
];

export function getAiToolBySlug(slug: string) {
  return aiTools.find((tool) => tool.slug === slug);
}

export function getRelatedAiTools(tool: AiTool, limit = 4) {
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
      tool.overview,
      ...tool.bestFor
    ]
      .join(" ")
      .toLowerCase();

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
}
