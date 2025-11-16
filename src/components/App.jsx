import Navbar from "../components/Navbar.jsx";
import "../components/Navbar.css";
import Footer from "../components/Footer.jsx";
import "../components/Footer.css";
import "../main.jsx";
import "../index.css";
import HeroCarousel from "../components/HeroCarousel.jsx";
import "../components/HeroCarousel.css";
import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";
import Gallery from "../components/Gallery.jsx";
function App() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
