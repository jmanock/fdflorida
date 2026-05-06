import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, CheckCircle2, Hotel, Plane, Sailboat, Search, Ticket } from "lucide-react";
import { DealCard } from "@/components/DealCard";
import { HotelCtaLink } from "@/components/HotelCtaLink";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDestinationKey, getExpediaHotelLink } from "@/lib/affiliateLinks";
import { getSeoFlightPage, getSeoFlightPageDeals, getSeoFlightPageFaqs, seoFlightPageSlugs, type SeoFlightPage } from "@/lib/seoFlightPages";
import { flightSearchLinks, siteUrl } from "@/lib/siteLinks";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const lastUpdated = "May 2026";

const sisterSites = [
  {
    title: "Florida Hotel Deals",
    description: "Pair your flight search with Florida stays, resorts, and airport hotels.",
    href: "https://hoteldealsflorida.org",
    icon: Hotel
  },
  {
    title: "Florida Cruise Deals",
    description: "Watch sailings from Miami, Port Canaveral, Tampa, and Fort Lauderdale.",
    href: "https://cruisedealsflorida.org",
    icon: Sailboat
  },
  {
    title: "Local Deals Florida",
    description: "Find restaurants, attractions, events, and weekend plans around the state.",
    href: "https://localdealsflorida.org",
    icon: Ticket
  },
  {
    title: "Florida Deals Hub",
    description: "Explore the wider Florida Deals Hub network.",
    href: "https://floridadealshub.com",
    icon: Building2
  }
];

export const dynamicParams = false;

