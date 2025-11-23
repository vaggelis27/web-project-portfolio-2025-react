import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Portfolio from "./components/Portfolio.jsx";

function App() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
