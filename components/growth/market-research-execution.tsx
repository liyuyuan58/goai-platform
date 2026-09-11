"use client";
import type { GrowthPlan } from "@/lib/growth-plan";
import type { ResearchExecutionResult } from "@/lib/agent/research-execution";
import { useState } from "react";

export function MarketResearchExecution({plan}:{plan:GrowthPlan}){
 const [status,setStatus]=useState<"idle"|"running"|"completed"|"error">("idle");
 const [result,setResult]=useState<ResearchExecutionResult|null>(null);
 async function run(){
  setStatus("running");
  try{
   const r=await fetch("/api/growth-agent/research",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({plan})});
   const d=await r.json(); if(!r.ok||!d.result)throw new Error(d.error||"Research failed");
   setResult(d.result);setStatus("completed");
  }catch{setStatus("error")}
 }
 const sections=result?[["Market signals",result.marketSignals],["Customer hypotheses",result.customerHypotheses],["Competitor questions",result.competitorQuestions],["Assumptions to verify",result.assumptionsToVerify],["Risks to verify",result.risksToVerify],["Next actions",result.nextActions]] as const:[];
 return <section className="rounded-[2rem] border border-brand/25 bg-surface p-6 shadow-sm sm:p-8">
  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
   <div><p className="text-xs font-semibold uppercase tracking-[.14em] text-brand">Agent Execution · Market Research</p><h2 className="mt-2 text-2xl font-semibold">Execute the first Growth Agent task.</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">V1 turns your plan into an internal research brief. It does not claim live web research or perform external actions.</p></div>
   <button className="min-h-11 rounded-full bg-brand px-5 text-sm font-semibold text-white disabled:opacity-60" disabled={status==="running"} onClick={run}>{status==="running"?"Researching...":status==="completed"?"Run Again":"Execute Market Research"}</button>
  </div>
  <div className="mt-5 flex gap-2 text-xs font-semibold"><span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{status==="completed"?"Completed":status==="running"?"Running":"Ready"}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">Internal analysis</span><span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">No external actions</span></div>
  {status==="error"?<p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Research execution failed. Try again later.</p>:null}
  {result?<div className="mt-7"><div className="rounded-3xl border border-border bg-background p-5"><p className="text-xs font-semibold uppercase tracking-[.12em] text-brand">Execution Result</p><h3 className="mt-2 text-xl font-semibold">{result.title}</h3><p className="mt-2 text-sm leading-6 text-secondary">{result.summary}</p><p className="mt-3 text-xs text-secondary">Completed {new Date(result.completedAt).toLocaleString()}</p></div><div className="mt-4 grid gap-4 md:grid-cols-2">{sections.map(([title,items])=><div className="rounded-3xl border border-border bg-white p-5" key={title}><h4 className="font-semibold">{title}</h4><div className="mt-3 grid gap-2">{items.map(x=><p className="text-sm leading-6 text-secondary" key={x}>• {x}</p>)}</div></div>)}</div><p className="mt-4 rounded-2xl border border-dashed border-border p-4 text-xs leading-5 text-secondary">Sprint014 execution history is session-local. Persistent Workspace execution history will be added after usage metering / credits are designed.</p></div>:null}
 </section>
}
