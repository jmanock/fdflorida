import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, CheckCircle2, Hotel, Plane, Sailboat, Search, Ticket } from "lucide-react";
import { AffiliateGearLink } from "@/components/AffiliateGearLink";
import { DealCard } from "@/components/DealCard";
import { FallbackImage } from "@/components/FallbackImage";
import { FlightGuideAnalytics } from "@/components/FlightGuideAnalytics";
import { FlightAuthorityAnalytics } from "@/components/FlightAuthorityAnalytics";
import { HotelCtaLink } from "@/components/HotelCtaLink";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RelatedFloridaGuides } from "@/components/RelatedFloridaGuides";
import { RevenueCtaCard } from "@/components/RevenueCtaCard";
import { ComparisonCard, ConversionScrollAnalytics, RecommendedPartnerCard } from "@/components/ConversionCards";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { flightPiscifunGearPicks } from "@/lib/affiliate/piscifunLinks";
import { getDestinationKey, getExpediaHotelLink } from "@/lib/affiliateLinks";
import { getSeoFlightPage, getSeoFlightPageDeals, getSeoFlightPageFaqs, seoFlightPageSlugs, type SeoFlightPage } from "@/lib/seoFlightPages";
import { flightSearchLinks, siteUrl, v2FlightDiscoveryLinks } from "@/lib/siteLinks";
import { conversionSlugs } from "@/lib/revenuePartners";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const lastUpdated = "June 2026";
const ogImage = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80";

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
const routeClusters = [
  {
    title: "Orlando Flight Cluster",
    links: [
      { label: "Orlando Flight Deals", href: "/orlando-flight-deals" },
      { label: "Cheap Flights From Orlando", href: "/cheap-flights-from-orlando" },
      { label: "Orlando Airport Guide", href: "/orlando-airport-guide" },
      { label: "Orlando to Denver Flight Deals", href: "/orlando-to-denver-flight-deals" },
      { label: "Orlando to New York Flight Deals", href: "/orlando-to-new-york-flight-deals" },
      { label: "Hotels Near Disney", href: "https://hoteldealsflorida.org/hotels-near-disney" },
      { label: "Orlando Things To Do", href: "https://localdealsflorida.org/orlando-things-to-do" },
      { label: "Orlando Travel Guide", href: "https://floridadealshub.com/orlando-travel-guide" },
      { label: "Port Canaveral Cruises", href: "https://cruisedealsflorida.org/cruises-from-port-canaveral" }
    ]
  },
  {
    title: "Miami Flight Cluster",
    links: [
      { label: "Miami Flight Deals", href: "/miami-flight-deals" },
      { label: "Cheap Flights From Miami", href: "/cheap-flights-from-miami" },
      { label: "Miami Airport Guide", href: "/miami-airport-guide" },
      { label: "Miami to New York Flight Deals", href: "/miami-to-new-york-flight-deals" },
      { label: "Miami to Bahamas Flight Deals", href: "/miami-to-bahamas-flight-deals" },
      { label: "Miami Beach Hotels", href: "https://hoteldealsflorida.org/miami-beach-hotels" },
      { label: "Miami Cruise Port Guide", href: "https://cruisedealsflorida.org/miami-cruise-port-guide" },
      { label: "Miami Boat Rentals", href: "https://localdealsflorida.org/miami-boat-rentals" },
      { label: "Miami Travel Guide", href: "https://floridadealshub.com/miami-travel-guide" }
    ]
  },
  {
    title: "Tampa Flight Cluster",
    links: [
      { label: "Tampa Flight Deals", href: "/tampa-flight-deals" },
      { label: "Cheap Flights From Tampa", href: "/cheap-flights-from-tampa" },
      { label: "Tampa Airport Guide", href: "/tampa-airport-guide" },
      { label: "Tampa to Cancun Flight Deals", href: "/tampa-to-cancun-flight-deals" },
      { label: "Tampa vs Orlando Flights", href: "/tampa-vs-orlando-flights" },
      { label: "Tampa Hotel Deals", href: "https://hoteldealsflorida.org/tampa-hotel-deals" },
      { label: "Cruises From Tampa", href: "https://cruisedealsflorida.org/cruises-from-tampa" },
      { label: "Tampa Weekend Activities", href: "https://localdealsflorida.org/tampa-weekend-activities" },
      { label: "Tampa Travel Guide", href: "https://floridadealshub.com/tampa-travel-guide" }
    ]
  }
];

