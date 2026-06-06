import { trackClarityEvent } from "@/lib/clarity";

type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, string | number | boolean | undefined>;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", action: string, params?: Record<string, string | number | boolean | undefined>) => void;
    clarity?: (command: "event" | "set", name: string, value?: string) => void;
  }
}

export function trackEvent({ action, category, label, value, params }: AnalyticsEvent) {
  if (typeof window === "undefined") {
    return;
  }

  const eventParams: Record<string, string | number | boolean | undefined> = {
    site: "flightdealsflorida.org",
    source_site: "flightdealsflorida.org",
    source: "flights",
    ...params
  };

  if (category) {
    eventParams.event_category = category;
  }

  if (label) {
    eventParams.event_label = label;
  }

  if (typeof value === "number") {
    eventParams.value = value;
  }

  window.gtag?.("event", action, eventParams);
  window.dataLayer?.push({
    event: action,
    ...eventParams
  });
  trackClarityEvent(action, eventParams);
}
