import { createFlightSearchUrl, deals, type FlightDeal } from "@/data/deals";

export type SeoFlightPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  detail: string;
  tips: string[];
  dealIds?: string[];
  customDeals?: FlightDeal[];
  relatedSlugs: string[];
};

export type SeoFlightFaq = {
  question: string;
  answer: string;
};

function findDeals(ids: string[]) {
  return ids.map((id) => deals.find((deal) => deal.id === id)).filter((deal): deal is FlightDeal => Boolean(deal));
}

const inboundFloridaDeals: FlightDeal[] = [
  {
    id: "nyc-mco-google-89",
    airline: "Google Flights",
    from: "New York",
    to: "Orlando",
    price: 89,
    dates: "Flexible dates",
    category: ["Orlando", "Domestic", "Under $99"],
    booking_url: createFlightSearchUrl("New York", "Orlando"),
    link: createFlightSearchUrl("New York", "Orlando"),
    image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&w=900&q=80",
    badge: "Under $99",
    origin: "New York",
    destination: "Orlando",
    quality_tag: "Low Fare",
    freshness: "Based on recent searches"
  },
  {
    id: "atl-mia-google-72",
    airline: "Google Flights",
    from: "Atlanta",
    to: "Miami",
    price: 72,
    dates: "Flexible dates",
    category: ["Miami", "Domestic", "Under $99"],
    booking_url: createFlightSearchUrl("Atlanta", "Miami"),
    link: createFlightSearchUrl("Atlanta", "Miami"),
    image: "https://images.unsplash.com/photo-1572996045200-9ed403fb5396?auto=format&fit=crop&w=900&q=80",
    badge: "Hot Deal",
    origin: "Atlanta",
    destination: "Miami",
    quality_tag: "Low Fare",
    freshness: "Based on recent searches"
  },
  {
    id: "ord-tpa-google-104",
    airline: "Google Flights",
    from: "Chicago",
    to: "Tampa",
    price: 104,
    dates: "Flexible dates",
    category: ["Tampa", "Domestic"],
    booking_url: createFlightSearchUrl("Chicago", "Tampa"),
    link: createFlightSearchUrl("Chicago", "Tampa"),
    image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=900&q=80",
    badge: "Weekend",
    origin: "Chicago",
    destination: "Tampa",
    quality_tag: "Popular Route",
    freshness: "Latest route deals"
  },
  {
    id: "bos-fll-google-98",
    airline: "Google Flights",
    from: "Boston",
    to: "Fort Lauderdale",
    price: 98,
    dates: "Flexible dates",
    category: ["Fort Lauderdale", "Domestic", "Under $99"],
    booking_url: createFlightSearchUrl("Boston", "Fort Lauderdale"),
    link: createFlightSearchUrl("Boston", "Fort Lauderdale"),
    image: "https://images.unsplash.com/photo-1602011528362-d6fd7324d194?auto=format&fit=crop&w=900&q=80",
    badge: "Under $99",
    origin: "Boston",
    destination: "Fort Lauderdale",
    quality_tag: "Low Fare",
    freshness: "Based on recent searches"
  },
  {
    id: "phl-jax-google-112",
    airline: "Google Flights",
    from: "Philadelphia",
    to: "Jacksonville",
    price: 112,
    dates: "Flexible dates",
    category: ["Jacksonville", "Domestic"],
    booking_url: createFlightSearchUrl("Philadelphia", "Jacksonville"),
    link: createFlightSearchUrl("Philadelphia", "Jacksonville"),
    image: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?auto=format&fit=crop&w=900&q=80",
    badge: "Limited",
    origin: "Philadelphia",
    destination: "Jacksonville",
    quality_tag: "Good Deal",
    freshness: "Updated daily"
  }
];

