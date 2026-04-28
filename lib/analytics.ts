type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, string | number | boolean | undefined>;
};

declare global {
  interface Window {
    gtag?: (command: "event", action: string, params?: Record<string, string | number | boolean | undefined>) => void;
  }
}

export function trackEvent({ action, category, label, value, params }: AnalyticsEvent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...params
  });
}
