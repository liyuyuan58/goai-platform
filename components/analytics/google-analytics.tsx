"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { isAdminAnalyticsPath } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstView = useRef(true);
  const isAdminPath = isAdminAnalyticsPath(pathname);

  useEffect(() => {
    if (isAdminPath) {
      return;
    }

    if (isFirstView.current) {
      isFirstView.current = false;
      return;
    }

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    sendGAEvent("event", "page_view", {
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath,
      page_title: document.title
    });
  }, [isAdminPath, pathname, searchParams]);

  if (isAdminPath) {
    return null;
  }

  return <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />;
}

export function GoogleAnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
}
