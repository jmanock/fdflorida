import Image from "next/image";
import { ArrowRight, CalendarDays, PlaneTakeoff, Sparkles } from "lucide-react";
import type { FlightDeal } from "@/data/deals";

const badgeStyles = {
  "Hot Deal": "bg-coral/10 text-orange-700 ring-orange-200",
  Weekend: "bg-mint/10 text-teal-700 ring-teal-200",
  International: "bg-sky-100 text-sky-800 ring-sky-200",
  Limited: "bg-slate-100 text-slate-700 ring-slate-200",
  "Under $99": "bg-emerald-100 text-emerald-800 ring-emerald-200"
};

export function DealCard({ deal, priority = false }: { deal: FlightDeal; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative h-40 overflow-hidden bg-skyline sm:h-44">
        <Image
          src={deal.image}
          alt={`${deal.to} travel deal`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-coral" />
          {deal.airline}
        </div>
        <div className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-bold ring-1 ${badgeStyles[deal.badge]}`}>
          {deal.badge}
        </div>
      </div>

      <div className="space-y-4 p-4">
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
            <p className="text-3xl font-black text-ocean">${deal.price}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-[8px] bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
          <CalendarDays className="h-4 w-4 text-coral" />
          {deal.dates}
        </div>

        <a
          href={deal.booking_url}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-ink px-4 text-sm font-bold text-white transition hover:bg-ocean focus:outline-none focus:ring-4 focus:ring-sky-200"
          aria-label={`Book ${deal.from} to ${deal.to} on ${deal.airline}`}
        >
          Book Deal
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
