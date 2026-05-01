"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, PlaneTakeoff, Sparkles, Tag } from "lucide-react";
import type { FlightDeal } from "@/data/deals";
import { getTrustedDealImage } from "@/lib/dealImages";
import { trackEvent } from "@/lib/analytics";

const badgeStyles = {
  "Hot Deal": "bg-gold/10 text-amber-700 ring-amber-200",
  Weekend: "bg-mint/10 text-teal-700 ring-teal-200",
  International: "bg-sky-100 text-sky-800 ring-sky-200",
  Limited: "bg-slate-100 text-slate-700 ring-slate-200",
  "Under $99": "bg-emerald-100 text-emerald-800 ring-emerald-200"
};

function getValueStatement(deal: FlightDeal) {
  if (deal.category.includes("Under $99")) {
    return "A rare sub-$99 fare from a major Florida market.";
  }

  if (deal.category.includes("International")) {
    return "A sharp international escape for flexible Florida travelers.";
  }

  if (deal.category.includes("Weekend")) {
    return "Built for a quick long-weekend getaway.";
  }

  return "A strong fare worth checking before prices move.";
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
  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft ${
        featured ? "ring-1 ring-sky-100" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-skyline ${featured ? "h-52" : "h-40 sm:h-44"}`}>
        <Image
          src={getTrustedDealImage(deal)}
          alt={`${deal.to} travel inspiration for a ${deal.airline} fare from ${deal.from}`}
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

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <PlaneTakeoff className="h-4 w-4 text-ocean" />
              Roundtrip fare
            </p>
            <h3 className="mt-1 text-xl font-black leading-tight tracking-normal text-ink">
              {deal.from} to {deal.to}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs font-semibold uppercase text-slate-400">From</p>
            <p className="text-3xl font-black text-gold">${deal.price}</p>
          </div>
        </div>

        <p className="flex items-start gap-2 text-sm font-semibold leading-6 text-slateText">
          <Tag className="mt-1 h-4 w-4 shrink-0 text-gold" />
          {getValueStatement(deal)}
        </p>

        <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
          <CalendarDays className="h-4 w-4 text-gold" />
          {deal.dates}
        </div>

        <a
          href={deal.booking_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent({
              action: "deal_click",
              category: "deals",
              label: `${deal.from} to ${deal.to}`,
              value: deal.price,
              params: {
                airline: deal.airline,
                destination: deal.to,
                origin: deal.from,
                route_or_destination: `${deal.from} to ${deal.to}`,
                outbound_url: deal.booking_url
              }
            })
          }
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-4 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
          aria-label={`Book ${deal.from} to ${deal.to} on ${deal.airline}`}
        >
          View Fare
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
