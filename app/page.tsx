import { ArrowRight, Bell, Clock3, MapPinned, Plane, Search, ShieldCheck, TrendingDown } from "lucide-react";
import { deals } from "@/data/deals";
import { getFeaturedStats } from "@/lib/deals";
import { DealsExplorer } from "@/components/DealsExplorer";
import { NewsletterForm } from "@/components/NewsletterForm";

const hubs = ["Orlando", "Miami", "Fort Lauderdale", "Tampa / St. Pete", "Jacksonville"];

const reasons = [
  {
    title: "Real Deals",
    description: "Every card is structured like live airfare inventory, with dates, airlines, routes, prices and booking paths.",
    icon: ShieldCheck
  },
  {
    title: "Updated Often",
    description: "The feed is ready for daily refreshes, API sourcing and alert logic as soon as live data is connected.",
    icon: Clock3
  },
  {
    title: "Florida Focused",
    description: "Built around the state's biggest travel markets, not a generic national deal board.",
    icon: MapPinned
  }
];

export default function Home() {
  const stats = getFeaturedStats();

  return (
    <main>
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="Florida Flight Deals home">
          <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-ocean text-white shadow-lg shadow-sky-700/20">
            <Plane className="h-5 w-5" />
          </span>
          <span className="text-lg font-black tracking-normal text-ink">Florida Flight Deals</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex" aria-label="Primary navigation">
          <a className="transition hover:text-ocean" href="#deals">
            Deals
          </a>
          <a className="transition hover:text-ocean" href="#alerts">
            Alerts
          </a>
          <a className="transition hover:text-ocean" href="#why">
            Why Us
          </a>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 pb-10 pt-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-16 lg:pt-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-sm font-bold text-ocean shadow-sm">
            <TrendingDown className="h-4 w-4 text-coral" />
            Florida airfare drops, organized daily
          </div>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.96] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Cheap Flights In & Out of Florida
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl">
            Daily airfare deals from Orlando, Miami, Tampa, Fort Lauderdale & Jacksonville.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#deals"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
              View Deals
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#alerts"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-slate-200 bg-white px-6 text-sm font-black text-ink shadow-sm transition hover:border-sky-300 hover:text-ocean focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
              <Bell className="h-4 w-4" />
              Get Email Alerts
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[8px] border border-slate-200 bg-white/90 p-3 shadow-sm">
                <p className="text-2xl font-black text-ink">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase leading-4 text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[470px] overflow-hidden rounded-[8px] bg-ink shadow-soft">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80')"
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-sky-500/10" />
          <div className="relative flex min-h-[470px] flex-col justify-between p-5 text-white sm:p-7">
            <div className="ml-auto flex w-fit items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-sm font-black text-ink shadow-sm">
              <Search className="h-4 w-4 text-ocean" />
              Under $99 alerts active
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-100">Featured drop</p>
              <div className="rounded-[8px] bg-white/95 p-4 text-ink shadow-xl backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-ocean">Frontier</p>
                    <h2 className="mt-1 text-2xl font-black tracking-normal">Orlando to Denver</h2>
                    <p className="mt-2 text-sm font-semibold text-slate-500">May 14-21 roundtrip</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase text-slate-400">From</p>
                    <p className="text-4xl font-black text-coral">$58</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {hubs.map((hub) => (
                  <span key={hub} className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/20">
                    {hub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DealsExplorer initialDeals={deals} />

      <section id="alerts" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[8px] bg-ink p-5 text-white shadow-soft sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">Deal alerts</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal sm:text-4xl">
              Wake up to the fares Florida travelers actually want.
            </h2>
          </div>
          <div>
            <p className="text-base font-medium leading-7 text-slate-200">
              Get a daily digest for cheap domestic trips, international escapes, weekend getaways and fares under $99.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Why use us</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-ink sm:text-4xl">
            A sharper daily habit for Florida flyers.
          </h2>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <article key={reason.title} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-skyline text-ocean">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-black tracking-normal text-ink">{reason.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{reason.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="mt-8 border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-ocean text-white">
              <Plane className="h-4 w-4" />
            </span>
            <div>
              <p className="font-black text-ink">Florida Flight Deals</p>
              <p className="text-sm font-medium text-slate-500">Cheap airfare for the Sunshine State.</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-slate-600" aria-label="Footer navigation">
            <a className="hover:text-ocean" href="#">
              About
            </a>
            <a className="hover:text-ocean" href="mailto:hello@floridaflightdeals.com">
              Contact
            </a>
            <a className="hover:text-ocean" href="#">
              Privacy
            </a>
            <a className="hover:text-ocean" href="#">
              Terms
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
