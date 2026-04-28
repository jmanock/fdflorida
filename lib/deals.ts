import { DealCategory, deals } from "@/data/deals";

export function getFilteredDeals(activeFilter: DealCategory) {
  if (activeFilter === "All Deals") {
    return deals;
  }

  return deals.filter((deal) => deal.category.includes(activeFilter));
}

export function getDealCount(activeFilter: DealCategory) {
  return getFilteredDeals(activeFilter).length;
}

export function getFeaturedStats() {
  const under99 = deals.filter((deal) => deal.price < 99).length;
  const international = deals.filter((deal) => deal.category.includes("International")).length;
  const lowest = Math.min(...deals.map((deal) => deal.price));

  return [
    { label: "Live sample deals", value: deals.length.toString() },
    { label: "Under $99", value: under99.toString() },
    { label: "International finds", value: international.toString() },
    { label: "Lowest fare", value: `$${lowest}` }
  ];
}
