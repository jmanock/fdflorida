import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Hotel, MapPinned, Sailboat } from "lucide-react";
import { DealCard } from "@/components/DealCard";
import { HotelCtaLink } from "@/components/HotelCtaLink";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getBookingSearchUrl } from "@/lib/booking";
import { cityFlightPageSlugs, getCityFlightPage } from "@/lib/cityFlightPages";
import { siteUrl } from "@/lib/siteLinks";

type PageProps = {
  params: Promise<{ city: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return cityFlightPageSlugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const page = getCityFlightPage(city);

  if (!page) {
    return {};
  }

  const canonical = `${siteUrl}/flights/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      type: "article",
      siteName: "Florida Flight Deals",
      images: [
        {
          url: "/icon.svg",
          width: 512,
          height: 512,
          alt: page.h1
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/icon.svg"]
    }
  };
}

export default async function CityFlightPage({ params }: PageProps) {
  const { city } = await params;
  const page = getCityFlightPage(city);

  if (!page) {
    notFound();
  }

  const hotelUrl = getBookingSearchUrl(page.hotelLocation);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    name: `Find Cheap Flights to ${page.city}`,
    provider: {
      "@type": "Organization",
      name: "Florida Deals Hub"
    }
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />

      <section className="section-fade mx-auto w-full max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm font-black text-ocean shadow-sm">
            Updated: May 2026
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.96] tracking-normal text-ink sm:text-6xl">{page.h1}</h1>
          <p className="mt-6 text-lg font-medium leading-8 text-slateText">{page.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#flight-routes"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
              View Flights
              <ArrowRight className="h-4 w-4" />
            </a>
            <HotelCtaLink
              href={hotelUrl}
              location={page.hotelLocation}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-6 text-sm font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-ocean hover:bg-sky-50 hover:text-gulf hover:shadow-card focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
              <Hotel className="h-4 w-4" />
              Compare Hotels
            </HotelCtaLink>
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.slice(0, 32)} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="text-base font-medium leading-8 text-slateText">{section}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="flight-routes" className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Route examples</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Cheap flights to {page.city} worth checking.</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slateText">
            Recent fares are examples when available. Prices may change, so check current availability before booking.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {page.deals.map((deal, index) => (
            <DealCard key={deal.id} deal={deal} priority={index === 0} />
          ))}
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Complete Your Trip</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Flights are only the start.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <HotelCtaLink
              href={hotelUrl}
              location={page.hotelLocation}
              className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
            >
              <Hotel className="mb-4 h-5 w-5 text-gold" />
              Find Hotels
            </HotelCtaLink>
            <a className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean" href="https://cruisedealsflorida.org">
              <Sailboat className="mb-4 h-5 w-5 text-gold" />
              Find Cruises
            </a>
            <a className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean" href="https://localdealsflorida.org">
              <MapPinned className="mb-4 h-5 w-5 text-gold" />
              Local Deals
            </a>
          </div>
          <div className="mt-6 space-y-1 text-sm font-bold leading-6 text-slateText">
            <p>✓ Free cancellation on most hotels</p>
            <p>✓ No booking fees</p>
            <p>✓ Verified prices</p>
          </div>
        </div>
      </section>

      <section id="alerts" className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-[28px] bg-ink p-6 text-white shadow-soft sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">Free alerts</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">Get Florida Flight Deals Delivered</h2>
          </div>
          <div>
            <p className="text-base font-medium leading-7 text-slate-200">
              Join free alerts for cheap flights, weekend escapes, and hidden airfare deals.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
