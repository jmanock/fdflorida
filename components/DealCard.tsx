"use client";

import { ArrowRight, CalendarDays, PlaneTakeoff, Sparkles, Tag } from "lucide-react";
import type { FlightDeal } from "@/data/deals";
import { getTrustedDealImage } from "@/lib/dealImages";
import { trackEvent } from "@/lib/analytics";
import { FallbackImage } from "@/components/FallbackImage";

const badgeStyles = {
  "Hot Deal": "bg-gold/10 text-amber-700 ring-amber-200",
  Weekend: "bg-mint/10 text-teal-700 ring-teal-200",
  International: "bg-sky-100 text-sky-800 ring-sky-200",
  Limited: "bg-slate-100 text-slate-700 ring-slate-200",
  "Under $99": "bg-emerald-100 text-emerald-800 ring-emerald-200"
};

const qualityLabels = {
  "Low Fare": "🔥 Low Fare",
  "Good Deal": "👍 Good Deal",
  "Popular Route": "✈️ Popular Route"
};

function getValueStatement(deal: FlightDeal) {
  if (deal.category.includes("Under $99")) {
    return "A recent sub-$99 fare find from a major Florida market.";
  }

  if (deal.category.includes("International")) {
    return "A recent international fare example for flexible Florida travelers.";
  }

  if (deal.category.includes("Weekend")) {
    return "A route worth checking for quick long-weekend dates.";
  }

  return "A recent fare find worth checking before prices move.";
}

function getWhyThisFare(deal: FlightDeal) {
  if (deal.category.includes("Under $99")) {
    return "Strong sub-$99 domestic fare.";
  }

  if (deal.category.includes("International")) {
    return "Useful international fare example.";
  }

  if (deal.category.includes("Weekend")) {
    return "Popular weekend getaway route.";
  }

  return "Good flexible-date route for Florida travelers.";
}

function getBestForTags(deal: FlightDeal) {
  const tags = new Set<string>();

  if (deal.category.includes("Weekend")) {
    tags.add("Weekend Trip");
    tags.add("Quick Getaway");
  }

  if (deal.category.includes("Under $99")) {
    tags.add("Budget Friendly");
    tags.add("Under $100 When Available");
  }

  if (deal.category.includes("International")) {
    tags.add("International Escape");
  } else {
    tags.add("Domestic Route");
  }

  if (["Cancun", "Miami", "Fort Lauderdale", "San Juan"].includes(deal.to)) {
    tags.add("Beach Trip");
  }

  if (["Orlando", "Tampa", "Jacksonville"].includes(deal.from)) {
    tags.add("Flexible Dates");
  }

  return Array.from(tags).slice(0, 3);
}

function getCtaText(deal: FlightDeal, origin: string, destination: string) {
  if (!deal.price) {
    return `Search ${origin} to ${destination} Fares`;
  }

  return `Search Flights From $${deal.price}`;
}

export function DealCard({
  deal,
  priority = false,
  featured = false
}: {
  deal: FlightDeal;
  priority?: boolean;
  featured?: boolean;
}) {
  const origin = deal.origin ?? deal.from;
  const destination = deal.destination ?? deal.to;
  const outboundUrl = deal.link ?? deal.booking_url;
  const qualityTag = deal.quality_tag ?? "Good Deal";
  const freshness = deal.freshness ?? "Updated daily";
  const ctaText = getCtaText(deal, origin, destination);
  const bestForTags = getBestForTags(deal);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft ${
        featured ? "ring-1 ring-sky-100" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-skyline ${featured ? "h-52" : "h-40 sm:h-44"}`}>
        <FallbackImage
          src={getTrustedDealImage(deal)}
          alt={`${destination} travel inspiration for a ${deal.airline} fare from ${origin}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          {deal.airline}
        </div>
        <div className={`absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold ring-1 backdrop-blur ${badgeStyles[deal.badge]}`}>
          {deal.badge}
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <PlaneTakeoff className="h-4 w-4 text-ocean" />
              {freshness}
            </p>
            <h3 className="mt-1 text-xl font-black leading-tight tracking-normal text-ink">
              {origin} to {destination}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs font-semibold uppercase text-slate-400">Fare idea</p>
            <p className="text-2xl font-black text-gulf">from ${deal.price}</p>
            <p className="mt-1 text-[11px] font-black uppercase text-slate-400">When available</p>
          </div>
        </div>

        <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-ocean ring-1 ring-sky-100">
          {qualityLabels[qualityTag]}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Best for</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {bestForTags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-sand px-2.5 py-1 text-xs font-black text-slateText">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="flex items-start gap-2 text-sm font-semibold leading-6 text-slateText">
          <Tag className="mt-1 h-4 w-4 shrink-0 text-gold" />
          {getValueStatement(deal)}
        </p>

        <p className="rounded-xl bg-sky-50 px-3 py-2 text-sm font-black text-ink ring-1 ring-sky-100">
          Why this fare? {getWhyThisFare(deal)}
        </p>

        <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
          <CalendarDays className="h-4 w-4 text-gold" />
          {deal.dates}
        </div>

        <a
          href={outboundUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent({
              action: "flight_card_click",
              category: "flights",
              label: `${deal.from} to ${deal.to}`,
              value: deal.price,
              params: {
                airline: deal.airline,
                destination,
                origin,
                price: deal.price,
                source_site: "flightdealsflorida.org",
                price_range: deal.price ? `from $${deal.price}` : "current fares",
                price_text: `Recent fares from $${deal.price} when available`,
                cta_text: ctaText,
                type: "flight",
                provider: "google_flights",
                route: `${origin} to ${destination}`,
                route_or_destination: `${origin} to ${destination}`,
                outbound_url: outboundUrl,
                page_path: window.location.pathname
              }
            })
          }
          className="mt-auto flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-4 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
          aria-label={`Check fares for ${origin} to ${destination}`}
        >
          {ctaText}
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="text-xs font-bold leading-5 text-slate-500">Fares may change. Availability varies by date.</p>
      </div>
    </article>
  );
}
