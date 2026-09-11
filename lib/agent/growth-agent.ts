import type { GrowthPlan } from "@/lib/growth-plan";

export type GrowthAgentTaskStatus = "ready" | "needs_approval" | "blocked";

export type GrowthAgentTask = {
  id: string;
  title: string;
  objective: string;
  output: string;
  status: GrowthAgentTaskStatus;
  approvalReason?: string;
};

export type GrowthAgentMission = {
  id: string;
  title: string;
  objective: string;
  summary: string;
  tasks: GrowthAgentTask[];
  nextBestAction: string;
};

const API_URL = "https://api.deepseek.com/chat/completions";

function text(v: unknown, fallback: string) {
  return typeof v === "string" && v.trim() ? v.trim() : fallback;
}

function normalizeTask(v: any, index: number): GrowthAgentTask {
  const status: GrowthAgentTaskStatus =
    v?.status === "needs_approval" ? "needs_approval" :
    v?.status === "blocked" ? "blocked" : "ready";

  return {
    id: text(v?.id, `task-${index + 1}`),
    title: text(v?.title, `Agent Task ${index + 1}`),
    objective: text(v?.objective, "Turn the Growth Plan into a concrete execution step."),
    output: text(v?.output, "A structured deliverable for human review."),
    status,
    approvalReason: status === "needs_approval"
      ? text(v?.approvalReason, "Human approval is required before an external or irreversible action.")
      : undefined
  };
}

function normalize(raw: any, plan: GrowthPlan): GrowthAgentMission {
  const tasks = Array.isArray(raw?.tasks)
    ? raw.tasks.slice(0, 6).map(normalizeTask)
    : [];

  return {
    id: `mission-${Date.now()}`,
    title: text(raw?.title, `${plan.input.targetCountry} Growth Agent Mission`),
    objective: text(raw?.objective, plan.input.goal),
    summary: text(
      raw?.summary,
      `Turn ${plan.input.companyName}'s Growth Plan into a controlled execution workflow for ${plan.input.targetCountry}.`
    ),
    tasks: tasks.length ? tasks : [
      { id: "research", title: "Market Research", objective: "Validate the strongest market assumptions.", output: "Research brief with assumptions to verify.", status: "ready" },
      { id: "icp", title: "Define ICP", objective: "Turn target-customer themes into a practical buyer profile.", output: "ICP and qualification criteria.", status: "ready" },
      { id: "leads", title: "Lead Research", objective: "Define a lead-research workflow for the target market.", output: "Lead research specification and fields.", status: "ready" },
      { id: "qualify", title: "Qualification", objective: "Rank opportunities against ICP criteria.", output: "Qualification rubric.", status: "ready" },
      { id: "outreach", title: "Outreach Draft", objective: "Prepare localized outreach for approved prospects.", output: "Draft outreach messages for review.", status: "needs_approval", approvalReason: "External outreach must be approved by a human before sending." }
    ],
    nextBestAction: text(raw?.nextBestAction, "Review the mission and approve only the actions you want GoAI to execute.")
  };
}

function buildPrompt(plan: GrowthPlan) {
  return `You are GoAI Growth Agent. Convert the existing Growth Plan into a safe, practical execution mission.

COMPANY
Company: ${plan.input.companyName}
Industry: ${plan.input.industry}
Product: ${plan.input.product}
Current country: ${plan.input.currentCountry}
Target country: ${plan.input.targetCountry}
Goal: ${plan.input.goal}
Budget: ${plan.input.budget || "Not specified"}
Context: ${plan.input.context || "None"}

GROWTH PLAN
Recommended strategy: ${plan.recommendedStrategy}
Target customers: ${plan.targetCustomers.map(x => x.name).join("; ")}
Entry strategy: ${plan.entryStrategy.join("; ")}
Customer acquisition: ${plan.customerAcquisition.map(x => `${x.channel}: ${x.note}`).join("; ")}
Localization: ${plan.localization.join("; ")}
Risks: ${plan.risks.join("; ")}

Create 5-6 execution tasks. The normal sequence should cover:
1) market research,
2) ICP definition,
3) lead research,
4) qualification,
5) localized outreach draft,
6) optional execution setup.

SAFETY / CONTROL
- Do not claim that external research, lead scraping, email sending, purchasing, wallet transactions or other external actions have already happened.
- Any external communication, spending, payment, wallet action, data purchase, contract, account change or irreversible action MUST use status "needs_approval".
- Internal analysis/planning can use status "ready".
- Use "blocked" only when required information is missing.
- Outputs should describe the concrete deliverable the agent will produce.
- Return valid JSON only.

JSON:
{
  "title":"string",
  "objective":"string",
  "summary":"string",
  "tasks":[
    {
      "id":"research",
      "title":"Market Research",
      "objective":"string",
      "output":"string",
      "status":"ready|needs_approval|blocked",
      "approvalReason":"string when needed"
    }
  ],
  "nextBestAction":"string"
}`;
}

export async function generateGrowthAgentMission(plan: GrowthPlan): Promise<GrowthAgentMission> {
  const key = process.env.DEEPSEEK_API_KEY?.trim();
  if (!key) throw new Error("DeepSeek API key is not configured");

  const response = await fetch(API_URL, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL?.trim() || "deepseek-v4-flash",
      thinking: { type: "disabled" },
      messages: [
        {
          role: "system",
          content: "You are GoAI Growth Agent. Convert strategy into controlled multi-step execution plans. Return valid JSON only."
        },
        { role: "user", content: buildPrompt(plan) }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 2800
    })
  });

  const body: any = await response.json();
  if (!response.ok) {
    console.error("[growth-agent][deepseek]", { status: response.status, error: body?.error });
    throw new Error(`Growth Agent request failed: ${response.status}`);
  }

  const content = body?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Growth Agent returned empty content");

  return normalize(JSON.parse(content), plan);
}
