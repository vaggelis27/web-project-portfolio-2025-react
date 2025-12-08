import Carousel from "react-bootstrap/Carousel";
import "./HeroCarousel.css";
import heroImage1 from "../assets/background-images/6.jpg";
import heroImage2 from "../assets/background-images/7.jpg";
import heroImage3 from "../assets/background-images/2.jpg";

function HeroCarousel() {
  return (
    <section className="hero-carousel position-relative mt-4 pt-4">
      <div className="hero-overlay text-white text-center">
        <h1 className="display-5 fw-bold">Evangelos Ntotsikas</h1>
        <hr
          className="mx-auto my-2"
          style={{ width: "120px", borderTop: "3px solid #ffffffff" }}
        />
        <p className="lead mb-4">Frontend Developer</p>
      </div>

      <Carousel fade interval={4000}>
        <Carousel.Item>
          <img
            src={heroImage1}
            className="d-block w-100 hero-img"
            alt="Landscape 1"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src={heroImage2}
            className="d-block w-100 hero-img"
            alt="Landscape 2"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src={heroImage3}
            className="d-block w-100 hero-img"
            alt="Landscape 3"
          />
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default HeroCarousel;
