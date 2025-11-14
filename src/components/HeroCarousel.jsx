import Carousel from "react-bootstrap/Carousel";
import "../components/HeroCarousel.css";

function HeroCarousel() {
  return (
    <section className="hero-carousel position-relative ">
      <Carousel fade interval={4000}>
        <Carousel.Item>
          <img
            src="/src/assets/background-images/Ανθή.png"
            className="d-block w-100 hero-img"
            style={{
              height: "80vh",
              objectFit: "cover",
              objectPosition: "30% 20%",
            }}
            alt="Ανθή"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/IMG_8241.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 40%",
            }}
            alt="IMG_8241"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/IMG_6982.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 20%",
            }}
            alt="IMG_6982"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/galaxy.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 40%",
            }}
            alt="galaxy"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/20200827200434_IMG_1054.JPG"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 20%",
            }}
            alt="20200827200434_IMG_1054"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/_MG_4451.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 20%",
            }}
            alt="_MG_4451"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="/src/assets/background-images/IMG_6804.jpg"
            className="d-block w-100 hero-img"
            style={{
              height: "100vh",
              objectFit: "cover",
              objectPosition: "50% 20%",
            }}
            alt="IMG_6804"
          />
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default HeroCarousel;
