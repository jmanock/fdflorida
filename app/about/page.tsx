import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Plane } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Florida Flight Deals",
  description: "Learn how Florida Flight Deals organizes airfare routes, airport guides, travel ideas, and planning resources as part of Florida Deals Hub.",
  alternates: { canonical: "https://flightdealsflorida.org/about" }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sand px-4 py-10 text-ink sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-ocean transition hover:text-gulf">
          <ArrowLeft className="h-4 w-4" />
          Back to deals
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
            <Plane className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-gold ring-2 ring-white" />
          </span>
          <p className="font-black">Florida Flight Deals</p>
        </div>
        <h1 className="mt-8 text-4xl font-black tracking-normal sm:text-5xl">About Florida Flight Deals</h1>
        <p className="mt-5 text-base font-medium leading-8 text-slateText">
          Florida Flight Deals helps travelers find curated airfare alerts for trips in and out of Florida&apos;s biggest travel markets, including Orlando, Miami, Tampa, Fort Lauderdale, and Jacksonville.
        </p>
        <p className="mt-4 text-base font-medium leading-8 text-slateText">
          The site is part of the Florida Deals Hub network, connecting Floridians with trustworthy travel and local deal resources across flights, hotels, cruises, and local experiences.
        </p>
        <p className="mt-4 text-base font-medium leading-8 text-slateText">
          Flight prices may change and availability varies by date. We organize route examples, airport guides, comparison pages, and planning resources so travelers can compare options faster before confirming current fares with the booking source.
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {["Florida airport focus", "Route discovery pages", "Flexible-date guidance", "Part of Florida Deals Hub"].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-sand p-4 text-sm font-black text-ink">
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
