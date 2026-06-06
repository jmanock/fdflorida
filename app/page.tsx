import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bell, Building2, CheckCircle2, Compass, Hotel, MapPinned, Plane, Sailboat, Sparkles, Sun, Ticket, WalletCards } from "lucide-react";
import { deals, type FlightDeal } from "@/data/deals";
import { cityFlightPages } from "@/lib/cityFlightPages";
import { getFeaturedStats } from "@/lib/deals";
import { getTrustedDealImage } from "@/lib/dealImages";
import { cityFlightLinks, flightSearchLinks } from "@/lib/siteLinks";
import { DealCard } from "@/components/DealCard";
import { DealsExplorer } from "@/components/DealsExplorer";
import { FallbackImage } from "@/components/FallbackImage";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SiteFooter } from "@/components/SiteFooter";

const siteUrl = "https://flightdealsflorida.org";
const lastUpdated = "June 2026";

export const metadata: Metadata = {
  title: "Florida Flight Deals: Cheap Routes, Airport Guides & Weekend Getaways",
  description:
    "Compare cheap flights from Orlando, Miami, Tampa, Fort Lauderdale, and Jacksonville with airport guides, popular routes, and Florida weekend getaway ideas.",
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "Florida Flight Deals: Cheap Routes, Airport Guides & Weekend Getaways",
    description:
      "Compare popular Florida routes, airport guides, flexible-date tips, and weekend flight ideas from major Florida airports.",
    url: siteUrl,
    siteName: "Florida Flight Deals",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Airplane wing above clouds for Florida flight deals and route planning"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Flight Deals: Cheap Routes, Airport Guides & Weekend Getaways",
    description: "Compare popular Florida routes, airport guides, and weekend flight ideas.",
    images: ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"]
  }
};

const trustSignals = ["Curated Florida deals", "Updated often", "Free deal alerts", "No spam"];

const navItems = [
  { label: "Flights", href: "/", active: true },
  { label: "Hotels", href: "https://hoteldealsflorida.org" },
  { label: "Cruises", href: "https://cruisedealsflorida.org" },
  { label: "Local Deals", href: "https://localdealsflorida.org" },
  { label: "Florida Deals Hub", href: "https://floridadealshub.com" }
];

const reasons = [
  {
    title: "Curated Daily",
    description: "Built for a daily scan of the fares that matter most to Florida travelers.",
    icon: Compass
  },
  {
    title: "Real Savings",
    description: "Every deal card highlights the route, airline, dates, badge and booking path.",
    icon: WalletCards
  },
  {
    title: "Florida Experts",
    description: "Focused on Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville and the trips Floridians actually take.",
    icon: MapPinned
  }
];

const sisterSites = [
  {
    title: "Florida Hotel Deals",
    description: "Premium stays, resort escapes and smart nightly rates across the state.",
    href: "https://hoteldealsflorida.org",
    icon: Hotel
  },
  {
    title: "Florida Cruise Deals",
    description: "Sailings from Florida ports, last-minute offers and warm-weather itineraries.",
    href: "https://cruisedealsflorida.org",
    icon: Sailboat
  },
  {
    title: "Local Florida Deals",
    description: "Restaurants, attractions, weekend plans and local finds worth sharing.",
    href: "https://localdealsflorida.org",
    icon: Ticket
  },
  {
    title: "Florida Deals Hub",
    description: "The parent network for flights, hotels, cruises and local Florida savings.",
    href: "https://floridadealshub.com",
    icon: Building2
  }
];

const crossPromos = [
  {
    title: "Need a hotel after your flight?",
    description: "Compare Florida hotel deals for beach weekends, airport stays and resort escapes.",
    href: "https://hoteldealsflorida.org",
    cta: "Browse Florida hotel deals",
    icon: Hotel
  },
  {
    title: "Cruising from Florida?",
    description: "Find cheap sailings from Miami, Port Canaveral, Tampa and Fort Lauderdale.",
    href: "https://cruisedealsflorida.org",
    cta: "Browse Florida cruise deals",
    icon: Sailboat
  },
  {
    title: "Planning a weekend trip?",
    description: "Pair your fare with local Florida deals on attractions, restaurants and events.",
    href: "https://localdealsflorida.org",
    cta: "Browse local Florida deals",
    icon: Ticket
  }
];

