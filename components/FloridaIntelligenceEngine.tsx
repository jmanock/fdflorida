"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Clock3, Hotel, Luggage, Plane, Search, Sparkles, Wifi } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { flightTravelEssentials } from "@/lib/travelEssentials";
import { getTransferAffiliateUrl, ZENHOTELS_AFFILIATE_URL, SKYLARK_HOME_AFFILIATE_URL } from "@/lib/revenuePartners";

type Recommendation = {
  title: string;
  description: string;
  href: string;
  label: string;
  category: string;
};

const rel = "sponsored noopener";

function track(event: string, payload: Record<string, string | number>) {
  const data = {
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
    ...payload
  };
  trackEvent({ action: event, params: data });
}

function getDestination(slug: string) {
  if (slug.includes("orlando")) return "Orlando";
  if (slug.includes("miami")) return "Miami";
  if (slug.includes("tampa")) return "Tampa";
  if (slug.includes("fort-lauderdale")) return "Fort Lauderdale";
  if (slug.includes("jacksonville")) return "Jacksonville";
  return "Florida";
}

function getRecommendations(slug: string): Recommendation[] {
  const destination = getDestination(slug);
  const base: Recommendation[] = [
    {
      title: `${destination} hotel planning`,
      description: "Compare nearby hotels after you choose the airport and dates.",
      href: destination === "Florida" ? "https://hoteldealsflorida.org/florida-budget-hotels" : `https://hoteldealsflorida.org/${destination.toLowerCase().replaceAll(" ", "-")}-hotel-deals`,
      label: "Compare hotels",
      category: "hotel"
    },
    {
      title: "Airport transportation",
      description: "Reserve a transfer before arrival day so the flight does not become the whole plan.",
      href: getTransferAffiliateUrl(slug),
      label: "Plan transfers",
      category: "transportation"
    },
    {
      title: "Florida activities after landing",
      description: "Add attractions, tours, beaches, or rainy-day backups around the arrival city.",
      href: "https://localdealsflorida.org/best-things-to-do-in-florida",
      label: "Find activities",
      category: "activities"
    },
    {
      title: "Complete vacation package",
      description: "Bundle the flight idea with hotels, cruises, attractions, and family trip planning.",
      href: "https://floridadealshub.com/vacation-packages",
      label: "Build package",
      category: "package"
    }
  ];

  if (slug.includes("google-flights")) {
    return [
      {
        title: "Google Flights Florida guide",
        description: "Compare Google Flights tactics for Orlando, Miami, Tampa, FLL, and JAX.",
        href: "/google-flights-florida",
        label: "Read guide",
        category: "flight_guide"
      },
      {
        title: "Best booking window",
        description: "Use timing guidance before setting a price alert or buying.",
        href: "/best-time-to-book-florida-flights",
        label: "Check timing",
        category: "flight_guide"
      },
      ...base
    ];
  }

  return base;
}

