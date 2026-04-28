"use client";

import { useMemo, useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { filters, type DealCategory, type FlightDeal } from "@/data/deals";
import { DealCard } from "@/components/DealCard";

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
    <section id="deals" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Today&apos;s fare board</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-ink sm:text-4xl">
            Daily deals worth checking before you book.
          </h2>
        </div>
        <button
          type="button"
          onClick={refreshDeals}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-200 bg-white px-4 text-sm font-bold text-ink shadow-sm transition hover:border-sky-300 hover:text-ocean focus:outline-none focus:ring-4 focus:ring-sky-200"
        >
          <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
          Refresh Deals
        </button>
      </div>

      <div className="no-scrollbar -mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`h-10 shrink-0 rounded-full px-4 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-sky-200 ${
                isActive
                  ? "bg-ocean text-white shadow-md shadow-sky-700/20"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-ocean"
              }`}
              aria-pressed={isActive}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-y border-slate-200 py-3 text-sm font-semibold text-slate-500">
        <span>{filteredDeals.length} deals showing</span>
        <span>{activeFilter}</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDeals.map((deal, index) => (
          <DealCard key={deal.id} deal={deal} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
