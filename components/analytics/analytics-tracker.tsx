"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/en/admin") || pathname.startsWith("/zh/admin")) {
      return;
    }

    void fetch("/api/analytics", {
      body: JSON.stringify({ pathname }),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });
  }, [pathname]);

  return null;
}
