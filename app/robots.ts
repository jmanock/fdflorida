import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://flightdealsflorida.org/sitemap.xml",
    host: "https://flightdealsflorida.org"
  };
}
