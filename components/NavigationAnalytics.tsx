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

      const isNetworkSite = href.startsWith("https://") && !href.includes("flightdealsflorida.org");
      const isAirportGuide = href.includes("airport-guide");
      const isRouteLink = href.includes("flight") || href.includes("airport") || href.includes("travel") || href.includes("getaway");

      trackEvent({
        action: isNetworkSite ? "network_site_click" : isAirportGuide ? "airport_guide_click" : isRouteLink ? "route_click" : "navigation_click",
        category: "navigation",
        label: link.textContent?.trim() || href,
        params: {
          href,
          source_site: "flightdealsflorida.org",
          page_path: window.location.pathname
        }
      });
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
