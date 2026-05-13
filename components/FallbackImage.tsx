"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export const flightImageFallback = "/images/fallbacks/flight-placeholder.svg";

type FallbackImageProps = ImageProps & {
  fallbackSrc?: string;
};

export function FallbackImage({ src, fallbackSrc = flightImageFallback, alt, onError, ...props }: FallbackImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={(event) => {
        if (imageSrc !== fallbackSrc) {
          const failedSrc = typeof imageSrc === "string" ? imageSrc : "static-image";
          setImageSrc(fallbackSrc);
          trackEvent({
            action: "image_fallback_used",
            category: "images",
            label: failedSrc,
            params: {
              image_src: failedSrc,
              page_path: window.location.pathname
            }
          });
        }

        onError?.(event);
      }}
    />
  );
}
