import heroMilkyWay from "../assets/hero-videos/MilkyWay.mp4";
import "./HeroMilkyWay.css";

function HeroMilkyWay() {
  return (
    <section className="hero-milkyway">
      <div className="hero-milkyway__video">
        <video
          className="hero-milkyway__video-el"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata" // Added preload attribute to load metadata of video before playing
        >
          <source src={heroMilkyWay} type="video/mp4" />
        </video>
      </div>
      <div className="hero-milkyway__content">
        <h1 className="hero-milkyway__title">Full Hero Video</h1>
        <h3 className="hero-milkyway__subtitle">Milky Way Reel</h3>
      </div>
    </section>
  );
}

export default HeroMilkyWay;