export function generateStaticParams() {
  return seoFlightPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoFlightPage(slug);

  if (!page) {
    return {};
  }

  const canonical = `${siteUrl}/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url: canonical,
      siteName: "Florida Flight Deals",
      images: [
        {
          url: "/icon.svg",
          width: 512,
          height: 512,
          alt: "Florida Flight Deals"
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

export default async function SeoFlightLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoFlightPage(slug);

  if (!page) {
    notFound();
  }

  const pageDeals = getSeoFlightPageDeals(page);
  const primaryHotelDestination = pageDeals[0]?.destination ?? pageDeals[0]?.to ?? "Orlando";
  const primaryHotelDestinationKey = getDestinationKey(primaryHotelDestination);
  const floridaHotelDestinations = ["Orlando", "Miami", "Tampa", "Fort Lauderdale", "Jacksonville"];
  const relatedPages = page.relatedSlugs.map(getSeoFlightPage).filter((item): item is SeoFlightPage => Boolean(item));
  const faqs = getSeoFlightPageFaqs(page);
  const relatedFlightLinks = [
    ...relatedPages.map((related) => ({ label: related.h1, href: `/${related.slug}` })),
    ...flightSearchLinks.filter((link) => link.href !== `/${page.slug}` && !page.relatedSlugs.some((slug) => link.href === `/${slug}`))
  ].slice(0, 5);
  const relatedSearchLinks = [...relatedFlightLinks, { label: "Florida Hotel Deals", href: "https://hoteldealsflorida.org" }].slice(0, 6);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: page.title,
        url: `${siteUrl}/${page.slug}`,
        description: page.description,
        dateModified: "2026-05-01",
        isPartOf: {
          "@type": "WebSite",
          name: "Florida Flight Deals",
          url: siteUrl
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
            item: `${siteUrl}/${page.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
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
        name: `${page.h1} route examples`,
        itemListElement: pageDeals.map((deal, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${deal.origin ?? deal.from} to ${deal.destination ?? deal.to}`,
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
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-slateText" aria-label="Breadcrumb">
          <Link className="transition hover:text-ocean" href="/">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link className="transition hover:text-ocean" href="/">
            Florida Flight Deals
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">{page.h1}</span>
        </nav>
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm font-black text-ocean shadow-sm">
              <Search className="h-4 w-4 text-gold" />
              {page.eyebrow}
            </div>
            <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-slateText">Updated: {lastUpdated}</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.96] tracking-normal text-ink sm:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slateText">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#fare-examples"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                View fare examples
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#alerts"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                Get Alerts
              </a>
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-premium backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">Before you book</p>
            <h2 className="mt-3 text-2xl font-black tracking-normal text-ink">Use these as fare examples.</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-slateText">
              Prices may change and seats may be limited. View current fares through the linked airline or travel search before booking.
            </p>
            <div className="mt-5 space-y-3">
              {[`Updated: ${lastUpdated}`, "Recent fare finds", "Check current availability", "Fares may change"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-sand px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-ocean" />
                  <span className="text-sm font-black text-ink">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Route notes</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">What to know before checking fares.</h2>
          <p className="mt-4 text-base font-medium leading-8 text-slateText">{page.detail}</p>
          <p className="mt-4 text-base font-medium leading-8 text-slateText">
            Use this page as a focused starting point for current fare checks. Compare the airport market, route type, travel window, and airline or search source before booking. Flexible dates can help because airfare often moves around weekends, holidays, school breaks, cruise departures, and major events.
          </p>
          <p className="mt-4 text-base font-medium leading-8 text-slateText">
            The fare cards below are recent fare examples, not fixed prices. Open the route search, confirm current fares with the booking source, review baggage and seat fees, and check whether nearby Florida airports create a better total trip value.
          </p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {page.tips.map((tip) => (
            <div key={tip} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
              <Plane className="h-5 w-5 text-gold" />
              <p className="mt-4 text-sm font-bold leading-6 text-slateText">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="fare-examples" className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Latest fare finds</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Fare examples worth checking.</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slateText">
            Updated: {lastUpdated}. Recent fares are examples when available. Use the fare links to check current availability.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pageDeals.map((deal, index) => (
            <DealCard key={deal.id} deal={deal} priority={index === 0} />
          ))}
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Need a hotel after your flight?</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Compare destination hotels before rates change.</h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-slateText">
            Planning a weekend trip? Flight fares and hotel rates can change quickly. Compare destination hotels and check current availability before booking.
          </p>
          <HotelCtaLink
            href={getExpediaHotelLink(primaryHotelDestinationKey)}
            location={primaryHotelDestination}
            destinationKey={primaryHotelDestinationKey}
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            <Hotel className="h-4 w-4" />
            Check Hotels
          </HotelCtaLink>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Florida City Hotel Links</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Turn your cheap flight into a full Florida getaway.</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {floridaHotelDestinations.map((destination) => {
              const destinationKey = getDestinationKey(destination);

              return (
                <HotelCtaLink
                  key={destination}
                  href={getExpediaHotelLink(destinationKey)}
                  location={destination}
                  destinationKey={destinationKey}
                  className="rounded-2xl border border-slate-200 bg-sand p-4 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
                >
                  {destination} hotels
                </HotelCtaLink>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Complete Your Trip</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Flights, hotels, cruises, and local plans in one flow.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <HotelCtaLink
              href={getExpediaHotelLink(primaryHotelDestinationKey)}
              location={primaryHotelDestination}
              destinationKey={primaryHotelDestinationKey}
              className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
            >
              Check destination hotels
            </HotelCtaLink>
            <a className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean" href="https://hoteldealsflorida.org">
              Browse Florida hotel deals
            </a>
            <a className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean" href="https://cruisedealsflorida.org">
              Explore Florida cruise deals
            </a>
            <a className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean" href="https://localdealsflorida.org">
              Find local Florida deals
            </a>
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Related Flight Searches</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Keep exploring Florida fares.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {relatedSearchLinks.map((related) => (
              <a
                key={related.href}
                className="rounded-2xl border border-slate-200 bg-sand p-4 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
                href={related.href}
              >
                {related.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Flight deal FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Questions travelers ask before checking fares.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-3xl border border-slate-200 bg-sand p-5">
                <h3 className="text-base font-black text-ink">{faq.question}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{faq.answer}</p>
              </article>
            ))}
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

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Florida Deals Network</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Explore More Florida Deals</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slateText">
            Flights, hotels, cruises, and local finds from the Florida Deals Hub network.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sisterSites.map((site) => {
            const Icon = site.icon;

            return (
              <a
                key={site.title}
                href={site.href}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-ink ring-1 ring-slate-200 transition group-hover:bg-skyline group-hover:text-ocean">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-black text-ink">{site.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slateText">{site.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ocean">
                  Explore
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
