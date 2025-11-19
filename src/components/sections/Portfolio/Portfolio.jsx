import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import portfolioImage1 from "../../../assets/background-images/IMG_6804.jpg";
import portfolioImage2 from "../../../assets/background-images/IMG_6982.jpg";
import portfolioImage3 from "../../../assets/background-images/IMG_8241.jpg";

function BasicExample() {
  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col md={4}>
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src={portfolioImage1} />
            <Card.Body>
              <Card.Title>Nature</Card.Title>
              <Button variant="primary">N</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src={portfolioImage2} />
            <Card.Body>
              <Card.Title>Portrait</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src={portfolioImage3} />
            <Card.Body>
              <Card.Title>Night</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BasicExample;
