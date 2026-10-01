import { useState } from "react";
import { WEDDING } from "@/weddingConfig";
import Reveal from "./Reveal";
import { ChevronDown } from "lucide-react";

export default function GuestInfo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = WEDDING.guestInfo;

  return (
    <section className="section guest-info-section" id="info">
      <div className="guest-info-inner">
        <span
          className="section-label"
          style={{ textAlign: "center", display: "block", marginBottom: "14px" }}
        >
          Guest Information
        </span>
        <Reveal>
          <h2 className="section-heading" style={{ textAlign: "center" }}>
            Before You Arrive
          </h2>
        </Reveal>
        <div className="section-rule centred" />

        <div className="guest-info-list">
          {items.map((item, i) => (
            <div className="guest-info-item" key={i}>
              <button
                className="guest-info-trigger"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`gi-panel-${i}`}
              >
                <span className="guest-info-title">{item.title}</span>
                <ChevronDown
                  className={`guest-info-chevron ${openIndex === i ? "rotated" : ""}`}
                  size={16}
                  strokeWidth={1.5}
                />
              </button>
              <div
                id={`gi-panel-${i}`}
                className="guest-info-panel"
                style={{
                  maxHeight: openIndex === i ? "300px" : "0px",
                }}
              >
                <p className="guest-info-body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
