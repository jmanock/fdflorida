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
- `filter_click`

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
