export const EXPEDIA_AFFILIATE_BASE = "https://expedia.com/affiliate/2Wbjdi2";

const expediaDestinationLinks: Record<string, string> = {
  // Paste Expedia Creator Hub destination-specific deep links here when available.
  orlando: EXPEDIA_AFFILIATE_BASE,
  miami: EXPEDIA_AFFILIATE_BASE,
  tampa: EXPEDIA_AFFILIATE_BASE,
  fortLauderdale: EXPEDIA_AFFILIATE_BASE,
  jacksonville: EXPEDIA_AFFILIATE_BASE,
  denver: EXPEDIA_AFFILIATE_BASE,
  newYork: EXPEDIA_AFFILIATE_BASE,
  cancun: EXPEDIA_AFFILIATE_BASE
};

export function getExpediaHotelLink(destination: string) {
  return expediaDestinationLinks[destination] ?? EXPEDIA_AFFILIATE_BASE;
}

export function getDestinationKey(destination: string) {
  const destinationKeys: Record<string, string> = {
    "Fort Lauderdale": "fortLauderdale",
    Jacksonville: "jacksonville",
    Miami: "miami",
    Orlando: "orlando",
    Tampa: "tampa",
    Denver: "denver",
    "New York": "newYork",
    Cancun: "cancun"
  };

  return destinationKeys[destination] ?? destination.toLowerCase().replace(/[^a-z0-9]+([a-z0-9])/g, (_, character: string) => character.toUpperCase());
}
