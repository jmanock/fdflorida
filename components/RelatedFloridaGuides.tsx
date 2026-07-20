"use client";

import { trackEvent } from "@/lib/analytics";

type RelatedGuide = {
  label: string;
  href: string;
};

export function RelatedFloridaGuides({ guides }: { guides: RelatedGuide[] }) {
  const readersAlsoPlanned = [
    { label: "Compare Florida hotels", href: "https://hoteldealsflorida.org/florida-budget-hotels" },
    { label: "Plan airport transfers", href: "/florida-airport-guide" },
    { label: "Check weekend cruises", href: "https://cruisedealsflorida.org/weekend-cruises-from-florida" },
    { label: "Find Florida attractions", href: "https://localdealsflorida.org/best-things-to-do-in-florida" },
    { label: "Build a vacation package", href: "https://floridadealshub.com/vacation-packages" }
  ];
  const trackRelatedClick = (target: string, label: string, placementType: string) => {
    trackEvent({
      action: "related_guide_click",
      category: "engagement",
      params: {
        source_page: window.location.pathname,
        target_page: target,
        placement_type: placementType,
        cta_text: label
      }
    });
  };

  return (
    <section id="related-guides" className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Continue Planning Your Trip</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Related Florida flight guides and next steps.</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {guides.slice(0, 5).map((guide) => (
            <a
              key={guide.href}
              className="rounded-2xl border border-slate-200 bg-sand p-4 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
              href={guide.href}
              onClick={() => trackRelatedClick(guide.href, guide.label, "related_guides")}
            >
              {guide.label}
            </a>
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-skyline p-5">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">Readers also planned</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {readersAlsoPlanned.map((item) => (
              <a className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-ink transition hover:text-ocean" href={item.href} key={item.href} onClick={() => trackRelatedClick(item.href, item.label, "readers_also_planned")}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
