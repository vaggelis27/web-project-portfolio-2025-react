import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BasicExample() {
  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col md={4}>
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src="../assets/background-images/1.jpg" />
            <Card.Body>
              <Card.Title>Nature</Card.Title>
              <Button variant="primary">N</Button>
            </Card.Body>
          </Card>
        </Col>A

        <Col md={4}>
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
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
