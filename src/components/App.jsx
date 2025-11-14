import React from "react";
import Navbar from "../components/Navbar.jsx";
import "../components/Navbar.css";
import Footer from "../components/Footer.jsx";
import "../components/Footer.css";
import "../index.css";
import HeroCarousel from "../components/HeroCarousel.jsx";
import "../components/HeroCarousel.css";
import About from "../components/About.jsx";

function App() {
  return (
    <>
      <Navbar />
      <HeroCarousel />

      <About />

      <Footer />
    </>
  );
}

export default App;
