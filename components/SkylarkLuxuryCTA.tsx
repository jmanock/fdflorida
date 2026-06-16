"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { SKYLARK_DEALS_AFFILIATE_URL, SKYLARK_HOME_AFFILIATE_URL } from "@/lib/revenuePartners";

const rel = "sponsored nofollow noopener noreferrer";

export function SkylarkLuxuryCTA({ sourcePage }: { sourcePage: string }) {
  const trackSkylark = (url: string, ctaText: string) => {
    const params = {
      partner: "skylark",
      affiliate_program: "awin",
      source_page: sourcePage,
      placement: "luxury_hotel_cta",
      cta_text: ctaText,
      outbound_url: url
    };
    trackEvent({ action: "skylark_cta_click", category: "conversion", params });
    trackEvent({ action: "affiliate_click", category: "conversion", params });
  };

  return (
    <article className="rounded-[28px] border border-sky-200 bg-ink p-6 text-white shadow-premium sm:p-8">
      <Sparkles className="h-7 w-7 text-gold" />
      <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-sky-200">Luxury Florida Resorts</p>
      <h2 className="mt-2 text-3xl font-black tracking-normal">Premium Stays After You Pick Flights</h2>
      <p className="mt-4 text-sm font-semibold leading-7 text-white/75">
        Looking for a premium Florida stay? Discover curated luxury hotels, exclusive rates, complimentary upgrades, breakfast perks, and resort credits through Skylark.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-ink" href={SKYLARK_DEALS_AFFILIATE_URL} target="_blank" rel={rel} onClick={() => trackSkylark(SKYLARK_DEALS_AFFILIATE_URL, "Explore Luxury Hotel Deals")}>
          Explore Luxury Hotel Deals <ArrowRight className="h-4 w-4" />
        </a>
        <a className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-6 text-sm font-black text-white" href={SKYLARK_HOME_AFFILIATE_URL} target="_blank" rel={rel} onClick={() => trackSkylark(SKYLARK_HOME_AFFILIATE_URL, "Discover Skylark Luxury Travel")}>
          Discover Skylark Luxury Travel
        </a>
      </div>
      <p className="mt-3 text-xs font-bold text-white/60">Affiliate links. We may earn a commission at no extra cost to you.</p>
    </article>
  );
}
