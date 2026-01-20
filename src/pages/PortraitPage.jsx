import { useState, useMemo } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import HeroPortrait from "./HeroPortrait";
import usePhotos from "../hooks/usePhotos";

import "./PortraitPage.css";

function Portrait() {
  /* STATE MANAGEMENT */
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { processedPhotos, loading, error } = usePhotos("Portrait");

  /* MEMOIZE SLIDES FOR PERFORMANCE */
  const slides = useMemo(
    () =>
      processedPhotos.map((img) => ({
        src: img.url,
        title: img.alt,
      })),
    [processedPhotos],
  );

  return (
    <div className="portrait-page">
      <HeroPortrait />
      <Container className="portrait-gallery-container py-5">
        <h1 className="text-center mb-4 portrait-gallery-title">
          Portrait Photography
        </h1>

        {/* LOADING & ERROR STATES */}
        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}

        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && !error && (
          <Row className="g-1">
            {processedPhotos.map((img, index) => (
              <Col key={img.id || index} xs={12} sm={6} md={4} lg={2}>
                <div
                  className="portrait-card"
                  onClick={() => {
                    setPhotoIndex(index);
                    setIsOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fluid
                    className="portrait-image"
                    loading="lazy"
                  />
                  <div className="portrait-card-title">{img.alt}</div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        <Lightbox
          open={isOpen}
          index={photoIndex}
          close={() => setIsOpen(false)}
          slides={slides}
        />
      </Container>
    </div>
  );
}

export default Portrait;
