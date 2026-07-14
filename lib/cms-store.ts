import "server-only";

import {
  aiToolCategories,
  aiTools,
  getRelatedAiTools,
  type AiTool,
  type AiToolCategory
} from "@/lib/ai-tools";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type PublishStatus = "draft" | "hidden" | "published";

export type SeoFields = {
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  schema: string;
};

export type CmsFaq = {
  answer: string;
  question: string;
};

export type CmsContent = SeoFields & {
  categorySlug: string;
  content: string;
  cover: string;
  id: string;
  lastUpdated: string;
  resourceType?: "Checklist" | "Guide" | "PDF" | "Prompt" | "Template" | "Video";
  scheduledAt: string;
  slug: string;
  status: PublishStatus;
  summary: string;
  tags: string[];
  title: string;
};

export type CmsTool = AiTool & {
  alternatives: string[];
  canonical: string;
  company: string;
  country: string;
  editorsPick: boolean;
  faq: CmsFaq[];
  featured: boolean;
  founded: string;
  founder: string;
  freeTrial: string;
  gallery: string[];
  integrations: string[];
  keywords: string[];
  newest: boolean;
  openGraph: string;
  popular: boolean;
  seoDescription: string;
  seoTitle: string;
  schema: string;
  screenshots: string[];
  status: PublishStatus;
  subCategory: string;
  tags: string[];
  trending: boolean;
  twitterCard: string;
  useCases: string[];
};

export type CmsCategory = AiToolCategory & {
  color: string;
  description: string;
  icon: string;
  seoDescription: string;
  seoTitle: string;
  sortOrder: number;
};

export type HomepageConfig = {
  featuredTools: string[];
  trendingTools: string[];
  newestTools: string[];
  editorsPickTools: string[];
  popularTools: string[];
};

export type CmsData = {
  blogs: CmsContent[];
  categories: CmsCategory[];
  homepage: HomepageConfig;
  playbooks: CmsContent[];
  resources: CmsContent[];
  seoCenter: SeoFields;
  tools: CmsTool[];
};

export type AnalyticsData = {
  pageViews: Record<string, number>;
  updatedAt: string;
};

const cmsDir = path.join(process.cwd(), "data", "cms");
const cmsFile = path.join(cmsDir, "tools.json");
const analyticsFile = path.join(cmsDir, "analytics.json");

const defaultFeaturedSlugs = [
  "chatgpt",
  "claude",
  "perplexity",
  "cursor",
  "zapier",
  "canva",
  "runway",
  "notion-ai"
];

function toCmsTool(tool: AiTool, index: number): CmsTool {
  return {
    ...tool,
    alternatives: tool.alternatives ?? getRelatedAiTools(tool, 4).map((relatedTool) => relatedTool.slug),
    canonical: tool.canonical ?? `/en/tools/${tool.slug}`,
    company: tool.company ?? "",
  country: tool.country ?? "",
  editorsPick: tool.editorsPick ?? index < 4,
  faq: tool.faq ?? [],
  subCategory: tool.subCategory ?? "",
  founded: tool.founded ?? "",
  freeTrial: tool.freeTrial ?? "Unknown",
  featured: tool.featured ?? defaultFeaturedSlugs.includes(tool.slug),
  founder: tool.founder ?? "",
  gallery: tool.gallery ?? [],
  integrations: tool.integrations ?? [],
  keywords: tool.keywords ?? [],
    trending: tool.trending ?? index < 6,
    popular: tool.popular ?? index < 8,
    newest: tool.newest ?? index < 8,
  schema: tool.schema ?? "",
  screenshots: tool.screenshots ?? [],
    seoTitle: tool.seoTitle ?? `${tool.name} | GoAI AI Tools`,
    seoDescription: tool.seoDescription ?? tool.shortDescription,
  status: tool.status ?? (tool.isPublished === false || tool.isHidden ? "draft" : "published"),
  tags: tool.tags ?? [],
  twitterCard: tool.twitterCard ?? "summary_large_image",
  openGraph: tool.openGraph ?? "",
  useCases: tool.useCases ?? []
  };
}

function makeContent(id: string, title: string, categorySlug = "general"): CmsContent {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    canonical: `/en/${id}/${slug}`,
    categorySlug,
    content: "",
    cover: "",
    id: `${id}-${slug}`,
    lastUpdated: "2026-07-14",
    schema: "",
    scheduledAt: "",
    seoDescription: `${title} from GoAI.`,
    seoTitle: `${title} | GoAI`,
    slug,
    status: "draft",
    summary: `${title} content entry.`,
    tags: [],
    title
  };
}

