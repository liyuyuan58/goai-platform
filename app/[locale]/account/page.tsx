import { ProtectedAccountPage } from "@/components/auth/protected-account-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createSeoMetadata({
    canonicalPath: `/${locale}/account`,
    description: "Manage your GoAI account profile and member status.",
    locale,
    title: "Account | GoAI"
  });
}

export default async function AccountPage({ params }: PageProps) {
  const { locale } = await params;
  return <ProtectedAccountPage kind="account" locale={locale} />;
}
