"use client";
import { demoGrowthPlanInput, buildDemoGrowthPlan, type GrowthPlan, type GrowthPlanInput } from "@/lib/growth-plan";
import { RecommendedAiTools } from "@/components/growth/recommended-ai-tools";
import { GrowthAgentPanel } from "@/components/growth/growth-agent-panel";
import { MarketResearchExecution } from "@/components/growth/market-research-execution";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { FormEvent, ReactNode, useState } from "react";
import { useSession } from "next-auth/react";

const blank:GrowthPlanInput={companyName:"",industry:"",product:"",currentCountry:"",targetCountry:"",goal:"",budget:"",context:""};

export function GrowthCopilot({locale}:{locale:Locale}){
 const [input,setInput]=useState(blank),[plan,setPlan]=useState<GrowthPlan|null>(null);
 const [busy,setBusy]=useState(false),[error,setError]=useState<string|null>(null),[mode,setMode]=useState<"live"|"demo">("live");
 const set=(k:keyof GrowthPlanInput,v:string)=>setInput(x=>({...x,[k]:v}));
 const loadDemo=()=>{setInput(demoGrowthPlanInput);setPlan(null);setError(null)};
 const demo=()=>{setInput(demoGrowthPlanInput);setPlan(buildDemoGrowthPlan(demoGrowthPlanInput));setMode("demo");setError(null)};
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError(null);
  try{const r=await fetch("/api/growth-plan/generate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({input})});const d=await r.json();if(!r.ok||!d.plan)throw new Error(d.error||"Unable to generate plan");setPlan(d.plan);setMode("live")}
  catch(x){setError(x instanceof Error?x.message:"Live AI is unavailable")}finally{setBusy(false)}
 }
 if(plan)return <Report locale={locale} plan={plan} mode={mode} back={()=>setPlan(null)}/>;
 const fields:Array<[keyof GrowthPlanInput,string,string?]>=[["companyName","Company name"],["industry","Industry"],["product","Product / service"],["currentCountry","Current country"],["targetCountry","Target country"],["goal","Primary goal"],["budget","Budget range","e.g. $50k-$100k"],["context","Additional context","Export experience, constraints, timeline..."]];
 return <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
  <aside className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8">
   <p className="text-xs font-semibold uppercase tracking-[.14em] text-brand">AI Global Growth Copilot</p><h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Where do you want to grow?</h1>
   <p className="mt-4 leading-7 text-secondary">Live AI turns your business and market context into a structured global growth plan.</p>
   <div className="mt-6 rounded-3xl border border-border bg-background p-5"><p className="font-semibold">What you&apos;ll get</p><div className="mt-4 grid gap-3 text-sm text-secondary">{["Market opportunity","Target customers","Entry strategy","Customer acquisition","AI stack","90-day action plan"].map(x=><div key={x}>✓ {x}</div>)}</div></div>
   <div className="mt-5 grid gap-3"><button className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold" onClick={loadDemo}>Load competition demo data</button><button className="rounded-full border border-brand/20 bg-brand/5 px-5 py-3 text-sm font-semibold text-brand" onClick={demo}>Run competition demo instantly</button></div>
  </aside>
  <form className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8" onSubmit={submit}>
   <div className="mb-8"><div className="flex items-center gap-2"><p className="text-sm font-semibold text-brand">Build your plan</p><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">Live AI</span></div><h2 className="mt-2 text-2xl font-semibold">Company & market context</h2></div>
   <div className="grid gap-5 sm:grid-cols-2">{fields.map(([k,l,p])=><label className="grid gap-2" key={k}><span className="text-sm font-semibold">{l}</span><input className="admin-input" placeholder={p} required={!["budget","context"].includes(k)} value={input[k]} onChange={e=>set(k,e.target.value)}/></label>)}</div>
   {error&&<div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-sm font-semibold text-amber-900">{error}</p><button className="mt-3 text-sm font-semibold text-brand" onClick={demo} type="button">Use competition demo instead →</button></div>}
   <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-secondary">Verify AI output before legal, tax, regulatory or investment decisions.</p><button className="min-h-12 rounded-full bg-brand px-6 text-sm font-semibold text-white disabled:opacity-60" disabled={busy}>{busy?"AI is building your plan...":"Build My Growth Plan"}</button></div>
  </form>
 </div>
}

function Report({locale,plan,mode,back}:{locale:Locale;plan:GrowthPlan;mode:"live"|"demo";back:()=>void}){
 const {status}=useSession();const [save,setSave]=useState<"idle"|"saving"|"saved"|"error">("idle");
 const blocks:Array<[string,string,ReactNode]>=[
 ["01","Executive Summary",<p className="leading-7 text-secondary">{plan.executiveSummary}</p>],
 ["02","Market Opportunity",<List x={plan.marketOpportunity}/>],
 ["03","Target Customers",<Cards x={plan.targetCustomers.map(v=>[v.name,v.rationale])}/>],
 ["04","Competitor Intelligence",<Cards x={plan.competitors.map(v=>[v.segment,v.insight])}/>],
 ["05","Entry Strategy",<List x={plan.entryStrategy}/>],
 ["06","Customer Acquisition",<Cards x={plan.customerAcquisition.map(v=>[`${v.channel} · ${v.priority}`,v.note])}/>],
 ["07","Localization Strategy",<List x={plan.localization}/>],
 ["08","Your AI Growth Stack",<Cards x={plan.aiStack.map(v=>[v.job,v.tools])}/>],
 ["09","Key Risks",<List x={plan.risks}/>],
 ["10","90-Day Action Plan",<Cards x={plan.actionPlan.map(v=>[`${v.phase} · ${v.days}`,v.actions.join(" · ")])}/>]];
 return <div>
  <div className="mb-6 rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8"><button className="mb-4 text-sm font-semibold text-brand" onClick={back}>← Edit business context</button><div className="flex gap-2"><p className="text-xs font-semibold uppercase tracking-[.14em] text-brand">Global Growth Plan</p><span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-secondary">{mode==="live"?"Live AI":"Competition Demo"}</span></div><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{plan.title}</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-secondary">{plan.executiveSummary}</p><div className="mt-5 flex flex-wrap gap-3"><b className="rounded-2xl border border-border bg-background p-4">Opportunity {plan.opportunityScore}/10</b><b className="rounded-2xl border border-border bg-background p-4">{plan.recommendedStrategy}</b></div></div>
  <div className="grid gap-5">{blocks.map(([n,t,c])=><section className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8" key={n}><div className="mb-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">{n}</span><h2 className="text-xl font-semibold sm:text-2xl">{t}</h2></div>{c}</section>)}</div>
  <div className="mt-6"><RecommendedAiTools plan={plan} locale={locale} /></div>
  <div className="mt-6"><GrowthAgentPanel plan={plan} /></div>
  <div className="mt-6"><MarketResearchExecution plan={plan} /></div>
  <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-brand/20 bg-brand/5 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">Save this plan to your Workspace</p><p className="mt-1 text-sm text-secondary">Keep it in My Growth Plans and reopen it later.</p></div><div className="flex gap-2">{status==="authenticated"?<button className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white" disabled={save==="saving"||save==="saved"} onClick={async()=>{setSave("saving");const r=await fetch("/api/growth-plans",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({plan})});setSave(r.ok?"saved":"error")}}>{save==="saving"?"Saving...":save==="saved"?"Saved":save==="error"?"Try Again":"Save Growth Plan"}</button>:<Link className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white" href={`/${locale}?login=1&callbackUrl=${encodeURIComponent(`/${locale}/growth`)}`}>Sign in to save</Link>}<Link className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold" href={`/${locale}/workspace/growth-plans`}>My Growth Plans</Link></div></div>
 </div>
}
function List({x}:{x:string[]}){return <div className="grid gap-3">{x.map(v=><div className="flex gap-3 text-sm leading-6 text-secondary" key={v}><span className="text-brand">•</span>{v}</div>)}</div>}
function Cards({x}:{x:string[][]}){return <div className="grid gap-3 sm:grid-cols-2">{x.map(([a,b])=><div className="rounded-2xl border border-border bg-background p-4" key={a}><p className="font-semibold">{a}</p><p className="mt-2 text-sm leading-6 text-secondary">{b}</p></div>)}</div>}
