# Florida Flight Deals

Premium Next.js site for Florida Flight Deals, part of the Florida Deals Hub network.

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values for your deployment.

### Google Analytics

Add your Google Analytics Measurement ID:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The site automatically loads GA when this value is present and tracks:

- `newsletter_signup_started`
- `newsletter_signup_success`
- `deal_click`
- `affiliate_click`
- `guide_click`
- `destination_click`
- `network_site_click`
- `filter_click`
- `hotel_crosslink_click`
- `navigation_click`

Page-level hotel cross-link clicks use `hotel_crosslink_click` with:

```json
{
  "site": "flightdealsflorida.org",
  "source": "flights",
  "provider": "expedia",
  "destination_key": "orlando",
  "page_path": "/flights/orlando",
  "outbound_url": "https://expedia.com/affiliate/2Wbjdi2"
}
```

## Expedia Affiliate Links

Expedia hotel affiliate links live in:

```text
lib/affiliateLinks.ts
```

The current base link is:

```text
https://expedia.com/affiliate/2Wbjdi2
```

All Expedia hotel CTAs must go through:

```ts
getExpediaHotelLink(destinationKey)
```

When Expedia Creator Hub provides destination-specific deep links, replace the matching entries inside `expediaDestinationLinks` in `lib/affiliateLinks.ts`. Do not paste Expedia URLs directly into components.

Available destination keys:

```text
orlando
miami
tampa
fortLauderdale
jacksonville
denver
newYork
cancun
```

### Newsletter Provider

Choose a provider:

```bash
EMAIL_PROVIDER=beehiiv
```

Leave `EMAIL_PROVIDER` blank to save signups to a local CSV file first. This is the simplest production fallback before Beehiiv, Mailchimp, or Resend is connected.

Supported placeholders are:

- `beehiiv`
- `mailchimp`
- `resend`

Add the provider API key server-side only:

```bash
EMAIL_PROVIDER_API_KEY=your_server_side_api_key
```

Do not use `NEXT_PUBLIC_` for provider secrets.

### Newsletter/List ID

For Beehiiv:

```bash
BEEHIIV_PUBLICATION_ID=pub_xxxxx
```

For Mailchimp:

```bash
NEWSLETTER_LIST_ID=audience_or_list_id
```

For Resend notification capture:

```bash
NEWSLETTER_NOTIFY_EMAIL=owner@example.com
RESEND_FROM_EMAIL="Florida Flight Deals <alerts@yourdomain.com>"
```

### Local CSV Fallback

If no `EMAIL_PROVIDER` is configured, `/api/newsletter` saves subscribers to:

```bash
NEWSLETTER_FALLBACK_CSV_PATH=/var/www/fdflorida/newsletter-signups.csv
```

CSV columns:

```text
email,source,createdAt
```

Make sure the VPS user running Next.js can create/write this file and its parent directory:

```bash
sudo mkdir -p /var/www/fdflorida
sudo chown -R $USER:$USER /var/www/fdflorida
```

## Newsletter Signup API

The premium signup form posts to:

```text
POST /api/newsletter
```

Payload:

```json
{
  "email": "reader@example.com",
  "departureCity": "Orlando",
  "dealInterest": "Weekend getaways"
}
```

The server validates email, adds the signup source `flightdealsflorida.org`, and either forwards the subscriber to the configured provider or saves the signup to the local CSV fallback without exposing API keys to the frontend.

## SEO Operations

### Sitemap Strategy

The sitemap is generated from:

```text
app/sitemap.ts
```

It should only include canonical HTTPS URLs on the non-www domain:

```text
https://flightdealsflorida.org
```

The sitemap combines the homepage, city guide pages from `lib/cityFlightPages.ts`, SEO landing pages from `lib/seoFlightPages.ts`, and core legal/contact pages. Add new public flight pages to the shared data files so they are picked up by the sitemap automatically.

### Robots Strategy

Robots rules live in:

```text
app/robots.ts
```

The current strategy allows crawling and references the canonical sitemap:

```text
User-agent: *
Allow: /
Sitemap: https://flightdealsflorida.org/sitemap.xml
```

Do not block flight SEO pages unless a page is intentionally removed from search.

### Canonical Strategy

Canonical URLs must be absolute, HTTPS, non-www, and self-referencing.

- Homepage canonical is defined in `app/layout.tsx` and `app/page.tsx`.
- SEO landing page canonicals are generated in `app/[slug]/page.tsx`.
- City guide canonicals are generated in `app/flights/[city]/page.tsx`.

Do not point all pages to the homepage. The canonical URL should match the URL in `app/sitemap.ts`.

### Structured Data

Global `Organization` and `WebSite` JSON-LD live in `app/layout.tsx`.

Page-level schema is generated where the content exists:

- `BreadcrumbList` for visible breadcrumbs
- `FAQPage` for rendered FAQ sections
- `ItemList` for flight route/deal cards
- `TravelAction` for city guide pages

Avoid `Offer`, `Product`, or guaranteed availability schema unless the source data is accurate enough to support it.

### SEO Page Strategy

Primary SEO landing page content lives in:

```text
lib/seoFlightPages.ts
```

Each market or deal page should include:

- unique title and meta description
- H1 and intro copy
- 300-600 words of useful page copy when rendered
- relevant deal IDs
- related page slugs
- 3-5 FAQs
- safe fare language such as "recent fare examples" and "fares may change"

Supported page types in `lib/seoFlightPages.ts`:

```ts
pageType?: "deals" | "route" | "guide";
```

Deal pages show curated route cards. Route pages focus on one high-intent origin-to-destination search. Guide pages are informational and do not render fare cards unless useful.

