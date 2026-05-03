"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function NavigationAnalytics() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");
      const href = link?.getAttribute("href");

      if (!link || !href || href.startsWith("#") || href.startsWith("mailto:") || link.target === "_blank") {
        return;
      }

      trackEvent({
        action: "navigation_click",
        category: "navigation",
        label: link.textContent?.trim() || href,
        params: {
          href,
          page_path: window.location.pathname
        }
      });
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
