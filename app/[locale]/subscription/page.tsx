import { ProtectedAccountPage } from "@/components/auth/protected-account-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createSeoMetadata({
    canonicalPath: `/${locale}/subscription`,
    description: "Review your GoAI plan, usage and future billing controls.",
    locale,
    title: "Subscription | GoAI"
  });
}

export default async function SubscriptionPage({ params }: PageProps) {
  const { locale } = await params;
  return <ProtectedAccountPage kind="subscription" locale={locale} />;
}
