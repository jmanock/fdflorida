"use client";

import { ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { FallbackImage } from "@/components/FallbackImage";
import { trackEvent } from "@/lib/analytics";
import type { PiscifunGearPick } from "@/lib/affiliate/piscifunLinks";

type AffiliateGearLinkProps = {
  item: PiscifunGearPick;
  ctaText: string;
};

export function AffiliateGearLink({ item, ctaText }: AffiliateGearLinkProps) {
  const pathname = usePathname();

  return (
    <a
      href={item.affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={() => {
        trackEvent({
          action: "affiliate_click",
          category: "affiliate",
          label: item.title,
          params: {
            source_site: "flightdealsflorida.org",
            affiliate_program: "awin",
            advertiser: "piscifun",
            item_title: item.title,
            category: item.category,
            cta_text: ctaText,
            outbound_url: item.affiliateUrl,
            page_path: pathname
          }
        });
      }}
      className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft"
    >
      <div className="relative aspect-[16/10] bg-sand">
        <FallbackImage
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">{item.category}</p>
        <h3 className="mt-3 text-lg font-black text-ink">{item.title}</h3>
        <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.bestForTags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-sand px-3 py-1 text-xs font-black text-slateText">
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ocean">
          {ctaText}
          <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
