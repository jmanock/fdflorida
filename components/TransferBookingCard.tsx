"use client";

import { ArrowRight, Car } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getTransferAffiliateUrl } from "@/lib/revenuePartners";

export function TransferBookingCard({ slug }: { slug: string }) {
  const href = getTransferAffiliateUrl(slug);
  const click = () => {
    const params = {
      affiliate: "airport_transfer_portal",
      category: "airport_transfer",
      page_path: window.location.pathname,
      outbound_url: href
    };
    trackEvent({ action: "affiliate_click", category: "conversion", params });
    trackEvent({ action: "affiliate_cta_click", category: "conversion", params });
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <Car className="h-7 w-7 text-ocean" />
      <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-ocean">Arrival planning</p>
      <h2 className="mt-2 text-2xl font-black text-ink">Book Airport Transfers Worldwide</h2>
      <p className="mt-3 text-sm font-semibold leading-6 text-slateText">Compare airport transfer options after choosing the Florida airport that best fits the complete trip.</p>
      <a className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ocean px-6 text-sm font-black text-white" href={href} target="_blank" rel="nofollow sponsored noopener noreferrer" onClick={click}>
        Compare Airport Transfers <ArrowRight className="h-4 w-4" />
      </a>
      <p className="mt-3 text-xs font-bold text-slateText">Affiliate link. We may earn a commission at no extra cost to you.</p>
    </article>
  );
}
