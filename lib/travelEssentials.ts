export type TravelEssentialItem = {
  title: string;
  description: string;
  cta: string;
  affiliateUrl: string;
  advertiser: "nomatic" | "bookafly" | "esimshop" | "esimania" | "airport_transfer";
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
export const ESIMSHOP_URL =
  "https://www.awin1.com/awclick.php?gid=600694&mid=124780&awinaffid=2881665&linkid=4730960&clickref=";
export const ESIMANIA_URL =
  "https://www.awin1.com/awclick.php?gid=520640&mid=115715&awinaffid=2881665&linkid=3954532&clickref=";
export const BOOKAFLY_URL =
  "https://www.awin1.com/awclick.php?gid=604498&mid=125562&awinaffid=2881665&linkid=4772849&clickref=";

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
    title: "International eSIM setup",
    description: "Going international after a Florida flight? Set up an eSIM before you leave so you are not stuck hunting for Wi-Fi after landing.",
    cta: "Compare eSIM Options",
    affiliateUrl: ESIMSHOP_URL,
    advertiser: "esimshop",
    category: "esim"
  },
  {
    title: "Hotel and trip backup search",
    description: "Planning multiple flights? Keep hotels and trip pieces organized before airfare changes your timing.",
    cta: "Compare Trip Options",
    affiliateUrl: BOOKAFLY_URL,
    advertiser: "bookafly",
    category: "booking"
  }
];
