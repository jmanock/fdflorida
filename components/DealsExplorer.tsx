"use client";

import { useMemo, useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { filters, type DealCategory, type FlightDeal } from "@/data/deals";
import { DealCard } from "@/components/DealCard";
import { trackEvent } from "@/lib/analytics";

function shuffleDeals(deals: FlightDeal[]) {
  return [...deals].sort(() => Math.random() - 0.5);
}

export function DealsExplorer({ initialDeals }: { initialDeals: FlightDeal[] }) {
  const [activeFilter, setActiveFilter] = useState<DealCategory>("All Deals");
  const [dealPool, setDealPool] = useState(initialDeals);
  const [isPending, startTransition] = useTransition();

  const filteredDeals = useMemo(() => {
    if (activeFilter === "All Deals") {
      return dealPool;
    }

    return dealPool.filter((deal) => deal.category.includes(activeFilter));
  }, [activeFilter, dealPool]);

  function refreshDeals() {
    startTransition(() => {
      setDealPool((currentDeals) => shuffleDeals(currentDeals));
    });
  }

  return (
    <section id="deals" className="section-fade mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Main deals feed · Updated May 2026</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">
            Fresh Florida fares, organized for quick scanning.
          </h2>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slateText">
            Filter by airport market, trip style, or price point. Recent fare finds are examples when available; fares may change and should be checked before booking.
          </p>
        </div>
        <button
          type="button"
          onClick={refreshDeals}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-4 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-ocean hover:bg-sky-50 hover:text-gulf hover:shadow-card focus:outline-none focus:ring-4 focus:ring-sky-200"
        >
          <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
          Refresh Deals
        </button>
      </div>

      <div className="sticky top-[72px] z-30 -mx-4 mt-8 border-y border-slate-200/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
        <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                trackEvent({
                  action: "filter_click",
                  category: "deals",
                  label: filter,
                  params: {
                    page_path: window.location.pathname
                  }
                });
              }}
              className={`h-10 shrink-0 rounded-full px-4 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-sky-200 ${
                isActive
                  ? "bg-gulf text-white shadow-md shadow-sky-700/20"
                  : "border border-sky-200 bg-white text-slate-700 hover:border-ocean hover:bg-sky-50 hover:text-gulf"
              }`}
              aria-pressed={isActive}
            >
              {filter}
            </button>
          );
        })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-y border-slate-200 py-3 text-sm font-semibold text-slate-500">
        <span>{filteredDeals.length} deals showing</span>
        <span>{activeFilter}</span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDeals.map((deal, index) => (
          <DealCard key={deal.id} deal={deal} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
