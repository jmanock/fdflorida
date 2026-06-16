"use client";

import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const routerLinks = [
  ["Compare Florida Hotels", "https://hoteldealsflorida.org/florida-budget-hotels", "hotels"],
  ["Explore Florida Beach Hotels", "https://hoteldealsflorida.org/florida-oceanfront-hotels", "beach_hotels"],
  ["Find Weekend Cruises From Florida", "https://cruisedealsflorida.org/weekend-cruises-from-florida", "cruises"],
  ["Browse Florida Family Vacations", "https://floridadealshub.com/best-florida-family-vacations", "vacation_packages"],
  ["Find Things To Do In Florida", "https://localdealsflorida.org/best-things-to-do-in-florida", "activities"]
] as const;

export function TripRouterSection({ sourcePage }: { sourcePage: string }) {
  const click = (label: string, href: string, destinationType: string) => {
    const destinationSite = new URL(href).hostname;
    const params = {
      source_page: sourcePage,
      destination_site: destinationSite,
      destination_type: destinationType,
      placement: "plan_your_florida_trip",
      cta_text: label,
      outbound_url: href
    };
    trackEvent({ action: "trip_router_click", category: "engagement", params });
    trackEvent({ action: "related_guide_click", category: "engagement", params });
  };

  return (
    <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">Florida trip router</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Plan The Rest Of Your Florida Trip</h2>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-slateText">After comparing flights, move into hotels, cruises, family vacation planning, and local activities without starting the search over.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {routerLinks.map(([label, href, destinationType]) => (
            <a
              className="group rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black leading-6 text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
              href={href}
              key={href}
              onClick={() => click(label, href, destinationType)}
            >
              <span>{label}</span>
              <ArrowRight className="mt-4 h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
