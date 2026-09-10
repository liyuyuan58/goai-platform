import type { GrowthPlan } from "@/lib/growth-plan";

export type GrowthToolRecommendation = {
  slug: string;
  name: string;
  category: string;
  task: string;
  reason: string;
};

const catalog: GrowthToolRecommendation[] = [
  { slug: "perplexity", name: "Perplexity", category: "Research", task: "Market research", reason: "Research market signals, competitors and source-backed context before execution." },
  { slug: "chatgpt", name: "ChatGPT", category: "Research & Content", task: "Research and sales enablement", reason: "Turn market context into briefs, sales assets, outreach drafts and repeatable workflows." },
  { slug: "claude", name: "Claude", category: "Strategy", task: "Document analysis", reason: "Review long market, policy and customer documents and turn them into structured business actions." },
  { slug: "zapier", name: "Zapier", category: "Automation", task: "Workflow automation", reason: "Connect lead capture, CRM, email and operational steps without building every integration from scratch." },
  { slug: "canva", name: "Canva", category: "Design", task: "Localized sales assets", reason: "Create localized presentations, social assets and commercial collateral quickly." },
  { slug: "notion-ai", name: "Notion AI", category: "Productivity", task: "Execution workspace", reason: "Organize market-entry knowledge, tasks, meeting notes and execution playbooks." }
];

export function recommendGrowthTools(plan: GrowthPlan) {
  const text = [
    plan.input.industry,
    plan.input.product,
    plan.input.goal,
    ...plan.entryStrategy,
    ...plan.localization,
    ...plan.customerAcquisition.map((x) => x.channel),
    ...plan.aiStack.map((x) => `${x.job} ${x.tools}`)
  ].join(" ").toLowerCase();

  const score = new Map<string, number>();
  const add = (slug: string, points: number) => score.set(slug, (score.get(slug) || 0) + points);

  add("perplexity", 4);
  add("chatgpt", 4);
  add("notion-ai", 2);

  if (/lead|sales|outbound|customer|crm|distributor|partner/.test(text)) {
    add("zapier", 5);
    add("chatgpt", 2);
  }
  if (/content|marketing|locali|arabic|design|sales asset|presentation/.test(text)) {
    add("canva", 5);
    add("chatgpt", 2);
  }
  if (/research|market|competitor|regulat|policy|compliance/.test(text)) {
    add("perplexity", 5);
    add("claude", 4);
  }
  if (/automation|workflow|agent|ai consulting/.test(text)) {
    add("zapier", 5);
    add("claude", 2);
  }

  return [...catalog]
    .sort((a, b) => (score.get(b.slug) || 0) - (score.get(a.slug) || 0))
    .slice(0, 4);
}
