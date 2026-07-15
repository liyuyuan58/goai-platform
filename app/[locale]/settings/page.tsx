import { ProtectedAccountPage } from "@/components/auth/protected-account-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createSeoMetadata({
    canonicalPath: `/${locale}/settings`,
    description: "Manage GoAI workspace settings, privacy and account preferences.",
    locale,
    title: "Settings | GoAI"
  });
}

export default async function SettingsPage({ params }: PageProps) {
  const { locale } = await params;
  return <ProtectedAccountPage kind="settings" locale={locale} />;
}
