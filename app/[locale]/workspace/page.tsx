import { ProtectedAccountPage } from "@/components/auth/protected-account-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createSeoMetadata({
    canonicalPath: `/${locale}/workspace`,
    description: "Access your GoAI workspace, saved tools, subscription and account controls.",
    locale,
    title: "Workspace | GoAI"
  });
}

export default async function WorkspacePage({ params }: PageProps) {
  const { locale } = await params;
  return <ProtectedAccountPage kind="workspace" locale={locale} />;
}
