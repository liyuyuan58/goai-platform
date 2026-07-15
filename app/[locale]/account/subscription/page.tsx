import type { Locale } from "@/lib/i18n";
import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ locale: Locale }> };

export default async function LegacyAccountSubscriptionPage({ params }: PageProps) {
  const { locale } = await params;
  redirect(`/${locale}/subscription`);
}
