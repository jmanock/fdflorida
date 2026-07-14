export type RealityItem = { title: string; body: string };
export type RealityLink = { label: string; href: string };

export type TripRealityGuide = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heroImage: string;
  heroAlt: string;
  quickAnswer: string;
  reality: Array<{ label: string; value: string }>;
  good: RealityItem[];
  drawbacks: RealityItem[];
  surprises: RealityItem[];
  worthPayingFor: RealityItem[];
  skipOrLimit: RealityItem[];
  pack: string[];
  forget: string[];
  differently: string[];
  verify: string[];
  checklist: string[];
  liveAirportIds: string[];
  liveHref: string;
  liveLabel: string;
  nextSteps: RealityLink[];
  sources: RealityLink[];
  affiliate?: "esimshop";
};

const airportStatus = "https://flightdealsflorida.org/florida-airport-status";

export const tripRealityGuides: TripRealityGuide[] = [
  {
    slug: "when-a-cheap-florida-flight-is-not-actually-cheap",
    title: "When a Cheap Florida Flight Is Not Actually Cheap",
    description: "Compare Florida airfare by baggage, airport, schedule, ground transportation, and disruption risk before deciding whether the lowest fare is real value.",
    eyebrow: "Florida Trip Reality Guide",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    heroAlt: "Airplane wing above clouds during a Florida flight",
    quickAnswer: "The lowest displayed fare can lose its advantage when it requires paid bags, an inconvenient airport, a long connection, an extra hotel night, or expensive transportation after landing. Compare the complete door-to-door trip instead of the ticket alone.",
    reality: [
      { label: "Best for", value: "Flexible travelers who can compare airports and schedules" },
      { label: "Less ideal for", value: "Tight cruise, event, or theme-park arrival windows" },
      { label: "Biggest hidden cost", value: "Bags, ground transportation, or lost trip time" },
      { label: "Weather sensitivity", value: "Moderate to high when connections are involved" },
      { label: "Worth paying for", value: "A schedule and airport that protect the trip" },
      { label: "Verify first", value: "Fare rules, baggage, airport, and final checkout total" }
    ],
    good: [
      { title: "A low fare can unlock the trip", body: "Flexible dates and nearby Florida airports can reveal useful options, especially when the traveler can pack lightly and absorb a schedule change." },
      { title: "Competition gives travelers choices", body: "MCO, MIA, TPA, and FLL serve different regions and trip types. Comparing more than one airport can improve the schedule even when it does not produce the absolute lowest fare." }
    ],
    drawbacks: [
      { title: "The airport can be wrong for the destination", body: "A fare that lands far from the hotel, cruise port, or attraction may add a rental car, tolls, transfer costs, and several hours of travel." },
      { title: "Basic fare rules can remove flexibility", body: "Seat assignment, carry-on, checked-bag, change, and cancellation terms vary. The article does not estimate fees; travelers should compare the airline's current checkout details." }
    ],
    surprises: [
      { title: "A late arrival can create another hotel night", body: "A cheap evening flight may be poor value when a cruise or fixed event requires a buffer. Same-day cruise arrivals carry more schedule risk than arriving earlier." },
      { title: "A connection makes two weather systems relevant", body: "The origin, connection airport, and Florida arrival can each affect the trip. A clear forecast in Florida does not guarantee the connection will operate normally." },
      { title: "Personal-item limits are airline specific", body: "A bag that works on one airline may not satisfy another carrier's dimensions or fare rules. Verify the operating carrier and current baggage policy." }
    ],
    worthPayingFor: [
      { title: "A useful arrival time", body: "Worth considering when hotel check-in, rental-car hours, cruise embarkation, or a ticketed event leaves little recovery time." },
      { title: "A closer airport", body: "A slightly higher fare can be rational when it materially reduces transfers, tolls, parking, or the need for a rental car." },
      { title: "Fare flexibility", body: "More useful when weather, family needs, or a complex itinerary makes changing the trip plausible. Compare the exact terms rather than the fare-brand name." }
    ],
    skipOrLimit: [
      { title: "A distant airport for a tiny fare difference", body: "Usually avoidable when the extra ground journey costs more time and money than the airfare saves." },
      { title: "Duplicate transportation", body: "A rental car may be unnecessary when the stay is walkable and airport transfers cover both directions. It may be essential for a multi-area itinerary." }
    ],
    pack: ["Medication and one essential change of clothing in the personal item", "A compact charging cable and approved power bank", "Rain layer suitable for sudden Florida showers", "Empty refillable bottle for after security", "Reservation details available offline"],
    forget: ["Check the operating airline, not only the seller", "Price the return airport trip", "Confirm late-night transportation availability", "Allow recovery time before a cruise or fixed event", "Review current baggage dimensions"],
    differently: ["Compare the full trip total before sorting by fare", "Choose the airport after mapping the hotel or port", "Protect the first day from a fragile connection", "Keep essentials out of the checked bag"],
    verify: ["Airline baggage and fare rules", "Airport and terminal", "Ground transportation operating hours", "Official airport status and airline notifications", "Cruise or event arrival requirements"],
    checklist: ["Compare complete fare totals", "Check baggage rules", "Review airport status", "Confirm ground transportation", "Protect cruise or event timing", "Pack essentials in a personal item"],
    liveAirportIds: ["MCO", "MIA", "TPA", "FLL"],
    liveHref: airportStatus,
    liveLabel: "Check Florida airport weather context",
    nextSteps: [
      { label: "Florida airport status", href: airportStatus },
      { label: "Compare Florida hotel areas", href: "https://hoteldealsflorida.org" },
      { label: "Plan airport transfers", href: "https://flightdealsflorida.org/florida-airport-transfer-guide" },
      { label: "Build the whole Florida trip", href: "https://floridadealshub.com/vacation-builder" }
    ],
    sources: [
      { label: "TSA travel tips", href: "https://www.tsa.gov/news/press/factsheets/tsa-travel-tips" },
      { label: "Orlando International Airport", href: "https://flymco.com" },
      { label: "Miami International Airport", href: "https://www.miami-airport.com" },
      { label: "Florida Network live-data methodology", href: "https://floridadealshub.com/how-florida-live-data-works" }
    ]
  },
  {
    slug: "direct-flight-vs-connection-florida",
    title: "Direct Flight vs Connection: When Paying More Is Worth It",
    description: "Decide when a nonstop Florida flight is worth paying more for and when a connection can still be a sensible tradeoff.",
    eyebrow: "Worth the Cost?",
    heroImage: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    heroAlt: "Commercial airplane approaching an airport runway",
    quickAnswer: "A nonstop is most valuable when the trip is short, the arrival is time-sensitive, the group is difficult to rebook, or a missed connection would damage the vacation. A connection can still make sense when the savings are meaningful and the schedule has room to recover.",
    reality: [
      { label: "Best for nonstop", value: "Short trips, families, cruises, and fixed events" },
      { label: "Connection can work", value: "Flexible trips with a sensible buffer" },
      { label: "Problem solved", value: "Fewer handoffs and less missed-connection exposure" },
      { label: "Potential downside", value: "Higher fare or fewer departure choices" },
      { label: "Lower-cost alternative", value: "One connection with a generous layover" },
      { label: "Verify first", value: "Operating carrier, airport, terminal, and fare rules" }
    ],
    good: [
      { title: "Nonstops reduce itinerary complexity", body: "One takeoff and one landing remove a connection airport from the chain. That matters more for short trips and fixed arrival commitments." },
      { title: "Connections can open better departure times", body: "A connecting itinerary may be rational when a nonstop departs too early, arrives too late, or serves the wrong Florida airport." }
    ],
    drawbacks: [
      { title: "A nonstop is not disruption-proof", body: "Weather, aircraft, crew, and air-traffic constraints can still affect it. The benefit is fewer itinerary handoffs, not a guarantee." },
      { title: "A cheap connection can consume a vacation day", body: "Compare total elapsed time and arrival quality. A long layover may be acceptable for a long trip but disproportionate for a weekend." }
    ],
    surprises: [
      { title: "Separate tickets create a different risk", body: "When flights are booked separately, protection after a delay may differ from one through itinerary. Verify baggage transfer and rebooking responsibility." },
      { title: "Airport layout matters", body: "A legal connection may still feel tight when terminals, security, mobility needs, or traveling with children slow the transfer." }
    ],
    worthPayingFor: [
      { title: "Nonstop before a cruise", body: "Worth considering with an earlier arrival day and a buffer. Paying more does not make same-day embarkation risk disappear." },
      { title: "Nonstop for a three-day trip", body: "Often valuable because the hours saved represent a larger share of the vacation." },
      { title: "A better connection", body: "When nonstop pricing is disproportionate, a single protected connection with a realistic layover can be the balanced option." }
    ],
    skipOrLimit: [
      { title: "A very tight connection", body: "May not suit families, mobility needs, checked bags, terminal changes, or a time-sensitive arrival." },
      { title: "Paying any premium without valuing the time", body: "A nonstop is not automatically worth every price difference. Compare the premium with the hours and risk actually removed." }
    ],
    pack: ["Essentials and medication in the personal item", "Charging cable and approved power bank", "Offline airline and hotel details", "A light layer for aircraft cabins", "Compact food option within security rules"],
    forget: ["Check whether the itinerary uses separate tickets", "Review terminal changes", "Confirm checked-bag transfer", "Consider mobility and family pacing", "Watch both connection and Florida weather"],
    differently: ["Put a dollar value on useful vacation time", "Avoid fragile connections before fixed commitments", "Choose one protected itinerary when possible", "Compare arrival airport before fare"],
    verify: ["Operating carriers", "Connection terminal and minimum time", "Baggage transfer", "Rebooking terms", "Current airport and airline status"],
    checklist: ["Compare elapsed travel time", "Check connection terminals", "Review baggage transfer", "Check airport weather context", "Protect fixed arrival commitments", "Save itinerary details offline"],
    liveAirportIds: ["MCO", "MIA", "TPA", "FLL"],
    liveHref: airportStatus,
    liveLabel: "Review current Florida airport context",
    nextSteps: [
      { label: "Florida airport status", href: airportStatus },
      { label: "Cheap-flight hidden costs", href: "/trip-reality/when-a-cheap-florida-flight-is-not-actually-cheap" },
      { label: "Florida hotel planning", href: "https://hoteldealsflorida.org" },
      { label: "Florida Right Now", href: "https://floridadealshub.com/florida-right-now" }
    ],
    sources: [
      { label: "FAA flight delay information", href: "https://www.fly.faa.gov/flyfaa/usmap.jsp" },
      { label: "TSA travel tips", href: "https://www.tsa.gov/news/press/factsheets/tsa-travel-tips" },
      { label: "Florida Network live-data methodology", href: "https://floridadealshub.com/how-florida-live-data-works" }
    ]
  },
  {
    slug: "international-traveler-checklist-florida",
    title: "International Traveler Checklist for Visiting Florida",
    description: "Prepare for a Florida flight with document, airport, baggage, transportation, weather, and travel eSIM checks for international visitors.",
    eyebrow: "Florida arrival guide",
    heroImage: "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=82",
    heroAlt: "Traveler reviewing documents beside airport departure windows",
    quickAnswer: "International travelers should verify entry documents with official authorities, check the operating airline's baggage rules, plan the trip from the arrival airport to the hotel, and decide how the phone will connect before departure. A travel eSIM is useful only when the device is compatible, unlocked, and covered at the destination.",
    reality: [
      { label: "Best for", value: "Overseas visitors arriving through MIA, MCO, FLL, or TPA" },
      { label: "Biggest planning gap", value: "The journey after airport arrival" },
      { label: "Connectivity choice", value: "Home roaming, travel eSIM, local option, or Wi-Fi" },
      { label: "Car usefulness", value: "High for multi-area trips; lower in walkable stays" },
      { label: "Weather sensitivity", value: "High for outdoor plans and connections" },
      { label: "Verify first", value: "Official entry, carrier, device, and coverage rules" }
    ],
    good: [
      { title: "Florida has several international gateways", body: "The right airport depends on the destination, onward transportation, and flight schedule. The largest airport is not automatically the easiest for every trip." },
      { title: "Preparation prevents expensive improvisation", body: "Offline documents, a known transfer plan, and a connectivity decision reduce the need to solve basic logistics immediately after a long flight." }
    ],
    drawbacks: [
      { title: "Florida distances are easy to underestimate", body: "Miami Beach, Orlando attractions, Gulf beaches, and cruise ports are separate travel markets. A statewide itinerary can require substantial driving." },
      { title: "Connectivity products have limits", body: "An eSIM does not guarantee service, unlock a phone, include voice service, or replace ship Wi-Fi at sea. Coverage depends on device, provider, plan, and country." }
    ],
    surprises: [
      { title: "The arrival airport can change the transport budget", body: "Compare transfer, rideshare, rental-car, toll, parking, and one-way return needs before choosing the flight." },
      { title: "Summer weather can interrupt outdoor plans", body: "Heat, heavy rain, and thunderstorms require water, shade, indoor backups, and attention to official alerts. When thunder is heard, National Weather Service guidance is to move indoors." },
      { title: "A phone may be carrier-locked", body: "Apple advises checking carrier-lock status before using another provider. Other device makers and carriers publish their own compatibility steps." }
    ],
    worthPayingFor: [
      { title: "A preplanned airport transfer", body: "Worth considering for late arrivals, groups, substantial luggage, or unfamiliar routes when the provider and pickup details are confirmed." },
      { title: "A travel eSIM", body: "More useful for unlocked compatible devices and travelers who need data outside the United States before or after Florida. Compare it with home-carrier roaming." },
      { title: "A rental car", body: "Useful for multi-area itineraries. Often avoidable when the trip stays in one walkable district and transfers cover airport journeys." }
    ],
    skipOrLimit: [
      { title: "Buying connectivity before checking the phone", body: "Do not purchase until unlock status, device support, activation process, plan duration, and destination coverage are understood." },
      { title: "Keeping cellular roaming active on a ship", body: "Maritime cellular service can be different from a land-based travel eSIM. Use airplane mode and follow the cruise line and carrier's current instructions." }
    ],
    pack: ["Travel documents and offline copies", "Medication in original practical packaging", "Universal power adapter appropriate for the device", "Approved charging bank in carry-on baggage", "Sun and rain protection", "One essential clothing change in hand luggage"],
    forget: ["Check passport and entry rules with official authorities", "Tell the bank about travel if required", "Confirm phone unlock status", "Download maps and reservations", "Review toll and parking plans", "Check insurance terms already held"],
    differently: ["Choose the arrival airport after mapping the trip", "Set up connectivity before the airport transfer", "Keep the first day deliberately light", "Carry official-source links offline", "Build an indoor weather backup"],
    verify: ["Official U.S. entry requirements", "Airline document and baggage rules", "Phone compatibility and carrier lock", "Provider country and plan coverage", "Airport pickup instructions", "Current weather and airport context"],
    checklist: ["Verify official travel documents", "Check airline baggage rules", "Save reservations offline", "Confirm airport transportation", "Check phone unlock status", "Compare roaming and eSIM options", "Review Florida weather", "Pack sun and rain protection"],
    liveAirportIds: ["MCO", "MIA", "TPA", "FLL"],
    liveHref: airportStatus,
    liveLabel: "Check arrival-airport context",
    nextSteps: [
      { label: "Florida airport status", href: airportStatus },
      { label: "Compare airport transfer options", href: "https://flightdealsflorida.org/florida-airport-transfer-guide" },
      { label: "Choose a Florida hotel area", href: "https://hoteldealsflorida.org" },
      { label: "Florida Right Now", href: "https://floridadealshub.com/florida-right-now" }
    ],
    sources: [
      { label: "U.S. Customs and Border Protection travel guidance", href: "https://www.cbp.gov/travel/international-visitors" },
      { label: "TSA travel tips", href: "https://www.tsa.gov/news/press/factsheets/tsa-travel-tips" },
      { label: "Apple travel eSIM guidance", href: "https://support.apple.com/en-us/118227" },
      { label: "National Weather Service lightning safety", href: "https://www.weather.gov/safety/lightning" }
    ],
    affiliate: "esimshop"
  }
];

export const tripRealityGuideMap = Object.fromEntries(tripRealityGuides.map((guide) => [guide.slug, guide]));
