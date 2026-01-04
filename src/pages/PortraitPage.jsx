import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Portrait01 from "../assets/Portrait/Portrait_Photos01.jpg";
import Portrait02 from "../assets/Portrait/Portrait_Photos02.jpg";
import Portrait03 from "../assets/Portrait/Portrait_Photos03.jpg";
import Portrait04 from "../assets/Portrait/Portrait_Photos04.jpg";
import Portrait05 from "../assets/Portrait/Portrait_Photos05.jpg";
import Portrait06 from "../assets/Portrait/Portrait_Photos06.jpg";
import Portrait07 from "../assets/Portrait/Portrait_Photos07.jpg";
import Portrait08 from "../assets/Portrait/Portrait_Photos08.jpg";

import "./PortraitPage.css";

const galleryItems = [
  { src: Portrait01, alt: "Portrait photo 1" },
  { src: Portrait02, alt: "Portrait photo 2" },
  { src: Portrait03, alt: "Portrait photo 3" },
  { src: Portrait04, alt: "Portrait photo 4" },
  { src: Portrait05, alt: "Portrait photo 5" },
  { src: Portrait06, alt: "Portrait photo 6" },
  { src: Portrait07, alt: "Portrait photo 7" },
  { src: Portrait08, alt: "Portrait photo 8" },
];

function Portrait() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <div className="portrait-page">
      <div className="portrait-page__background" />

      <div className="portrait-page__content">
        <div className="gallery-container portrait-gallery-container">
          <Container>
            <h1 className="portrait-gallery-title text-center">
              Portrait Photography
            </h1>

            <Row className="g-1">
              {galleryItems.map((img, index) => (
                <Col key={index} xs={12} sm={6} md={4}>
                  <div
                    className="portrait-card"
                    onClick={() => openLightbox(index)}
                  >
                    <Image src={img.src} alt={img.alt} fluid />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          index={photoIndex}
          close={closeLightbox}
          slides={galleryItems.map((img) => ({
            src: img.src,
            description: img.alt,
          }))}
        />
      )}
    </div>
  );
}

export default Portrait;
