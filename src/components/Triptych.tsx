import { useEffect, useState } from "react";
import { WEDDING } from "@/weddingConfig";

function Panel({
  images,
  index,
  isCentre,
  children,
}: {
  images: readonly string[];
  index: number;
  isCentre?: boolean;
  children?: React.ReactNode;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4500);

    const startDelay = setTimeout(() => {}, index * 1800);
    return () => {
      clearInterval(interval);
      clearTimeout(startDelay);
    };
  }, [images.length, index]);

  return (
    <div className={`panel ${isCentre ? "panel-centre" : ""}`}>
      {images.map((url, i) => (
        <div
          key={i}
          className={`panel-slide ${i === current ? "active" : ""}`}
          style={{ backgroundImage: `url('${url}')` }}
        />
      ))}
      {children}
    </div>
  );
}

export default function Triptych() {

  return (
    <section className="triptych" id="hero">
      <Panel images={WEDDING.panels[0]} index={0} />
      <Panel images={WEDDING.panels[1]} index={1} isCentre>
        <div className="hero-overlay">
          <span className="hero-label">You Are Invited</span>
          <div className="hero-names">
            <span>{WEDDING.partner1}</span>
            <span className="hero-ampersand">&amp;</span>
            <span>{WEDDING.partner2}</span>
          </div>
          <div className="hero-date">{WEDDING.dateDisplay}</div>
          <div className="hero-rule" />
        </div>
      </Panel>
      <Panel images={WEDDING.panels[2]} index={2} />
    </section>
  );
}
