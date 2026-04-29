import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Florida Flight Deals",
  description: "Contact Florida Flight Deals."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-sand px-4 py-10 text-ink sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-ocean transition hover:text-gulf">
          <ArrowLeft className="h-4 w-4" />
          Back to deals
        </Link>
        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-skyline text-ocean">
          <Mail className="h-5 w-5" />
        </div>
        <h1 className="mt-8 text-4xl font-black tracking-normal sm:text-5xl">Contact</h1>
        <p className="mt-5 text-base font-medium leading-8 text-slateText">
          For questions, partnerships, or corrections, email the Florida Flight Deals team.
        </p>
        <a
          href="mailto:hello@flightdealsflorida.org"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-gulf to-ocean px-6 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-200"
        >
          hello@flightdealsflorida.org
        </a>
      </section>
    </main>
  );
}
