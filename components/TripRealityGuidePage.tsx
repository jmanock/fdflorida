import { AlertTriangle, ArrowRight, BadgeCheck, CheckCircle2, CircleDollarSign, CloudSun, ExternalLink, Luggage, MapPinned } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import liveData from "@/data/live-intelligence.json";
import type { TripRealityGuide } from "@/data/tripRealityGuides";
import { ESIMSHOP_URL } from "@/lib/travelEssentials";
import { FallbackImage } from "@/components/FallbackImage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ContextualAffiliateCard, GuideLink, TripChecklist } from "@/components/TripGuideActions";
import { ConversionScrollAnalytics } from "@/components/ConversionCards";
import { TripRetentionTools } from "@/components/TripRetentionTools";

function GuidanceList({ items }: { items: Array<{ title: string; body: string }> }) {
  return <div className="mt-5 grid gap-4">{items.map((item) => <article className="rounded-lg border border-slate-200 bg-white p-5" key={item.title}><h3 className="font-black text-ink">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slateText">{item.body}</p></article>)}</div>;
}

export function TripRealityGuidePage({ guide }: { guide: TripRealityGuide }) {
  const route = `/trip-reality/${guide.slug}`;
  const airports = liveData.airports.filter((airport) => guide.liveAirportIds.includes(airport.code));
  const liveIsCurrent = liveData.status === "current";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: guide.title, description: guide.description, mainEntityOfPage: `https://flightdealsflorida.org${route}`, image: guide.heroImage, author: { "@type": "Organization", name: "Florida Deals Network" }, publisher: { "@type": "Organization", name: "Flight Deals Florida" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Flight Deals Florida", item: "https://flightdealsflorida.org" },
        { "@type": "ListItem", position: 2, name: "Trip Reality Guides", item: "https://flightdealsflorida.org/trip-reality" },
        { "@type": "ListItem", position: 3, name: guide.title, item: `https://flightdealsflorida.org${route}` }
      ] }
    ]
  };

  return (
    <>
      <Script id={`reality-schema-${guide.slug}`} type="application/ld+json">{JSON.stringify(jsonLd)}</Script>
      <ConversionScrollAnalytics />
      <SiteHeader />
      <main className="bg-[#f8fafc]">
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <nav className="text-sm font-bold text-slateText" aria-label="Breadcrumb"><Link href="/">Flights</Link><span className="px-2">/</span><span>Trip Reality Guide</span></nav>
          <div className="mt-6 grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-9 lg:p-12">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">{guide.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-ink sm:text-5xl">{guide.title}</h1>
              <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slateText">{guide.description}</p>
              <div className="mt-6 rounded-lg border-l-4 border-sky-600 bg-sky-50 p-4 text-sm font-semibold leading-6 text-slateText"><strong className="text-ink">Editorial note:</strong> We organize official travel data, practical planning information, and relevant partner options. Affiliate relationships do not change the factual guidance on this page.</div>
            </div>
            <div className="relative min-h-72 lg:min-h-full"><FallbackImage alt={guide.heroAlt} className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 45vw" src={guide.heroImage} /></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8" aria-labelledby="reality-check">
          <div className="rounded-lg border border-slate-200 bg-ink p-6 text-white sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-sky-200">Quick reality check</p>
            <h2 className="mt-2 text-2xl font-black" id="reality-check">The decision in one minute</h2>
            <p className="mt-4 max-w-4xl text-base font-semibold leading-7 text-slate-200">{guide.quickAnswer}</p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{guide.reality.map((item) => <div className="rounded-lg border border-white/15 bg-white/5 p-4" key={item.label}><dt className="text-xs font-black uppercase tracking-[0.12em] text-sky-200">{item.label}</dt><dd className="mt-2 text-sm font-bold leading-6">{item.value}</dd></div>)}</dl>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div><div className="flex items-center gap-3"><CheckCircle2 className="h-6 w-6 text-emerald-600" /><h2 className="text-3xl font-black text-ink">The good</h2></div><GuidanceList items={guide.good} /></div>
          <div><div className="flex items-center gap-3"><AlertTriangle className="h-6 w-6 text-amber-600" /><h2 className="text-3xl font-black text-ink">The drawbacks</h2></div><GuidanceList items={guide.drawbacks} /></div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 sm:p-8"><div className="flex items-center gap-3"><MapPinned className="h-6 w-6 text-amber-700" /><h2 className="text-3xl font-black text-ink">What travelers commonly underestimate</h2></div><GuidanceList items={guide.surprises} /></div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6"><div className="flex items-center gap-3"><CircleDollarSign className="h-6 w-6 text-emerald-700" /><h2 className="text-2xl font-black text-ink">Worth the Cost?</h2></div><p className="mt-2 text-sm font-semibold text-slateText">Who benefits, what problem it solves, and what to verify.</p><GuidanceList items={guide.worthPayingFor} /></div>
          <div className="rounded-lg border border-slate-200 bg-slate-100 p-6"><h2 className="text-2xl font-black text-ink">What may not be worth it</h2><p className="mt-2 text-sm font-semibold text-slateText">Conditional tradeoffs, not universal verdicts.</p><GuidanceList items={guide.skipOrLimit} /></div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[{ title: "What to pack", icon: Luggage, items: guide.pack }, { title: "What people forget", icon: BadgeCheck, items: guide.forget }, { title: "What experienced travelers do differently", icon: ArrowRight, items: guide.differently }].map(({ title, icon: Icon, items }) => <article className="rounded-lg border border-slate-200 bg-white p-6" key={title}><Icon className="h-6 w-6 text-ocean" /><h2 className="mt-3 text-xl font-black text-ink">{title}</h2><ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slateText">{items.map((item) => <li className="flex gap-2" key={item}><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>)}</ul></article>)}
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-sky-200 bg-white p-6 sm:p-8"><div className="flex items-center gap-3"><CloudSun className="h-6 w-6 text-ocean" /><div><p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Official live-data context</p><h2 className="text-2xl font-black text-ink">Check current conditions before leaving</h2></div></div>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slateText">{liveIsCurrent ? "The latest validated V29 package is current." : "The current package is unavailable; use the official links on the status page."} Airport cards summarize weather impact only and do not claim a flight is delayed.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{airports.map((airport) => <div className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={airport.code}><p className="font-black text-ink">{airport.code}</p><p className="mt-1 text-sm font-semibold text-slateText">{airport.weather.summary.status === "current" ? airport.label : "Weather context unavailable"}</p></div>)}</div>
            <GuideLink className="btn btn-primary mt-5 min-h-12 px-5" eventName="live_status_click" href={guide.liveHref} placement="trip_reality_live_context" route={route}>{guide.liveLabel}<ArrowRight className="h-4 w-4" /></GuideLink>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8"><TripChecklist items={guide.checklist} route={route} storageKey={`fdn-${guide.slug}`} /></section>

        {guide.affiliate === "esimshop" ? <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8"><ContextualAffiliateCard articleCluster="international_florida_arrival" ctaText="Explore international eSIM plans" href={ESIMSHOP_URL} route={route} travelerIntent="international_travel_preparation" /></section> : null}

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border border-slate-200 bg-white p-6"><h2 className="text-2xl font-black text-ink">Continue planning</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{guide.nextSteps.map((link) => <GuideLink className="flex min-h-12 items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-black text-ink hover:border-sky-300 hover:text-ocean" href={link.href} key={link.href} route={route}>{link.label}<ArrowRight className="h-4 w-4" /></GuideLink>)}</div></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><h2 className="text-2xl font-black text-ink">Sources and methodology</h2><p className="mt-3 text-sm font-semibold leading-6 text-slateText">Official sources support changeable facts. Planning judgments are conditional and identify the traveler who benefits. No first-person trip is implied.</p><ul className="mt-4 grid gap-2">{guide.sources.map((source) => <li key={source.href}><a className="inline-flex items-center gap-2 text-sm font-black text-ocean hover:underline" href={source.href} rel="noopener noreferrer" target="_blank">{source.label}<ExternalLink className="h-4 w-4" /></a></li>)}</ul><details className="mt-5 border-t border-slate-200 pt-4"><summary className="cursor-pointer font-black text-ink">Editorial freshness</summary><p className="mt-3 text-sm font-semibold leading-6 text-slateText">Published and editorially reviewed July 14, 2026. Live timestamps update independently. Recheck when airline, airport, baggage, entry, transport, or affiliate policies change.</p></details></div>
          </div>
        </section>
        <TripRetentionTools image={guide.heroImage} route={route} site="flightdealsflorida" title={guide.title} />
      </main>
      <SiteFooter />
    </>
  );
}
