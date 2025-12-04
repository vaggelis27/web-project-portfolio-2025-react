import React from "react";
import HeroCarousel from "../components/HeroCarousel.jsx";
import Portfolio from "../components/Portfolio.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../ContactPage.jsx";

function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Portfolio />
      <AboutPage />
      <ContactPage />
    </>
  );
}

export default HomePage;
