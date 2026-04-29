import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const SIGNUP_SOURCE = "flightdealsflorida.org";
const DEFAULT_FALLBACK_CSV_PATH = "/var/www/fdflorida/newsletter-signups.csv";

type SignupPayload = {
  email?: string;
  departureCity?: string;
  dealInterest?: string;
};

type SignupData = {
  email: string;
  departureCity?: string;
  dealInterest?: string;
  source: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanOptional(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parsePayload(payload: SignupPayload): SignupData {
  const email = cleanOptional(payload.email)?.toLowerCase();

  if (!email || !emailPattern.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  return {
    email,
    departureCity: cleanOptional(payload.departureCity),
    dealInterest: cleanOptional(payload.dealInterest),
    source: SIGNUP_SOURCE
  };
}

function csvEscape(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

async function saveSignupToCsv(signup: SignupData) {
  const csvPath = process.env.NEWSLETTER_FALLBACK_CSV_PATH ?? DEFAULT_FALLBACK_CSV_PATH;
  const createdAt = new Date().toISOString();
  const line = [signup.email, signup.source, createdAt].map(csvEscape).join(",") + "\n";

  await mkdir(dirname(csvPath), { recursive: true });
  await appendFile(csvPath, line, "utf8");

  console.info(`[newsletter] Saved signup via local CSV fallback: ${csvPath}`, {
    email: signup.email,
    source: signup.source,
    createdAt
  });
}

async function subscribeWithBeehiiv(signup: SignupData) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID ?? process.env.NEWSLETTER_LIST_ID;

  if (!apiKey || !publicationId) {
    throw new Error("Beehiiv is missing EMAIL_PROVIDER_API_KEY or BEEHIIV_PUBLICATION_ID.");
  }

  const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: signup.email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: signup.source,
      custom_fields: [
        { name: "departure_city", value: signup.departureCity ?? "" },
        { name: "deal_interest", value: signup.dealInterest ?? "" },
        { name: "signup_source", value: signup.source }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Beehiiv signup failed with status ${response.status}.`);
  }
}

async function subscribeWithMailchimp(signup: SignupData) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const listId = process.env.NEWSLETTER_LIST_ID;
  const serverPrefix = apiKey?.split("-")[1];

  if (!apiKey || !listId || !serverPrefix) {
    throw new Error("Mailchimp is missing EMAIL_PROVIDER_API_KEY with data center suffix or NEWSLETTER_LIST_ID.");
  }

  const response = await fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email_address: signup.email,
      status: "subscribed",
      tags: [signup.source, signup.dealInterest, signup.departureCity].filter(Boolean),
      merge_fields: {
        SOURCE: signup.source,
        DEPARTCITY: signup.departureCity ?? "",
        INTEREST: signup.dealInterest ?? ""
      }
    })
  });

  if (!response.ok && response.status !== 400) {
    throw new Error(`Mailchimp signup failed with status ${response.status}.`);
  }
}

async function subscribeWithResend(signup: SignupData) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const to = process.env.NEWSLETTER_NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "Florida Flight Deals <onboarding@resend.dev>";

  if (!apiKey || !to) {
    throw new Error("Resend is missing EMAIL_PROVIDER_API_KEY or NEWSLETTER_NOTIFY_EMAIL.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: "New Florida Flight Deals subscriber",
      text: [
        `Email: ${signup.email}`,
        `Departure city: ${signup.departureCity ?? "Not specified"}`,
        `Deal interest: ${signup.dealInterest ?? "Not specified"}`,
        `Source: ${signup.source}`
      ].join("\n")
    })
  });

  if (!response.ok) {
    throw new Error(`Resend notification failed with status ${response.status}.`);
  }
}

async function subscribe(signup: SignupData) {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase();

  if (!provider) {
    console.info("[newsletter] EMAIL_PROVIDER not configured. Using local CSV fallback.");
    await saveSignupToCsv(signup);
    return;
  }

  if (provider === "beehiiv") {
    await subscribeWithBeehiiv(signup);
    return;
  }

  if (provider === "mailchimp") {
    await subscribeWithMailchimp(signup);
    return;
  }

  if (provider === "resend") {
    await subscribeWithResend(signup);
    return;
  }

  throw new Error("EMAIL_PROVIDER must be set to beehiiv, mailchimp, or resend.");
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SignupPayload;
    const signup = parsePayload(payload);

    await subscribe(signup);

    return NextResponse.json(
      {
        ok: true,
        message: "You’re in! Florida flight deals are on the way."
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0"
        }
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
    const isValidationError = message.includes("valid email");

    return NextResponse.json(
      {
        ok: false,
        message: isValidationError ? message : "We couldn't save your signup. Please try again in a moment."
      },
      {
        status: isValidationError ? 400 : 500,
        headers: {
          "Cache-Control": "no-store, max-age=0"
        }
      }
    );
  }
}
