"use client";

import { isAdminAnalyticsPath } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (isAdminAnalyticsPath(pathname)) {
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
