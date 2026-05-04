"use client";

import { trackEvent } from "@/lib/analytics";

export function HotelCtaLink({
  href,
  location,
  className,
  children
}: {
  href: string;
  location: string;
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
          provider: "booking",
          location: location.toLowerCase(),
          outbound_url: href,
          page_path: window.location.pathname
        };

        trackEvent({
          action: "deal_click",
          category: "hotels",
          label: location,
          params
        });
        trackEvent({
          action: "hotel_click",
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
