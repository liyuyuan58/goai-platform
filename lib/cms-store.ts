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

export type CmsTool = AiTool & {
  subCategory: string;
  freeTrial: string;
  alternatives: string[];
  featured: boolean;
  trending: boolean;
  editorsPick: boolean;
  popular: boolean;
  newest: boolean;
  isPublished: boolean;
  isHidden: boolean;
  seoTitle: string;
  seoDescription: string;
};

export type CmsCategory = AiToolCategory & {
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
  categories: CmsCategory[];
  homepage: HomepageConfig;
  tools: CmsTool[];
};

const cmsDir = path.join(process.cwd(), "data", "cms");
const cmsFile = path.join(cmsDir, "tools.json");

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
    subCategory: tool.subCategory ?? "",
    freeTrial: tool.freeTrial ?? "Unknown",
    alternatives: tool.alternatives ?? getRelatedAiTools(tool, 4).map((relatedTool) => relatedTool.slug),
    featured: tool.featured ?? defaultFeaturedSlugs.includes(tool.slug),
    trending: tool.trending ?? index < 6,
    editorsPick: tool.editorsPick ?? index < 4,
    popular: tool.popular ?? index < 8,
    newest: tool.newest ?? index < 8,
    isPublished: tool.isPublished ?? true,
    isHidden: tool.isHidden ?? false,
    seoTitle: tool.seoTitle ?? `${tool.name} | GoAI AI Tools`,
    seoDescription: tool.seoDescription ?? tool.shortDescription
  };
}

function defaultCmsData(): CmsData {
  const tools = aiTools.map(toCmsTool);
  const categories = aiToolCategories.map((category, index) => ({
    ...category,
    sortOrder: category.sortOrder ?? index
  }));

  return {
    categories,
    homepage: {
      featuredTools: tools.filter((tool) => tool.featured).map((tool) => tool.slug),
      trendingTools: tools.filter((tool) => tool.trending).map((tool) => tool.slug),
      newestTools: tools.filter((tool) => tool.newest).map((tool) => tool.slug),
      editorsPickTools: tools.filter((tool) => tool.editorsPick).map((tool) => tool.slug),
      popularTools: tools.filter((tool) => tool.popular).map((tool) => tool.slug)
    },
    tools
  };
}

function normalizeCmsData(data: CmsData): CmsData {
  const categories = data.categories
    .map((category, index) => ({ ...category, sortOrder: category.sortOrder ?? index }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const tools = data.tools.map((tool, index) => toCmsTool(tool, index));

  return {
    categories,
    homepage: {
      featuredTools: data.homepage?.featuredTools ?? tools.filter((tool) => tool.featured).map((tool) => tool.slug),
      trendingTools: data.homepage?.trendingTools ?? tools.filter((tool) => tool.trending).map((tool) => tool.slug),
      newestTools: data.homepage?.newestTools ?? tools.filter((tool) => tool.newest).map((tool) => tool.slug),
      editorsPickTools:
        data.homepage?.editorsPickTools ?? tools.filter((tool) => tool.editorsPick).map((tool) => tool.slug),
      popularTools: data.homepage?.popularTools ?? tools.filter((tool) => tool.popular).map((tool) => tool.slug)
    },
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
  return data.tools.filter((tool) => tool.isPublished && !tool.isHidden);
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
  const publishedTools = data.tools.filter((tool) => tool.isPublished && !tool.isHidden);
  const configuredTools = data.homepage.featuredTools
    .map((slug) => publishedTools.find((tool) => tool.slug === slug))
    .filter((tool): tool is CmsTool => Boolean(tool));

  return configuredTools.length > 0 ? configuredTools : publishedTools.filter((tool) => tool.featured).slice(0, 8);
}
