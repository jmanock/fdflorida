import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms | Florida Flight Deals",
  description: "Terms of use for Florida Flight Deals."
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-sand px-4 py-10 text-ink sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-ocean transition hover:text-gulf">
          <ArrowLeft className="h-4 w-4" />
          Back to deals
        </Link>
        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-skyline text-ocean">
          <FileText className="h-5 w-5" />
        </div>
        <h1 className="mt-8 text-4xl font-black tracking-normal sm:text-5xl">Terms</h1>
        <p className="mt-5 text-base font-medium leading-8 text-slateText">
          Florida Flight Deals provides airfare information and links for convenience. Prices, availability, routes, and booking terms can change at any time.
        </p>
        <p className="mt-4 text-base font-medium leading-8 text-slateText">
          Always review final fare details, fees, baggage rules, and airline terms before booking. Florida Flight Deals is not responsible for third-party booking experiences or fare changes.
        </p>
        <p className="mt-4 text-sm font-semibold text-slateText">Last updated: April 29, 2026</p>
      </section>
    </main>
  );
}
