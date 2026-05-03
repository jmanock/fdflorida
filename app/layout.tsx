import type { Metadata } from "next";
import Script from "next/script";
import { NavigationAnalytics } from "@/components/NavigationAnalytics";
import "./globals.css";

const siteUrl = "https://flightdealsflorida.org";
const GA_MEASUREMENT_ID = "G-6Y3PZJ046S";
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
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "Florida Flight Deals"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Flight Deals | Cheap Flights In & Out of Florida",
    description:
      "Daily airfare deals from Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, and more.",
    images: ["/icon.svg"]
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
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }} />
        {children}
        <NavigationAnalytics />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
