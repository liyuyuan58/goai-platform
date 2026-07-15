"use client";

import { AuthenticatedLayout } from "@/components/auth/authenticated-layout";
import type { Locale } from "@/lib/i18n";
import {
  getCurrentUser,
  getGreeting,
  getLatestNews,
  getRecentActivity,
  getSavedTools
} from "@/lib/workspace-service";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type AccountPageKind = "account" | "dashboard" | "settings" | "subscription" | "workspace";

type ProtectedAccountPageProps = {
  kind: AccountPageKind;
  locale: Locale;
};

const callbackPaths: Record<AccountPageKind, string> = {
  account: "/account",
  dashboard: "/dashboard",
  settings: "/settings",
  subscription: "/subscription",
  workspace: "/workspace"
};

export function ProtectedAccountPage({ kind, locale }: ProtectedAccountPageProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const callbackUrl = `/${locale}${callbackPaths[kind]}`;

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
            <p className="text-sm font-semibold text-primary">Preparing your GoAI workspace...</p>
            <p className="mt-2 text-sm text-secondary">Checking your account session.</p>
          </div>
        </section>
      </main>
    );
  }

  if (kind === "workspace" || kind === "dashboard") {
    return <WorkspaceDashboard locale={locale} session={session} />;
  }

  if (kind === "subscription") {
    return <SubscriptionPage locale={locale} session={session} />;
  }

  if (kind === "settings") {
    return <SettingsPage locale={locale} session={session} />;
  }

  return <AccountPage locale={locale} session={session} />;
}

