import { WEDDING } from "@/weddingConfig";
import Reveal from "./Reveal";

export default function MeetTheCouple() {
  const couple = WEDDING.couple;

  return (
    <section className="section couple-section" id="couple">
      <div className="section-inner">
        <span
          className="section-label"
          style={{ textAlign: "center", display: "block", marginBottom: "14px" }}
        >
          Meet the Couple
        </span>
        <Reveal>
          <h2 className="section-heading" style={{ textAlign: "center" }}>
            Two People, One Story
          </h2>
        </Reveal>
        <div className="section-rule centred" />

        <div className="couple-grid">
          {couple.map((person, i) => (
            <Reveal key={i}>
              <div className="couple-card">
                <div className="couple-portrait-wrap">
                  <img
                    src={person.portrait}
                    alt={person.name}
                    className="couple-portrait"
                    loading="lazy"
                  />
                </div>
                <div className="couple-info">
                  <span className="couple-role">{person.role}</span>
                  <h3 className="couple-name">{person.name}</h3>
                  <p className="couple-bio">{person.bio}</p>
                  <div className="couple-traits">
                    {person.traits.map((trait, j) => (
                      <span key={j} className="couple-trait">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="couple-ampersand">&amp;</div>
        </Reveal>
      </div>
    </section>
  );
}
