"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function NewsletterCtaAnalytics({ placement }: { placement: string }) {
  useEffect(() => {
    trackEvent({ action: "newsletter_cta_view", category: "engagement", params: { placement, page_path: window.location.pathname } });
  }, [placement]);

  return null;
}
