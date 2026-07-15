"use client";

import { AccountShell } from "@/components/auth/account-shell";
import type { Locale } from "@/lib/i18n";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AccountPageKind = "account" | "dashboard" | "settings" | "subscription" | "workspace";

type ProtectedAccountPageProps = {
  kind: AccountPageKind;
  locale: Locale;
};

const pageConfig = {
  account: {
    callbackPath: "/account",
    description:
      "Manage your GoAI profile and prepare for saved tools, AI workspaces and membership features.",
    eyebrow: "Account",
    heading: "Profile",
    text:
      "Your account is active. Future releases will add saved AI tools, workspace history and billing controls here.",
    title: "My Account"
  },
  dashboard: {
    callbackPath: "/dashboard",
    description:
      "Your GoAI dashboard will become the command center for tools, playbooks and growth workflows.",
    eyebrow: "Dashboard",
    heading: "Workspace Overview",
    text: "Dashboard modules will be connected in future product sprints.",
    title: "Dashboard"
  },
  settings: {
    callbackPath: "/settings",
    description: "Manage profile and workspace preferences as GoAI account features expand.",
    eyebrow: "Settings",
    heading: "Account Settings",
    text: "Preference controls will be added as workspace and membership features go live.",
    title: "Settings"
  },
  subscription: {
    callbackPath: "/subscription",
    description:
      "Your current plan is ready for future paid membership and subscription management.",
    eyebrow: "Subscription",
    heading: "Free Plan",
    text: "GoAI membership and payment controls will be connected in a future sprint.",
    title: "Subscription"
  },
  workspace: {
    callbackPath: "/workspace",
    description:
      "AI Workspace is reserved for future saved prompts, generated outputs and workflow history.",
    eyebrow: "AI Workspace",
    heading: "Workspace Access",
    text:
      "This protected area confirms authentication is ready for future AI workspace features.",
    title: "Workspace"
  }
} satisfies Record<
  AccountPageKind,
  {
    callbackPath: string;
    description: string;
    eyebrow: string;
    heading: string;
    text: string;
    title: string;
  }
>;

export function ProtectedAccountPage({ kind, locale }: ProtectedAccountPageProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const config = pageConfig[kind];
  const callbackUrl = `/${locale}${config.callbackPath}`;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/${locale}?login=1&callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [callbackUrl, locale, router, status]);

  if (status === "loading" || !session?.user) {
    return (
      <AccountShell
        description="Checking your GoAI account session."
        eyebrow="Account"
        locale={locale}
        session={null}
        title="Loading"
      >
        <p className="text-sm leading-6 text-secondary">Preparing your account page...</p>
      </AccountShell>
    );
  }

  return (
    <AccountShell
      description={config.description}
      eyebrow={config.eyebrow}
      locale={locale}
      session={session}
      title={config.title}
    >
      <h2 className="text-2xl font-semibold text-primary">{config.heading}</h2>
      <p className="mt-3 text-sm leading-6 text-secondary">{config.text}</p>
    </AccountShell>
  );
}
