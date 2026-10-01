import { WEDDING } from "@/weddingConfig";
import Reveal from "./Reveal";

export default function Story() {
  return (
    <section className="section story-section" id="story">
      <div className="story-inner">
        <span className="story-ornament">&#10087;</span>
        <Reveal>
          <h2 className="story-title">{WEDDING.storyTitle}</h2>
        </Reveal>
        <Reveal>
          <div className="story-subtitle">{WEDDING.storySubtitle}</div>
        </Reveal>
        <div className="story-rule" />
        <div className="story-body">
          {WEDDING.storyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <Reveal>
          <blockquote className="story-pull">
            &ldquo;{WEDDING.storyPullQuote}&rdquo;
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
