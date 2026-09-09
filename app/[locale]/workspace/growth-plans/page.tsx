import { GrowthPlansPage } from "@/components/workspace/growth-plans-page";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createSeoMetadata({
    canonicalPath: `/${locale}/workspace/growth-plans`,
    description: "Review and reopen your saved GoAI Global Growth Plans.",
    locale,
    title: "My Growth Plans | GoAI"
  });
}

export default async function WorkspaceGrowthPlansPage({ params }: PageProps) {
  const { locale } = await params;
  return <GrowthPlansPage locale={locale} />;
}
