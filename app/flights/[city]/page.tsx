import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Hotel, MapPinned, Sailboat } from "lucide-react";
import { DealCard } from "@/components/DealCard";
import { HotelCtaLink } from "@/components/HotelCtaLink";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDestinationKey, getExpediaHotelLink } from "@/lib/affiliateLinks";
import { cityFlightPageSlugs, getCityFlightPage } from "@/lib/cityFlightPages";
import { cityFlightLinks, flightSearchLinks, siteUrl } from "@/lib/siteLinks";

type PageProps = {
  params: Promise<{ city: string }>;
};

const ogImage = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80";

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
          url: ogImage,
          width: 1200,
          height: 800,
          alt: `${page.city} flight search travel view`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage]
    }
  };
}

export default async function CityFlightPage({ params }: PageProps) {
  const { city } = await params;
  const page = getCityFlightPage(city);

  if (!page) {
    notFound();
  }

  const destinationKey = getDestinationKey(page.hotelLocation);
  const hotelUrl = getExpediaHotelLink(destinationKey);
  const relatedFlightSearches = [...cityFlightLinks, ...flightSearchLinks].filter((link) => link.href !== `/flights/${page.slug}`).slice(0, 6);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAction",
        name: `Find Cheap Flights to ${page.city}`,
        provider: {
          "@type": "Organization",
          name: "Florida Deals Hub"
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Florida Flight Deals",
            item: siteUrl
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.h1,
            item: `${siteUrl}/flights/${page.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      },
      {
        "@type": "ItemList",
        name: `${page.city} flight route examples`,
        itemListElement: page.deals.map((deal, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${deal.origin} to ${deal.destination}`,
          url: deal.link ?? deal.booking_url
        }))
      }
    ]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />

      <section className="section-fade mx-auto w-full max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
        <div className="max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm font-bold text-slateText">
            <a className="transition hover:text-ocean" href={siteUrl}>
              Home
            </a>
            <span className="px-2 text-slate-300">/</span>
            <a className="transition hover:text-ocean" href={siteUrl}>
              Florida Flight Deals
            </a>
            <span className="px-2 text-slate-300">/</span>
            <span className="text-ink">{page.h1}</span>
          </nav>
          <p className="inline-flex rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm font-black text-ocean shadow-sm">
            Current route-planning guide
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
              destinationKey={destinationKey}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-6 text-sm font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-ocean hover:bg-sky-50 hover:text-gulf hover:shadow-card focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
              <Hotel className="h-4 w-4" />
              Compare Hotel Rates
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Related Flight Searches</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Keep comparing Florida fare pages.</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {relatedFlightSearches.map((link) => (
              <a
                key={link.href}
                className="rounded-2xl border border-slate-200 bg-sand p-4 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Flight FAQs</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Helpful notes before checking fares.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="rounded-3xl border border-slate-200 bg-sand p-5">
                <h3 className="text-base font-black leading-6 text-ink">{faq.question}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-slateText">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Need a hotel after your flight?</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Compare destination hotels before rates change.</h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-slateText">
            Planning a weekend trip or longer Florida getaway? Flight fares and hotel rates can change quickly. Check current hotel availability near {page.city} before booking.
          </p>
          <HotelCtaLink
            href={hotelUrl}
            location={page.hotelLocation}
            destinationKey={destinationKey}
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            <Hotel className="h-4 w-4" />
            Find Places To Stay
          </HotelCtaLink>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Complete Your Trip</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Flights are only the start.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <HotelCtaLink
              href={hotelUrl}
              location={page.hotelLocation}
              destinationKey={destinationKey}
              className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
            >
              <Hotel className="mb-4 h-5 w-5 text-gold" />
              Check destination hotels
            </HotelCtaLink>
            <a className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean" href="https://hoteldealsflorida.org">
              <Hotel className="mb-4 h-5 w-5 text-gold" />
              Browse Florida hotel deals
            </a>
            <a className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean" href="https://cruisedealsflorida.org">
              <Sailboat className="mb-4 h-5 w-5 text-gold" />
              Explore Florida cruise deals
            </a>
            <a className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean" href="https://localdealsflorida.org">
              <MapPinned className="mb-4 h-5 w-5 text-gold" />
              Find local Florida deals
            </a>
          </div>
          <div className="mt-6 space-y-1 text-sm font-bold leading-6 text-slateText">
            <p>Flight fares and hotel rates may change.</p>
            <p>Confirm current availability with the booking source.</p>
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
