import { WEDDING } from "@/weddingConfig";
import Reveal from "./Reveal";

export default function WeddingTimeline() {
  const items = WEDDING.timeline;

  return (
    <section className="section timeline-section" id="timeline">
      <div className="section-inner">
        <span
          className="section-label"
          style={{ textAlign: "center", display: "block", marginBottom: "14px" }}
        >
          The Day Ahead
        </span>
        <Reveal>
          <h2 className="section-heading" style={{ textAlign: "center" }}>
            A Celebration in Five Moments
          </h2>
        </Reveal>
        <div className="section-rule centred" />

        <div className="timeline-track">
          {items.map((item, i) => (
            <Reveal key={i}>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-dot" />
                  {i < items.length - 1 && <span className="timeline-line" />}
                </div>
                <div className="timeline-content">
                  <span className="timeline-time">{item.time}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
