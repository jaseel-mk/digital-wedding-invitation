import { useState, useRef } from "react";
import { WEDDING } from "@/weddingConfig";
import { supabase } from "@/lib/supabase";
import Reveal from "./Reveal";
import ConfirmationModal from "./ConfirmationModal";

type Attending = "accept" | "decline";

export default function Rsvp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<Attending>("accept");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submittedRef = useRef(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Please enter your full name.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittedRef.current) return;
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from("rsvp_responses").insert({
        full_name: fullName.trim(),
        email: email.trim() || null,
        attending,
        message: message.trim() || null,
      });

      if (error) throw error;

      submittedRef.current = true;
      setModalOpen(true);
    } catch {
      setSubmitError(
        "Something went wrong submitting your RSVP. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section rsvp-section" id="rsvp">
      <div className="rsvp-inner">
        <span
          className="section-label"
          style={{ textAlign: "center", display: "block" }}
        >
          Kindly Reply
        </span>
        <Reveal>
          <h2 className="section-heading" style={{ textAlign: "center" }}>
            {WEDDING.partner1} &amp; {WEDDING.partner2}
          </h2>
        </Reveal>
        <div className="section-rule centred" />
        <p className="rsvp-intro">
          Kindly let us know whether you will be joining us to celebrate this
          joyous occasion by {WEDDING.rsvpDeadline}. Your presence means the
          world to us.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="rsvp-name">
              Full Name
            </label>
            <input
              id="rsvp-name"
              className="form-input"
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            {errors.fullName && (
              <p className="form-error">{errors.fullName}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="rsvp-email">
              Email Address
            </label>
            <input
              id="rsvp-email"
              className="form-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Will you be joining us?</label>
            <div className="attendance-toggle">
              <button
                type="button"
                className={`att-btn ${attending === "accept" ? "selected" : ""}`}
                onClick={() => setAttending("accept")}
              >
                Joyfully Accept
              </button>
              <button
                type="button"
                className={`att-btn ${attending === "decline" ? "selected" : ""}`}
                onClick={() => setAttending("decline")}
              >
                Regretfully Decline
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="rsvp-message">
              A message for the couple (optional)
            </label>
            <textarea
              id="rsvp-message"
              className="form-input"
              rows={3}
              placeholder="Share your wishes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {submitError && (
            <p className="form-error" style={{ textAlign: "center", marginBottom: "12px" }}>
              {submitError}
            </p>
          )}

          <button
            type="submit"
            className="btn-submit"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send my RSVP"}
          </button>
        </form>
      </div>

      <ConfirmationModal
        open={modalOpen}
        attending={attending}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
