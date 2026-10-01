import { WEDDING } from "@/weddingConfig";

const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "The Couple", href: "#couple" },
  { label: "Timeline", href: "#timeline" },
  { label: "Venue", href: "#venue" },
  { label: "Guest Info", href: "#info" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Footer() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer">
      <span className="footer-script">
        {WEDDING.partner1} &amp; {WEDDING.partner2}
      </span>
      <div className="footer-date">{WEDDING.dateDisplay}</div>
      <ul className="footer-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="footer-copy">{WEDDING.footerCredit}</div>
    </footer>
  );
}
