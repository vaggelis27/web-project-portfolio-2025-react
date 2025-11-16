import Carousel from "react-bootstrap/Carousel";
import "../components/HeroCarousel.css";

function HeroCarousel() {
  return (
    <section className="hero-carousel position-relative ">
      <Carousel fade interval={4000}>
        <Carousel.Item>
          <img
            src="/src/assets/background-images/1.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "80vh",
              objectFit: "cover",
              objectPosition: "30% 20%",
            }}
            alt="1"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/2.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 40%",
            }}
            alt="2"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/3.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 20%",
            }}
            alt="3"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/4.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 40%",
            }}
            alt="4"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/5.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 20%",
            }}
            alt="5"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/6.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 60%",
            }}
            alt="6"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/7.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 20%",
            }}
            alt="7"
          />
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default HeroCarousel;
