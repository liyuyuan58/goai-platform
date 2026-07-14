import { auth } from "@/auth";
import { AccountShell } from "@/components/auth/account-shell";
import type { Locale } from "@/lib/i18n";
import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ locale: Locale }> };

export default async function DashboardPage({ params }: PageProps) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}?login=1&callbackUrl=/${locale}/dashboard`);
  }

  return (
    <AccountShell
      description="Your GoAI dashboard will become the command center for tools, playbooks and growth workflows."
      eyebrow="Dashboard"
      locale={locale}
      session={session}
      title="Dashboard"
    >
      <h2 className="text-2xl font-semibold text-primary">Workspace Overview</h2>
      <p className="mt-3 text-sm leading-6 text-secondary">
        Dashboard modules will be connected in future product sprints.
      </p>
    </AccountShell>
  );
}
