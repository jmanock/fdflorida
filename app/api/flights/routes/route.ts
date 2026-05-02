import { NextResponse } from "next/server";
import { deals } from "@/data/deals";

export const revalidate = 86400;

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      source: "curated",
      updatedDaily: true,
      routes: deals.map((deal) => ({
        id: deal.id,
        airline: deal.airline,
        origin: deal.origin ?? deal.from,
        destination: deal.destination ?? deal.to,
        price: deal.price,
        dates: deal.dates,
        tag: deal.quality_tag,
        freshness: deal.freshness,
        link: deal.link ?? deal.booking_url
      }))
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600"
      }
    }
  );
}
