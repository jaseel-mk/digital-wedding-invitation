import { WEDDING } from "@/weddingConfig";

export default function Gallery() {
  const images = [...WEDDING.gallery, ...WEDDING.gallery];

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-track">
        {images.map((url, i) => (
          <div className="gallery-item" key={i}>
            <img src={url} alt="Wedding gallery" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
