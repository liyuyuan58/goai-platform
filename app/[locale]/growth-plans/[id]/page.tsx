import { SavedGrowthPlan } from "@/components/growth/saved-growth-plan";
import type { Locale } from "@/lib/i18n";
import { createSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string; locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createSeoMetadata({
    canonicalPath: `/${locale}/workspace/growth-plans`,
    description: "Review a saved GoAI Global Growth Plan.",
    locale,
    title: "Saved Growth Plan | GoAI"
  });
}

export default async function SavedGrowthPlanPage({ params }: PageProps) {
  const { id, locale } = await params;
  return <SavedGrowthPlan id={id} locale={locale} />;
}