const featuredDealIds = ["mco-den-frontier-58", "mia-nyc-jetblue-79", "tpa-cun-southwest-119"];
const popularThisWeek = [
  { label: "Orlando Flight Deals", href: "/orlando-flight-deals", note: "Central Florida fare ideas" },
  { label: "Miami Flight Deals", href: "/miami-flight-deals", note: "South Florida and Caribbean routes" },
  { label: "Tampa Flight Deals", href: "/tampa-flight-deals", note: "Gulf Coast weekend searches" },
  { label: "Fort Lauderdale Flight Deals", href: "/fort-lauderdale-flight-deals", note: "FLL budget route examples" },
  { label: "Cheap Flights From Orlando", href: "/cheap-flights-from-orlando", note: "Flexible-date Orlando departures" },
  { label: "Weekend Flight Deals Florida", href: "/weekend-flight-deals-florida", note: "Short-trip route ideas" }
];
const flightTypes = [
  { label: "Flights To Florida Deals", href: "/flights-to-florida-deals", description: "Inbound Florida fare ideas for Orlando, Miami, Tampa, Fort Lauderdale, and Jacksonville." },
  { label: "Cheap Weekend Getaway Flights", href: "/cheap-weekend-getaway-flights", description: "Short-trip searches for flexible Florida travelers watching quick escapes." },
  { label: "Florida Airfare Deals", href: "/florida-airfare-deals", description: "Statewide route examples and airport-market comparisons." }
];
const seasonalIdeas = [
  { label: "Summer Flight Deals", href: "/summer-flight-deals", description: "Beach, city, and family-route ideas for summer travel windows." },
  { label: "Holiday Flights From Florida", href: "/holiday-flights-from-florida", description: "Plan around busy holiday fare periods and flexible airport choices." },
  { label: "Spring Break Flights", href: "/spring-break-flights", description: "Route ideas for spring beach trips, family travel, and quick escapes." },
  { label: "Winter Getaway Flights", href: "/winter-getaway-flights", description: "Warm-weather and city-escape searches for winter travel planning." }
];
const airportGuides = [
  { label: "Orlando Airport Guide", href: "/orlando-airport-guide" },
  { label: "Miami Airport Guide", href: "/miami-airport-guide" },
  { label: "Tampa Airport Guide", href: "/tampa-airport-guide" },
  { label: "Fort Lauderdale Airport Guide", href: "/fort-lauderdale-airport-guide" },
  { label: "Jacksonville Airport Guide", href: "/jacksonville-airport-guide" }
];
const planningGuides = [
  { label: "Best Time To Book Flights", href: "/best-time-to-book-flights" },
  { label: "How To Find Cheap Flights", href: "/how-to-find-cheap-flights" },
  { label: "Best Airports In Florida", href: "/best-airports-in-florida" },
  { label: "Family Flight Planning Guide", href: "/family-flight-planning-guide" },
  { label: "Weekend Flight Getaways", href: "/weekend-flight-getaways" },
  { label: "International Airports In Florida", href: "/best-florida-airports-for-international-travel" }
];
const popularFlightGuides = [
  {
    title: "Google Flights Florida",
    description: "Compare flexible dates, price alerts, and Florida airports before booking.",
    href: "/google-flights-florida",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=75",
    alt: "Airplane wing above clouds for the Google Flights Florida guide"
  },
  {
    title: "Google Flights vs Skyscanner",
    description: "See which flight search tool fits Florida route research and broad discovery.",
    href: "/google-flights-vs-skyscanner-for-florida-routes",
    image: "https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?auto=format&fit=crop&w=800&q=75",
    alt: "Traveler comparing flight search tools on a laptop"
  },
  {
    title: "Best Time To Book Florida Flights",
    description: "Plan around seasonal demand, holidays, school breaks, and flexible dates.",
    href: "/best-time-to-book-florida-flights",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=75",
    alt: "Travel calendar and planning view for Florida airfare"
  },
  {
    title: "Cheap Flights To Florida Guide",
    description: "Choose the right airport for Orlando, Miami, Tampa, beaches, and more.",
    href: "/cheap-flights-to-florida-guide",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",
    alt: "Florida beach destination reached by a cheap flight"
  }
];
const destinationTypes = [
  { label: "Beach Destinations", href: "/flights-to-florida-deals", description: "Miami, Fort Lauderdale, Cancun, San Juan, and Gulf Coast route ideas." },
  { label: "City Escapes", href: "/weekend-flight-deals-florida", description: "New York, Chicago, Atlanta, New Orleans, Nashville, and quick city weekends." },
  { label: "Family Trips", href: "/family-flight-planning-guide", description: "Orlando, Tampa, and flexible airport planning for family travel." },
  { label: "International Flights", href: "/best-florida-airports-for-international-travel", description: "Miami, Fort Lauderdale, Orlando, and Tampa international route planning." },
  { label: "Weekend Getaways", href: "/weekend-flight-getaways", description: "Short-trip routes and flexible date ideas from Florida airports." },
  { label: "Cruise Departure Cities", href: "https://cruisedealsflorida.org", description: "Miami, Port Canaveral, Tampa, and Fort Lauderdale cruise planning." }
];
const editorialPicks = [
  { label: "Best quick getaway search", value: "Orlando to New York", href: "/orlando-to-new-york-flight-deals" },
  { label: "Best beach escape", value: "Tampa to Cancun", href: "/tampa-to-cancun-flight-deals" },
  { label: "Best budget search", value: "Cheap flights from Orlando", href: "/cheap-flights-from-orlando" },
  { label: "Best flexible-date search", value: "Miami flight deals", href: "/miami-flight-deals" },
  { label: "Best weekend idea", value: "Florida weekend flight deals", href: "/weekend-flight-deals-florida" }
];
const homepageFaqs = [
  {
    question: "Are these Florida flight prices fixed?",
    answer: "No. The site uses recent fare examples and route ideas. Fares may change and availability varies by date."
  },
  {
    question: "Which Florida airports do you focus on?",
    answer: "Florida Flight Deals focuses on Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, and related route searches."
  },
  {
    question: "How should I use the fare cards?",
    answer: "Use them as a starting point, then open the route search and confirm current fares, fees, and flight times with the booking source."
  }
];

