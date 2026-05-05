import { getFlightSearchUrl, type FlightDeal } from "@/data/deals";

export type CityFlightPage = {
  slug: string;
  city: "Orlando" | "Miami" | "Tampa" | "Fort Lauderdale";
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: string[];
  hotelLocation: string;
  deals: FlightDeal[];
};

function flightDeal(id: string, from: string, to: string, price: number, airline = "Google Flights"): FlightDeal {
  const link = getFlightSearchUrl({ origin: from, destination: to });

  return {
    id,
    airline,
    from,
    to,
    origin: from,
    destination: to,
    price,
    dates: "Flexible 2026 dates",
    category: ["Domestic"],
    booking_url: link,
    link,
    image: "",
    badge: price < 100 ? "Under $99" : "Limited",
    quality_tag: price < 100 ? "Low Fare" : "Good Deal",
    freshness: "Updated regularly"
  };
}

export const cityFlightPages: CityFlightPage[] = [
  {
    slug: "orlando",
    city: "Orlando",
    title: "Cheap Flights to Orlando | Florida Deals",
    description: "Find the best cheap flights to Orlando. Updated daily with deals from Florida airports.",
    h1: "Cheap Flights to Orlando (2026 Guide)",
    intro:
      "Orlando is one of Florida's most searched travel markets because it works for theme park trips, conventions, family travel, cruises from Port Canaveral, and quick Central Florida weekends. This guide is built to help travelers compare recent fare examples, check current flight availability, and finish the trip with hotels and nearby Florida Deals Hub resources.",
    sections: [
      "When searching for cheap flights to Orlando in 2026, flexibility matters. Fares can shift around school breaks, holidays, major events, and weekend travel windows. Orlando International Airport is usually the first airport to check, while Sanford may also be useful for some travelers depending on airline, schedule, baggage needs, and ground transportation. The route examples on this page are recent fare references; they are helpful starting points for checking current fares.",
      "Travelers flying to Orlando should compare total trip cost, not only the ticket price. A low base fare can change once seats, bags, arrival time, rental car needs, and hotel location are included. If your trip includes theme parks, downtown Orlando, Winter Park, or Port Canaveral, hotel location can matter as much as airfare. Use the flight links to check availability, then compare hotels before locking in dates.",
      "Florida Flight Deals is part of Florida Deals Hub, which means the goal is not only finding airfare. The strongest trip planning flow is flights, then hotels, then local deals or cruises if your itinerary continues beyond Orlando. This page connects those next steps so visitors can move from fare discovery to a more complete Florida trip plan without hunting across unrelated sites."
    ],
    hotelLocation: "Orlando",
    deals: [
      flightDeal("nyc-orlando-2026", "New York", "Orlando", 89),
      flightDeal("atl-orlando-2026", "Atlanta", "Orlando", 74),
      flightDeal("chicago-orlando-2026", "Chicago", "Orlando", 118)
    ]
  },
  {
    slug: "miami",
    city: "Miami",
    title: "Cheap Flights to Miami | Florida Deals",
    description: "Find the best cheap flights to Miami. Updated daily with deals from Florida airports.",
    h1: "Cheap Flights to Miami (2026 Guide)",
    intro:
      "Miami is a major Florida gateway for beaches, cruises, international connections, nightlife, business travel, and South Florida weekends. Cheap flights to Miami can appear from many U.S. cities, but the best route depends on dates, airport flexibility, and whether Miami or Fort Lauderdale makes more sense for the final trip.",
    sections: [
      "For 2026 Miami flight searches, compare both fare price and arrival airport. Miami International is often strongest for international connections and South Florida city trips, while Fort Lauderdale can sometimes price better for beach weekends or budget-carrier routes. Recent fare examples help you decide which searches are worth opening, but current availability should always be checked before planning around a price.",
      "Miami trips can be especially sensitive to events, cruise departures, holidays, and winter demand. If your dates are flexible, check midweek departures, longer weekend windows, and nearby airports. A fare that looks higher at first may still be better if it lands at a more convenient time or avoids extra ground transportation. The best cheap flight is the one that keeps the full trip cost under control.",
      "After checking flights, compare hotels early. Miami Beach, Brickell, Downtown Miami, Coral Gables, and airport-area stays can serve very different trips. Florida Flight Deals connects flight searches with hotel options, cruise planning, and local deals so visitors can build the full trip from one travel network."
    ],
    hotelLocation: "Miami Beach",
    deals: [
      flightDeal("atl-miami-2026", "Atlanta", "Miami", 72),
      flightDeal("nyc-miami-2026", "New York", "Miami", 94),
      flightDeal("dallas-miami-2026", "Dallas", "Miami", 132)
    ]
  },
  {
    slug: "tampa",
    city: "Tampa",
    title: "Cheap Flights to Tampa | Florida Deals",
    description: "Find the best cheap flights to Tampa. Updated daily with deals from Florida airports.",
    h1: "Cheap Flights to Tampa (2026 Guide)",
    intro:
      "Tampa is a high-value Florida destination for Gulf Coast beaches, family trips, sports weekends, cruises, business travel, and St. Pete/Clearwater getaways. Cheap flights to Tampa can be especially useful when visitors want a Florida trip that avoids some of the larger South Florida airport crowds.",
    sections: [
      "Tampa flight prices can move around spring travel, holidays, cruise dates, and long weekends. Tampa International Airport is usually the core search, but travelers may also compare Orlando or Sarasota depending on the final destination and rental car plans. This page highlights recent route examples and points visitors toward current fare searches rather than promising fixed prices.",
      "When comparing cheap flights to Tampa, look closely at flight times and total trip needs. A slightly higher fare may be better if it lands closer to hotel check-in, cruise boarding, or beach plans. Budget fares should also be checked for bag rules, seat costs, and change terms. Prices may change quickly, so availability matters more than any single listed fare example.",
      "The best Tampa trip planning flow often includes flights, hotels, and local activities. Florida Flight Deals connects visitors to hotel searches, Florida Cruise Deals, and Local Florida Deals so a fare search can turn into a complete Gulf Coast plan."
    ],
    hotelLocation: "Tampa",
    deals: [
      flightDeal("chicago-tampa-2026", "Chicago", "Tampa", 104),
      flightDeal("nyc-tampa-2026", "New York", "Tampa", 98),
      flightDeal("boston-tampa-2026", "Boston", "Tampa", 126)
    ]
  },
  {
    slug: "fort-lauderdale",
    city: "Fort Lauderdale",
    title: "Cheap Flights to Fort Lauderdale | Florida Deals",
    description: "Find the best cheap flights to Fort Lauderdale. Updated daily with deals from Florida airports.",
    h1: "Cheap Flights to Fort Lauderdale (2026 Guide)",
    intro:
      "Fort Lauderdale is one of South Florida's most useful airports for beach trips, cruise departures, budget-carrier routes, and travelers comparing alternatives to Miami. Cheap flights to Fort Lauderdale can be a smart way to reach Broward County, Miami, Palm Beach, or nearby cruise ports.",
    sections: [
      "For 2026 Fort Lauderdale flight searches, compare FLL with Miami before booking. Some routes price better into Fort Lauderdale, while others may be cheaper or more convenient through Miami. The best choice depends on total travel time, hotel location, bags, rental car costs, and whether the trip is built around beaches, cruises, or family visits.",
      "FLL fare examples can change quickly because many routes are leisure-heavy and date-sensitive. Weekend trips, school breaks, cruise dates, and winter travel can all affect availability. Use the route examples as a way to open useful searches, then check current fares and final booking terms directly before committing.",
      "Once flights are checked, hotel location becomes important. Beachfront stays, Las Olas, airport hotels, and cruise-friendly hotels serve different travel plans. This page connects flight searches with Expedia hotel options, Florida Cruise Deals, Local Florida Deals, and the broader Florida Deals Hub network."
    ],
    hotelLocation: "Fort Lauderdale",
    deals: [
      flightDeal("boston-fll-2026", "Boston", "Fort Lauderdale", 98),
      flightDeal("atl-fll-2026", "Atlanta", "Fort Lauderdale", 72),
      flightDeal("phl-fll-2026", "Philadelphia", "Fort Lauderdale", 116)
    ]
  }
];

export const cityFlightPageSlugs = cityFlightPages.map((page) => page.slug);

export function getCityFlightPage(slug: string) {
  return cityFlightPages.find((page) => page.slug === slug);
}
