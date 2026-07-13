import { Plane } from "lucide-react";
import { flightSearchLinks, networkLinks, v2FlightDiscoveryLinks } from "@/lib/siteLinks";

const footerLinks = [
  ...networkLinks.map((item) => ({ label: item.label === "Flights" ? "Flight Deals" : item.label, href: item.href })),
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "How Prices Work", href: "/how-flight-prices-work" },
  { label: "Airport Status", href: "/florida-airport-status" },
  { label: "How Live Data Works", href: "https://floridadealshub.com/how-florida-live-data-works" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" }
];

const flightMarkets = [
  { label: "Orlando Flight Deals", href: "/orlando-flight-deals" },
  { label: "Miami Flight Deals", href: "/miami-flight-deals" },
  { label: "Tampa Flight Deals", href: "/tampa-flight-deals" },
  { label: "Fort Lauderdale Flight Deals", href: "/fort-lauderdale-flight-deals" },
  { label: "Jacksonville Flight Deals", href: "/jacksonville-flight-deals" }
];

const flightTypes = [
  { label: "Cheap Flights From Orlando", href: "/cheap-flights-from-orlando" },
  { label: "Flights To Florida Deals", href: "/flights-to-florida-deals" },
  { label: "Weekend Flight Deals Florida", href: "/weekend-flight-deals-florida" },
  { label: "Cheap Weekend Getaway Flights", href: "/cheap-weekend-getaway-flights" },
  { label: "Florida Airfare Deals", href: "/florida-airfare-deals" }
];

const networkFooterLinks = networkLinks.filter((link) => link.label !== "Flights");

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-ocean">{title}</p>
      <nav className="mt-4 grid gap-2 text-sm font-bold text-slateText" aria-label={title}>
        {links.map((item) => (
          <a key={item.href} className="transition hover:text-ocean" href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.1fr_1fr] lg:px-8">
        <div className="flex items-start gap-3">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
            <Plane className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-gold ring-2 ring-white" />
          </span>
          <div>
            <p className="font-black text-ink">Florida Flight Deals</p>
            <p className="mt-1 max-w-md text-sm font-medium leading-6 text-slateText">
              Cheap flights in and out of Florida. Part of Florida Deals Hub.
            </p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-slateText"></p>
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-bold text-slateText sm:grid-cols-3" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <a key={item.label} className="transition hover:text-ocean" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="grid gap-7 border-t border-slate-200 pt-7 md:col-span-2 lg:grid-cols-3">
          <FooterColumn title="Florida Flight Markets" links={flightMarkets} />
          <FooterColumn title="Flight Types" links={flightTypes} />
          <FooterColumn title="Florida Deals Network" links={networkFooterLinks} />
        </div>
        <div className="border-t border-slate-200 pt-7 md:col-span-2">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ocean">Related Flight Searches</p>
          <nav className="mt-4 flex flex-wrap gap-2" aria-label="Related flight searches">
            {[...flightSearchLinks.slice(0, 10), ...v2FlightDiscoveryLinks.slice(0, 8)].map((item) => (
              <a key={item.href} href={item.href} className="rounded-full border border-slate-200 bg-sand px-3 py-2 text-xs font-black text-slateText transition hover:border-sky-200 hover:bg-skyline hover:text-ocean">
                {item.label}
              </a>
            ))}
          </nav>
          <p className="mt-5 max-w-3xl text-xs font-semibold leading-5 text-slateText">
            Some links may be sponsored or affiliate links. We may earn a commission if you book or buy through them, at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
