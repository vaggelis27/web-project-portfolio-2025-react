import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import portfolioImage1 from "../assets/background-images/4.jpg";
import portfolioImage2 from "../assets/background-images/9.jpg";
import portfolioImage3 from "../assets/background-images/8.png";

import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-5 my-5 text-dark">
      <div className="Portfolio">
        <Container className="py-5 text-center">
          <h1 className="fw-bold mb-4">Portfolio</h1>
          <Row className="g-4">
            <Col md={4}>
              <img
                src={portfolioImage1}
                className="Portfolio-img"
                alt="Nature"
              />
              <Link to="/naturePage" className="btn btn-primary mt-3">
                Nature
              </Link>
            </Col>

            <Col md={4}>
              <img src={portfolioImage2} className="Portfolio-img" />
              <Link to="/" className="btn btn-primary mt-3">
                portrait
              </Link>
            </Col>

            <Col md={4}>
              <img src={portfolioImage3} className="Portfolio-img" />
              <button className="btn btn-primary mt-3">Night</button>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
