import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import portfolioImage1 from "../assets/background-images/4.jpg";
import portfolioImage2 from "../assets/background-images/IMG_6982.jpg";
import portfolioImage3 from "../assets/background-images/IMG_8241.jpg";

import "./Portfolio.css";

export default function Gallery() {
  return (
    <Container className="py-5 text-center">
      <Row className="g-4">

        <Col md={4}>
          <img src={portfolioImage1} className="gallery-img" />
          <button className="btn btn-primary mt-3">Nature</button>
        </Col>

        <Col md={4}>
          <img src={portfolioImage2} className="gallery-img" />
          <button className="btn btn-primary mt-3">Portrait</button>
        </Col>

        <Col md={4}>
          <img src={portfolioImage3} className="gallery-img" />
          <button className="btn btn-primary mt-3">Night</button>
        </Col>

      </Row>
    </Container>
  );
}
