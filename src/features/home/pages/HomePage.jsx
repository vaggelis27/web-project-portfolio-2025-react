import HeroCarousel from "@/features/home/components/HeroCarousel.jsx";
import IntroContent from "@/features/home/components/IntroContent.jsx";
import Portfolio from "@/features/home/components/Portfolio.jsx";
import CallToAction from "@/features/home/components/CallToAction.jsx";
import Contact from "@/features/home/components/Contact.jsx";
import "@/features/herogallery/pages/GlobalLightbox.css";
// NOTE: Global lightbox styles are imported here once.
// They apply globally to all pages (yet-another-react-lightbox / yarl__*).

export function HomePage() {
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