export const seoFlightPages: SeoFlightPage[] = [
  {
    slug: "orlando-flight-deals",
    title: "Orlando Flight Deals | Cheap Flights From Orlando",
    description: "Find cheap flights from Orlando with fare finds, weekend escapes, and airfare deals from Orlando International Airport and Sanford.",
    h1: "Orlando Flight Deals",
    eyebrow: "Central Florida fare finds",
    intro:
      "Find airfare deals from Orlando to popular domestic and international destinations. Browse current fare examples, weekend trip ideas, and cheap flights from Central Florida.",
    detail:
      "Orlando is one of Florida's busiest leisure travel markets, which can create frequent fare movement on routes to the West, Northeast, Caribbean, and major weekend cities. Use these live fare examples as a starting point, then check current availability before booking.",
    tips: ["Compare Orlando International and Sanford when your dates are flexible.", "Weekend fares can move quickly around holidays and school breaks.", "Check both nonstop and one-stop options for longer domestic routes."],
    dealIds: ["mco-den-frontier-58", "mco-san-southwest-115", "mco-cun-jetblue-172", "mco-sea-alaska-158", "mco-bna-spirit-64"],
    relatedSlugs: ["cheap-flights-from-orlando", "weekend-flight-deals-florida", "flights-to-florida-deals"]
  },
  {
    slug: "miami-flight-deals",
    title: "Miami Flight Deals | Cheap Flights From Miami",
    description: "Find Miami flight deals including domestic fares, Caribbean routes, weekend escapes, and international airfare from South Florida.",
    h1: "Miami Flight Deals",
    eyebrow: "South Florida airfare watch",
    intro:
      "Track Miami fare examples for domestic trips, Caribbean routes, Latin America, Europe, and quick weekend escapes from South Florida.",
    detail:
      "Miami has a deep mix of domestic and international service, so good fares can appear across many trip types. These latest fare finds are examples to help you compare routes and decide which searches are worth checking today.",
    tips: ["Watch Caribbean and Latin America fares from Miami closely.", "Compare Miami and Fort Lauderdale for South Florida trips.", "International prices may vary widely by season and trip length."],
    dealIds: ["mia-nyc-jetblue-79", "mia-bog-american-186", "mia-mad-iberia-412", "mia-lax-delta-138", "mia-lim-latam-298", "mia-cdg-airfrance-487"],
    relatedSlugs: ["fort-lauderdale-flight-deals", "flights-to-florida-deals", "weekend-flight-deals-florida"]
  },
  {
    slug: "tampa-flight-deals",
    title: "Tampa Flight Deals | Cheap Flights From Tampa Bay",
    description: "Find Tampa flight deals, weekend airfare, Florida getaway routes, and cheap flights from Tampa International Airport.",
    h1: "Tampa Flight Deals",
    eyebrow: "Tampa Bay fare alerts",
    intro:
      "Find Tampa flight deals for weekend routes, domestic trips, Mexico and Caribbean escapes, and cheap airfare from Tampa Bay.",
    detail:
      "Tampa is a strong market for quick getaways and warm-weather leisure routes. Prices may change, so use these fare examples to spot promising routes and then view current fares before you plan around them.",
    tips: ["Look for long-weekend fares from Tampa on Thursday-to-Monday dates.", "Compare nearby airports when driving time is flexible.", "Mexico and Caribbean fares can be strongest outside peak holiday weeks."],
    dealIds: ["tpa-nyc-jetblue-98", "tpa-cun-southwest-119", "tpa-ord-united-104", "tpa-msy-southwest-79", "tpa-lhr-delta-516", "tpa-sfo-united-149"],
    relatedSlugs: ["weekend-flight-deals-florida", "flights-to-florida-deals", "orlando-flight-deals"]
  },
  {
    slug: "fort-lauderdale-flight-deals",
    title: "Fort Lauderdale Flight Deals | Cheap Flights From FLL",
    description: "Find Fort Lauderdale flight deals, South Florida airfare, weekend routes, and cheap flights from FLL.",
    h1: "Fort Lauderdale Flight Deals",
    eyebrow: "FLL fare examples",
    intro:
      "Browse Fort Lauderdale flight deals for South Florida getaways, weekend trips, domestic routes, and international fare examples from FLL.",
    detail:
      "Fort Lauderdale can be especially useful for budget-airline fares and quick routes from South Florida. Compare these latest fare finds with Miami when your schedule is flexible.",
    tips: ["Check both FLL and Miami before booking South Florida routes.", "Budget-airline prices can change quickly after fees and seat choices.", "Short domestic weekend routes are often worth checking first."],
    dealIds: ["fll-atl-spirit-72", "fll-sju-spirit-88", "fll-las-frontier-96", "fll-dca-jetblue-84", "fll-cle-united-94"],
    relatedSlugs: ["miami-flight-deals", "weekend-flight-deals-florida", "flights-to-florida-deals"]
  },
  {
    slug: "jacksonville-flight-deals",
    title: "Jacksonville Flight Deals | Cheap Flights From JAX",
    description: "Find Jacksonville flight deals, cheap airfare from JAX, weekend escapes, and Florida flight alerts.",
    h1: "Jacksonville Flight Deals",
    eyebrow: "North Florida fare finds",
    intro:
      "Find Jacksonville flight deals for domestic trips, weekend escapes, and airfare alerts from North Florida.",
    detail:
      "Jacksonville travelers often benefit from watching a focused set of domestic routes and comparing nearby Florida airports when the fare difference is meaningful. These fare examples show routes worth checking for current availability.",
    tips: ["Watch East Coast and hub routes from JAX for fare drops.", "Flexible dates can make a bigger difference in smaller markets.", "Compare nonstop convenience against one-stop savings before booking."],
    dealIds: ["jax-dfw-american-128", "jax-bos-delta-146", "jax-phl-frontier-92", "jax-mia-american-69"],
    relatedSlugs: ["weekend-flight-deals-florida", "flights-to-florida-deals", "orlando-flight-deals"]
  },
  {
    slug: "cheap-flights-from-orlando",
    title: "Cheap Flights From Orlando | Florida Flight Deals",
    description: "Browse cheap flights from Orlando including domestic routes, weekend getaways, and airfare alerts from Central Florida.",
    h1: "Cheap Flights From Orlando",
    eyebrow: "Orlando route ideas",
    intro:
      "Browse cheap flights from Orlando, including domestic fare examples, weekend getaway routes, and airfare alerts from Central Florida.",
    detail:
      "This page focuses on Orlando-origin fare examples that may be useful for flexible travelers. Prices may change, and availability can vary by date, so always view current fares before making plans.",
    tips: ["Start with flexible dates if your destination is open.", "Check early morning and late evening flights for lower fares.", "Compare airlines directly after spotting a promising route."],
    dealIds: ["mco-den-frontier-58", "mco-bna-spirit-64", "mco-san-southwest-115", "mco-cun-jetblue-172", "mco-sea-alaska-158"],
    relatedSlugs: ["orlando-flight-deals", "weekend-flight-deals-florida", "flights-to-florida-deals"]
  },
  {
    slug: "flights-to-florida-deals",
    title: "Flights To Florida Deals | Orlando, Miami, Tampa & More",
    description: "Find flight deals to Florida including Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, and other popular Florida destinations.",
    h1: "Flights To Florida Deals",
    eyebrow: "Inbound Florida fares",
    intro:
      "Find flight deals to Florida, including fare examples into Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, and other popular Florida destinations.",
    detail:
      "Florida is a year-round travel market, so inbound fares can shift around holidays, events, cruise departures, and school breaks. Use these examples to check current availability into the Florida airport that fits your trip.",
    tips: ["Compare nearby Florida arrival airports when your plans are flexible.", "For beach trips, check both Miami and Fort Lauderdale.", "For theme park trips, compare Orlando arrival dates across the whole week."],
    customDeals: inboundFloridaDeals,
    relatedSlugs: ["orlando-flight-deals", "miami-flight-deals", "tampa-flight-deals"]
  },
  {
    slug: "weekend-flight-deals-florida",
    title: "Weekend Flight Deals Florida | Quick Getaway Flights",
    description: "Find weekend flight deals from Florida including quick trips, cheap routes, and short getaway airfare from major Florida airports.",
    h1: "Weekend Flight Deals Florida",
    eyebrow: "Quick Florida getaways",
    intro:
      "Find weekend flight deals from Florida, including quick trips, cheap routes, and short getaway fare examples from major Florida airports.",
    detail:
      "Weekend fares are best treated as fast-moving opportunities. These routes are useful starting points for Thursday-to-Monday, Friday-to-Sunday, and short flexible getaway searches.",
    tips: ["Shift your trip by one day when weekend fares look high.", "Check bag fees before comparing budget-airline weekend fares.", "Book only after confirming times, fees, and current availability."],
    dealIds: ["fll-atl-spirit-72", "tpa-nyc-jetblue-98", "mia-nyc-jetblue-79", "tpa-cun-southwest-119", "fll-las-frontier-96", "tpa-msy-southwest-79"],
    relatedSlugs: ["orlando-flight-deals", "miami-flight-deals", "tampa-flight-deals"]
  }
];

