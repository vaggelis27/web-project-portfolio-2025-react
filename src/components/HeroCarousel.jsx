import { useEffect, useRef } from "react";
import "./HeroCarousel.css";
import heroImage1 from "../assets/imagesHero/Hero_Photos01.jpg";
import heroImage2 from "../assets/imagesHero/Hero_Photos02.jpg";
import heroImage3 from "../assets/imagesHero/Hero_Photos03.jpg";
import heroImage4 from "../assets/imagesHero/Hero_Photos04.png";
import heroImage5 from "../assets/imagesHero/Hero_Photos05.jpg";

// Local slide data (uses imported assets instead of remote URLs)
const slides = [
  {
    image: heroImage1,
    title: "Lakes ioannina",
    subtitle: "Embrace Tranquility",
    paragraph:
      "Discover the serene beauty of Ioannina's lakes, where tranquil waters meet stunning mountain views",
  },
  {
    image: heroImage2,
    title: "Lakes ioannina",
    subtitle: "Embrace Tranquility",
    paragraph:
      "Discover the serene beauty of Ioannina's lakes, where tranquil waters meet stunning mountain views",
  },
  {
    image: heroImage3,
    title: "Lakes ioannina",
    subtitle: "Embrace Tranquility",
    paragraph:
      "Discover the serene beauty of Ioannina's lakes, where tranquil waters meet stunning mountain views",
  },

  {
    image: heroImage4,
    title: "Lakes ioannina",
    subtitle: "Embrace Tranquility",
    paragraph:
      "Discover the serene beauty of Ioannina's lakes, where tranquil waters meet stunning mountain views",
  },
  {
    image: heroImage5,
    title: "Lakes ioannina",
    subtitle: "Embrace Tranquility",
    paragraph:
      "Discover the serene beauty of Ioannina's lakes, where tranquil waters meet stunning mountain views",
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
                }, 3000),
              );
            }, 2100),
          );
        }, 100),
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
