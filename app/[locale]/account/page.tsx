import { auth } from "@/auth";
import { AccountShell } from "@/components/auth/account-shell";
import type { Locale } from "@/lib/i18n";
import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ locale: Locale }> };

export default async function AccountPage({ params }: PageProps) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}?login=1&callbackUrl=/${locale}/account`);
  }

  return (
    <AccountShell
      description="Manage your GoAI profile and prepare for saved tools, AI workspaces and membership features."
      eyebrow="Account"
      locale={locale}
      session={session}
      title="My Account"
    >
      <h2 className="text-2xl font-semibold text-primary">Profile</h2>
      <p className="mt-3 text-sm leading-6 text-secondary">
        Your account is active. Future releases will add saved AI tools, workspace history and
        billing controls here.
      </p>
    </AccountShell>
  );
}
