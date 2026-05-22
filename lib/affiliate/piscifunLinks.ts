export type PiscifunGearPick = {
  title: string;
  description: string;
  category: string;
  destinationOrUseCase: string;
  affiliateUrl: string;
  imageUrl: string;
  imageAlt: string;
  bestForTags: string[];
};

const piscifunHomepageAffiliateUrl = "https://www.awin1.com/cread.php?awinmid=89509&awinaffid=2881665";

export const flightPiscifunGearPicks: PiscifunGearPick[] = [
  {
    title: "Florida Carry-On Outdoor Kit",
    description:
      "Compact outdoor gear ideas for travelers flying into Florida for beach days, fishing piers, parks, and warm-weather weekends.",
    category: "Travel Gear Recommendations",
    destinationOrUseCase: "carry-on packing",
    affiliateUrl: piscifunHomepageAffiliateUrl,
    imageUrl: "/images/fallbacks/flight-placeholder.svg",
    imageAlt: "Carry-on friendly outdoor gear for Florida flight trips",
    bestForTags: ["Carry-On Friendly", "Beach Trips", "Weekend Flights"]
  },
  {
    title: "Florida Fishing Essentials",
    description:
      "A practical place to browse fishing and outdoor accessories before a Florida flight, beach weekend, or Gulf Coast getaway.",
    category: "Florida Fishing Essentials",
    destinationOrUseCase: "fishing and beach trip gear",
    affiliateUrl: piscifunHomepageAffiliateUrl,
    imageUrl: "/images/fallbacks/flight-placeholder.svg",
    imageAlt: "Fishing and outdoor travel gear for Florida flight getaways",
    bestForTags: ["Fishing Trips", "Beach Days", "Outdoor Gear"]
  }
];