export const seoFlightPageSlugs = seoFlightPages.map((page) => page.slug);

export function getSeoFlightPage(slug: string) {
  return seoFlightPages.find((page) => page.slug === slug);
}

export function getSeoFlightPageDeals(page: SeoFlightPage) {
  return page.customDeals ?? findDeals(page.dealIds ?? []);
}

const seoFlightFaqs: Record<string, SeoFlightFaq[]> = {
  "orlando-flight-deals": [
    {
      question: "What airports serve Orlando flight deals?",
      answer: "Most Orlando fare finds use Orlando International Airport, but Sanford can also be worth checking when your dates and driving plans are flexible."
    },
    {
      question: "When is the best time to find cheap flights from Orlando?",
      answer: "Flexible weekday travel, shoulder-season dates, and non-holiday weekends usually create the best chances to find lower Orlando fares."
    },
    {
      question: "Are Orlando flight prices updated in real time?",
      answer: "The page shows recent fare finds and route examples. Prices may change, so always check current availability before booking."
    },
    {
      question: "Do fares from Sanford and Orlando International both count?",
      answer: "This page focuses on the Orlando market. Most examples use Orlando International, but nearby Sanford can be useful for some Central Florida travelers."
    }
  ],
  "miami-flight-deals": [
    {
      question: "What types of Miami flight deals are most common?",
      answer: "Miami often has useful domestic, Caribbean, Latin America, and Europe fare examples because it is one of Florida's biggest international gateways."
    },
    {
      question: "Should I compare Miami and Fort Lauderdale?",
      answer: "Yes. Miami and Fort Lauderdale can price differently on similar trips, so South Florida travelers should compare both when timing and ground travel work."
    },
    {
      question: "Can Miami fares change after they appear here?",
      answer: "No. These are recent fare finds and route examples. Fares may change and seats may be limited."
    }
  ],
  "tampa-flight-deals": [
    {
      question: "What routes are good for Tampa weekend flight deals?",
      answer: "Tampa can be useful for Northeast, Midwest, Mexico, Caribbean, and short domestic getaway searches, especially with flexible weekend dates."
    },
    {
      question: "How often should I check Tampa fares?",
      answer: "Check regularly when you have flexible dates. Weekend fares can move quickly, especially around holidays and school breaks."
    },
    {
      question: "Do Tampa fares include St. Pete travelers?",
      answer: "This page focuses on Tampa Bay airfare. Travelers in the region may also compare nearby airports when schedules and total trip cost make sense."
    }
  ],
  "fort-lauderdale-flight-deals": [
    {
      question: "Why check Fort Lauderdale flight deals?",
      answer: "Fort Lauderdale can be a strong South Florida airport for domestic routes, budget carriers, Caribbean trips, and quick weekend fare examples."
    },
    {
      question: "Is Fort Lauderdale sometimes cheaper than Miami?",
      answer: "It can be. Prices vary by airline, route, fees, and dates, so compare both airports before booking South Florida trips."
    },
    {
      question: "Are FLL fares updated in real time?",
      answer: "The page uses recent fare finds and curated route examples. Check current availability through the fare links before making plans."
    }
  ],
  "jacksonville-flight-deals": [
    {
      question: "What routes are common for Jacksonville flight deals?",
      answer: "Jacksonville fare examples often center on domestic hub routes, East Coast cities, and weekend-friendly trips from North Florida."
    },
    {
      question: "Can flexible dates help with JAX fares?",
      answer: "Yes. Smaller markets can see wider price swings, so shifting by a day or two may make a meaningful difference."
    },
    {
      question: "Should Jacksonville travelers compare other Florida airports?",
      answer: "Sometimes. Compare total travel time, parking, baggage fees, and fare savings before choosing a different airport."
    }
  ],
  "cheap-flights-from-orlando": [
    {
      question: "How do I find cheap flights from Orlando?",
      answer: "Start with flexible dates, compare multiple airlines or travel searches, and check nearby route examples before prices move."
    },
    {
      question: "Can these Orlando prices change?",
      answer: "No. The page shows recent fare finds and examples. Fares may change and availability can vary."
    },
    {
      question: "Which Orlando routes are worth checking first?",
      answer: "Domestic weekend routes, Western U.S. cities, and selected international leisure routes are often worth checking first."
    }
  ],
  "flights-to-florida-deals": [
    {
      question: "What Florida airports usually have the best fares?",
      answer: "Orlando, Miami, Tampa, Fort Lauderdale, and Jacksonville can all have strong fares depending on origin city, dates, and season."
    },
    {
      question: "Is it cheaper to fly into Orlando, Miami, Tampa, or Fort Lauderdale?",
      answer: "It depends on your origin, trip dates, and final destination. Compare nearby Florida airports when ground travel is practical."
    },
    {
      question: "When should I book flights to Florida?",
      answer: "Check earlier for peak holidays, cruises, and school breaks. Flexible shoulder-season dates often have better fare opportunities."
    }
  ],
  "weekend-flight-deals-florida": [
    {
      question: "What makes a good weekend flight deal from Florida?",
      answer: "A useful weekend fare usually has reasonable flight times, manageable fees, and dates that work for a short trip."
    },
    {
      question: "Are weekend fares from Florida updated in real time?",
      answer: "These are recent fare finds and route ideas. Always check current availability before booking."
    },
    {
      question: "How can I find cheaper weekend flights?",
      answer: "Try shifting your trip by one day, comparing nearby airports, and checking both nonstop and one-stop routes."
    }
  ]
};

export function getSeoFlightPageFaqs(page: SeoFlightPage) {
  return seoFlightFaqs[page.slug] ?? [];
}
