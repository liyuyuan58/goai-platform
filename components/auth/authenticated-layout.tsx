"use client";

import { SiteHeader } from "@/components/layout/site-header";
import type { Locale } from "@/lib/i18n";
import type { Session } from "next-auth";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthenticatedSection = "account" | "activity" | "settings" | "subscription" | "tools" | "workspace";

type AuthenticatedLayoutProps = {
  active: AuthenticatedSection;
  children: ReactNode;
  description?: string;
  locale: Locale;
  session: Session;
  title: string;
};

const sidebarItems = [
  { key: "workspace", label: "Dashboard", href: "/workspace" },
  { key: "tools", label: "Saved Tools", href: "/workspace#saved-tools" },
  { key: "activity", label: "Activity", href: "/workspace#activity" },
  { key: "subscription", label: "Subscription", href: "/subscription" },
  { key: "settings", label: "Settings", href: "/settings" }
] satisfies Array<{ key: AuthenticatedSection; label: string; href: string }>;

export function AuthenticatedLayout({
  active,
  children,
  description,
  locale,
  session,
  title
}: AuthenticatedLayoutProps) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="min-h-screen border-b border-border bg-background">
        <section className="container-page py-8 sm:py-10">
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6 lg:hidden">
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <img
                  alt={session.user.name ?? "GoAI user"}
                  className="h-11 w-11 rounded-full object-cover"
                  src={session.user.image}
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {session.user.name?.charAt(0) ?? "G"}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-primary">{session.user.name}</p>
                <p className="text-xs text-secondary">{session.user.email}</p>
              </div>
            </div>
            <nav aria-label="Workspace navigation" className="flex gap-2 overflow-x-auto pb-1">
              {sidebarItems.map((item) => (
                <Link
                  className={`focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    item.key === active
                      ? "border-brand bg-brand text-white"
                      : "border-border bg-white text-secondary hover:text-primary"
                  }`}
                  href={`/${locale}${item.href}`}
                  key={item.key}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="sticky top-24 hidden self-start rounded-3xl border border-border bg-surface p-5 shadow-sm lg:block">
              <div className="flex items-center gap-3 border-b border-border pb-5">
                {session.user.image ? (
                  <img
                    alt={session.user.name ?? "GoAI user"}
                    className="h-12 w-12 rounded-full object-cover"
                    src={session.user.image}
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {session.user.name?.charAt(0) ?? "G"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-primary">{session.user.name}</p>
                  <p className="truncate text-xs text-secondary">{session.user.email}</p>
                </div>
              </div>
              <nav aria-label="Workspace sidebar" className="mt-5 grid gap-1">
                {sidebarItems.map((item) => (
                  <Link
                    className={`focus-ring rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      item.key === active
                        ? "bg-brand text-white shadow-sm"
                        : "text-secondary hover:bg-background hover:text-primary"
                    }`}
                    href={`/${locale}${item.href}`}
                    key={item.key}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-semibold leading-tight text-primary sm:text-4xl">
                  {title}
                </h1>
                {description ? (
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-secondary sm:text-base">
                    {description}
                  </p>
                ) : null}
              </div>
              {children}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
