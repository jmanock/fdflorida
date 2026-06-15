type RelatedGuide = {
  label: string;
  href: string;
};

export function RelatedFloridaGuides({ guides }: { guides: RelatedGuide[] }) {
  return (
    <section className="section-fade mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean">Related Florida Guides</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">Keep exploring Florida fares.</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {guides.map((guide) => (
            <a
              key={guide.href}
              className="rounded-2xl border border-slate-200 bg-sand p-4 text-sm font-black text-ink transition hover:border-sky-200 hover:bg-skyline hover:text-ocean"
              href={guide.href}
            >
              {guide.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
