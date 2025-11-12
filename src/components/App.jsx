import React from "react";
import Navbar from "../components/Navbar.jsx";
import "../components/Navbar.css";
import Footer from "../components/Footer.jsx";
import "../components/Footer.css";
import "../index.css";
import HeroCarousel from "../components/HeroCarousel.jsx";
import "../components/HeroCarousel.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5 text-center">
        <h1>Welcome to VN Photography</h1>
        <HeroCarousel />
        <p>This is the React version of your portfolio.</p>
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </>
  );
}

export default App;
