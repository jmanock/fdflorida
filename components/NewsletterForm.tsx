"use client";

import { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
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
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-12 w-full rounded-[8px] border border-slate-200 bg-white pl-12 pr-4 text-base font-semibold text-ink outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </div>
        <button
          type="submit"
          className="h-12 rounded-[8px] bg-coral px-6 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
        >
          Get Email Alerts
        </button>
      </div>
      <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        <ShieldCheck className="h-4 w-4 text-mint" />
        {submitted ? "You're on the list. Watch your inbox for the next drop." : "No spam. Just sharp Florida airfare finds."}
      </p>
    </form>
  );
}