function WorkspaceDashboard({
  locale,
  session
}: {
  locale: Locale;
  session: Session;
}) {
  const user = getCurrentUser(session);
  const recentActivity = getRecentActivity();
  const savedTools = getSavedTools();
  const latestNews = getLatestNews(locale);
  const greeting = getGreeting();

  return (
    <AuthenticatedLayout
      active="workspace"
      description="Your starting point for AI tools, saved resources, subscription controls and global growth workflows."
      locale={locale}
      session={session}
      title="Workspace"
    >
      <section className="mb-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand">Welcome back,</p>
            <h2 className="mt-2 text-3xl font-semibold text-primary">{user.name}</h2>
            <p className="mt-2 text-sm text-secondary">{greeting}</p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">
            {user.avatar ? (
              <img
                alt={user.name}
                className="h-14 w-14 rounded-full object-cover"
                src={user.avatar}
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                {user.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-primary">{user.name}</p>
              <p className="text-sm text-secondary">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <WorkspaceCard title="My Account" action={<CardLink href={`/${locale}/account`}>Edit Profile</CardLink>}>
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover"
                src={user.avatar}
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-xl font-bold text-white">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-semibold text-primary">{user.name}</p>
              <p className="truncate text-sm text-secondary">{user.email}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm">
            <InfoRow label="Provider" value={user.provider} />
            <InfoRow label="Member" value={user.memberPlan} />
          </div>
        </WorkspaceCard>

        <WorkspaceCard title="Recent Activity" id="activity">
          <div className="grid gap-3">
            {recentActivity.map((item) => (
              <div
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-3"
                key={item.label}
              >
                <span className="text-sm font-semibold text-primary">{item.label}</span>
                <span className="text-xs font-medium text-secondary">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </WorkspaceCard>

        <WorkspaceCard title="Saved Tools" id="saved-tools">
          {savedTools.length > 0 ? (
            <div className="grid gap-3">
              {savedTools.map((tool) => (
                <Link
                  className="focus-ring rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-primary"
                  href={`/${locale}/tools/${tool.slug}`}
                  key={tool.slug}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-background p-5">
              <p className="text-sm font-semibold text-primary">No saved tools yet.</p>
              <Link
                className="focus-ring mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
                href={`/${locale}/tools`}
              >
                Explore AI Tools
              </Link>
            </div>
          )}
        </WorkspaceCard>

        <WorkspaceCard title="Subscription" action={<CardLink href={`/${locale}/pricing`}>Upgrade</CardLink>}>
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-sm text-secondary">Current Plan</p>
            <p className="mt-2 text-3xl font-semibold text-primary">Free</p>
          </div>
        </WorkspaceCard>

        <WorkspaceCard title="Quick Access">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "AI Tools", href: "/tools" },
              { label: "Playbooks", href: "/playbooks" },
              { label: "Regions", href: "/regions" },
              { label: "Resources", href: "/resources" }
            ].map((item) => (
              <Link
                className="focus-ring rounded-2xl border border-border bg-background px-4 py-4 text-sm font-semibold text-primary transition hover:border-brand/30 hover:bg-white"
                href={`/${locale}${item.href}`}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </WorkspaceCard>

        <WorkspaceCard title="Latest News">
          {latestNews.length > 0 ? (
            <div className="grid gap-3">
              {latestNews.map((post) => (
                <Link
                  className="focus-ring rounded-2xl border border-border bg-background p-4 transition hover:border-brand/30 hover:bg-white"
                  href={post.href}
                  key={post.href}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                    {post.date}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-primary">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-secondary">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-secondary">No news available yet.</p>
          )}
        </WorkspaceCard>
      </div>
    </AuthenticatedLayout>
  );
}

function AccountPage({
  locale,
  session
}: {
  locale: Locale;
  session: Session;
}) {
  const user = getCurrentUser(session);

  return (
    <AuthenticatedLayout
      active="account"
      description="Manage your GoAI profile and prepare for saved tools, AI workspaces and membership features."
      locale={locale}
      session={session}
      title="My Account"
    >
      <WorkspaceCard title="Profile" action={<CardLink href={`/${locale}/settings`}>Edit Profile</CardLink>}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {user.avatar ? (
            <img alt={user.name} className="h-20 w-20 rounded-full object-cover" src={user.avatar} />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-2xl font-bold text-white">
              {user.name.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold text-primary">{user.name}</h2>
            <p className="mt-2 text-sm text-secondary">{user.email}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <InfoRow label="Provider" value={user.provider} />
          <InfoRow label="Member" value={user.memberPlan} />
        </div>
      </WorkspaceCard>
    </AuthenticatedLayout>
  );
}

function SubscriptionPage({
  locale,
  session
}: {
  locale: Locale;
  session: Session;
}) {
  const user = getCurrentUser(session);

  return (
    <AuthenticatedLayout
      active="subscription"
      description="Review your current plan, usage placeholders and future billing controls."
      locale={locale}
      session={session}
      title="Subscription"
    >
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <WorkspaceCard title="Current Plan" action={<CardLink href={`/${locale}/pricing`}>Upgrade</CardLink>}>
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-sm text-secondary">Current Plan</p>
            <p className="mt-2 text-4xl font-semibold text-primary">
              {user.memberPlan.replace(" Plan", "")}
            </p>
            <p className="mt-3 text-sm leading-6 text-secondary">
              Upgrade to unlock unlimited bookmarks, AI playbooks, premium resources and weekly
              market insights.
            </p>
          </div>
        </WorkspaceCard>

        <WorkspaceCard title="Usage">
          <div className="grid gap-3 text-sm">
            <InfoRow label="Bookmarks" value="Limited" />
            <InfoRow label="Saved Tools" value="0" />
            <InfoRow label="Member Since" value="Today" />
          </div>
        </WorkspaceCard>
      </div>
    </AuthenticatedLayout>
  );
}

function SettingsPage({
  locale,
  session
}: {
  locale: Locale;
  session: Session;
}) {
  const settings = [
    { description: "Default language for GoAI pages and future workspace content.", title: "Language", value: "English" },
    { description: "Choose the visual theme for your workspace.", title: "Theme", value: "Light" },
    { description: "Control product and activity updates.", title: "Notifications", value: "Enabled" },
    { description: "Manage data and visibility preferences.", title: "Privacy", value: "Standard" },
    { description: "Review identity, provider and account details.", title: "Account", value: "Google" }
  ];

  return (
    <AuthenticatedLayout
      active="settings"
      description="Set up your workspace preferences. These controls are visual placeholders until database persistence is connected."
      locale={locale}
      session={session}
      title="Settings"
    >
      <div className="grid gap-4">
        {settings.map((item) => (
          <div
            className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            key={item.title}
          >
            <div>
              <h2 className="text-lg font-semibold text-primary">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-secondary">{item.description}</p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-primary">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}

function WorkspaceCard({
  action,
  children,
  id,
  title
}: {
  action?: ReactNode;
  children: ReactNode;
  id?: string;
  title: string;
}) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6" id={id}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-primary">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function CardLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      className="focus-ring inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-white px-4 text-sm font-semibold text-primary transition hover:border-brand/30 hover:text-brand"
      href={href}
    >
      {children}
    </Link>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-3">
      <span className="text-secondary">{label}</span>
      <span className="font-semibold capitalize text-primary">{value}</span>
    </div>
  );
}
