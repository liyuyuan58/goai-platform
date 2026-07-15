import { ProtectedAccountPage } from "@/components/auth/protected-account-page";
import type { Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: Locale }> };

export default async function WorkspacePage({ params }: PageProps) {
  const { locale } = await params;
  return <ProtectedAccountPage kind="workspace" locale={locale} />;
}
