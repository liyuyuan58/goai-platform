import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getAnalyticsData, getCmsData } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: Locale }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Admin CMS | GoAI",
    description: "GoAI internal content management system.",
    alternates: { canonical: `${siteUrl}/${locale}/admin` },
    robots: { index: false, follow: false }
  };
}

export default async function AdminPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getCmsData();
  const analytics = await getAnalyticsData();

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <AdminDashboard initialAnalytics={analytics} initialData={data} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
