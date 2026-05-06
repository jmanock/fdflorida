"use client";

import { trackEvent } from "@/lib/analytics";

export function HotelCtaLink({
  href,
  location,
  destinationKey,
  className,
  children
}: {
  href: string;
  location: string;
  destinationKey: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        const params = {
          type: "hotel",
          provider: "expedia",
          destination_key: destinationKey,
          outbound_url: href,
          page_path: window.location.pathname
        };

        trackEvent({
          action: "hotel_crosslink_click",
          category: "hotels",
          label: location,
          params
        });
      }}
      className={className}
    >
      {children}
    </a>
  );
}
