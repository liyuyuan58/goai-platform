"use client";

import { AuthenticatedLayout } from "@/components/auth/authenticated-layout";
import type { GrowthPlan } from "@/lib/growth-plan";
import type { Locale } from "@/lib/i18n";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type SavedPlanRecord = {
  id: string;
  title: string;
  company_name: string;
  current_country: string;
  target_country: string;
  opportunity_score: number | null;
  created_at: string;
  plan_data: GrowthPlan;
};

export function SavedGrowthPlan({ id, locale }: { id: string; locale: Locale }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [record, setRecord] = useState<SavedPlanRecord | null>(null);
  const [loadStatus, setLoadStatus] = useState<"loading" | "ready" | "error" | "missing">("loading");
  const callbackUrl = `/${locale}/growth-plans/${id}`;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [callbackUrl, router, status]);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;

    async function loadPlan() {
      try {
        const response = await fetch(`/api/growth-plans/${encodeURIComponent(id)}`, { cache: "no-store" });

        if (response.status === 404) {
          if (!cancelled) setLoadStatus("missing");
          return;
        }

        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const data = await response.json();

        if (!cancelled) {
          setRecord(data.plan ?? null);
          setLoadStatus(data.plan ? "ready" : "missing");
        }
      } catch (error) {
        console.error("[saved-growth-plan]", error);
        if (!cancelled) setLoadStatus("error");
      }
    }

    loadPlan();
    return () => {
      cancelled = true;
    };
  }, [id, status]);

  if (status === "loading" || !session?.user) {
    return <LoadingScreen text="Preparing your saved Growth Plan..." />;
  }

  if (loadStatus === "loading") {
    return (
      <AuthenticatedLayout
        active="growth-plans"
        locale={locale}
        session={session}
        title="Loading Growth Plan"
      >
        <PlanMessage title="Loading your saved plan..." body="Fetching the latest saved version from your workspace." />
      </AuthenticatedLayout>
    );
  }

  if (loadStatus === "missing" || !record) {
    return (
      <AuthenticatedLayout
        active="growth-plans"
        locale={locale}
        session={session}
        title="Growth Plan"
      >
        <PlanMessage
          title="Growth Plan not found."
          body="This plan may have been removed or it does not belong to the signed-in account."
          action={<LinkButton href={`/${locale}/workspace/growth-plans`}>Back to My Growth Plans</LinkButton>}
        />
      </AuthenticatedLayout>
    );
  }

  if (loadStatus === "error") {
    return (
      <AuthenticatedLayout
        active="growth-plans"
        locale={locale}
        session={session}
        title="Growth Plan"
      >
        <PlanMessage
          title="Unable to load this Growth Plan."
          body="Refresh the page or return to your workspace and try again."
          action={<LinkButton href={`/${locale}/workspace/growth-plans`}>Back to My Growth Plans</LinkButton>}
        />
      </AuthenticatedLayout>
    );
  }

  const plan = record.plan_data;

  return (
    <AuthenticatedLayout
      active="growth-plans"
      description={`${record.company_name} · ${record.current_country} → ${record.target_country}`}
      locale={locale}
      session={session}
      title={record.title}
    >
      <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            Opportunity {record.opportunity_score ?? plan.opportunityScore}/10
          </span>
          <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-secondary">
            Saved plan
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <LinkButton href={`/${locale}/workspace/growth-plans`}>My Growth Plans</LinkButton>
          <Link
            className="focus-ring inline-flex min-h-10 items-center justify-center rounded-full bg-brand px-4 text-sm font-semibold text-white"
            href={`/${locale}/growth`}
          >
            Build New Plan
          </Link>
        </div>
      </div>

      <div className="grid gap-5">
        <ReportSection index="01" title="Executive Summary">
          <p className="leading-7 text-secondary">{plan.executiveSummary}</p>
        </ReportSection>

        <ReportSection index="02" title="Market Opportunity">
          <BulletList items={plan.marketOpportunity} />
        </ReportSection>

        <ReportSection index="03" title="Target Customers">
          <div className="grid gap-3 sm:grid-cols-2">
            {plan.targetCustomers.map((item) => (
              <InfoBlock body={item.rationale} key={item.name} title={item.name} />
            ))}
          </div>
        </ReportSection>

        <ReportSection index="04" title="Competitor Intelligence">
          <div className="grid gap-3 sm:grid-cols-3">
            {plan.competitors.map((item) => (
              <InfoBlock body={item.insight} key={item.segment} title={item.segment} />
            ))}
          </div>
        </ReportSection>

        <ReportSection index="05" title="Entry Strategy">
          <BulletList items={plan.entryStrategy} />
        </ReportSection>

        <ReportSection index="06" title="Customer Acquisition">
          <div className="grid gap-3">
            {plan.customerAcquisition.map((item) => (
              <div
                className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                key={item.channel}
              >
                <div>
                  <p className="font-semibold text-primary">{item.channel}</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">{item.note}</p>
                </div>
                <span className="w-fit rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-brand">
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </ReportSection>

        <ReportSection index="07" title="Localization Strategy">
          <BulletList items={plan.localization} />
        </ReportSection>

        <ReportSection index="08" title="Your AI Growth Stack">
          <div className="grid gap-3 sm:grid-cols-2">
            {plan.aiStack.map((item) => (
              <InfoBlock body={item.tools} key={item.job} title={item.job} />
            ))}
          </div>
        </ReportSection>

        <ReportSection index="09" title="Key Risks">
          <BulletList items={plan.risks} />
        </ReportSection>

        <ReportSection index="10" title="90-Day Action Plan">
          <div className="grid gap-4 lg:grid-cols-3">
            {plan.actionPlan.map((phase) => (
              <div className="rounded-3xl border border-border bg-background p-5" key={phase.phase}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{phase.days}</p>
                <h3 className="mt-2 text-xl font-semibold text-primary">{phase.phase}</h3>
                <div className="mt-4">
                  <BulletList items={phase.actions} />
                </div>
              </div>
            ))}
          </div>
        </ReportSection>
      </div>
    </AuthenticatedLayout>
  );
}

function LoadingScreen({ text }: { text: string }) {
  return (
    <main className="min-h-screen bg-background">
      <section className="container-page py-16">
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
          <p className="text-sm font-semibold text-primary">{text}</p>
        </div>
      </section>
    </main>
  );
}

function PlanMessage({
  action,
  body,
  title
}: {
  action?: ReactNode;
  body: string;
  title: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-secondary">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

function LinkButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      className="focus-ring inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-white px-4 text-sm font-semibold text-primary transition hover:border-brand/30 hover:text-brand"
      href={href}
    >
      {children}
    </Link>
  );
}

function ReportSection({
  children,
  index,
  title
}: {
  children: ReactNode;
  index: string;
  title: string;
}) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
          {index}
        </span>
        <h2 className="text-xl font-semibold text-primary sm:text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div className="flex gap-3 text-sm leading-6 text-secondary" key={item}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function InfoBlock({ body, title }: { body: string; title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="font-semibold text-primary">{title}</p>
      <p className="mt-2 text-sm leading-6 text-secondary">{body}</p>
    </div>
  );
}
