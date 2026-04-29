"use client";

import { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("No spam. 100% free alerts for fresh Florida deals.");
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  function trackSignupStarted() {
    if (hasTrackedStart) {
      return;
    }

    trackEvent({
      action: "newsletter_signup_started",
      category: "newsletter",
      label: "flightdealsflorida.org"
    });
    setHasTrackedStart(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("Saving your alert preferences...");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: trimmedEmail,
          departureCity: "",
          dealInterest: ""
        })
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "We couldn't save your signup. Please try again.");
      }

      trackEvent({
        action: "newsletter_signup_success",
        category: "newsletter",
        label: "flightdealsflorida.org"
      });

      setStatus("success");
      setMessage(result.message ?? "You're on the list. Watch your inbox for the next drop.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We couldn't save your signup. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="sr-only" htmlFor="email-alerts">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            id="email-alerts"
            type="email"
            required
            value={email}
            onFocus={trackSignupStarted}
            onChange={(event) => {
              trackSignupStarted();
              setEmail(event.target.value);
            }}
            placeholder="you@example.com"
            aria-invalid={status === "error"}
            className={`h-12 w-full rounded-xl border bg-white pl-12 pr-4 text-base font-semibold text-ink outline-none transition placeholder:text-slate-400 focus:ring-4 ${
              status === "error" ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 w-full rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-200 sm:w-auto"
        >
          {status === "submitting" ? "Sending..." : "Send Me Deals"}
        </button>
      </div>
      <p
        className={`flex items-center gap-2 text-sm font-semibold ${
          status === "error" ? "text-red-200" : status === "success" ? "text-emerald-200" : "text-slate-300"
        }`}
        role={status === "error" ? "alert" : "status"}
      >
        <ShieldCheck className={`h-4 w-4 ${status === "error" ? "text-red-300" : "text-mint"}`} />
        {message}
      </p>
    </form>
  );
}
