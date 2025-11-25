import React from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

import nature01 from "../assets/nature/Nature_Photos01.jpg";
import nature02 from "../assets/nature/Nature_Photos02.jpg";
import nature03 from "../assets/nature/Nature_Photos03.jpg";
import nature04 from "../assets/nature/Nature_Photos04.jpg";
import nature05 from "../assets/nature/Nature_Photos05.jpg";
import nature06 from "../assets/nature/Nature_Photos06.jpg";
import nature07 from "../assets/nature/Nature_Photos07.jpg";
import nature08 from "../assets/nature/Nature_Photos08.jpg";
import nature09 from "../assets/nature/Nature_Photos09.jpg";
import nature10 from "../assets/nature/Nature_Photos10.JPG";
import nature11 from "../assets/nature/Nature_Photos11.jpg";
import nature12 from "../assets/nature/Nature_Photos12.jpg";
import nature13 from "../assets/nature/Nature_Photos13.jpg";
import nature14 from "../assets/nature/Nature_Photos14.png";
import nature15 from "../assets/nature/Nature_Photos15.png";

import "./Gallery.css";

const galleryItems = [
  { src: nature01, alt: "Nature photo 1" },
  { src: nature02, alt: "Nature photo 2" },
  { src: nature03, alt: "Nature photo 3" },
  { src: nature04, alt: "Nature photo 4" },
  { src: nature05, alt: "Nature photo 5" },
  { src: nature06, alt: "Nature photo 6" },
  { src: nature07, alt: "Nature photo 7" },
  { src: nature08, alt: "Nature photo 8" },
  { src: nature09, alt: "Nature photo 9" },
  { src: nature10, alt: "Nature photo 10" },
  { src: nature11, alt: "Nature photo 11" },
  { src: nature12, alt: "Nature photo 12" },
  { src: nature13, alt: "Nature photo 13" },
  { src: nature14, alt: "Nature photo 14" },
  { src: nature15, alt: "Nature photo 15" },
];

class Gallery extends React.Component {
  render() {
    return (
      <div className="gallery-container">
        <LightGallery plugins={[lgZoom, lgVideo]} mode="lg-fade" preload={1}>
          {galleryItems.map((item, index) => (
            <a
              key={index}
              className="gallery-item"
              data-src={item.src}
              data-sub-html={`<h4>${item.alt}</h4>`}
            >
              <img
                className="img-responsive gallery-thumbnail"
                src={item.src}
                alt={item.alt}
                loading="lazy"
              />
            </a>
          ))}
        </LightGallery>
      </div>
    );
  }
}

export default Gallery;
