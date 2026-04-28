export type DealCategory =
  | "All Deals"
  | "Orlando"
  | "Miami"
  | "Fort Lauderdale"
  | "Tampa"
  | "Jacksonville"
  | "Domestic"
  | "International"
  | "Weekend"
  | "Under $99";

export type DealBadge = "Hot Deal" | "Weekend" | "International" | "Limited" | "Under $99";

export type FlightDeal = {
  id: string;
  airline: string;
  from: string;
  to: string;
  price: number;
  dates: string;
  category: DealCategory[];
  booking_url: string;
  image: string;
  badge: DealBadge;
};

export const filters: DealCategory[] = [
  "All Deals",
  "Orlando",
  "Miami",
  "Tampa",
  "Fort Lauderdale",
  "Jacksonville",
  "Weekend",
  "Under $99",
  "International"
];

export const deals: FlightDeal[] = [
  {
    id: "mco-den-frontier-58",
    airline: "Frontier",
    from: "Orlando",
    to: "Denver",
    price: 58,
    dates: "May 14-21",
    category: ["Orlando", "Domestic", "Under $99"],
    booking_url: "https://www.flyfrontier.com/",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=80",
    badge: "Hot Deal"
  },
  {
    id: "mia-bog-american-186",
    airline: "American",
    from: "Miami",
    to: "Bogota",
    price: 186,
    dates: "Jun 3-10",
    category: ["Miami", "International"],
    booking_url: "https://www.aa.com/",
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80",
    badge: "International"
  },
  {
    id: "fll-atl-spirit-72",
    airline: "Spirit",
    from: "Fort Lauderdale",
    to: "Atlanta",
    price: 72,
    dates: "May 9-12",
    category: ["Fort Lauderdale", "Domestic", "Weekend", "Under $99"],
    booking_url: "https://www.spirit.com/",
    image: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=900&q=80",
    badge: "Weekend"
  },
  {
    id: "tpa-nyc-jetblue-98",
    airline: "JetBlue",
    from: "Tampa",
    to: "New York",
    price: 98,
    dates: "May 17-20",
    category: ["Tampa", "Domestic", "Weekend", "Under $99"],
    booking_url: "https://www.jetblue.com/",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=80",
    badge: "Under $99"
  },
  {
    id: "mia-nyc-jetblue-79",
    airline: "JetBlue",
    from: "Miami",
    to: "New York",
    price: 79,
    dates: "Jun 14-17",
    category: ["Miami", "Domestic", "Weekend", "Under $99"],
    booking_url: "https://www.jetblue.com/",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=80",
    badge: "Hot Deal"
  },
  {
    id: "tpa-cun-southwest-119",
    airline: "Southwest",
    from: "Tampa",
    to: "Cancun",
    price: 119,
    dates: "Aug 8-12",
    category: ["Tampa", "International", "Weekend"],
    booking_url: "https://www.southwest.com/",
    image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=900&q=80",
    badge: "International"
  },
  {
    id: "jax-dfw-american-128",
    airline: "American",
    from: "Jacksonville",
    to: "Dallas",
    price: 128,
    dates: "Jun 7-14",
    category: ["Jacksonville", "Domestic"],
    booking_url: "https://www.aa.com/",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=900&q=80",
    badge: "Limited"
  },
  {
    id: "mco-san-southwest-115",
    airline: "Southwest",
    from: "Orlando",
    to: "San Diego",
    price: 115,
    dates: "Aug 20-27",
    category: ["Orlando", "Domestic"],
    booking_url: "https://www.southwest.com/",
    image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed?auto=format&fit=crop&w=900&q=80",
    badge: "Hot Deal"
  },
  {
    id: "mia-mad-iberia-412",
    airline: "American",
    from: "Miami",
    to: "Madrid",
    price: 412,
    dates: "Sep 8-17",
    category: ["Miami", "International"],
    booking_url: "https://www.aa.com/",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80",
    badge: "International"
  },
  {
    id: "fll-sju-spirit-88",
    airline: "Spirit",
    from: "Fort Lauderdale",
    to: "San Juan",
    price: 88,
    dates: "May 22-29",
    category: ["Fort Lauderdale", "International", "Under $99"],
    booking_url: "https://www.spirit.com/",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80",
    badge: "Under $99"
  },
  {
    id: "tpa-ord-united-104",
    airline: "United",
    from: "Tampa",
    to: "Chicago",
    price: 104,
    dates: "Jun 13-16",
    category: ["Tampa", "Domestic", "Weekend"],
    booking_url: "https://www.united.com/",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=900&q=80",
    badge: "Weekend"
  },
  {
    id: "jax-bos-delta-146",
    airline: "Delta",
    from: "Jacksonville",
    to: "Boston",
    price: 146,
    dates: "Jul 10-15",
    category: ["Jacksonville", "Domestic"],
    booking_url: "https://www.delta.com/",
    image: "https://images.unsplash.com/photo-1501979376754-2ff867a4f659?auto=format&fit=crop&w=900&q=80",
    badge: "Limited"
  },
  {
    id: "mco-cun-jetblue-172",
    airline: "JetBlue",
    from: "Orlando",
    to: "Cancun",
    price: 172,
    dates: "Jun 18-25",
    category: ["Orlando", "International"],
    booking_url: "https://www.jetblue.com/",
    image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=900&q=80",
    badge: "International"
  },
  {
    id: "mia-lax-delta-138",
    airline: "Delta",
    from: "Miami",
    to: "Los Angeles",
    price: 138,
    dates: "Aug 6-13",
    category: ["Miami", "Domestic"],
    booking_url: "https://www.delta.com/",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    badge: "Hot Deal"
  },
  {
    id: "fll-las-frontier-96",
    airline: "Frontier",
    from: "Fort Lauderdale",
    to: "Las Vegas",
    price: 96,
    dates: "May 31-Jun 3",
    category: ["Fort Lauderdale", "Domestic", "Weekend", "Under $99"],
    booking_url: "https://www.flyfrontier.com/",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    badge: "Weekend"
  },
  {
    id: "tpa-msy-southwest-79",
    airline: "Southwest",
    from: "Tampa",
    to: "New Orleans",
    price: 79,
    dates: "May 24-27",
    category: ["Tampa", "Domestic", "Weekend", "Under $99"],
    booking_url: "https://www.southwest.com/",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
    badge: "Under $99"
  },
  {
    id: "jax-phl-frontier-92",
    airline: "Frontier",
    from: "Jacksonville",
    to: "Philadelphia",
    price: 92,
    dates: "Jun 2-6",
    category: ["Jacksonville", "Domestic", "Under $99"],
    booking_url: "https://www.flyfrontier.com/",
    image: "https://images.unsplash.com/photo-1515861204537-49a8e6c72569?auto=format&fit=crop&w=900&q=80",
    badge: "Under $99"
  },
  {
    id: "mco-sea-alaska-158",
    airline: "United",
    from: "Orlando",
    to: "Seattle",
    price: 158,
    dates: "Sep 11-18",
    category: ["Orlando", "Domestic"],
    booking_url: "https://www.united.com/",
    image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?auto=format&fit=crop&w=900&q=80",
    badge: "Limited"
  },
  {
    id: "mia-lim-latam-298",
    airline: "Delta",
    from: "Miami",
    to: "Lima",
    price: 298,
    dates: "Oct 4-12",
    category: ["Miami", "International"],
    booking_url: "https://www.delta.com/",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80",
    badge: "International"
  },
  {
    id: "fll-dca-jetblue-84",
    airline: "JetBlue",
    from: "Fort Lauderdale",
    to: "Washington, DC",
    price: 84,
    dates: "Jun 20-23",
    category: ["Fort Lauderdale", "Domestic", "Weekend", "Under $99"],
    booking_url: "https://www.jetblue.com/",
    image: "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?auto=format&fit=crop&w=900&q=80",
    badge: "Weekend"
  },
  {
    id: "tpa-lhr-delta-516",
    airline: "Delta",
    from: "Tampa",
    to: "London",
    price: 516,
    dates: "Nov 5-13",
    category: ["Tampa", "International"],
    booking_url: "https://www.delta.com/",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
    badge: "International"
  },
  {
    id: "jax-mia-american-69",
    airline: "American",
    from: "Jacksonville",
    to: "Miami",
    price: 69,
    dates: "May 16-19",
    category: ["Jacksonville", "Miami", "Domestic", "Weekend", "Under $99"],
    booking_url: "https://www.aa.com/",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=900&q=80",
    badge: "Weekend"
  },
  {
    id: "mco-bna-spirit-64",
    airline: "Spirit",
    from: "Orlando",
    to: "Nashville",
    price: 64,
    dates: "Jun 6-9",
    category: ["Orlando", "Domestic", "Weekend", "Under $99"],
    booking_url: "https://www.spirit.com/",
    image: "https://images.unsplash.com/photo-1545419913-775e02c2f7bd?auto=format&fit=crop&w=900&q=80",
    badge: "Hot Deal"
  },
  {
    id: "mia-cdg-airfrance-487",
    airline: "American",
    from: "Miami",
    to: "Paris",
    price: 487,
    dates: "Jan 15-23",
    category: ["Miami", "International"],
    booking_url: "https://www.aa.com/",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    badge: "Limited"
  },
  {
    id: "fll-cle-united-94",
    airline: "United",
    from: "Fort Lauderdale",
    to: "Cleveland",
    price: 94,
    dates: "Jul 18-21",
    category: ["Fort Lauderdale", "Domestic", "Weekend", "Under $99"],
    booking_url: "https://www.united.com/",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=900&q=80",
    badge: "Under $99"
  },
  {
    id: "tpa-sfo-united-149",
    airline: "United",
    from: "Tampa",
    to: "San Francisco",
    price: 149,
    dates: "Sep 4-10",
    category: ["Tampa", "Domestic"],
    booking_url: "https://www.united.com/",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=80",
    badge: "Hot Deal"
  }
];
