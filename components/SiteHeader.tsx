import { Bell, Plane } from "lucide-react";
import { networkLinks, siteUrl } from "@/lib/siteLinks";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href={siteUrl} className="flex min-w-0 items-center gap-3" aria-label="Florida Flight Deals home">
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
          {networkLinks.map((item) => {
            const opensNewTab = item.label !== "Flights";

            return (
              <a
                key={item.label}
                className={`rounded-full px-4 py-2 transition ${
                  item.label === "Flights" ? "bg-white text-ink shadow-sm" : "hover:bg-white hover:text-ocean"
                }`}
                href={item.href}
                target={opensNewTab ? "_blank" : undefined}
                rel={opensNewTab ? "noopener noreferrer" : undefined}
                aria-current={item.label === "Flights" ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
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
  );
}
