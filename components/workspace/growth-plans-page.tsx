"use client";

import { AuthenticatedLayout } from "@/components/auth/authenticated-layout";
import { MyGrowthPlans } from "@/components/workspace/my-growth-plans";
import type { Locale } from "@/lib/i18n";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function GrowthPlansPage({ locale }: { locale: Locale }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const callbackUrl = `/${locale}/workspace/growth-plans`;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [callbackUrl, router, status]);

  if (status === "loading" || !session?.user) {
    return (
      <main className="min-h-screen bg-background">
        <section className="container-page py-16">
          <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
            <p className="text-sm font-semibold text-primary">Preparing your Growth Plans...</p>
            <p className="mt-2 text-sm text-secondary">Checking your account session.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <AuthenticatedLayout
      active="growth-plans"
      description="Your saved market-entry strategies, opportunity scores and 90-day execution plans."
      locale={locale}
      session={session}
      title="My Growth Plans"
    >
      <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-brand/20 bg-brand/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-primary">Turn market research into an execution history.</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            Every saved plan stays attached to your account and can be reopened from this workspace.
          </p>
        </div>
        <a
          className="focus-ring inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white"
          href={`/${locale}/growth`}
        >
          New Growth Plan
        </a>
      </div>

      <section className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
        <MyGrowthPlans locale={locale} />
      </section>
    </AuthenticatedLayout>
  );
}
