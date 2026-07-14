const links = [
  { label: "Florida Deals Hub", href: "https://floridadealshub.com" },
  { label: "Flights", href: "https://flightdealsflorida.org", active: true },
  { label: "Hotels", href: "https://hoteldealsflorida.org" },
  { label: "Cruises", href: "https://cruisedealsflorida.org" },
  { label: "Things to Do", href: "https://localdealsflorida.org" },
  { label: "Florida Right Now", href: "https://floridadealshub.com/florida-right-now" },
];

export function NetworkNavigation() {
  return (
    <div className="fdn-network-navigation">
      <div className="fdn-network-navigation__inner">
        <a className="fdn-network-navigation__brand" href="https://floridadealshub.com" aria-label="Florida Deals Network home">
          Florida Deals Network
        </a>
        <nav className="fdn-network-navigation__desktop" aria-label="Florida Deals Network">
          {links.map((link) => (
            <a key={link.label} href={link.href} aria-current={link.active ? "page" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <details className="fdn-network-navigation__mobile">
          <summary>Network menu</summary>
          <nav aria-label="Florida Deals Network mobile navigation">
            {links.map((link) => (
              <a key={link.label} href={link.href} aria-current={link.active ? "page" : undefined}>
                {link.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </div>
  );
}
