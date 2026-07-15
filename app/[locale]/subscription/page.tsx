import { auth } from "@/auth";
import { AccountShell } from "@/components/auth/account-shell";
import type { Locale } from "@/lib/i18n";
import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ locale: Locale }> };

export default async function SubscriptionPage({ params }: PageProps) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}?login=1&callbackUrl=/${locale}/subscription`);
  }

  return (
    <AccountShell
      description="Your current plan is ready for future paid membership and subscription management."
      eyebrow="Subscription"
      locale={locale}
      session={session}
      title="Subscription"
    >
      <h2 className="text-2xl font-semibold text-primary">Free Plan</h2>
      <p className="mt-3 text-sm leading-6 text-secondary">
        GoAI membership and payment controls will be connected in a future sprint.
      </p>
    </AccountShell>
  );
}
