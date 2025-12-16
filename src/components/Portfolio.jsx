import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import portfolioImage1 from "../assets/background-images/4.jpg";
import portfolioImage2 from "../assets/background-images/6.jpg";
import portfolioImage3 from "../assets/background-images/7.jpg";

import "./Portfolio.css";

// data table
const portfolioItems = [
  {
    id: 1,
    title: "Nature",
    image: portfolioImage1,
    to: "/nature",
  },
  {
    id: 2,
    title: "Portraiture",
    image: portfolioImage2,
    to: "/portrait",
  },
  {
    id: 3,
    title: "Nightscapes",
    image: portfolioImage3,
    to: "/night",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-4 text-dark">
      <div className="background-logo">
        <div className="Portfolio">
          <Container className=" text-center">
            <h1 className="fw-bold mb-4">Portfolio</h1>
            <Row className="g-4">
              {portfolioItems.map((item) => (
                <Col md={4} key={item.id}>
                  {/* link cards */}
                  <Link to={item.to} className="Portfolio-card-link">
                    <div className="Portfolio-card">
                      {/* img full frame */}
                      <img
                        src={item.image}
                        className="Portfolio-img"
                        alt={item.title}
                      />
                      {/* Το Overlay up images*/}
                      <div className="Portfolio-overlay">
                        <h3 className="Overlay-title">{item.title}</h3>
                        <span className="Overlay-tag">View Project &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
}
