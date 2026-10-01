import { WEDDING } from "@/weddingConfig";
import Reveal from "./Reveal";

export default function Venue() {
  const addressLines = WEDDING.venueAddress.split("\n");

  return (
    <section className="section venue-section" id="venue">
      <div className="section-inner">
        <div className="venue-grid">
          <Reveal>
            <div className="venue-image-wrap">
              <img src={WEDDING.venueImage} alt={WEDDING.venueName} />
            </div>
          </Reveal>
          <div>
            <span className="section-label">The Venue</span>
            <Reveal>
              <div className="venue-name">{WEDDING.venueName}</div>
            </Reveal>
            <div className="section-rule" />
            <Reveal>
              <div className="venue-address">
                {addressLines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="venue-note">{WEDDING.venueNote}</div>
            </Reveal>
            <a
              href={WEDDING.venueMapUrl}
              className="btn-map"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
