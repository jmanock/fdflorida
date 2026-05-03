import { Plane } from "lucide-react";
import { flightSearchLinks, networkLinks } from "@/lib/siteLinks";

const footerLinks = [
  ...networkLinks.map((item) => ({ label: item.label === "Flights" ? "Flight Deals" : item.label, href: item.href })),
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" }
];

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
            <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-slateText">Updated: May 2026</p>
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-bold text-slateText sm:grid-cols-3" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <a key={item.label} className="transition hover:text-ocean" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-slate-200 pt-7 md:col-span-2">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ocean">Popular Flight Searches</p>
          <nav className="mt-4 flex flex-wrap gap-2" aria-label="Popular flight searches">
            {flightSearchLinks.map((item) => (
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
      </div>
    </footer>
  );
}
