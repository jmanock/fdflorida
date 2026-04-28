import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florida Flight Deals | Cheap Flights In & Out of Florida",
  description:
    "Daily airfare deals from Orlando, Miami, Tampa, Fort Lauderdale and Jacksonville. Find domestic, international, weekend and under $99 flight deals.",
  keywords: [
    "Florida flight deals",
    "cheap flights Florida",
    "Orlando flight deals",
    "Miami flight deals",
    "Fort Lauderdale flights",
    "Tampa flight deals",
    "Jacksonville flights"
  ],
  openGraph: {
    title: "Florida Flight Deals",
    description: "Cheap flights in and out of Florida's biggest travel markets.",
    type: "website",
    url: "https://floridaflightdeals.com"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
