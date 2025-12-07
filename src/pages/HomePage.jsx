import React from "react";
import HeroCarousel from "../components/HeroCarousel.jsx";
import Portfolio from "../components/Portfolio.jsx";
import ContactPage from "../components/Contact.jsx";

function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Portfolio />
      <ContactPage />
    </>
  );
}

export default HomePage;
