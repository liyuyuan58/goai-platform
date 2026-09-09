"use client";

import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { useEffect, useState } from "react";

type SavedPlanSummary = {
  id: string;
  title: string;
  company_name: string;
  current_country: string;
  target_country: string;
  opportunity_score: number | null;
  created_at: string;
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function MyGrowthPlans({ locale }: { locale: Locale }) {
  const [plans, setPlans] = useState<SavedPlanSummary[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadPlans() {
      try {
        const response = await fetch("/api/growth-plans", { cache: "no-store" });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const data = await response.json();

        if (!cancelled) {
          setPlans(Array.isArray(data.plans) ? data.plans : []);
          setStatus("ready");
        }
      } catch (error) {
        console.error("[workspace][growth-plans]", error);
        if (!cancelled) setStatus("error");
      }
    }

    loadPlans();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="rounded-2xl border border-border bg-background p-5">
        <p className="text-sm font-semibold text-primary">Loading your Growth Plans...</p>
        <p className="mt-2 text-sm text-secondary">Fetching saved market-entry work from your workspace.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background p-5">
        <p className="text-sm font-semibold text-primary">Unable to load Growth Plans.</p>
        <p className="mt-2 text-sm text-secondary">Refresh the page and try again.</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background p-5">
        <p className="text-sm font-semibold text-primary">No Growth Plans yet.</p>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Build your first market-entry plan and save it to this workspace.
        </p>
        <Link
          className="focus-ring mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white"
          href={`/${locale}/growth`}
        >
          Build My Growth Plan
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {plans.map((plan) => (
        <article
          className="rounded-2xl border border-border bg-background p-4 transition hover:border-brand/30 hover:bg-white"
          key={plan.id}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  Opportunity {plan.opportunity_score ?? "—"}/10
                </span>
                <span className="text-xs font-medium text-secondary">{formatDate(plan.created_at)}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-primary">{plan.title}</h3>
              <p className="mt-1 text-sm font-medium text-secondary">{plan.company_name}</p>
              <p className="mt-2 text-sm text-secondary">
                {plan.current_country} → {plan.target_country}
              </p>
            </div>

            <Link
              className="focus-ring inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-primary transition hover:border-brand/30 hover:text-brand"
              href={`/${locale}/growth-plans/${plan.id}`}
            >
              Open Plan
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
