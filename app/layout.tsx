import type { Metadata } from "next";
import Script from "next/script";
import { NavigationAnalytics } from "@/components/NavigationAnalytics";
import { CLARITY_ID } from "@/lib/clarity";
import "./globals.css";

const siteUrl = "https://flightdealsflorida.org";
const GA_MEASUREMENT_ID = "G-6Y3PZJ046S";
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}
