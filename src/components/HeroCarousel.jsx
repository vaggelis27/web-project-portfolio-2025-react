import { useEffect, useRef } from "react";
import "./HeroCarousel.css";
import heroImage1 from "../assets/background-images/6.jpg";
import heroImage2 from "../assets/background-images/7.jpg";
import heroImage3 from "../assets/background-images/10.jpg";

// Local slide data (uses imported assets instead of remote URLs)
const slides = [
  {
    image: heroImage1,
    title: "Explora el Mundo",
    subtitle: "Descubre lugares increíbles",
    paragraph:
      "Vive experiencias únicas en los destinos más espectaculares del planeta",
  },
  {
    image: heroImage2,
    title: "Naturaleza Salvaje",
    subtitle: "Conecta con lo esencial",
    paragraph:
      "Sumérgete en la belleza de paisajes vírgenes y bosques milenarios",
  },
  {
    image: heroImage3,
    title: "Paraíso Tropical",
    subtitle: "Tu escape perfecto",
    paragraph: "Relájate en las playas más hermosas bajo el sol del Caribe",
  },
];

function HeroCarousel() {
  // Keep current slide index stable between renders
  const currentSlideRef = useRef(0);

  useEffect(() => {
    // Query DOM only after mount to avoid SSR/React warnings
    const slices = document.querySelectorAll(".slice");
    const contentOverlay = document.getElementById("content");
    const titleEl = document.getElementById("title");
    const subtitleEl = document.getElementById("subtitle");
    const paragraphEl = document.getElementById("paragraph");

    // Bail out if required nodes are missing
    if (
      !slices.length ||
      !contentOverlay ||
      !titleEl ||
      !subtitleEl ||
      !paragraphEl
    ) {
      return;
    }

    const timers = [];

    // Adjust slice background size depending on viewport
    const updateBackgroundSize = () => {
      const isMobile = window.innerWidth <= 768;
      const visibleCount = isMobile ? 3 : 5;
      const size = `${visibleCount * 100}% 100%`;
      slices.forEach((slice) => {
        slice.style.backgroundSize = size;
      });
    };

    const showSlide = (index) => {
      const slide = slides[index];

      // Update every slice with the new image and reset animation state
      slices.forEach((slice) => {
        slice.style.backgroundImage = `url('${slide.image}')`;
        slice.classList.remove("active");
      });

      // Hide overlay while slices animate in
      contentOverlay.classList.remove("show");

      // Delay before triggering slice drop animation
      timers.push(
        setTimeout(() => {
          slices.forEach((slice, sliceIndex) => {
            // Skip animating last slices on mobile for performance
            if (window.innerWidth <= 768 && sliceIndex >= 3) {
              return;
            }
            slice.classList.add("active");
          });

          // After animation, update text content and show overlay
          timers.push(
            setTimeout(() => {
              titleEl.textContent = slide.title;
              subtitleEl.textContent = slide.subtitle;
              paragraphEl.textContent = slide.paragraph;
              contentOverlay.classList.add("show");

              // Schedule next slide
              timers.push(
                setTimeout(() => {
                  currentSlideRef.current =
                    (currentSlideRef.current + 1) % slides.length;
                  showSlide(currentSlideRef.current);
                }, 3000)
              );
            }, 2100)
          );
        }, 100)
      );
    };

    updateBackgroundSize();
    showSlide(currentSlideRef.current);
    window.addEventListener("resize", updateBackgroundSize);

    // Clean up timers and listeners to avoid leaks
    return () => {
      window.removeEventListener("resize", updateBackgroundSize);
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div className="slider-container" id="slider">
      <div className="slice"></div>
      <div className="slice"></div>
      <div className="slice"></div>
      <div className="slice"></div>
      <div className="slice"></div>

      <div className="content-overlay" id="content">
        <h1 id="title"></h1>
        <h2 id="subtitle"></h2>
        <p id="paragraph"></p>
      </div>
    </div>
  );
}

export default HeroCarousel;
