import { useEffect, useRef } from "react";
import { WEDDING } from "@/weddingConfig";

interface ConfirmationModalProps {
  open: boolean;
  attending: "accept" | "decline";
  onClose: () => void;
}

export default function ConfirmationModal({
  open,
  attending,
  onClose,
}: ConfirmationModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const heading =
    attending === "accept"
      ? WEDDING.modalAcceptHeading
      : WEDDING.modalDeclineHeading;
  const body =
    attending === "accept" ? WEDDING.modalAcceptBody : WEDDING.modalDeclineBody;

  return (
    <div
      className={`modal-overlay ${open ? "open" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-script">{WEDDING.modalName}</div>
        <h3 className="modal-heading">{heading}</h3>
        <p className="modal-body">{body}</p>
        <button
          className="modal-close"
          onClick={onClose}
          ref={closeBtnRef}
        >
          Close
        </button>
      </div>
    </div>
  );
}
