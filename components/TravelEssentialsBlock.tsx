"use client";

import { useEffect } from "react";
import { ArrowRight, BriefcaseBusiness, Car, Shirt } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getTransferAffiliateUrl } from "@/lib/revenuePartners";
import { flightTravelEssentials, type TravelEssentialItem } from "@/lib/travelEssentials";

const rel = "sponsored nofollow noopener noreferrer";

function eventForAdvertiser(advertiser: TravelEssentialItem["advertiser"]) {
  if (advertiser === "nomatic") return "affiliate_click_nomatic";
  if (advertiser === "airport_transfer") return "affiliate_click_transfer";
  return "travel_essentials_click";
}

export function TravelEssentialsBlock({ slug }: { slug: string }) {
  const transferUrl = getTransferAffiliateUrl(slug);
  const items: TravelEssentialItem[] = [
    ...flightTravelEssentials,
    {
      title: "Airport transfer plan",
      description: "Before you chase the cheap flight, make sure your carry-on, travel jacket, and airport transfer are handled.",
      cta: "Compare Airport Transfers",
      affiliateUrl: transferUrl,
      advertiser: "airport_transfer",
      category: "airport_transfer"
    }
  ];

  useEffect(() => {
    trackEvent({
      action: "travel_essentials_view",
      category: "affiliate",
      params: { page_type: "flight", page_path: window.location.pathname, item_count: items.length }
    });
  }, [items.length]);

  function trackClick(item: TravelEssentialItem) {
    const params = {
      affiliate_program: "awin",
      advertiser: item.advertiser,
      category: item.category,
      cta_text: item.cta,
      item_title: item.title,
      outbound_url: item.affiliateUrl,
      page_type: "flight",
      page_path: window.location.pathname
    };
    trackEvent({ action: "travel_essentials_click", category: "affiliate", params });
    trackEvent({ action: eventForAdvertiser(item.advertiser), category: "affiliate", params });
  }

  return (
    <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="travel-essentials-title">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Travel Toolkit</p>
        <h2 id="travel-essentials-title" className="mt-3 text-3xl font-black tracking-normal text-ink">Before you book the flight, check the pieces around it.</h2>
        <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-slateText">
          A cheap Florida fare is easier to use when your luggage, airport day bag, and arrival transportation are already handled.
        </p>
        <div className="mt-6 grid gap-3 text-sm font-black text-ink sm:grid-cols-2 lg:grid-cols-4">
          {["Flight picked?", "Hotel or airport stay compared?", "Airport transfer planned?", "Carry-on and day bag ready?"].map((item) => (
            <span className="rounded-2xl border border-slate-200 bg-white px-4 py-3" key={item}>✓ {item}</span>
          ))}
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.advertiser === "airport_transfer" ? Car : index === 2 ? Shirt : BriefcaseBusiness;
            return (
              <a key={`${item.advertiser}-${item.title}`} href={item.affiliateUrl} target="_blank" rel={rel} className="group rounded-3xl border border-slate-200 bg-sand p-5 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-skyline hover:shadow-soft" onClick={() => trackClick(item)}>
                <Icon className="h-6 w-6 text-ocean" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-ink">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ocean">{item.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </a>
            );
          })}
        </div>
        <p className="mt-5 text-xs font-bold text-slateText">Some links may be sponsored. We may earn a commission if you book or buy through them.</p>
      </div>
    </section>
  );
}