City guide content for `/flights/orlando`, `/flights/miami`, `/flights/tampa`, and `/flights/fort-lauderdale` lives in:

```text
lib/cityFlightPages.ts
```

### Flights V2 Strategy

Flights V2 turns the site from a simple deal board into a Florida flight discovery platform. The homepage should support multiple discovery paths:

- trending Florida routes
- popular destinations
- weekend getaway flights
- seasonal travel ideas
- airport guides
- flight planning guides
- destination discovery
- related hotel, cruise, local, and hub planning
- newsletter signup and FAQs

Keep the experience editorial and useful. Flight cards stay flight-focused, while hotels, cruises, and local links appear in page-level planning sections.

### Airport Guide Strategy

Airport guide pages are generated from `airportGuidePages` in `lib/seoFlightPages.ts`.

Each airport guide should cover:

- airport overview
- cheapest times to fly
- nearby destinations
- major route and airline considerations
- transportation and nearby planning
- related hotels or cruise access when useful
- FAQPage and BreadcrumbList schema

### Seasonal Page Strategy

Seasonal SEO pages are generated from `seasonalFlightPages` in `lib/seoFlightPages.ts`.

Use these for summer, holiday, spring break, winter, Memorial Day, and other calendar-driven travel searches. Seasonal pages should explain route ideas, flexible-date strategy, airport comparisons, and full-trip planning context without fake urgency.

### Route Page Strategy

Route pages should only be created when there is enough useful content to avoid thin pages. Each route page should include:

- route-specific title, description, H1, and canonical URL
- airport notes for the origin and destination
- one recent fare example or useful route search
- flexible-date tip
- destination travel tip
- related route and market links
- FAQPage, BreadcrumbList, and ItemList schema when fare cards exist

Use route-specific Google Flights links through `createFlightSearchUrl()` or `getFlightSearchUrl()`. Do not add placeholder links.

### Informational Guide Strategy

Informational pages should build topical authority without feeling like affiliate pages. Use `pageType: "guide"` for guides such as airport comparisons, booking timing, and cheap-flight search tactics.

Guide pages should include practical headings, internal links to relevant deal pages, FAQs, BreadcrumbList schema, and FAQPage schema. They should not force deal cards unless the page naturally benefits from route examples.

### Comparison Page Strategy

Comparison pages use `pageType: "guide"` plus `comparisonTable` in `lib/seoFlightPages.ts`.

Each comparison page should include:

- a clear comparison-focused title and meta description
- practical intro and detail copy
- `contentSections` for context
- `comparisonTable` rows for scan-friendly decisions
- related flight searches
- FAQs and FAQPage schema
- no fixed-price or fake availability claims

### Image Fallback Strategy

Flight images use the reusable client wrapper:

```text
components/FallbackImage.tsx
```

The branded fallback asset lives at:

```text
public/images/fallbacks/flight-placeholder.svg
```

Use `FallbackImage` anywhere a remote card or hero image could fail. The wrapper preserves the existing `next/image` layout, swaps to the local fallback on error, and tracks `image_fallback_used` with the failed `image_src` and `page_path`.

When adding flight card images:

- prefer destination or route-mood imagery
- keep remote images on approved domains in `next.config.ts`
- use descriptive alt text
- avoid repeated images in the same section when practical
- keep `w=900&q=80` or similarly optimized source parameters for card imagery

### Related Searches And Clusters

Related flight links live in:

```text
lib/siteLinks.ts
```

Use descriptive internal anchors and keep internal links same-tab. Major pages render related flight searches and destination/route clusters so crawlers and visitors can move between airport, route, guide, and trip-intent pages.

V2 discovery links live in:

```text
v2FlightDiscoveryLinks
```

Use these for airport guides, planning guides, seasonal pages, comparison pages, editorial policy, and flight-price education.

### Analytics Events

Current analytics events include:

- `flight_card_click`
- `route_click`
- `guide_click` for guide, airport, packing, best-of, and planning links
- `destination_click` for Orlando, Miami, Tampa, Fort Lauderdale, Jacksonville, Clearwater, Key West, and Port Canaveral cluster links
- `network_site_click`
- `affiliate_click`
- `newsletter_signup_started`
- `newsletter_signup_success`
- `image_fallback_used`

Flight card clicks should include `source_site`, route or origin/destination, price range, CTA text, outbound URL, and current page path when available.

### Footer SEO Structure

The crawl-friendly footer lives in:

```text
components/SiteFooter.tsx
```

Footer sections are organized as:

- Florida Flight Markets
- Flight Types
- Florida Deals Network
- Related Flight Searches

Keep the footer useful and scannable. Do not turn it into an unfiltered dump of every page.

### Adding New Flight Pages

To safely add a new flight SEO page:

1. Add the page object to `seoFlightPages` in `lib/seoFlightPages.ts`.
2. Choose the right `pageType`: `deals`, `route`, or `guide`.
3. Add matching FAQs in `seoFlightPageFaqs`.
4. Add a descriptive internal link in `flightSearchLinks` inside `lib/siteLinks.ts`.
5. Use real deal IDs from `data/deals.ts` or a route-specific `customDeals` object with a real flight search URL.
6. Run `npm run lint` and `npm run build`.
7. Confirm the new URL appears in `/sitemap.xml`.

### Adding New Flight Cards

Flight cards live in:

```text
data/deals.ts
```

Each card should include origin, destination, airline/source, price when available, route-specific flight search URL, destination-relevant image, safe fare copy, and a clear CTA. Use `getFlightSearchUrl()` for flight links so route URLs can be swapped later without editing components.

Use descriptive image alt text. Avoid mismatched destination images, placeholder links, guaranteed prices, and unsupported urgency.
