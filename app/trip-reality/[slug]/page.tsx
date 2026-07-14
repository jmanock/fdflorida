import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TripRealityGuidePage } from "@/components/TripRealityGuidePage";
import { tripRealityGuideMap, tripRealityGuides } from "@/data/tripRealityGuides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tripRealityGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = tripRealityGuideMap[slug];
  if (!guide) return {};
  const url = `https://flightdealsflorida.org/trip-reality/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: { title: guide.title, description: guide.description, url, siteName: "Flight Deals Florida", type: "article", images: [{ url: guide.heroImage, width: 1200, height: 630, alt: guide.heroAlt }] },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: [guide.heroImage] }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const guide = tripRealityGuideMap[slug];
  if (!guide) notFound();
  return <TripRealityGuidePage guide={guide} />;
}