function getDealById(id: string) {
  return deals.find((deal) => deal.id === id);
}

function RouteGraphic({ featuredDeal }: { featuredDeal: FlightDeal }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-premium">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.18),transparent_18rem),radial-gradient(circle_at_90%_80%,rgba(245,158,11,0.18),transparent_18rem)]" />
      <div className="relative p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-amber-800 ring-1 ring-amber-200">
            <Sun className="h-3.5 w-3.5 text-gold" />
            Featured drop
          </div>
          <p className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-ocean ring-1 ring-sky-100">Fresh Florida Deals</p>
        </div>

        <div className="mt-7 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-card backdrop-blur">
          <div className="relative mb-5 h-32 overflow-hidden rounded-2xl bg-sand sm:h-36">
            <FallbackImage
              src={getTrustedDealImage(featuredDeal)}
              alt={`${featuredDeal.to} destination mood for ${featuredDeal.from} to ${featuredDeal.to} fare deal`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/5 to-white/10" />
            <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-ink shadow-sm ring-1 ring-white/70">
              Colorado mountain fare
            </div>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black text-ocean">{featuredDeal.airline}</p>
              <h2 className="mt-1 text-2xl font-black tracking-normal text-ink sm:text-3xl">
                {featuredDeal.from} to {featuredDeal.to}
              </h2>
              <p className="mt-2 text-sm font-bold text-slateText">{featuredDeal.dates} roundtrip</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black uppercase text-slate-400">Recent fares</p>
              <p className="text-5xl font-black text-gulf">from ${featuredDeal.price}</p>
              <p className="mt-1 text-[11px] font-black uppercase text-slate-400">When available</p>
            </div>
          </div>

          <div className="relative mt-8 h-28 overflow-hidden rounded-2xl bg-sand">
            <div className="absolute left-5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-ocean shadow-[0_0_0_8px_rgba(14,165,233,0.12)]" />
            <div className="absolute right-5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_8px_rgba(245,158,11,0.16)]" />
            <div className="absolute left-8 right-8 top-1/2 h-px border-t border-dashed border-slate-300" />
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ocean shadow-lg">
              <Plane className="h-5 w-5 rotate-45" />
            </div>
            <p className="absolute bottom-4 left-5 text-xs font-black uppercase text-slate-500">{featuredDeal.from}</p>
            <p className="absolute bottom-4 right-5 text-xs font-black uppercase text-slate-500">{featuredDeal.to}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {["Updated regularly", "Fares may change", "Check availability"].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white/80 p-3 text-center shadow-sm">
              <CheckCircle2 className="mx-auto h-4 w-4 text-ocean" />
              <p className="mt-2 text-xs font-black leading-4 text-ink">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const stats = getFeaturedStats();
  const featuredDeals = featuredDealIds.map(getDealById).filter((deal): deal is FlightDeal => Boolean(deal));
  const heroDeal = featuredDeals[0] ?? deals[0];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Florida Flight Deals",
        url: siteUrl,
        description:
          "Find cheap flights to and from Florida with daily airfare deals from Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, and more.",
        publisher: {
          "@type": "Organization",
          name: "Florida Deals Hub"
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        name: "Florida Flight Deals fare examples",
        itemListElement: deals.slice(0, 12).map((deal, index) => ({
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

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="https://flightdealsflorida.org" className="flex min-w-0 items-center gap-3" aria-label="Florida Flight Deals home">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-white shadow-lg shadow-slate-900/15">
              <Plane className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-gold ring-2 ring-white" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-black tracking-normal text-ink sm:text-lg">Florida Flight Deals</span>
              <span className="hidden text-xs font-bold text-slateText sm:block">Part of Florida Deals Hub</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-sand p-1 text-sm font-bold text-slateText lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                className={`rounded-full px-4 py-2 transition ${
                  item.active ? "bg-white text-ink shadow-sm" : "hover:bg-white hover:text-ocean"
                }`}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#alerts"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gulf to-ocean px-4 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            <Bell className="h-4 w-4" />
            Get Alerts
          </a>
        </div>
      </header>

      <section className="section-fade mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-20 lg:pt-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm font-black text-ocean shadow-sm">
            <Sparkles className="h-4 w-4 text-gold" />
            Part of Florida Deals Hub
          </div>
          <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-slateText">Updated: {lastUpdated}</p>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.96] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Cheap Flights In & Out of Florida
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slateText sm:text-xl">
            Daily airfare deals from Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville and more.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#deals"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
              View Flights
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#alerts"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
              <Bell className="h-4 w-4" />
              Get Alerts
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {trustSignals.map((signal) => (
              <span key={signal} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slateText shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-ocean" />
                {signal}
              </span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                <p className="text-2xl font-black text-gold">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase leading-4 text-slateText">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <RouteGraphic featuredDeal={heroDeal} />
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Popular Florida Flight Searches</p>
              <h2 className="mt-2 text-2xl font-black tracking-normal text-ink">Quick routes and city pages to check next.</h2>
            </div>
            <p className="text-sm font-semibold text-slateText">Updated: {lastUpdated}. Fares may change fast.</p>
          </div>
          <nav className="mt-5 flex flex-wrap gap-2" aria-label="Popular Florida flight searches">
            {[...cityFlightLinks, ...flightSearchLinks].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-sand px-3 py-2 text-xs font-black text-slateText transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Popular this week</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Popular Florida Flight Searches This Week</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slateText">
            Popular searches from Florida travelers watching fare changes.
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularThisWeek.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft"
            >
              <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">Flight search</p>
              <h3 className="mt-3 text-xl font-black text-ink">{item.label}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slateText">{item.note}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ocean">
                Compare routes
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Popular Flight Guides</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Search smarter before choosing a fare.</h2>
          </div>
          <Link href="/best-flight-search-engines-for-florida" className="inline-flex items-center gap-2 text-sm font-black text-ocean transition hover:text-ink">
            Compare flight search engines
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularFlightGuides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft">
              <div className="relative aspect-[16/10] bg-sand">
                <FallbackImage src={guide.image} alt={guide.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black leading-6 text-ink">{guide.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{guide.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ocean">
                  Read guide
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Popular Florida Destinations</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Explore city fare pages.</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slateText">
            Start with popular Florida destination pages, then compare current fares when your dates are ready.
          </p>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cityFlightPages.map((destination) => (
            <article key={destination.slug} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="text-xl font-black text-ink">{destination.city}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slateText">Flight routes, fare tips, and current-search links for {destination.city}.</p>
              <div className="mt-5">
                <a
                  href={`/flights/${destination.slug}`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gulf to-ocean px-4 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-200"
                >
                  View Flights
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Flight types</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Compare by trip intent.</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-slateText">
              Browse pages built around how travelers actually search: inbound Florida trips, weekend getaways, and statewide airfare ideas.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {flightTypes.map((type) => (
              <a key={type.href} href={type.href} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft">
                <h3 className="text-lg font-black text-ink">{type.label}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{type.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Seasonal travel ideas</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Plan around the travel calendar.</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slateText">
            Seasonal pages help compare Florida airfare around summer, holidays, spring break, and winter escapes.
          </p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-4">
          {seasonalIdeas.map((idea) => (
            <a key={idea.href} href={idea.href} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft">
              <h3 className="text-lg font-black text-ink">{idea.label}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{idea.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Airport Guides</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Compare Florida airports before choosing a route.</h2>
            <div className="mt-6 grid gap-2">
              {airportGuides.map((guide) => (
                <a key={guide.href} href={guide.href} className="rounded-2xl border border-slate-200 bg-sand px-4 py-3 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean">
                  {guide.label}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Flight Planning Guides</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Learn how to compare fares with more context.</h2>
            <div className="mt-6 grid gap-2">
              {planningGuides.map((guide) => (
                <a key={guide.href} href={guide.href} className="rounded-2xl border border-slate-200 bg-sand px-4 py-3 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean">
                  {guide.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Destination Discovery</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Explore by destination type.</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinationTypes.map((type) => (
              <a key={type.href} href={type.href} className="rounded-3xl border border-slate-200 bg-sand p-5 transition hover:border-sky-200 hover:bg-skyline">
                <h3 className="text-lg font-black text-ink">{type.label}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{type.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Editor Picks</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Useful searches to start with.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-5">
            {editorialPicks.map((pick) => (
              <a key={pick.href} href={pick.href} className="rounded-3xl border border-slate-200 bg-sand p-4 transition hover:border-sky-200 hover:bg-skyline">
                <p className="text-xs font-black uppercase leading-5 text-slateText">{pick.label}</p>
                <p className="mt-3 text-base font-black leading-6 text-ink">{pick.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Featured deals · Updated {lastUpdated}</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Featured fare finds from Florida airports.</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slateText">
              Fares are examples from recent searches. Prices and availability may change.
            </p>
          </div>
          <a href="#deals" className="inline-flex items-center gap-2 text-sm font-black text-ocean transition hover:text-ink">
            Browse all deals
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {featuredDeals.map((deal, index) => (
            <DealCard key={deal.id} deal={deal} priority={index === 0} featured />
          ))}
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Start Planning Your Florida Trip</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Flights are the start of the trip.</h2>
          <p className="mt-3 max-w-3xl text-base font-medium leading-8 text-slateText">
            Once a route looks promising, compare hotels, cruises, and local plans across the Florida Deals Hub network.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {[
              { label: "Compare Florida Hotels", href: "https://hoteldealsflorida.org" },
              { label: "Browse Florida Cruise Deals", href: "https://cruisedealsflorida.org" },
              { label: "Explore Local Deals Nearby", href: "https://localdealsflorida.org" },
              { label: "Start at Florida Deals Hub", href: "https://floridadealshub.com" }
            ].map((item) => (
              <a key={item.href} href={item.href} className="rounded-3xl border border-slate-200 bg-sand p-5 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <DealsExplorer initialDeals={deals} />

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {crossPromos.map((promo) => {
            const Icon = promo.icon;

            return (
              <a
                key={promo.title}
                href={promo.href}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-skyline text-ocean ring-1 ring-sky-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-black text-ink">{promo.title}</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-slateText">{promo.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ocean">
                  {promo.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section id="why" className="section-fade mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Why use us</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">
            A premium daily habit for Florida travelers.
          </h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <article key={reason.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-skyline text-ocean">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-black tracking-normal text-ink">{reason.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-slateText">{reason.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Why Trust This Site?</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">A Florida-focused airfare resource.</h2>
          <p className="mt-4 max-w-4xl text-base font-medium leading-8 text-slateText">
            Florida Flight Deals is part of the Florida Deals Hub network. We organize flight searches by Florida airport, route type, destination, and trip intent so visitors can compare airfare ideas faster.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Updated regularly", "Fares may change", "Availability varies by date", "Confirm current fares with the booking source"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-sand p-4 text-sm font-black text-ink">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Flight FAQs</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Before you compare fares.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {homepageFaqs.map((faq) => (
              <article key={faq.question} className="rounded-3xl border border-slate-200 bg-sand p-5">
                <h3 className="text-base font-black leading-6 text-ink">{faq.question}</h3>
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
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
              Get Florida Flight Deals Delivered
            </h2>
          </div>
          <div>
            <p className="text-base font-medium leading-7 text-slate-200">
              Join free alerts for cheap flights, weekend escapes, and hidden airfare deals.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section id="sister-sites" className="section-fade mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Florida Deals Network</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">Explore More Florida Deals</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slateText">
            One premium standard for flights, hotels, cruises and local Florida savings.
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
