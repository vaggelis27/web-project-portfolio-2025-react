import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import HeroNature from "./HeroNature";
import { supabase } from "../lib/supabase";
import "./NaturePage.css";

// Move URL to a constant for cleaner code supabase access
const IMAGE_BASE_URL = `${
  import.meta.env.VITE_SUPABASE_URL
}/storage/v1/object/public/images/`;

function NaturePage() {
  /* STATE MANAGEMENT */
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  /* FETCH PHOTOS FROM SUPABASE */
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from("photos")
          .select("id, image_path, alt") // Added id for better keys
          .eq("category", "nature")
          .order("created_at", { ascending: true });

        if (supabaseError) throw supabaseError;
        setPhotos(data);
      } catch (err) {
        console.error("Error fetching nature photos:", err.message);
        setError("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  /* MEMOIZE SLIDES FOR PERFORMANCE */
  const slides = useMemo(
    () =>
      photos.map((img) => ({
        src: `${IMAGE_BASE_URL}${img.image_path.trim()}`,
        title: img.alt,
      })),
    [photos]
  );

  return (
    <div className="nature-page">
      <HeroNature />

      <Container className="nature-gallery-container py-5">
        <h1 className="text-center mb-4 nature-gallery-title">
          Nature Photography
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
            {photos.map((img, index) => (
              <Col key={img.id || index} xs={12} sm={6} md={4}>
                <div
                  className="nature-card"
                  onClick={() => {
                    setPhotoIndex(index);
                    setIsOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={`${IMAGE_BASE_URL}${img.image_path.trim()}`}
                    alt={img.alt}
                    fluid
                    className="nature-image"
                    loading="lazy" //i added this to Native lazy loading for performance
                  />
                  <div className="nature-card-title">{img.alt}</div>
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

export default NaturePage;
