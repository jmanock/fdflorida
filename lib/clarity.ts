export const CLARITY_ID = "x2rrkkuyby";

declare global {
  interface Window {
    clarity?: (command: "event" | "set", name: string, value?: string) => void;
  }
}

export function trackClarityEvent(
  eventName: string,
  data: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window === "undefined" || typeof window.clarity !== "function") {
    return;
  }

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      window.clarity?.("set", key, String(value));
    }
  });
  window.clarity("event", eventName);
}