export function FloridaIntelligenceEngine({ slug }: { slug: string }) {
  const [stage, setStage] = useState("Comparing");
  const destination = getDestination(slug);
  const recommendations = useMemo(() => getRecommendations(slug).slice(0, 6), [slug]);
  const essentials = useMemo(() => flightTravelEssentials.slice(0, 3), []);
  const progress = [
    ["Destination chosen", true],
    ["Flights compared", slug.includes("flight") || slug.includes("google")],
    ["Hotel chosen", false],
    ["Activities picked", false],
    ["Transfer reserved", false],
    ["Travel essentials ready", false]
  ] as const;
  const complete = progress.filter(([, done]) => done).length;
  const percent = Math.round((complete / progress.length) * 100);
  const searches = ["Google Flights Florida", "Orlando flight deals", "Miami airport guide", "Best time to book Florida flights", "Cheap flights to Florida"];
  const seasonal = [
    ["Summer", "Compare early flights, thunderstorm buffers, and beach-hotel backup plans."],
    ["Fall", "Watch football weekends, theme park events, and shoulder-season airfare."],
    ["Winter", "Snowbird demand can lift fares into South Florida and Orlando."],
    ["Spring", "Spring break and baseball trips make flexible dates more valuable."]
  ];

  return (
    <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="flight-intelligence-title">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">Florida Intelligence Engine</p>
            <h2 id="flight-intelligence-title" className="mt-3 text-3xl font-black tracking-normal text-ink">
              Continue planning your {destination} flight trip.
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slateText">
              Personalized next steps based on this flight topic: hotels, transportation, activities, travel essentials, and related guides.
            </p>
          </div>
          <div className="rounded-2xl bg-skyline px-5 py-4 text-sm font-black text-ink">
            Trip planning: {percent}% complete
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-sand p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">Trip Planning Progress</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-ocean" style={{ width: `${percent}%` }} />
            </div>
            <div className="mt-5 grid gap-3">
              {progress.map(([item, done]) => (
                <div className="flex items-center gap-3 text-sm font-bold text-ink" key={item}>
                  <CheckCircle2 className={`h-5 w-5 ${done ? "text-ocean" : "text-slate-300"}`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-black text-white"
              href="https://floridadealshub.com/vacation-packages"
              onClick={() => track("trip_progress_click", { cta_text: "Finish Planning", destination })}
            >
              Finish Planning <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {recommendations.map((item) => {
              const isAffiliate = item.category === "transportation";
              return (
                <a
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:bg-skyline"
                  href={item.href}
                  key={item.title}
                  target={isAffiliate ? "_blank" : undefined}
                  rel={isAffiliate ? rel : undefined}
                  onClick={() => track(isAffiliate ? "affiliate_click" : "recommendation_click", { destination, cta_text: item.label, category: item.category, outbound_url: item.href })}
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">{item.category.replace("_", " ")}</p>
                  <h3 className="mt-3 text-lg font-black text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slateText">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-ocean">
                    {item.label} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">Where are you in planning?</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Dreaming", "Comparing", "Booking", "Preparing", "Traveling"].map((item) => (
                <button
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${stage === item ? "bg-ink text-white" : "bg-sand text-ink hover:bg-skyline"}`}
                  key={item}
                  type="button"
                  onClick={() => {
                    setStage(item);
                    track("planning_stage_change", { destination, category: item.toLowerCase() });
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-slateText">
              {stage === "Booking" ? "Prioritize hotels, airport transfers, and flexible cancellation rules before fares move." : stage === "Preparing" ? "Now is the moment for luggage, eSIM, transfer timing, and attraction reservations." : "Keep comparing routes, airports, and destinations before locking the itinerary."}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-sand p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">Travel essentials</p>
            <div className="mt-4 grid gap-3">
              {essentials.map((item) => (
                <a
                  className="rounded-2xl bg-white p-4 text-sm font-bold text-ink transition hover:text-ocean"
                  href={item.affiliateUrl}
                  key={item.title}
                  target="_blank"
                  rel={rel}
                  onClick={() => track("travel_essential_click", { advertiser: item.advertiser, category: item.category, cta_text: item.cta, outbound_url: item.affiliateUrl })}
                >
                  {item.title}
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs font-bold leading-5 text-slateText">Some links may be sponsored. We may earn a commission at no extra cost to you.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">Search this topic</p>
            <div className="mt-4 grid gap-2">
              {searches.map((item) => (
                <a
                  className="inline-flex items-center gap-2 rounded-2xl bg-sand px-4 py-3 text-sm font-black text-ink hover:bg-skyline hover:text-ocean"
                  href={`/search?q=${encodeURIComponent(item)}`}
                  key={item}
                  onClick={() => track("search_suggestion_click", { cta_text: item, destination })}
                >
                  <Search className="h-4 w-4" /> {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-3xl border border-slate-200 bg-skyline p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">Seasonal intelligence</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {seasonal.map(([title, copy]) => (
                <div className="rounded-2xl bg-white p-4" key={title}>
                  <p className="font-black text-ink">{title}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slateText">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">Florida travel feed</p>
            <div className="mt-4 space-y-3 text-sm font-semibold leading-6 text-slateText">
              <p className="flex gap-2"><Plane className="h-5 w-5 text-ocean" /> Watch new airline routes and seasonal schedule changes.</p>
              <p className="flex gap-2"><Hotel className="h-5 w-5 text-ocean" /> Pair fare alerts with hotel rate checks before booking.</p>
              <p className="flex gap-2"><Wifi className="h-5 w-5 text-ocean" /> International add-ons need connectivity planning before departure.</p>
              <p className="flex gap-2"><Luggage className="h-5 w-5 text-ocean" /> Carry-on rules can change the real value of cheap fares.</p>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <a className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200" href={ZENHOTELS_AFFILIATE_URL} target="_blank" rel={rel} onClick={() => track("affiliate_click", { advertiser: "zenhotels", category: "hotel", cta_text: "Compare hotel options", outbound_url: ZENHOTELS_AFFILIATE_URL })}>
            <Sparkles className="h-6 w-6 text-ocean" />
            <h3 className="mt-3 text-lg font-black text-ink">Need a hotel after your flight?</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slateText">Compare hotel options after the airfare timing looks right.</p>
          </a>
          <a className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200" href={SKYLARK_HOME_AFFILIATE_URL} target="_blank" rel={rel} onClick={() => track("affiliate_click", { advertiser: "skylark", category: "luxury_hotel", cta_text: "Explore luxury stays", outbound_url: SKYLARK_HOME_AFFILIATE_URL })}>
            <Clock3 className="h-6 w-6 text-ocean" />
            <h3 className="mt-3 text-lg font-black text-ink">Making it a special trip?</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slateText">Check luxury hotel planning once flights and dates are settled.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
