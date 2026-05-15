import "./HeroPortrait.css";
import heroPortrait from "@/assets/hero-videos/heroPortrait.mp4";

export function HeroPortrait() {
  return (
    <section className="hero-portrait">
      <div className="hero-portrait__video">
        <video
          className="hero-portrait__video-el"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroPortrait} type="video/mp4" />
        </video>
      </div>
      <div className="hero-portrait__content">
        <h1 className="hero-portrait__title">Full Hero Video</h1>
        <h3 className="hero-portrait__subtitle">Portrait Reel</h3>
      </div>
    </section>
  );
}
