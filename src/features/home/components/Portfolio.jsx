import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { supabase } from "@/core/api/supabase";

import "./Portfolio.css";

// PORTFOLIO ITEMS
const portfolioItems = [
  {
    id: 1,
    title: "nature",
    imagePath: "nature/nature_photos09.jpg",
    to: "/nature",
    meta: "nature",
  },
  {
    id: 2,
    title: "Portrait",
    imagePath: "Portrait/portrait_photos01.jpg",
    to: "/portrait",
  },
  {
    id: 3,
    title: "Milky Way",
    imagePath: "milky_way/miklyway_photos03.png",
    to: "/night",
  },
];

// SUPABASE BUCKET
const BUCKET = "images";

// COMPONENT
export default function Portfolio() {
  // IMAGE URL MAP
  const [images, setImages] = useState({});
  // LOAD PUBLIC URLS
  useEffect(() => {
    if (!portfolioItems || portfolioItems.length === 0) return;

    const urls = portfolioItems.map((item) => {
      const path = item?.imagePath ?? "";
      const res = supabase.storage.from(BUCKET).getPublicUrl(path);
      console.log("getPublicUrl result", res); // inspect returned shape

      // handle either naming convention
      const publicUrl = res?.data?.publicUrl ?? res?.data?.publicURL ?? null;
      return [item.id, publicUrl];
    });

    setImages(Object.fromEntries(urls));
  }, [portfolioItems]); // run when items arrive

  return (
    <section id="portfolio" className="portfolio-section">
      <Container>
        <h2 className="portfolio-title text-center mb-4">Portfolio</h2>

        <Row className="g-2">
          {portfolioItems.map((item) => {
            const imgSrc = images[item.id];
            if (!imgSrc) return null;

            return (
              <Col md={4} key={item.id}>
                <Link to={item.to} className="Portfolio-card-link">
                  <article className="Portfolio-card">
                    <img
                      src={imgSrc}
                      alt={item.title}
                      className="Portfolio-img"
                      loading="lazy"
                    />

                    <div className="Portfolio-overlay">
                      <h3 className="Overlay-title">{item.title}</h3>
                      <span className="Overlay-tag">view →</span>
                    </div>
                  </article>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
