/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, ArrowRight, CloudSun, Plane } from "lucide-react";
import Link from "next/link";
import liveData from "@/data/live-intelligence.json";

function formatUpdate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).format(new Date(value));
}

export function FloridaRightNow() {
  const data = liveData as any;
  const airports = (data.airports || []).filter((airport: any) => ["MCO", "MIA", "TPA", "FLL"].includes(airport.code));
  const alerts = airports.reduce((total: number, airport: any) => total + (airport.officialAlerts?.length || 0), 0);
  const unavailable = data.status !== "current";

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8" aria-labelledby="airport-status-preview-title">
      <div className="overflow-hidden rounded-3xl border border-sky-200 bg-white shadow-card">
        <div className="flex flex-col gap-4 border-b border-slate-200 bg-sky-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-ocean"><Plane className="h-4 w-4" /> Florida Airport Status</p>
            <h2 id="airport-status-preview-title" className="mt-2 text-2xl font-black text-ink sm:text-3xl">Weather-impact context for Florida’s busiest airports</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slateText">Official weather alerts and current conditions can help with planning. This does not confirm FAA delays or individual flight status.</p>
          </div>
          <Link className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-black text-white" href="/florida-airport-status">View Florida airport status <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {airports.map((airport: any) => (
            <article className="min-w-0 bg-white p-5" key={airport.code}>
              <div className="flex items-center justify-between gap-3"><strong className="text-xl text-ink">{airport.code}</strong><CloudSun className="h-5 w-5 text-gold" /></div>
              <p className="mt-3 text-sm font-black text-ink">{unavailable ? "Temporarily unavailable" : airport.weather?.summary?.value || "Weather unavailable"}</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-slateText">{airport.weather?.temperature?.value != null ? `${airport.weather.temperature.value}°F · ` : ""}{airport.officialAlerts?.length ? `${airport.officialAlerts.length} official alert${airport.officialAlerts.length === 1 ? "" : "s"}` : "No active official weather alert found"}</p>
            </article>
          ))}
        </div>
        <div className="flex flex-col gap-2 px-5 py-4 text-xs font-bold text-slateText sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-gold" /> {unavailable ? "Live source unavailable" : alerts ? `${alerts} official weather alerts in the latest update` : "No active official airport weather alerts found"}</span>
          <span>Conditions updated <time dateTime={data.generatedAt}>{formatUpdate(data.generatedAt)}</time> · Sources: NWS, FAA status link</span>
        </div>
      </div>
    </section>
  );
}
