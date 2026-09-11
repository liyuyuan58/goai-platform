import type { GrowthPlan } from "@/lib/growth-plan";

export type ResearchExecutionResult = {
  id: string;
  status: "completed";
  completedAt: string;
  title: string;
  summary: string;
  marketSignals: string[];
  customerHypotheses: string[];
  competitorQuestions: string[];
  assumptionsToVerify: string[];
  risksToVerify: string[];
  nextActions: string[];
};

const API_URL = "https://api.deepseek.com/chat/completions";
const strings=(v:unknown,f:string[])=>Array.isArray(v)&&v.some(x=>typeof x==="string"&&x.trim())
 ? v.filter((x):x is string=>typeof x==="string"&&Boolean(x.trim())).slice(0,6):f;
const text=(v:unknown,f:string)=>typeof v==="string"&&v.trim()?v.trim():f;

function prompt(plan:GrowthPlan){
 return `You are GoAI Market Research Agent. Execute an INTERNAL research-analysis task from this Growth Plan.
Company: ${plan.input.companyName}
Industry: ${plan.input.industry}
Product: ${plan.input.product}
Current country: ${plan.input.currentCountry}
Target country: ${plan.input.targetCountry}
Goal: ${plan.input.goal}
Budget: ${plan.input.budget||"Not specified"}
Context: ${plan.input.context||"None"}
Growth strategy: ${plan.recommendedStrategy}
Target customers: ${plan.targetCustomers.map(x=>`${x.name}: ${x.rationale}`).join("; ")}
Market opportunity: ${plan.marketOpportunity.join("; ")}
Risks: ${plan.risks.join("; ")}

IMPORTANT:
- This V1 does not have live web browsing. Do not pretend you searched the web.
- Do not invent current market statistics, named leads, laws, certifications, prices or citations.
- Separate useful hypotheses from facts that require external verification.
- Produce a decision-useful internal research brief.
- Return JSON only.

JSON:
{"title":"string","summary":"string","marketSignals":["string"],"customerHypotheses":["string"],"competitorQuestions":["string"],"assumptionsToVerify":["string"],"risksToVerify":["string"],"nextActions":["string"]}`;
}

export async function executeMarketResearch(plan:GrowthPlan):Promise<ResearchExecutionResult>{
 const key=process.env.DEEPSEEK_API_KEY?.trim();
 if(!key) throw new Error("DeepSeek API key is not configured");
 const res=await fetch(API_URL,{method:"POST",cache:"no-store",headers:{"Content-Type":"application/json",Authorization:`Bearer ${key}`},body:JSON.stringify({
   model:process.env.DEEPSEEK_MODEL?.trim()||"deepseek-v4-flash",thinking:{type:"disabled"},
   messages:[{role:"system",content:"You are GoAI Market Research Agent. Produce rigorous internal analysis and clearly flag what requires external verification. Return valid JSON only."},{role:"user",content:prompt(plan)}],
   response_format:{type:"json_object"},temperature:0.25,max_tokens:2600
 })});
 const body:any=await res.json();
 if(!res.ok){console.error("[research-agent][deepseek]",{status:res.status,error:body?.error});throw new Error(`Research Agent request failed: ${res.status}`)}
 const raw=JSON.parse(body?.choices?.[0]?.message?.content||"{}");
 return {
   id:`research-${Date.now()}`,status:"completed",completedAt:new Date().toISOString(),
   title:text(raw.title,`${plan.input.targetCountry} Market Research Brief`),
   summary:text(raw.summary,`Internal research brief for ${plan.input.companyName}'s ${plan.input.targetCountry} growth plan.`),
   marketSignals:strings(raw.marketSignals,["Validate the strongest demand drivers with current external evidence."]),
   customerHypotheses:strings(raw.customerHypotheses,["Test which buyer segment has the clearest urgency and purchasing authority."]),
   competitorQuestions:strings(raw.competitorQuestions,["Benchmark local and international alternatives before final positioning."]),
   assumptionsToVerify:strings(raw.assumptionsToVerify,["Verify demand, pricing, route-to-market and operating assumptions with current sources."]),
   risksToVerify:strings(raw.risksToVerify,["Verify legal, regulatory, tax and activity-specific requirements before execution."]),
   nextActions:strings(raw.nextActions,["Collect current external evidence for the highest-impact assumptions."])
 };
}
