import { auth } from "@/auth";
import { AccountShell } from "@/components/auth/account-shell";
import type { Locale } from "@/lib/i18n";
import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ locale: Locale }> };

export default async function WorkspacePage({ params }: PageProps) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}?login=1&callbackUrl=/${locale}/workspace`);
  }

  return (
    <AccountShell
      description="AI Workspace is reserved for future saved prompts, generated outputs and workflow history."
      eyebrow="AI Workspace"
      locale={locale}
      session={session}
      title="Workspace"
    >
      <h2 className="text-2xl font-semibold text-primary">Workspace Access</h2>
      <p className="mt-3 text-sm leading-6 text-secondary">
        This protected area confirms authentication is ready for future AI workspace features.
      </p>
    </AccountShell>
  );
}
