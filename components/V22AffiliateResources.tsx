"use client";

import { getTransferAffiliateUrl, ZENHOTELS_AFFILIATE_URL } from "@/lib/revenuePartners";
import { trackEvent } from "@/lib/analytics";

type Resource = {
  partner: string;
  creativeId: string;
  category: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
};

function trackAffiliateClick(resource: Resource, slug: string, placement: string) {
  const payload = {
    partner: resource.partner,
    creative_id: resource.creativeId,
    category: resource.category,
    site: "flightdealsflorida",
    route: `/${slug}`,
    placement,
    cta_text: resource.cta
  };

  trackEvent({ action: "affiliate_click", category: "conversion", params: payload });
}

export function V22AffiliateResources({ slug }: { slug: string }) {
  const resources: Resource[] = [
    {
      partner: "Airport Transfer Portal",
      creativeId: "airport-transfer-portal-default",
      category: "airport_transfers",
      title: "Plan the ride after the fare",
      copy: "Compare airport transfer options once you know which Florida airport and arrival window fit the trip.",
      cta: "Compare airport transfers",
      href: getTransferAffiliateUrl(slug)
    },
    {
      partner: "Zen Hotels",
      creativeId: "zenhotels-homepage",
      category: "hotels",
      title: "Check stays near the airport or destination",
      copy: "Use hotel availability as a second check before committing to a flight route, especially for late arrivals.",
      cta: "Check hotel options",
      href: ZENHOTELS_AFFILIATE_URL
    }
  ];

  return (
    <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="v22-flight-affiliate-title">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">Travel resources</p>
        <h2 id="v22-flight-affiliate-title" className="mt-2 text-2xl font-black tracking-normal text-ink">
          Finish the Florida arrival plan before booking.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {resources.map((resource) => (
            <a
              className="rounded-3xl border border-slate-200 bg-skyline p-5 transition hover:-translate-y-1 hover:border-sky-300"
              href={resource.href}
              key={resource.creativeId}
              onClick={() => trackAffiliateClick(resource, slug, "v22_flight_travel_resources")}
              rel="sponsored noopener noreferrer"
              target="_blank"
            >
              <h3 className="text-lg font-black text-ink">{resource.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slateText">{resource.copy}</p>
              <span className="mt-4 inline-flex text-sm font-black text-ocean">{resource.cta}</span>
            </a>
          ))}
        </div>
        <p className="mt-5 text-xs font-bold leading-5 text-slateText">
          Affiliate disclosure: some travel-resource links may earn Florida Flight Deals a commission at no extra cost to you.
        </p>
      </div>
    </section>
  );
}
