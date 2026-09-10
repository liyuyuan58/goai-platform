import type { GrowthPlan, GrowthPlanInput } from "@/lib/growth-plan";

const API_URL = "https://api.deepseek.com/chat/completions";
const s=(v:unknown,f:string)=>typeof v==="string"&&v.trim()?v.trim():f;
const ss=(v:unknown,f:string[])=>Array.isArray(v)&&v.some(x=>typeof x==="string"&&x.trim())?v.filter((x):x is string=>typeof x==="string"&&!!x.trim()):f;
const pri=(v:unknown):"High"|"Medium"|"Low"=>String(v).toLowerCase()==="low"?"Low":String(v).toLowerCase()==="medium"?"Medium":"High";

function normalize(r:any,i:GrowthPlanInput):GrowthPlan{
 const customers=Array.isArray(r?.targetCustomers)?r.targetCustomers.slice(0,6).map((x:any)=>({name:s(x?.name,"Priority customer segment"),rationale:s(x?.rationale,"Validate demand and buying criteria.")})):[];
 const competitors=Array.isArray(r?.competitors)?r.competitors.slice(0,6).map((x:any)=>({segment:s(x?.segment,"Competitive segment"),insight:s(x?.insight,"Benchmark positioning, pricing and route to market.")})):[];
 const acquisition=Array.isArray(r?.customerAcquisition)?r.customerAcquisition.slice(0,6).map((x:any)=>({channel:s(x?.channel,"Targeted outbound"),priority:pri(x?.priority),note:s(x?.note,"Test this channel with a measurable pilot.")})):[];
 const stack=Array.isArray(r?.aiStack)?r.aiStack.slice(0,6).map((x:any)=>({job:s(x?.job,"Business workflow"),tools:s(x?.tools,"GoAI recommended AI stack")})):[];
 const phases=Array.isArray(r?.actionPlan)?r.actionPlan.slice(0,3).map((x:any,n:number)=>({phase:s(x?.phase,["Validate","Acquire","Scale"][n]||`Phase ${n+1}`),days:s(x?.days,["Days 1-30","Days 31-60","Days 61-90"][n]||"Next 30 days"),actions:ss(x?.actions,["Define measurable actions and owners."]).slice(0,6)})):[];
 return {id:`live-${Date.now()}`,input:{...i},title:s(r?.title,`${i.targetCountry} Market Entry Plan`),targetMarket:i.targetCountry,
 opportunityScore:Math.min(10,Math.max(0,Number(r?.opportunityScore)||7)),recommendedStrategy:s(r?.recommendedStrategy,"Validate the market before scaling investment."),
 executiveSummary:s(r?.executiveSummary,`${i.companyName} should validate ${i.targetCountry} with a focused market-entry pilot.`),
 marketOpportunity:ss(r?.marketOpportunity,[`Validate demand, pricing and channel economics in ${i.targetCountry}.`]).slice(0,6),
 targetCustomers:customers.length?customers:[{name:"Priority B2B buyers",rationale:"Start with customers with clear purchasing intent."}],
 competitors:competitors.length?competitors:[{segment:"Local and international competitors",insight:"Benchmark positioning, price, service and distribution."}],
 entryStrategy:ss(r?.entryStrategy,["Start with a low-fixed-cost validation approach.","Build local proof points before scaling investment."]).slice(0,6),
 customerAcquisition:acquisition.length?acquisition:[{channel:"Targeted outbound",priority:"High",note:"Build and test a qualified prospect list."}],
 localization:ss(r?.localization,["Localize commercial messaging, proof points and customer-facing assets."]).slice(0,6),
 aiStack:stack.length?stack:[{job:"Market research",tools:"GoAI + AI research and verification workflows"}],
 risks:ss(r?.risks,["Validate regulatory, pricing and channel assumptions before major investment."]).slice(0,6),
 actionPlan:phases.length?phases:[{phase:"Validate",days:"Days 1-30",actions:["Validate demand and pricing."]},{phase:"Acquire",days:"Days 31-60",actions:["Run acquisition experiments."]},{phase:"Scale",days:"Days 61-90",actions:["Scale channels with traction."]}]};
}

function prompt(i:GrowthPlanInput){return `Create a practical global growth plan and output JSON only.
Company: ${i.companyName}
Industry: ${i.industry}
Product/service: ${i.product}
Current country: ${i.currentCountry}
Target country: ${i.targetCountry}
Goal: ${i.goal}
Budget: ${i.budget||"Not specified"}
Context: ${i.context||"None"}
Do not invent precise laws, statistics, market sizes, certifications or named customers when uncertain. Flag compliance items for verification. Recommend AI-enabled workflows/tool categories. Opportunity score is 0-10. Priorities: High/Medium/Low. Exactly 3 action phases.
JSON shape: {"title":"string","opportunityScore":8,"recommendedStrategy":"string","executiveSummary":"string","marketOpportunity":["string"],"targetCustomers":[{"name":"string","rationale":"string"}],"competitors":[{"segment":"string","insight":"string"}],"entryStrategy":["string"],"customerAcquisition":[{"channel":"string","priority":"High","note":"string"}],"localization":["string"],"aiStack":[{"job":"string","tools":"string"}],"risks":["string"],"actionPlan":[{"phase":"Validate","days":"Days 1-30","actions":["string"]},{"phase":"Acquire","days":"Days 31-60","actions":["string"]},{"phase":"Scale","days":"Days 61-90","actions":["string"]}]}`}

export async function generateLiveGrowthPlan(input:GrowthPlanInput):Promise<GrowthPlan>{
 const key=process.env.DEEPSEEK_API_KEY?.trim(); if(!key) throw new Error("DeepSeek API key is not configured");
 const res=await fetch(API_URL,{method:"POST",cache:"no-store",headers:{"Content-Type":"application/json",Authorization:`Bearer ${key}`},body:JSON.stringify({
  model:process.env.DEEPSEEK_MODEL?.trim()||"deepseek-v4-flash",thinking:{type:"disabled"},
  messages:[{role:"system",content:"You are GoAI, an AI-native global growth strategist. Return valid JSON only."},{role:"user",content:prompt(input)}],
  response_format:{type:"json_object"},temperature:0.4,max_tokens:3500
 })});
 const body:any=await res.json(); if(!res.ok){console.error("[ai-router][deepseek]",{status:res.status,error:body?.error});throw new Error(`DeepSeek request failed: ${res.status}`)}
 const content=body?.choices?.[0]?.message?.content; if(!content) throw new Error("DeepSeek returned empty content");
 return normalize(JSON.parse(content),input);
}
