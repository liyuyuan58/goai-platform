"use client";

import { isAdminAnalyticsPath } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { usePathname } from "next/navigation";

export function ClarityTracker() {
  const pathname = usePathname();

  if (!siteConfig.clarityProjectId || isAdminAnalyticsPath(pathname)) {
    return null;
  }

  const script = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${siteConfig.clarityProjectId}");
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
