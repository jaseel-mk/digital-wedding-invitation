import { useEffect, useRef, useState, useCallback } from "react";
import { WEDDING } from "@/weddingConfig";

interface IntroLayerProps {
  onReveal: () => void;
}

export default function IntroLayer({ onReveal }: IntroLayerProps) {
  const [ambientOpacity, setAmbientOpacity] = useState(1);
  const [openingOpacity, setOpeningOpacity] = useState(0);
  const [veilOpacity, setVeilOpacity] = useState(1);
  const [namesOpacity, setNamesOpacity] = useState(1);
  const [btnOpacity, setBtnOpacity] = useState(1);
  const [btnPointerEvents, setBtnPointerEvents] = useState<"auto" | "none">(

    "auto"
  );
  const [layerOpacity, setLayerOpacity] = useState(1);
  const [layerDisplay, setLayerDisplay] = useState<"flex" | "none">("flex");

  const ambientRef = useRef<HTMLVideoElement>(null);
  const openingRef = useRef<HTMLVideoElement>(null);
  const introStartedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const fadeTime = WEDDING.videoFadeTime;
  const revealDelay = fadeTime * 1000 + 300;

  const handleSkip = useCallback(() => {
    if (introStartedRef.current) return;
    introStartedRef.current = true;

    setVeilOpacity(0);
    setNamesOpacity(0);
    setBtnOpacity(0);
    setBtnPointerEvents("none");

    const t1 = setTimeout(() => {
      setAmbientOpacity(0);
      setOpeningOpacity(1);
      openingRef.current?.play().catch(() => {});
    }, 300);

    const t2 = setTimeout(() => {
      onReveal();
      setLayerOpacity(0);
    }, revealDelay);

    const t3 = setTimeout(() => {
      setLayerDisplay("none");
    }, revealDelay + 1300);

    timersRef.current = [t1, t2, t3];
  }, [onReveal, revealDelay]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleError = useCallback(() => {
    setTimeout(() => {
      setLayerDisplay("none");
      onReveal();
    }, 3000);
  }, [onReveal]);

  return (
    <div
      id="intro-layer"
      style={{
        opacity: layerOpacity,
        display: layerDisplay,
        transition: layerOpacity === 0 ? "opacity 1.2s ease" : undefined,
      }}
    >
      <video
        id="ambient-video"
        ref={ambientRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={WEDDING.ambientVideo}
        onError={handleError}
        style={{ opacity: ambientOpacity }}
      />
      <video
        id="opening-video"
        ref={openingRef}
        muted
        playsInline
        preload="auto"
        src={WEDDING.openingVideo}
        style={{ opacity: openingOpacity }}
      />
      <div
        className="ambient-veil"
        style={{ opacity: veilOpacity }}
      />
      <div className="ambient-names" style={{ opacity: namesOpacity }}>
        <div className="script-name">
          {WEDDING.partner1} &amp; {WEDDING.partner2}
        </div>
        <div className="date-label">{WEDDING.dateDisplay}</div>
      </div>
      <button
        className="view-btn"
        onClick={handleSkip}
        style={{ opacity: btnOpacity, pointerEvents: btnPointerEvents }}
      >
        View your invite
      </button>
    </div>
  );
}
