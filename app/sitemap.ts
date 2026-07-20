import type { MetadataRoute } from "next";
import { cityFlightPageSlugs } from "@/lib/cityFlightPages";
import { seoFlightPageSlugs } from "@/lib/seoFlightPages";
import { tripRealityGuides } from "@/data/tripRealityGuides";

const siteUrl = "https://flightdealsflorida.org";
const verifiedModified = new Date("2026-07-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const flightPages = seoFlightPageSlugs.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: verifiedModified,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));
  const cityFlightPages = cityFlightPageSlugs.map((slug) => ({
    url: `${siteUrl}/flights/${slug}`,
    lastModified: verifiedModified,
    changeFrequency: "weekly" as const,
    priority: 0.85
  }));
  const realityGuidePages = tripRealityGuides.map((guide) => ({
    url: `${siteUrl}/trip-reality/${guide.slug}`,
    lastModified: new Date("2026-07-14"),
    changeFrequency: "monthly" as const,
    priority: 0.86
  }));

  return [
    {
      url: siteUrl,
      lastModified: verifiedModified,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/florida-airport-status`,
      lastModified: verifiedModified,
      changeFrequency: "daily",
      priority: 0.9
    },
    ...cityFlightPages,
    ...realityGuidePages,
    ...flightPages,
    {
      url: `${siteUrl}/about`,
      lastModified: verifiedModified,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: verifiedModified,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: verifiedModified,
      changeFrequency: "yearly",
      priority: 0.4
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: verifiedModified,
      changeFrequency: "yearly",
      priority: 0.4
    }
  ];
}
