import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Plane } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Florida Flight Deals",
  description: "Learn about Florida Flight Deals, part of the Florida Deals Hub network."
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
      </section>
    </main>
  );
}
