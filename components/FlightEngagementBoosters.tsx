"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calculator, Hotel, Mail, Plane, Sailboat, Ticket } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { SKYLARK_HOME_AFFILIATE_URL, ZENHOTELS_AFFILIATE_URL } from "@/lib/revenuePartners";

const rel = "sponsored nofollow noopener noreferrer";

const relatedGuides = [
  {
    title: "Florida Budget Hotels",
    copy: "Compare value stays after you choose an airport.",
    href: "https://hoteldealsflorida.org/florida-budget-hotels",
    cta: "Compare budget hotels"
  },
  {
    title: "Weekend Cruises From Florida",
    copy: "Add a short sailing from Miami, Tampa, or Port Canaveral.",
    href: "https://cruisedealsflorida.org/weekend-cruises-from-florida",
    cta: "Explore weekend cruises"
  },
  {
    title: "Best Florida Family Vacations",
    copy: "Turn cheap flights into a family-friendly trip plan.",
    href: "https://floridadealshub.com/best-florida-family-vacations",
    cta: "Plan family trips"
  },
  {
    title: "Best Things To Do In Florida",
    copy: "Find attractions, tours, activities, and local ideas.",
    href: "https://localdealsflorida.org/best-things-to-do-in-florida",
    cta: "Find activities"
  },
  {
    title: "Vacation Packages",
    copy: "Connect flights with hotels, cruises, and attractions.",
    href: "https://floridadealshub.com/vacation-packages",
    cta: "Build a trip plan"
  }
];

function trackRelatedGuide(title: string, href: string) {
  const params = { content_type: "flight_guide", item_title: title, outbound_url: href, page_path: window.location.pathname };
  trackEvent({ action: "related_guide_click", category: "engagement", params });
  trackEvent({ action: "continue_planning_click", category: "engagement", params });
  if (href.startsWith("https://")) {
    trackEvent({ action: "cross_site_click", category: "engagement", params });
  }
}

function trackAffiliate(action: string, partner: string, url: string, ctaText: string) {
  const params = {
    affiliate_program: "awin",
    advertiser: partner,
    cta_text: ctaText,
    outbound_url: url,
    page_path: window.location.pathname,
    placement: "flight_hotel_after_airport_comparison"
  };
  trackEvent({ action, category: "conversion", params });
  trackEvent({ action: "affiliate_click", category: "conversion", params });
}

export function HotelAfterFlightCtas() {
  return (
    <div className="mt-8 rounded-[28px] border border-sky-200 bg-skyline p-6 shadow-card sm:p-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">Need a hotel after your flight?</p>
      <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Compare Florida stays once the airfare looks right.</h2>
      <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slateText">
        Cheap airfare is only one part of the trip. Compare practical hotel options, then decide whether a premium resort or a simple value stay fits the destination.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5"
          href={ZENHOTELS_AFFILIATE_URL}
          target="_blank"
          rel={rel}
          onClick={() => trackAffiliate("affiliate_click_zenhotels", "zenhotels", ZENHOTELS_AFFILIATE_URL, "Compare Florida Hotels")}
        >
          <Hotel className="h-4 w-4" />
          Compare Florida Hotels
        </a>
        <a
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-black text-ink transition hover:-translate-y-0.5 hover:border-sky-200"
          href={SKYLARK_HOME_AFFILIATE_URL}
          target="_blank"
          rel={rel}
          onClick={() => trackAffiliate("affiliate_click_skylark", "skylark", SKYLARK_HOME_AFFILIATE_URL, "Plan Luxury Florida Travel")}
        >
          Plan Luxury Florida Travel
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-3 text-xs font-bold text-slateText">Affiliate links. We may earn a commission at no extra cost to you.</p>
    </div>
  );
}

export function FlightTripCostEstimator() {
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(3);
  const estimate = useMemo(() => travelers * 220 + nights * 175 + travelers * 90, [travelers, nights]);

  function trackInteraction(type: string, value: number) {
    trackEvent({
      action: "trip_planner_interaction",
      category: "engagement",
      params: { planner_type: "flight_trip_cost_estimator", interaction_type: type, value, page_path: window.location.pathname }
    });
  }

  return (
    <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-start gap-4">
        <Calculator className="mt-1 h-6 w-6 text-ocean" />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">Trip cost estimator</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-ink">Estimate the trip after the flight.</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-slateText">Use this quick planning widget to avoid choosing airfare without budgeting hotels and activities.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="rounded-2xl border border-slate-200 bg-sand p-4 text-sm font-black text-ink">
          Travelers
          <input className="mt-3 w-full accent-sky-600" type="range" min="1" max="6" value={travelers} onChange={(event) => { const value = Number(event.target.value); setTravelers(value); trackInteraction("travelers", value); }} />
          <span className="mt-2 block text-ocean">{travelers}</span>
        </label>
        <label className="rounded-2xl border border-slate-200 bg-sand p-4 text-sm font-black text-ink">
          Hotel nights
          <input className="mt-3 w-full accent-sky-600" type="range" min="1" max="7" value={nights} onChange={(event) => { const value = Number(event.target.value); setNights(value); trackInteraction("nights", value); }} />
          <span className="mt-2 block text-ocean">{nights}</span>
        </label>
        <div className="rounded-2xl border border-sky-200 bg-skyline p-4">
          <p className="text-sm font-black text-ink">Planning estimate</p>
          <p className="mt-2 text-3xl font-black text-ocean">${estimate.toLocaleString()}</p>
          <p className="mt-2 text-xs font-bold leading-5 text-slateText">Editorial estimate only. Confirm live prices with booking sources.</p>
        </div>
      </div>
    </div>
  );
}

export function ContinuePlanningFloridaTrip() {
  return (
    <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Continue planning your Florida trip</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">The next smart click after comparing flights.</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {relatedGuides.map((guide, index) => {
            const icons = [Hotel, Sailboat, Plane, Ticket, Calculator];
            const Icon = icons[index] ?? ArrowRight;
            return (
              <a key={guide.href} href={guide.href} className="group rounded-3xl border border-slate-200 bg-sand p-5 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-skyline hover:shadow-soft" onClick={() => trackRelatedGuide(guide.title, guide.href)}>
                <Icon className="h-6 w-6 text-ocean" />
                <h3 className="mt-4 text-lg font-black text-ink">{guide.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slateText">{guide.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ocean">{guide.cta}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ExitNewsletterCapture() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (progress >= 0.7 && !dismissed && !visible) {
        setVisible(true);
        trackEvent({ action: "newsletter_signup", category: "engagement", params: { trigger: "scroll_70", page_path: window.location.pathname } });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed, visible]);

  if (!visible || dismissed) {
    return null;
  }

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-3xl border border-sky-200 bg-white p-5 shadow-premium">
      <button className="absolute right-4 top-3 text-sm font-black text-slateText" type="button" onClick={() => setDismissed(true)}>Close</button>
      <div className="pr-14">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-ocean">Get New Florida Deals Every Week</p>
        <h2 className="mt-2 text-xl font-black text-ink">Flight alerts, hotel ideas, cruise planning, and things to do.</h2>
        <a className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-black text-white" href="#alerts" onClick={() => setDismissed(true)}>
          <Mail className="h-4 w-4" />
          Join free alerts
        </a>
      </div>
    </aside>
  );
}
