export type GrowthPlanInput = {
  companyName: string;
  industry: string;
  product: string;
  currentCountry: string;
  targetCountry: string;
  goal: string;
  budget: string;
  context: string;
};

export type GrowthPlan = {
  id: string;
  input: GrowthPlanInput;
  title: string;
  targetMarket: string;
  opportunityScore: number;
  recommendedStrategy: string;
  executiveSummary: string;
  marketOpportunity: string[];
  targetCustomers: Array<{ name: string; rationale: string }>;
  competitors: Array<{ segment: string; insight: string }>;
  entryStrategy: string[];
  customerAcquisition: Array<{ channel: string; priority: "High" | "Medium" | "Low"; note: string }>;
  localization: string[];
  aiStack: Array<{ job: string; tools: string }>;
  risks: string[];
  actionPlan: Array<{ phase: string; days: string; actions: string[] }>;
};

export const demoGrowthPlanInput: GrowthPlanInput = {
  companyName: "Foshan Furniture Co.",
  industry: "Furniture Manufacturing",
  product: "Commercial & hospitality furniture",
  currentCountry: "China",
  targetCountry: "United Arab Emirates",
  goal: "Find distributors and B2B customers",
  budget: "$100,000",
  context: "Mid-to-high-end furniture manufacturer with export experience in Asia."
};

export function buildDemoGrowthPlan(input: GrowthPlanInput): GrowthPlan {
  const target = input.targetCountry || "United Arab Emirates";

  return {
    id: "demo-uae-furniture",
    input: { ...input },
    title: `${target} Market Entry Plan`,
    targetMarket: target,
    opportunityScore: 8.2,
    recommendedStrategy: "Distributor-first market validation",
    executiveSummary: `${input.companyName || "Your company"} should validate ${target} through a distributor-first B2B strategy before committing to a local entity. The strongest initial opportunity is to target hospitality, interior-design and property-development buyers while using a focused outbound and partnership program to test demand, pricing and product-market fit.`,
    marketOpportunity: [
      "Hospitality, real-estate and premium commercial projects create recurring demand for contract furniture.",
      "The UAE can serve as a regional reference market for broader GCC expansion.",
      "A premium but value-conscious positioning can differentiate Chinese manufacturing capability from both local suppliers and high-cost European brands."
    ],
    targetCustomers: [
      { name: "Hotel groups & hospitality operators", rationale: "High project value and recurring refurbishment demand." },
      { name: "Interior design firms", rationale: "Influence furniture specification and purchasing decisions." },
      { name: "Furniture distributors", rationale: "Fastest way to validate demand without heavy local fixed costs." },
      { name: "Property developers", rationale: "Large-volume residential and commercial opportunities." }
    ],
    competitors: [
      { segment: "European premium brands", insight: "Strong brand equity but often higher price and longer lead times." },
      { segment: "Regional distributors", insight: "Local relationships and service strength; product ranges vary widely." },
      { segment: "Chinese suppliers", insight: "Price competitive, but many lack localized brand, service and channel strategy." }
    ],
    entryStrategy: [
      "Start with 2-3 distributor or project-partner conversations before establishing a local entity.",
      "Create a UAE-specific commercial catalogue, pricing sheet and project case-study pack.",
      "Validate one priority segment first, then expand into adjacent B2B segments."
    ],
    customerAcquisition: [
      { channel: "Distributor outreach", priority: "High", note: "Build a list of 100 qualified distributors and project suppliers." },
      { channel: "Interior design outreach", priority: "High", note: "Target firms working on hospitality and commercial projects." },
      { channel: "Trade fairs & industry events", priority: "Medium", note: "Use events for partner validation and project introductions." },
      { channel: "Google / LinkedIn content", priority: "Medium", note: "Support trust and inbound discovery with localized proof points." }
    ],
    localization: [
      "Use English as the primary commercial language and add Arabic to high-intent customer-facing assets.",
      "Adapt product naming, dimensions, certifications and sales materials to local procurement expectations.",
      "Build UAE-specific landing pages and project examples rather than reusing a generic global website."
    ],
    aiStack: [
      { job: "Market research", tools: "GoAI + Qwen/DeepSeek + trusted public sources" },
      { job: "Lead research", tools: "LinkedIn + Apollo/Clay-style workflows" },
      { job: "Localization", tools: "LLM translation + human review for key commercial assets" },
      { job: "Content & outreach", tools: "GoAI playbooks + AI writing and personalization workflows" }
    ],
    risks: [
      "Do not commit to local inventory before validating distributor and project demand.",
      "Verify product-specific import, certification, tax and customs requirements before shipment.",
      "Avoid over-reliance on a single distributor; retain direct visibility into end-customer demand.",
      "Validate pricing against landed cost and local service expectations."
    ],
    actionPlan: [
      { phase: "Validate", days: "Days 1-30", actions: ["Map 100 target companies", "Benchmark local pricing", "Prepare UAE sales assets", "Contact first 30 partners"] },
      { phase: "Acquire", days: "Days 31-60", actions: ["Run partner interviews", "Launch targeted outbound", "Attend one relevant industry event", "Test 2-3 commercial offers"] },
      { phase: "Scale", days: "Days 61-90", actions: ["Select priority channel partners", "Launch a pilot project", "Publish a local case study", "Decide whether local presence is justified"] }
    ]
  };
}