function defaultCmsData(): CmsData {
  const tools = aiTools.map(toCmsTool);
  const categories = aiToolCategories.map((category, index) => ({
    ...category,
    color: "#3157D5",
    description: `${category.label} tools and content.`,
    icon: "Folder",
    seoDescription: `${category.label} resources from GoAI.`,
    seoTitle: `${category.label} | GoAI`,
    sortOrder: category.sortOrder ?? index
  }));

  return {
    categories,
    blogs: [makeContent("blog", "How AI helps businesses go global", "blog")],
    homepage: {
      featuredTools: tools.filter((tool) => tool.featured).map((tool) => tool.slug),
      trendingTools: tools.filter((tool) => tool.trending).map((tool) => tool.slug),
      newestTools: tools.filter((tool) => tool.newest).map((tool) => tool.slug),
      editorsPickTools: tools.filter((tool) => tool.editorsPick).map((tool) => tool.slug),
      popularTools: tools.filter((tool) => tool.popular).map((tool) => tool.slug)
    },
    playbooks: [makeContent("playbook", "Validate a new market", "playbook")],
    resources: [makeContent("resource", "Global market research checklist", "resource")],
    seoCenter: {
      canonical: "/en",
      schema: "",
      seoDescription:
        "Discover AI tools, global market intelligence, business playbooks and growth resources in one platform.",
      seoTitle: "GoAI | Build Your Global Business with AI"
    },
    tools
  };
}

function normalizeCmsData(data: CmsData): CmsData {
  const categories = data.categories
    .map((category, index) => ({
      ...category,
      color: category.color ?? "#3157D5",
      description: category.description ?? "",
      icon: category.icon ?? "Folder",
      seoDescription: category.seoDescription ?? `${category.label} resources from GoAI.`,
      seoTitle: category.seoTitle ?? `${category.label} | GoAI`,
      sortOrder: category.sortOrder ?? index
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const tools = (data.tools ?? []).map((tool, index) => toCmsTool(tool, index));

  return {
    blogs: data.blogs ?? defaultCmsData().blogs,
    categories,
    homepage: {
      featuredTools: data.homepage?.featuredTools ?? tools.filter((tool) => tool.featured).map((tool) => tool.slug),
      trendingTools: data.homepage?.trendingTools ?? tools.filter((tool) => tool.trending).map((tool) => tool.slug),
      newestTools: data.homepage?.newestTools ?? tools.filter((tool) => tool.newest).map((tool) => tool.slug),
      editorsPickTools:
        data.homepage?.editorsPickTools ?? tools.filter((tool) => tool.editorsPick).map((tool) => tool.slug),
      popularTools: data.homepage?.popularTools ?? tools.filter((tool) => tool.popular).map((tool) => tool.slug)
    },
    playbooks: data.playbooks ?? defaultCmsData().playbooks,
    resources: data.resources ?? defaultCmsData().resources,
    seoCenter: data.seoCenter ?? defaultCmsData().seoCenter,
    tools
  };
}

export async function getCmsData(): Promise<CmsData> {
  try {
    const content = await readFile(cmsFile, "utf8");
    return normalizeCmsData(JSON.parse(content) as CmsData);
  } catch {
    return defaultCmsData();
  }
}

export async function saveCmsData(data: CmsData) {
  await mkdir(cmsDir, { recursive: true });
  await writeFile(cmsFile, `${JSON.stringify(normalizeCmsData(data), null, 2)}\n`, "utf8");
}

export async function getPublishedTools() {
  const data = await getCmsData();
  return data.tools.filter((tool) => tool.status === "published");
}

export async function getPublishedToolBySlug(slug: string) {
  const tools = await getPublishedTools();
  return tools.find((tool) => tool.slug === slug);
}

export async function getRelatedPublishedTools(tool: AiTool, limit = 4) {
  const tools = await getPublishedTools();
  const explicit = (tool.alternatives ?? [])
    .map((slug) => tools.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is CmsTool => Boolean(candidate))
    .filter((candidate) => candidate.slug !== tool.slug);
  const sameCategory = tools.filter(
    (candidate) => candidate.slug !== tool.slug && candidate.categorySlug === tool.categorySlug
  );
  const fallback = tools.filter(
    (candidate) => candidate.slug !== tool.slug && candidate.categorySlug !== tool.categorySlug
  );

  return [...explicit, ...sameCategory, ...fallback]
    .filter((candidate, index, list) => list.findIndex((item) => item.slug === candidate.slug) === index)
    .slice(0, limit);
}

export async function getHomepageFeaturedTools() {
  const data = await getCmsData();
  const publishedTools = data.tools.filter((tool) => tool.status === "published");
  const configuredTools = data.homepage.featuredTools
    .map((slug) => publishedTools.find((tool) => tool.slug === slug))
    .filter((tool): tool is CmsTool => Boolean(tool));

  return configuredTools.length > 0 ? configuredTools : publishedTools.filter((tool) => tool.featured).slice(0, 8);
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    const content = await readFile(analyticsFile, "utf8");
    return JSON.parse(content) as AnalyticsData;
  } catch {
    return { pageViews: {}, updatedAt: new Date().toISOString() };
  }
}

export async function trackPageView(pathname: string) {
  const analytics = await getAnalyticsData();
  analytics.pageViews[pathname] = (analytics.pageViews[pathname] ?? 0) + 1;
  analytics.updatedAt = new Date().toISOString();
  await mkdir(cmsDir, { recursive: true });
  await writeFile(analyticsFile, `${JSON.stringify(analytics, null, 2)}\n`, "utf8");
  return analytics;
}
