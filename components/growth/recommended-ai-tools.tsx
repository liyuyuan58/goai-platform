"use client";

import type { GrowthPlan } from "@/lib/growth-plan";
import type { Locale } from "@/lib/i18n";
import { recommendGrowthTools } from "@/lib/growth-tool-recommendations";
import Link from "next/link";

export function RecommendedAiTools({ plan, locale }: { plan: GrowthPlan; locale: Locale }) {
  const tools = recommendGrowthTools(plan);

  return (
    <section className="rounded-[2rem] border border-brand/20 bg-brand/5 p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-brand">Execution Layer</p>
          <h2 className="mt-2 text-2xl font-semibold text-primary">Recommended AI Tools</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-secondary">
            GoAI matches your Growth Plan with tools that can help execute the next steps.
          </p>
        </div>
        <Link className="text-sm font-semibold text-brand" href={`/${locale}/tools`}>
          Explore all AI Tools →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {tools.map((tool, index) => (
          <article className="rounded-3xl border border-border bg-white p-5" key={tool.slug}>
            <div className="flex justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[.1em] text-brand">{tool.category}</span>
                <h3 className="mt-2 text-xl font-semibold text-primary">{tool.name}</h3>
              </div>
              <span className="h-fit rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                #{index + 1} match
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold text-primary">{tool.task}</p>
            <p className="mt-2 text-sm leading-6 text-secondary">{tool.reason}</p>

            <Link
              className="mt-5 inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm font-semibold text-primary"
              href={`/${locale}/tools/${tool.slug}`}
            >
              View Tool
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-brand/30 bg-white/70 p-4">
        <p className="text-sm font-semibold text-primary">Next: AI Agents + Forward Deployed AI</p>
        <p className="mt-1 text-sm leading-6 text-secondary">
          When tools are not enough, GoAI will orchestrate agents and human + AI deployment for complex enterprise execution.
        </p>
      </div>
    </section>
  );
}
