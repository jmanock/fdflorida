import type { MetadataRoute } from "next";
import { cityFlightPageSlugs } from "@/lib/cityFlightPages";
import { seoFlightPageSlugs } from "@/lib/seoFlightPages";

const siteUrl = "https://flightdealsflorida.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const flightPages = seoFlightPageSlugs.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));
  const cityFlightPages = cityFlightPageSlugs.map((slug) => ({
    url: `${siteUrl}/flights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    ...cityFlightPages,
    ...flightPages,
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4
    }
  ];
}
