"use client";

import { demoGrowthPlanInput, buildDemoGrowthPlan, type GrowthPlan, type GrowthPlanInput } from "@/lib/growth-plan";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

const emptyInput: GrowthPlanInput = {
  companyName: "",
  industry: "",
  product: "",
  currentCountry: "",
  targetCountry: "",
  goal: "",
  budget: "",
  context: ""
};

export function GrowthCopilot({ locale }: { locale: Locale }) {
  const [input, setInput] = useState<GrowthPlanInput>(emptyInput);
  const [plan, setPlan] = useState<GrowthPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const { status: sessionStatus } = useSession();

  function update<K extends keyof GrowthPlanInput>(key: K, value: GrowthPlanInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function loadDemo() {
    setInput(demoGrowthPlanInput);
    setPlan(null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setPlan(buildDemoGrowthPlan(input));
    setIsGenerating(false);
  }

  if (plan) {
    return <GrowthPlanReport locale={locale} plan={plan} onBack={() => setPlan(null)} />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
      <aside className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8 lg:sticky lg:top-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">AI Global Growth Copilot</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-primary sm:text-4xl">Where do you want to grow?</h1>
        <p className="mt-4 text-base leading-7 text-secondary">
          Tell GoAI about your business and target market. We&apos;ll turn your context into a structured global growth plan.
        </p>
        <div className="mt-6 rounded-3xl border border-border bg-background p-5">
          <p className="text-sm font-semibold text-primary">What you&apos;ll get</p>
          <div className="mt-4 grid gap-3 text-sm text-secondary">
            {["Market opportunity", "Target customers", "Entry strategy", "Customer acquisition", "AI stack", "90-day action plan"].map((item) => (
              <div className="flex items-center gap-3" key={item}>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="focus-ring mt-5 w-full rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-brand/30 hover:text-brand" onClick={loadDemo} type="button">
          Load competition demo
        </button>
      </aside>

      <form className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8" onSubmit={submit}>
        <div className="mb-8">
          <p className="text-sm font-semibold text-brand">Build your plan</p>
          <h2 className="mt-2 text-2xl font-semibold text-primary">Company & market context</h2>
          <p className="mt-2 text-sm leading-6 text-secondary">V1 uses a structured demo engine. The live AI provider will plug into the same flow later.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Company name"><input className="admin-input" onChange={(e) => update("companyName", e.target.value)} required value={input.companyName} /></Field>
          <Field label="Industry"><input className="admin-input" onChange={(e) => update("industry", e.target.value)} required value={input.industry} /></Field>
          <Field label="Product / service"><input className="admin-input" onChange={(e) => update("product", e.target.value)} required value={input.product} /></Field>
          <Field label="Current country"><input className="admin-input" onChange={(e) => update("currentCountry", e.target.value)} required value={input.currentCountry} /></Field>
          <Field label="Target country"><input className="admin-input" onChange={(e) => update("targetCountry", e.target.value)} required value={input.targetCountry} /></Field>
          <Field label="Primary goal"><input className="admin-input" onChange={(e) => update("goal", e.target.value)} required value={input.goal} /></Field>
          <Field label="Budget range"><input className="admin-input" onChange={(e) => update("budget", e.target.value)} placeholder="e.g. $50k-$100k" value={input.budget} /></Field>
          <Field label="Additional context"><input className="admin-input" onChange={(e) => update("context", e.target.value)} placeholder="Export experience, constraints, timeline..." value={input.context} /></Field>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-secondary">No payment required for the V1 demo. Your data is not sent to an external AI provider yet.</p>
          <button className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60" disabled={isGenerating} type="submit">
            {isGenerating ? "Building your plan..." : "Build My Growth Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return <label className="grid gap-2"><span className="text-sm font-semibold text-primary">{label}</span>{children}</label>;
}

function GrowthPlanReport({ locale, plan, onBack }: { locale: Locale; plan: GrowthPlan; onBack: () => void }) {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <button className="focus-ring mb-4 rounded-full text-sm font-semibold text-brand" onClick={onBack} type="button">← Edit business context</button>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Global Growth Plan</p>
          <h1 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">{plan.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-secondary">{plan.executiveSummary}</p>
        </div>
        <div className="grid min-w-[280px] grid-cols-2 gap-3">
          <Metric label="Opportunity" value={`${plan.opportunityScore}/10`} />
          <Metric label="Strategy" value="Distributor-first" />
        </div>
      </div>

      <div className="grid gap-5">
        <Section index="01" title="Executive Summary"><p className="leading-7 text-secondary">{plan.executiveSummary}</p></Section>
        <Section index="02" title="Market Opportunity"><BulletList items={plan.marketOpportunity} /></Section>
        <Section index="03" title="Target Customers"><div className="grid gap-3 sm:grid-cols-2">{plan.targetCustomers.map((item) => <InfoBlock key={item.name} title={item.name} body={item.rationale} />)}</div></Section>
        <Section index="04" title="Competitor Intelligence"><div className="grid gap-3 sm:grid-cols-3">{plan.competitors.map((item) => <InfoBlock key={item.segment} title={item.segment} body={item.insight} />)}</div></Section>
        <Section index="05" title="Entry Strategy"><BulletList items={plan.entryStrategy} /></Section>
        <Section index="06" title="Customer Acquisition"><div className="grid gap-3">{plan.customerAcquisition.map((item) => <div className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-[1fr_auto] sm:items-center" key={item.channel}><div><p className="font-semibold text-primary">{item.channel}</p><p className="mt-1 text-sm leading-6 text-secondary">{item.note}</p></div><span className="w-fit rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-brand">{item.priority}</span></div>)}</div></Section>
        <Section index="07" title="Localization Strategy"><BulletList items={plan.localization} /></Section>
        <Section index="08" title="Your AI Growth Stack"><div className="grid gap-3 sm:grid-cols-2">{plan.aiStack.map((item) => <InfoBlock key={item.job} title={item.job} body={item.tools} />)}</div></Section>
        <Section index="09" title="Key Risks"><BulletList items={plan.risks} /></Section>
        <Section index="10" title="90-Day Action Plan"><div className="grid gap-4 lg:grid-cols-3">{plan.actionPlan.map((phase) => <div className="rounded-3xl border border-border bg-background p-5" key={phase.phase}><p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{phase.days}</p><h3 className="mt-2 text-xl font-semibold text-primary">{phase.phase}</h3><div className="mt-4"><BulletList items={phase.actions} /></div></div>)}</div></Section>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-brand/20 bg-brand/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="font-semibold text-primary">Save this plan to your Workspace</p><p className="mt-1 text-sm text-secondary">Signed-in users can persist Growth Plans in Supabase and reopen them later.</p></div>
        <div className="flex flex-wrap gap-2">
          {sessionStatus === "authenticated" ? (
            <button className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white disabled:opacity-60" disabled={saveStatus === "saving" || saveStatus === "saved"} onClick={async () => {
              setSaveStatus("saving");
              const response = await fetch("/api/growth-plans", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ plan }) });
              setSaveStatus(response.ok ? "saved" : "error");
            }} type="button">{saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Save Growth Plan"}</button>
          ) : (
            <Link className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white" href={`/${locale}?login=1&callbackUrl=${encodeURIComponent(`/${locale}/growth`)}`}>Sign in to save</Link>
          )}
          <Link className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-primary" href={`/${locale}/workspace`}>Open Workspace</Link>
        </div>
      </div>
    </div>
  );
}

function Section({ children, index, title }: { children: React.ReactNode; index: string; title: string }) {
  return <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8"><div className="mb-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">{index}</span><h2 className="text-xl font-semibold text-primary sm:text-2xl">{title}</h2></div>{children}</section>;
}

function BulletList({ items }: { items: string[] }) {
  return <div className="grid gap-3">{items.map((item) => <div className="flex gap-3 text-sm leading-6 text-secondary" key={item}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span>{item}</span></div>)}</div>;
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return <div className="rounded-2xl border border-border bg-background p-4"><p className="font-semibold text-primary">{title}</p><p className="mt-2 text-sm leading-6 text-secondary">{body}</p></div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-border bg-background p-4"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary">{label}</p><p className="mt-2 text-lg font-semibold text-primary">{value}</p></div>;
}
