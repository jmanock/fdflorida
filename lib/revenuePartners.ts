export const EXPEDIA_GENERAL_AFFILIATE_URL = "https://expedia.com/affiliates/expedia-home.DHcy34V";
export const AIRPORT_TRANSFER_AFFILIATE_URL = "https://www.awin1.com/awclick.php?gid=597088&mid=124434&awinaffid=2881665&linkid=4690637&clickref=";
export const SKYLARK_HOME_AFFILIATE_URL = "https://www.awin1.com/awclick.php?gid=564694&mid=106305&awinaffid=2881665&linkid=4324767&clickref=";
export const SKYLARK_DEALS_AFFILIATE_URL = "https://www.awin1.com/awclick.php?gid=564694&mid=106305&awinaffid=2881665&linkid=4324766&clickref=";
export const conversionSlugs = new Set([
  "google-flights-vs-skyscanner-for-florida-routes",
  "google-flights-vs-skyscanner",
  "google-flights-vs-expedia",
  "google-flights-vs-kayak",
  "google-flights-vs-hopper",
  "google-flights-vs-priceline",
  "google-flights-florida",
  "google-flights-orlando",
  "google-flights-tampa",
  "google-flights-miami",
  "google-flights-fort-lauderdale",
  "google-flights-jacksonville",
  "cheapest-months-to-fly-to-florida",
  "florida-flight-price-trends",
  "florida-airport-guide",
  "best-time-to-book-florida-flights"
]);

export const airportTransferSlugs = new Set([
  "google-flights-vs-skyscanner-for-florida-routes",
  "google-flights-orlando",
  "google-flights-tampa",
  "google-flights-miami",
  "google-flights-fort-lauderdale",
  "google-flights-jacksonville",
  "florida-airport-guide"
]);

export const getTransferAffiliateUrl = (slug: string) =>
  `${AIRPORT_TRANSFER_AFFILIATE_URL}${encodeURIComponent(`flightdealsflorida:${slug}`)}`;
