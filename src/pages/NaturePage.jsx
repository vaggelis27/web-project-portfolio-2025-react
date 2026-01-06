import HeroNature from "./HeroNature";
import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { supabase } from "../lib/supabase";
import "./NaturePage.css";

function NaturePage() {
  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("image_path, alt")
        .eq("category", "nature")
        .order("created_at", { ascending: true });

      if (!error) setPhotos(data);
    };

    fetchPhotos();
  }, []);

  const slides = photos.map((img) => ({
    src: `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/images/${img.image_path.trim()}`,
    description: img.alt,
  }));
  return (
    <div className="nature-page">
      <HeroNature />

      <Container className="nature-gallery-container py-5">
        <h1 className="text-center mb-4 nature-gallery-title">
          Nature Photography
        </h1>

        <Row className="g-1">
          {photos.map((img, index) => (
            <Col key={index} xs={12} sm={6} md={4}>
              <div
                className="nature-card"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={`${
                    import.meta.env.VITE_SUPABASE_URL
                  }/storage/v1/object/public/images/${img.image_path.trim()}`}
                  alt={img.alt}
                  fluid
                  className="nature-image"
                />

                <div className="nature-card-title">{img.alt}</div>
              </div>
            </Col>
          ))}
        </Row>

        {isOpen && (
          <Lightbox
            open={isOpen}
            index={photoIndex}
            close={() => setIsOpen(false)}
            slides={slides}
            on={{ view: ({ index }) => setPhotoIndex(index) }}
          />
        )}
      </Container>
    </div>
  );
}

export default NaturePage;
