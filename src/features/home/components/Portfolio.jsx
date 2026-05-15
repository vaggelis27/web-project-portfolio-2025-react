import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { motion as Motion } from "framer-motion";
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

      // handle either naming convention
      const publicUrl = res?.data?.publicUrl ?? res?.data?.publicURL ?? null;
      return [item.id, publicUrl];
    });

    setImages(Object.fromEntries(urls));
  }, []); // run when items arrive

  return (
    <section id="portfolio" className="portfolio-section">
      <Container>
        <Motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="portfolio-title text-center mb-5"
        >
          Portfolio
        </Motion.h2>

        <Row className="g-4">
          {portfolioItems.map((item, index) => {
            const imgSrc = images[item.id];
            if (!imgSrc) return null;

            return (
              <Col md={4} key={item.id}>
                <Motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
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
                        <span className="Overlay-tag">view project →</span>
                      </div>
                    </article>
                  </Link>
                </Motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
