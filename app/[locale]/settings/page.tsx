import { auth } from "@/auth";
import { AccountShell } from "@/components/auth/account-shell";
import type { Locale } from "@/lib/i18n";
import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ locale: Locale }> };

export default async function SettingsPage({ params }: PageProps) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}?login=1&callbackUrl=/${locale}/settings`);
  }

  return (
    <AccountShell
      description="Manage profile and workspace preferences as GoAI account features expand."
      eyebrow="Settings"
      locale={locale}
      session={session}
      title="Settings"
    >
      <h2 className="text-2xl font-semibold text-primary">Account Settings</h2>
      <p className="mt-3 text-sm leading-6 text-secondary">
        Preference controls will be added as workspace and membership features go live.
      </p>
    </AccountShell>
  );
}
