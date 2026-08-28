import type { Metadata } from "next";
import { AnalyticsBootstrap } from "@/components/AnalyticsBootstrap";
import { ANALYTICS_CONFIG } from "@/lib/analyticsConfig";
import { NetworkNavigation } from "@/components/NetworkNavigation";
import "./globals.css";

const siteUrl = "https://flightdealsflorida.org";
const defaultOgImage = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80";
const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Florida Deals Hub",
      url: "https://floridadealshub.com",
      sameAs: ["https://flightdealsflorida.org", "https://hoteldealsflorida.org", "https://cruisedealsflorida.org", "https://localdealsflorida.org"]
    },
    {
      "@type": "WebSite",
      name: "Florida Flight Deals",
      url: siteUrl,
      publisher: {
        "@type": "Organization",
        name: "Florida Deals Hub",
        url: "https://floridadealshub.com"
      }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Florida Flight Deals | Cheap Flights In & Out of Florida",
  description:
    "Find cheap flights to and from Florida with daily airfare deals from Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, and more.",
  keywords: [
    "Florida flight deals",
    "cheap flights Florida",
    "Orlando flight deals",
    "Miami flight deals",
    "Fort Lauderdale flights",
    "Tampa flight deals",
    "Jacksonville flights"
  ],
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "Florida Flight Deals | Cheap Flights In & Out of Florida",
    description:
      "Find cheap flights to and from Florida with daily airfare deals from Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, and more.",
    type: "website",
    url: siteUrl,
    siteName: "Florida Flight Deals",
    locale: "en_US",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 800,
        alt: "Airplane wing above clouds for Florida flight deals"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Flight Deals | Cheap Flights In & Out of Florida",
    description:
      "Daily airfare deals from Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, and more.",
    images: [defaultOgImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/icon.svg"
  },
  category: "travel"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          id="fdn-ga-library"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.measurementId}`}
        />
      </head>
      <body className="fdn-site">
        <NetworkNavigation />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }} />
        {children}
        <AnalyticsBootstrap />
      </body>
    </html>
  );
}
