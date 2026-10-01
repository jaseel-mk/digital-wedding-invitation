import { useEffect, useState } from "react";
import { WEDDING } from "@/weddingConfig";
import Reveal from "./Reveal";

function getTimeRemaining(target: number) {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown() {
  const target = new Date(WEDDING.dateISO).getTime();
  const [time, setTime] = useState(getTimeRemaining(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const items = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <section className="section countdown-section" id="countdown">
      <div className="section-inner">
        <span
          className="section-label"
          style={{ textAlign: "center", display: "block", marginBottom: "14px" }}
        >
          Counting Down
        </span>
        <Reveal>
          <h2
            className="section-heading"
            style={{ textAlign: "center" }}
          >
            Until {WEDDING.partner1} &amp; {WEDDING.partner2}
          </h2>
        </Reveal>
        <div className="section-rule centred" />
        <div className="countdown-grid">
          {items.map((item) => (
            <div className="countdown-item" key={item.label}>
              <span className="countdown-num">{item.value}</span>
              <span className="countdown-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
