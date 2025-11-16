import Carousel from "react-bootstrap/Carousel";
import "../components/HeroCarousel.css";

function HeroCarousel() {
  return (
    <section className="hero-carousel position-relative">

      {/* Overlay text πάνω από τις εικόνες */}
      <div className="hero-overlay text-white text-center">
        <h1 className="display-5 fw-bold">Centered hero</h1>
        <p className="lead mb-4">
          Quickly design and customize responsive mobile-first sites with Bootstrap...
        </p>
      </div>

      {/* Full-width Carousel */}
      <Carousel fade interval={4000}>
        <Carousel.Item>
          <img
            src="/src/assets/background-images/1.jpg"
            className="d-block w-100 hero-img"
            alt="1"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/2.jpg"
            className="d-block w-100 hero-img"
            alt="2"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/3.jpg"
            className="d-block w-100 hero-img"
            alt="3"
          />
        </Carousel.Item>
      </Carousel>

    </section>
  );
}

export default HeroCarousel;
