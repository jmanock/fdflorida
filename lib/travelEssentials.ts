export type TravelEssentialItem = {
  title: string;
  description: string;
  cta: string;
  affiliateUrl: string;
  advertiser: "nomatic" | "outfitr" | "bedsure" | "airport_transfer";
  category: string;
};

export const NOMATIC_METHOD_LUGGAGE_URL =
  "https://www.awin1.com/awclick.php?gid=532276&mid=90033&awinaffid=2881665&linkid=4060932";
export const NOMATIC_SUMMER_SALE_URL =
  "https://www.awin1.com/awclick.php?gid=607999&mid=90033&awinaffid=2881665&linkid=4814264";
export const NOMATIC_TRAVEL_BAGS_SALE_URL =
  "https://www.awin1.com/awclick.php?gid=532276&mid=90033&awinaffid=2881665&linkid=4060937";
export const NOMATIC_OUTSET_JACKET_URL =
  "https://www.awin1.com/awclick.php?gid=532276&mid=90033&awinaffid=2881665&linkid=4060934";

export const flightTravelEssentials: TravelEssentialItem[] = [
  {
    title: "Carry-on luggage for Florida flights",
    description: "Don’t forget a carry-on that actually fits the trip, especially if you are comparing basic economy or weekend fares.",
    cta: "Compare Carry-On Bags",
    affiliateUrl: NOMATIC_METHOD_LUGGAGE_URL,
    advertiser: "nomatic",
    category: "luggage"
  },
  {
    title: "Travel bags for airport days",
    description: "A good travel bag helps with airport days, hotel check-in gaps, and quick Florida weekend trips.",
    cta: "View Travel Bags",
    affiliateUrl: NOMATIC_TRAVEL_BAGS_SALE_URL,
    advertiser: "nomatic",
    category: "travel_bags"
  },
  {
    title: "Light travel jacket",
    description: "Useful for early flights, cool cabins, and breezy evenings after landing in Orlando, Tampa, Miami, or Jacksonville.",
    cta: "See Travel Jacket",
    affiliateUrl: NOMATIC_OUTSET_JACKET_URL,
    advertiser: "nomatic",
    category: "travel_apparel"
  }
];
