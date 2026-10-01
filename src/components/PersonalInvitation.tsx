import { WEDDING } from "@/weddingConfig";
import Reveal from "./Reveal";

export default function PersonalInvitation() {
  const { personalInvitation } = WEDDING;

  return (
    <section className="section invitation-section" id="invitation">
      <div className="invitation-inner">
        <Reveal>
          <span className="section-label" style={{ textAlign: "center", display: "block" }}>
            {personalInvitation.label}
          </span>
        </Reveal>
        <Reveal>
          <h2 className="invitation-heading">{personalInvitation.heading}</h2>
        </Reveal>
        <div className="invitation-divider">
          <span className="invitation-divider-line" />
          <span className="invitation-divider-ornament">&#10087;</span>
          <span className="invitation-divider-line" />
        </div>
        <div className="invitation-body">
          {personalInvitation.body.map((p, i) => (
            <Reveal key={i}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="invitation-signoff">
            <p className="invitation-signoff-text">{personalInvitation.signoff}</p>
            <p className="invitation-signature">{personalInvitation.signature}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
