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
        if (href.startsWith("/")) {
          trackEvent({ action, category: "flight_authority", params: { page: location.pathname, destination_url: href, cta_text: link.textContent?.trim().slice(0, 100) } });
        }
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
