"use client";

import { ArrowRight, Hotel, MapPin, Sailboat, Sparkles, Ticket } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type DiscoveryLink = {
  title: string;
  copy: string;
  href: string;
  label: string;
};

function trackDiscoveryClick(item: DiscoveryLink, placementName: string) {
  const params = {
    source_page: window.location.pathname,
    target_page: item.href,
    destination: item.title,
    placement_name: placementName,
    placement_type: "v14_discovery",
    cta_text: item.label
  };

  trackEvent({ action: "internal_related_click", category: "engagement", params });
  trackEvent({ action: "related_guide_click", category: "engagement", params });
  trackEvent({ action: "cta_click", category: "engagement", params });
}

export function V14DiscoveryRail({ slug }: { slug: string }) {
  const isGoogleFlights = slug.includes("google-flights");
  const isTampa = slug.includes("tampa");
  const isMiami = slug.includes("miami");
  const destination = isTampa ? "Tampa" : isMiami ? "Miami" : slug.includes("orlando") ? "Orlando" : "Florida";
  const featured: DiscoveryLink[] = [
    {
      title: isGoogleFlights ? "Google Flights Florida airport guide" : `${destination} flight planning guide`,
      copy: "Compare airports, fare timing, route choices, and the next step after finding a useful flight.",
      href: isGoogleFlights ? "/google-flights-florida" : "/cheap-flights-to-florida-guide",
      label: "Read flight guide"
    },
    {
      title: "Need a hotel after your flight?",
      copy: "Move straight from airfare research into budget, oceanfront, airport, or family hotel planning.",
      href: "https://hoteldealsflorida.org/florida-budget-hotels",
      label: "Compare hotels"
    },
    {
      title: "Turn the fare into a vacation package",
      copy: "Bundle the flight idea with hotels, cruises, attractions, and family vacation planning.",
      href: "https://floridadealshub.com/vacation-packages",
      label: "Build the trip"
    },
    {
      title: "Things to do after landing",
      copy: "Add attractions, activities, rainy-day backups, and weekend ideas near the destination.",
      href: "https://localdealsflorida.org/best-things-to-do-in-florida",
      label: "Find activities"
    }
  ];
  const popular: DiscoveryLink[] = [
    { title: "Google Flights vs Skyscanner", copy: "Compare flexible-date search, alerts, and Florida route discovery.", href: "/google-flights-vs-skyscanner-for-florida-routes", label: "Compare tools" },
    { title: "Best time to book Florida flights", copy: "Use booking windows, seasonality, and airport flexibility together.", href: "/best-time-to-book-florida-flights", label: "Plan timing" },
    { title: "Cheapest Florida airports", copy: "Compare MCO, MIA, TPA, FLL, and JAX before picking a route.", href: "/cheapest-airports-in-florida", label: "Compare airports" },
    { title: "Weekend flight deals from Florida", copy: "Find short-trip route ideas and quick getaway planning links.", href: "/weekend-flight-deals-florida", label: "See weekend ideas" }
  ];

  return (
    <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="v14-flight-discovery-title">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">Popular this week</p>
            <h2 id="v14-flight-discovery-title" className="mt-3 text-3xl font-black tracking-normal text-ink">
              Continue planning after the flight search.
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slateText">
            Before you go: don’t forget the hotel, airport transfer, travel bag, activities, and any international connectivity needs.
          </p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, index) => {
            const Icon = index === 0 ? Sparkles : index === 1 ? Hotel : index === 2 ? Sailboat : Ticket;
            return (
              <a
                className="group rounded-3xl border border-slate-200 bg-sand p-5 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-skyline"
                href={item.href}
                key={item.href}
                onClick={() => trackDiscoveryClick(item, "flight_plan_rest_of_trip")}
              >
                <Icon className="h-6 w-6 text-ocean" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-ink">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slateText">{item.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ocean">
                  {item.label}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
        <div className="mt-7 rounded-3xl bg-ink p-5 text-white">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-sky-200">Trending Florida guides</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((item) => (
              <a
                className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-black text-white ring-1 ring-white/15 transition hover:bg-white/18"
                href={item.href}
                key={item.href}
                onClick={() => trackDiscoveryClick(item, "flight_trending_guides")}
              >
                <MapPin className="mr-2 inline h-4 w-4 text-sky-200" aria-hidden="true" />
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
