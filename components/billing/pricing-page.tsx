"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { trackEvent } from "@/lib/analytics-events";
import type { Locale } from "@/lib/i18n";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

type PricingPageProps = {
  locale: Locale;
};

const plans = [
  {
    cta: "Current Plan",
    features: [
      "Browse AI Tools",
      "Browse Regions",
      "Browse Resources",
      "Limited Bookmarks",
      "Community Updates"
    ],
    name: "Free",
    price: "$0"
  },
  {
    cta: "Upgrade to Pro",
    featured: true,
    features: [
      "Unlimited Bookmarks",
      "AI Playbooks",
      "Premium Resources",
      "Weekly Market Insights",
      "Priority Updates"
    ],
    name: "Pro",
    price: "$19/month"
  },
  {
    cta: "Contact Sales",
    features: [
      "Everything in Pro",
      "Team Workspace",
      "AI Workflow Templates",
      "Export Data",
      "API Access",
      "Priority Support"
    ],
    name: "Business",
    price: "$99/month"
  }
];

export function PricingPage({ locale }: PricingPageProps) {
  const { status } = useSession();
  const paypalLink = process.env.NEXT_PUBLIC_PAYPAL_LINK;
  const isAuthenticated = status === "authenticated";

  const handleUpgrade = () => {
    trackEvent("upgrade_click", { plan: "pro", source: "pricing" });

    if (!isAuthenticated) {
      trackEvent("pricing_click", { action: "login_required", plan: "pro" });
      window.alert("Please login first.");
      void signIn("google", {
        callbackUrl: `/${locale}/workspace`,
        redirectTo: `/${locale}/workspace`
      });
      return;
    }

    if (paypalLink) {
      trackEvent("pricing_click", { action: "paypal_redirect", plan: "pro" });
      window.location.href = paypalLink;
      return;
    }

    window.alert("Payment link is not configured yet.");
  };

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="border-b border-border bg-background py-16 sm:py-20 lg:py-24">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                Pricing
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">
                Choose the right GoAI plan
              </h1>
              <p className="mt-5 text-base leading-7 text-secondary sm:text-xl sm:leading-8">
                Start free, then upgrade when you need premium playbooks, resources and market
                insights for global growth.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  className={`relative flex min-h-[520px] flex-col rounded-3xl border p-6 shadow-sm transition sm:p-7 ${
                    plan.featured
                      ? "border-brand bg-white shadow-soft"
                      : "border-border bg-surface"
                  }`}
                  key={plan.name}
                >
                  {plan.featured ? (
                    <span className="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                      Recommended
                    </span>
                  ) : null}
                  <h2 className="text-2xl font-semibold text-primary">{plan.name}</h2>
                  <p className="mt-5 text-4xl font-semibold tracking-tight text-primary">
                    {plan.price}
                  </p>
                  <ul className="mt-7 grid gap-3">
                    {plan.features.map((feature) => (
                      <li className="flex gap-3 text-sm leading-6 text-secondary" key={feature}>
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ECFDF3] text-xs font-bold text-success">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    {plan.name === "Pro" ? (
                      <button
                        className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
                        onClick={handleUpgrade}
                        type="button"
                      >
                        {plan.cta}
                      </button>
                    ) : plan.name === "Business" ? (
                      <Link
                        className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-primary transition hover:border-brand/30 hover:text-brand"
                        href={`/${locale}/about#contact`}
                      >
                        {plan.cta}
                      </Link>
                    ) : (
                      <button
                        className="focus-ring inline-flex min-h-12 w-full cursor-default items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-secondary"
                        type="button"
                      >
                        {plan.cta}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
