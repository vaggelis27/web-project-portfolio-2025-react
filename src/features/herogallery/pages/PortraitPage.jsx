import { useState, useMemo } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { HeroPortrait } from "@/features/herogallery/components/HeroPortrait.jsx";
import { usePhotos } from "@/hooks/usePhotos.js";

import "./PortraitPage.css";

const FALLBACK_IMAGE =
  "https://placehold.co/600x600/eeeeee/999999?text=Image+Not+Found";

export function PortraitPage() {
  /* STATE MANAGEMENT */
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { processedPhotos, loading, error } = usePhotos("portrait");

  /* MEMOIZE SLIDES FOR PERFORMANCE */
  const slides = useMemo(
    () =>
      processedPhotos.map((img) => ({
        src: img.url || FALLBACK_IMAGE,
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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMAGE;
                    }}
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
