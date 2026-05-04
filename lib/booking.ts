const bookingSearchUrls: Record<string, string> = {
  Orlando: "https://www.booking.com/searchresults.html?ss=Orlando",
  Miami: "https://www.booking.com/searchresults.html?ss=Miami+Beach",
  "Miami Beach": "https://www.booking.com/searchresults.html?ss=Miami+Beach",
  Tampa: "https://www.booking.com/searchresults.html?ss=Tampa",
  "Fort Lauderdale": "https://www.booking.com/searchresults.html?ss=Fort+Lauderdale"
};

export function getBookingLink(url: string) {
  return url;
}

export function getBookingSearchUrl(location: string) {
  return getBookingLink(bookingSearchUrls[location] ?? `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(location).replaceAll("%20", "+")}`);
}

export function getHotelLocationForRoute(origin: string, destination: string) {
  if (bookingSearchUrls[destination]) {
    return destination;
  }

  if (bookingSearchUrls[origin]) {
    return origin;
  }

  return destination;
}
