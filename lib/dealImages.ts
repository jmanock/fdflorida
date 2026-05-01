import type { FlightDeal } from "@/data/deals";

function image(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
}

const destinationImages: Record<string, string> = {
  Atlanta: image("photo-1663601460253-aba72eea6edf"),
  Bogota: image("photo-1706417391330-f35673bb0b27"),
  Boston: image("photo-1565127803082-69dd82351360"),
  Cancun: image("photo-1602088113235-229c19758e9f"),
  Chicago: image("photo-1575380591643-b2c92368dc6d"),
  Cleveland: image("photo-1547916721-7469af15e2a3"),
  Dallas: image("photo-1625950019503-cae6a7825762"),
  Denver: image("photo-1599140643827-04e62670b3e4"),
  "Las Vegas": image("photo-1581351721010-8cf859cb14a4"),
  Lima: image("photo-1577587230708-187fdbef4d91"),
  London: image("photo-1513635269975-59663e0ac1ad"),
  "Los Angeles": image("photo-1619678562883-7f77b7c68d3c"),
  Madrid: image("photo-1673322662884-bedf540f54c9"),
  Miami: image("photo-1572996045200-9ed403fb5396"),
  Nashville: image("photo-1556033681-83abea291a96"),
  "New Orleans": image("photo-1568693059993-a239b9cd4957"),
  "New York": image("photo-1496588152823-86ff7695e68f"),
  Orlando: image("photo-1597466599360-3b9775841aec"),
  Paris: image("photo-1549144511-f099e773c147"),
  Philadelphia: image("photo-1569761316261-9a8696fa2ca3"),
  "San Diego": image("photo-1505245208761-ba872912fac0"),
  "San Francisco": image("photo-1677722713120-fc79e3516343"),
  "San Juan": image("photo-1579687196544-08ae57ab5c11"),
  Seattle: image("photo-1540745291638-2c71059043e5"),
  Tampa: image("photo-1605130284535-11dd9eedc58a"),
  "Fort Lauderdale": image("photo-1602011528362-d6fd7324d194"),
  Jacksonville: image("photo-1571771019784-3ff35f4f4277"),
  "Washington, DC": image("photo-1617581629397-a72507c3de9e")
};

export function getTrustedDealImage(deal: FlightDeal) {
  return destinationImages[deal.to] ?? deal.image;
}