const hubStoryLinks = [
  {
    match: /orlando|mco|sanford|theme-park|family/,
    links: [
      { label: "Disney vs Universal: Which Orlando Vacation Is Better?", href: "https://floridadealshub.com/journal/disney-vs-universal" },
      { label: "Orlando vs Miami For A Florida Family Vacation", href: "https://floridadealshub.com/journal/orlando-vs-miami-family-vacation" },
      { label: "Explore The Orlando Florida Travel Hub", href: "https://floridadealshub.com/orlando" }
    ]
  },
  {
    match: /miami|fort-lauderdale|fll|caribbean|bahamas/,
    links: [
      { label: "Miami Cruise Port Guide For First-Time Cruisers", href: "https://floridadealshub.com/journal/miami-cruise-port-guide-first-time-cruisers" },
      { label: "How To Plan A Miami Boat Rental Day", href: "https://floridadealshub.com/journal/miami-boat-rental-day-guide" },
      { label: "Explore The Miami Florida Travel Hub", href: "https://floridadealshub.com/miami" }
    ]
  },
  {
    match: /tampa|clearwater|gulf/,
    links: [
      { label: "Tampa Weekend Escape Story", href: "https://floridadealshub.com/journal/tampa-weekend-escape-story" },
      { label: "Clearwater vs Destin Beach Trip", href: "https://floridadealshub.com/journal/clearwater-vs-destin-beach-trip" },
      { label: "Explore The Tampa Florida Travel Hub", href: "https://floridadealshub.com/tampa" }
    ]
  }
];

