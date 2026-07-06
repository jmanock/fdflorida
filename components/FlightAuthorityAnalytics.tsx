"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function FlightAuthorityAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href") ?? "";
        const action = href.includes("-vs-") ? "comparison_page_click" : href.includes("google-flights-") || href.includes("airport") ? "airport_hub_click" : "related_guide_click";
        const ctaText = link.textContent?.trim().slice(0, 100);
        if (href.startsWith("/")) {
          const params = { page: location.pathname, source_page: location.pathname, target_page: href, destination_url: href, cta_text: ctaText };
          trackEvent({ action, category: "flight_authority", params });
          trackEvent({ action: "internal_related_click", category: "engagement", params });
        }
        if (link.className.includes("btn") || link.getAttribute("href")?.startsWith("#")) {
          trackEvent({ action: "cta_click", category: "engagement", params: { page: location.pathname, destination_url: href, cta_text: ctaText } });
        }
      }
      const row = target.closest("tbody tr");
      if (row) {
        trackEvent({
          action: "table_click",
          category: "engagement",
          params: {
            page: location.pathname,
            table_text: row.textContent?.trim().slice(0, 160)
          }
        });
      }
      const summary = target.closest("summary");
      if (summary) {
        trackEvent({ action: "faq_expand", category: "engagement", params: { page: location.pathname, question: summary.textContent?.trim().slice(0, 120) } });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
