import React from "react";
import "./HeroNature.css";
import heroNature from "../assets/hero-videos/heroNature.mp4";

function HeroNature() {
  return (
    <section className="hero-nature">
      <div className="hero-nature__video">
        <video
          className="hero-nature__video-el"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroNature} type="video/mp4" />
        </video>
      </div>
      <div className="hero-nature__content">
        <h1 className="hero-nature__title">Full Hero Video</h1>
        <h3 className="hero-nature__subtitle">Nature Reel</h3>
      </div>
    </section>
  );
}
export default HeroNature;