function getHubStoryLinks(slug: string) {
  return (
    hubStoryLinks.find((group) => group.match.test(slug))?.links ?? [
      { label: "Florida Weekend Trip Ideas", href: "https://floridadealshub.com/florida-weekend-getaways" },
      { label: "Best Places To Visit In Florida", href: "https://floridadealshub.com/best-places-to-visit-in-florida" },
      { label: "Browse The Florida Travel Journal", href: "https://floridadealshub.com/journal" }
    ]
  );
}

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
  const metadataImage = page.heroImage?.src ?? ogImage;

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
          url: metadataImage,
          width: 1200,
          height: 800,
          alt: page.heroImage?.alt ?? `${page.h1} flight travel preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [metadataImage]
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
  const hasDeals = pageDeals.length > 0;
  const isGuide = page.pageType === "guide";
  const primaryHotelDestination = pageDeals[0]?.destination ?? pageDeals[0]?.to ?? "Orlando";
  const primaryHotelDestinationKey = getDestinationKey(primaryHotelDestination);
  const floridaHotelDestinations = ["Orlando", "Miami", "Tampa", "Fort Lauderdale", "Jacksonville"];
  const relatedPages = page.relatedSlugs.map(getSeoFlightPage).filter((item): item is SeoFlightPage => Boolean(item));
  const faqs = getSeoFlightPageFaqs(page);
  const showGearPicks = /carry-on|packing|gear|weekend-flight-packing/.test(page.slug);
  const isToolComparison = /google-flights-vs-/.test(page.slug);
  const showConversionCards = conversionSlugs.has(page.slug);
  const relatedHubStories = getHubStoryLinks(page.slug);
  const relatedFlightLinks = [
    ...relatedPages.map((related) => ({ label: related.h1, href: `/${related.slug}` })),
    ...flightSearchLinks.filter((link) => link.href !== `/${page.slug}` && !page.relatedSlugs.some((slug) => link.href === `/${slug}`)),
    ...v2FlightDiscoveryLinks.filter((link) => link.href !== `/${page.slug}`)
  ].slice(0, 9);
  const relatedSearchLinks = [...relatedFlightLinks, { label: "Florida Hotel Deals", href: "https://hoteldealsflorida.org" }].slice(0, 10);
  const structuredGraph = [
    {
      "@type": isGuide ? "Article" : "CollectionPage",
      name: page.title,
      headline: page.h1,
      url: `${siteUrl}/${page.slug}`,
      description: page.description,
      dateModified: "2026-06-06",
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
    ...(hasDeals
      ? [
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
      : [])
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": structuredGraph
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {isGuide ? <FlightGuideAnalytics slug={page.slug} isComparison={isToolComparison} /> : null}
      {isGuide ? <FlightAuthorityAnalytics /> : null}
      {showConversionCards ? <ConversionScrollAnalytics /> : null}
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
                href={hasDeals ? "#fare-examples" : "#guide-content"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                {hasDeals ? "View fare examples" : "Read the guide"}
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

          <aside className="overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-premium backdrop-blur">
            {page.heroImage ? (
              <figure>
                <div className="relative aspect-[16/10] bg-sand">
                  <FallbackImage
                    src={page.heroImage.src}
                    alt={page.heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-b border-slate-200 bg-sand px-5 py-3 text-xs font-bold leading-5 text-slateText">
                  {page.heroImage.caption}
                </figcaption>
              </figure>
            ) : null}
            <div className="p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">Before you book</p>
              <h2 className="mt-3 text-2xl font-black tracking-normal text-ink">{hasDeals ? "Use these as fare examples." : "Use this as a planning guide."}</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-slateText">
                {hasDeals
                  ? "Prices may change and seats may be limited. View current fares through the linked airline or travel search before booking."
                  : "Compare airport options, flexible dates, and total trip cost before choosing a flight."}
              </p>
              <div className="mt-5 space-y-3">
                {[`Updated: ${lastUpdated}`, "Recent fare finds", "Check current availability", "Fares may change"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-sand px-4 py-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-ocean" />
                    <span className="text-sm font-black text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="guide-content" className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {page.quickAnswer ? (
          <div className="mb-10 rounded-[28px] border border-sky-200 bg-skyline p-6 shadow-card sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">Quick answer</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">{page.quickAnswer.heading}</h2>
            <p className="mt-4 max-w-4xl text-base font-semibold leading-8 text-slateText">{page.quickAnswer.summary}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {page.quickAnswer.items.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white bg-white p-5 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">{item.label}</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">{isGuide ? "Flight guide" : "Route notes"}</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">{isGuide ? "Practical guidance for Florida travelers." : "What to know before checking fares."}</h2>
          <p className="mt-4 text-base font-medium leading-8 text-slateText">{page.detail}</p>
          <p className="mt-4 text-base font-medium leading-8 text-slateText">
            Use this page as a focused starting point for current fare checks. Compare the airport market, route type, travel window, and airline or search source before booking. Flexible dates can help because airfare often moves around weekends, holidays, school breaks, cruise departures, and major events.
          </p>
          <p className="mt-4 text-base font-medium leading-8 text-slateText">
            {hasDeals
              ? "The fare cards below are recent fare examples, not fixed prices. Open the route search, confirm current fares with the booking source, review baggage and seat fees, and check whether nearby Florida airports create a better total trip value."
              : "Use the related flight pages below to compare current route ideas after reviewing the guide. Confirm current fares with the booking source, review baggage and seat fees, and check whether nearby Florida airports create a better total trip value."}
          </p>
        </div>
        {page.contentSections ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {page.contentSections.map((section) => (
              <article key={section.heading} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <h3 className="text-lg font-black text-ink">{section.heading}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slateText">{section.body}</p>
              </article>
            ))}
          </div>
        ) : null}
        {page.comparisonTable ? (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
            <div className="grid bg-skyline text-sm font-black text-ink md:grid-cols-3">
              {page.comparisonTable.columns.map((column) => (
                <div key={column} className="border-b border-slate-200 px-4 py-3 md:border-r md:last:border-r-0">
                  {column}
                </div>
              ))}
            </div>
            {page.comparisonTable.rows.map((row) => (
              <div key={row.join("-")} className="grid text-sm font-semibold leading-6 text-slateText md:grid-cols-3">
                {row.map((cell, index) => (
                  <div key={`${cell}-${index}`} className="border-b border-slate-200 px-4 py-4 md:border-r md:last:border-r-0">
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : null}
        {page.airportCards ? (
          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Florida airports</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Compare major Florida airport markets.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {page.airportCards.map((airport) => (
                <Link key={airport.code} href={airport.href} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft">
                  <span className="inline-flex rounded-xl bg-ocean px-3 py-2 text-sm font-black text-white">{airport.code}</span>
                  <h3 className="mt-4 text-lg font-black text-ink">{airport.city}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slateText">{airport.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-ocean">
                    View {airport.city} flights
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {page.tips.map((tip) => (
            <div key={tip} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
              <Plane className="h-5 w-5 text-gold" />
              <p className="mt-4 text-sm font-bold leading-6 text-slateText">{tip}</p>
            </div>
          ))}
        </div>
      </section>
      {showConversionCards ? <section className={`section-fade mx-auto grid w-full max-w-7xl gap-5 px-4 py-10 sm:px-6 ${isToolComparison ? "md:grid-cols-2" : ""} lg:px-8`}>{isToolComparison ? <ComparisonCard /> : null}<RecommendedPartnerCard /></section> : null}

      {hasDeals ? (
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
      ) : null}

      {showGearPicks ? (
        <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Florida travel gear picks</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Pack smarter for warm-weather flight trips.</h2>
            </div>
            <p className="max-w-md text-sm font-semibold leading-6 text-slateText">
              Some links on this site may earn us a commission at no extra cost to you. Pack only what fits your airline rules and trip plans.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {flightPiscifunGearPicks.map((item) => (
              <AffiliateGearLink key={item.title} item={item} ctaText="Browse Piscifun Products" />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <RevenueCtaCard eyebrow="Complete the trip" headline="Compare Florida vacation packages" benefits={["Combine flight planning with stays and activities", "Compare family, beach, and weekend trip styles"]} href="https://floridadealshub.com/vacation-packages" cta="Explore Vacation Packages" icon={<Building2 className="h-5 w-5" />} />
          <RevenueCtaCard eyebrow="After you land" headline="Find Florida attractions and activities" benefits={["Theme parks, tours, and family activities", "Useful destination guides across Florida"]} href="https://localdealsflorida.org" cta="Find Florida Activities" icon={<Ticket className="h-5 w-5" />} />
          <RevenueCtaCard eyebrow="Stay planning" headline="Compare hotels near your plans" benefits={["Check destination and airport-area stays", "Review current rates and cancellation terms"]} href="https://hoteldealsflorida.org" cta="Compare Florida Hotels" icon={<Hotel className="h-5 w-5" />} />
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
            Compare Hotel Rates
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Plan After You Land</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Turn this flight search into a complete Florida trip.</h2>
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Related Florida Travel Stories</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Keep planning after the fare search.</h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-slateText">
            Use these Florida Deals Hub stories and destination guides to compare where to stay, what to do, and how this route fits the rest of the trip.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {relatedHubStories.map((story) => (
              <a
                key={story.href}
                href={story.href}
                className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black leading-6 text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
              >
                {story.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Destination and Route Clusters</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Keep exploring by airport and route.</h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {routeClusters.map((cluster) => (
              <div key={cluster.title} className="rounded-3xl border border-slate-200 bg-sand p-5">
                <h3 className="text-lg font-black text-ink">{cluster.title}</h3>
                <div className="mt-4 grid gap-2">
                  {cluster.links.map((link) => (
                    <a key={link.href} href={link.href} className="text-sm font-bold text-slateText transition hover:text-ocean">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedFloridaGuides guides={relatedSearchLinks} />

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Flight deal FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Questions travelers ask before checking fares.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-3xl border border-slate-200 bg-sand p-5">
                <summary className="cursor-pointer text-base font-black text-ink">{faq.question}</summary>
                <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{faq.answer}</p>
              </details>
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
