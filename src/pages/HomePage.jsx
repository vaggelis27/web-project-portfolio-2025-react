import HeroCarousel from "../components/HeroCarousel.jsx";
import IntroContent from "../components/IntroContent.jsx";
import Portfolio from "../components/Portfolio.jsx";
import CallToAction from "../components/CallToAction.jsx";
import Contact from "../components/Contact.jsx";
import "../pages/GlobalLightbox.css";
// NOTE: Global lightbox styles are imported here once.
// They apply globally to all pages (yet-another-react-lightbox / yarl__*).

function HomePage() {
  return (
    <>
      <HeroCarousel />
      <IntroContent />
      <Portfolio />
      <CallToAction />
      <Contact />
    </>
  );
}

export default HomePage;
