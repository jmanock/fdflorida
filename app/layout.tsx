import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const siteUrl = "https://flightdealsflorida.org";

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
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Flight Deals | Cheap Flights In & Out of Florida",
    description:
      "Daily airfare deals from Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, and more."
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
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
