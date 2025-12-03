import React from "react";
import HeroCarousel from "../components/HeroCarousel.jsx";
import Portfolio from "../components/Portfolio.jsx";
import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";

function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Portfolio />
      <About />
      <Contact />
    </>
  );
}

export default HomePage;
