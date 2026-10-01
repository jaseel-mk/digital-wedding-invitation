import { useEffect, useRef, useState } from "react";
import { WEDDING } from "@/weddingConfig";
import Reveal from "./Reveal";

export default function ClosingMoment() {
  const [petals, setPetals] = useState<
    { id: number; left: number; delay: number; duration: number; size: number }[]
  >([]);
  const sectionRef = useRef<HTMLElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animatingRef.current) {
            animatingRef.current = true;
            const count = 14;
            const newPetals = Array.from({ length: count }, (_, i) => ({
              id: Date.now() + i,
              left: Math.random() * 100,
              delay: Math.random() * 3,
              duration: 6 + Math.random() * 5,
              size: 8 + Math.random() * 10,
            }));
            setPetals(newPetals);
            setTimeout(() => {
              setPetals([]);
              animatingRef.current = false;
            }, 12000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section closing-section"
      id="closing"
      ref={sectionRef}
    >
      <div className="closing-petals" aria-hidden="true">
        {petals.map((p) => (
          <span
            key={p.id}
            className="closing-petal"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              fontSize: `${p.size}px`,
            }}
          >
            &#10047;
          </span>
        ))}
      </div>
      <div className="closing-inner">
        <Reveal>
          <span className="closing-script">{WEDDING.partner1} &amp; {WEDDING.partner2}</span>
        </Reveal>
        <Reveal>
          <div className="closing-divider">
            <span className="closing-divider-line" />
            <span className="closing-divider-ornament">&#10087;</span>
            <span className="closing-divider-line" />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="closing-heading">{WEDDING.closing.heading}</h2>
        </Reveal>
        <Reveal>
          <p className="closing-body">{WEDDING.closing.body}</p>
        </Reveal>
        <Reveal>
          <p className="closing-pledge">{WEDDING.closing.pledge}</p>
        </Reveal>
        <Reveal>
          <div className="closing-date">{WEDDING.dateDisplay}</div>
        </Reveal>
      </div>
    </section>
  );
}
