import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { supabase } from "../lib/supabase";
import HeroMilkyWay from "./HeroMilkyWay";

import "./MilkyWayPage.css";

function MilkyWayPage() {
  /* STATE MANAGEMENT */
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  /* FETCH PHOTOS FROM SUPABASE FOR MILKYWAY CATEGORY */
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from("photos")
          .select("id, image_path, alt")
          .eq("category", "milky_way")
          .order("created_at", { ascending: true });

        if (supabaseError) throw supabaseError;
        setPhotos(data || []);
      } catch (err) {
        console.error("Error fetching milkyway photos:", err.message);
        setError("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const processedPhotos = useMemo(() => {
    return photos.map((img) => {
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(img.image_path.trim());

      return {
        ...img,
        url: data.publicUrl,
      };
    });
  }, [photos]);

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
    <div className="milkyway-page ">
      <HeroMilkyWay />
      <Container className="milkyway-gallery-container py-5">
        <h1 className="text-center mb-4 milkyway-gallery-title">Milky Way</h1>

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
                  className="milkyway-card"
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
                    className="milkyway-image"
                    loading="lazy"
                  />
                  <div className="milkyway-card-title">{img.alt}</div>
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

export default MilkyWayPage;
