/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloridaRightNow } from "@/components/FloridaRightNow";
import data from "@/data/live-intelligence.json";
export const metadata: Metadata = {
  title: "Florida Airport Status: MCO, MIA, TPA & FLL Weather Impacts",
  description:
    "Check official weather alerts and potential travel impacts for Orlando, Miami, Tampa and Fort Lauderdale airports, with FAA and airline verification links.",
  alternates: {
    canonical: "https://flightdealsflorida.org/florida-airport-status",
  },
};
export default function Page() {
  const airports = (data as any).airports || [];
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-sand px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase text-ocean">
              Florida Live Intelligence
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black text-ink sm:text-6xl">
              Florida airport weather and travel-impact status
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slateText">
              Review official weather context for MCO, MIA, TPA and FLL. These
              cards do not confirm your flight status or invent delay totals.
            </p>
          </div>
        </section>
        <FloridaRightNow />
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {airports.map((a: any) => (
              <article
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                key={a.code}
              >
                <p className="text-sm font-black text-ocean">{a.code}</p>
                <h2 className="mt-2 text-2xl font-black text-ink">{a.name}</h2>
                <p className="mt-3 font-bold text-ink">{a.label}</p>
                <p className="mt-2 text-slateText">
                  {a.weather?.summary?.value ||
                    "Current weather context is temporarily unavailable."}
                </p>
                <p className="mt-3 text-sm text-slateText">{a.warning}</p>
                <div className="mt-5 flex gap-4">
                  <a
                    className="font-black text-ocean underline"
                    href="https://nasstatus.faa.gov/"
                  >
                    Verify FAA NAS status
                  </a>
                </div>
              </article>
            ))}
          </div>
          <section className="mt-12 max-w-4xl">
            <h2 className="text-3xl font-black text-ink">
              How to use this page
            </h2>
            <p className="mt-4 leading-7 text-slateText">
              Potential weather impact means an official weather alert or
              forecast may matter near the airport. It does not mean the airport
              or your flight is delayed. Verify your itinerary with the airline
              and airport before traveling.
            </p>
            <p className="mt-4 leading-7 text-slateText">
              The network refreshes a server-side cache from the National
              Weather Service. If a source fails or becomes stale, the card
              remains explanatory and links you to the official source.
            </p>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
