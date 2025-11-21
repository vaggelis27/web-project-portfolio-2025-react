import Navbar from "../layout/Navbar/index.js";
import Footer from "../layout/Footer/index.js";
import HeroCarousel from "../sections/HeroCarousel/index.js";
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
