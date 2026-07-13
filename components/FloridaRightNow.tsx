/* eslint-disable @typescript-eslint/no-explicit-any */
import liveData from "@/data/live-intelligence.json";
export function FloridaRightNow({
  detailHref = "/florida-airport-status",
  focus = "airports and travel weather",
}: {
  detailHref?: string;
  focus?: string;
}) {
  const data = liveData as any;
  const unavailable = data.status !== "current";
  const alerts =
    data.locations?.reduce(
      (n: number, x: any) => n + (x.officialAlerts?.length || 0),
      0,
    ) || 0;
  const impacts =
    data.airports?.filter((x: any) => x.status === "potential_weather_impact")
      .length || 0;
  return (
    <section
      aria-labelledby="florida-conditions-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase text-ocean">
          Florida travel intelligence
        </p>
        <h2
          id="florida-conditions-heading"
          className="mt-2 text-2xl font-black text-ink"
        >
          Florida conditions, from official sources
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <p className="rounded-xl bg-sand p-4 font-bold text-ink">
          Official alerts: {unavailable ? "Unavailable" : alerts || "None found"}
          </p>
          <p className="rounded-xl bg-sand p-4 font-bold text-ink">
          Airport weather impacts: {unavailable ? "Unavailable" : impacts || "None found"}
          </p>
          <p className="rounded-xl bg-sand p-4 font-bold text-ink">
            Focus: {focus}
          </p>
        </div>
        <p className="mt-4 text-sm text-slateText">
          Conditions updated{" "}
          <time dateTime={data.generatedAt}>
            {new Date(data.generatedAt).toLocaleString("en-US", {
              timeZone: "America/New_York",
            })}{" "}
            ET
          </time>
          .
        </p>
        <a
          className="mt-5 inline-flex font-black text-ocean underline"
          href={detailHref}
        >
          Check Florida airport conditions
        </a>
      </div>
    </section>
  );
}
