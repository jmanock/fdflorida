"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function FlightGuideAnalytics({ slug, isComparison }: { slug: string; isComparison: boolean }) {
  useEffect(() => {
    trackEvent({
      action: isComparison ? "flight_tool_comparison_view" : "flight_guide_view",
      category: "flight_guides",
      label: slug,
      params: {
        content_type: isComparison ? "flight_tool_comparison" : "flight_guide",
        page_path: window.location.pathname
      }
    });
  }, [isComparison, slug]);

  return null;
}
