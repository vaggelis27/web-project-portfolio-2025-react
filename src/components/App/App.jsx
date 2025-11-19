import Navbar from "../layout/Navbar/index.js";
import "../layout/Navbar/Navbar.css";
import Footer from "../layout/Footer/index.js";
import "../layout/Footer/Footer.css";
import "../../main.jsx";
import "../../index.css";
import HeroCarousel from "../sections/HeroCarousel/index.js";
import "../sections/HeroCarousel/HeroCarousel.css";
import About from "../sections/About/index.js";
import Contact from "../sections/Contact/index.js";
import Portfolio from "../sections/Portfolio/index.js";

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
