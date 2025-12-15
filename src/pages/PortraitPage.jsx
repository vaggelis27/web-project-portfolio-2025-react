import React from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

import Portrait01 from "../assets/Portrait/Portrait_Photos01.jpg";
import Portrait02 from "../assets/Portrait/Portrait_Photos02.jpg";
import Portrait03 from "../assets/Portrait/Portrait_Photos03.jpg";
import Portrait04 from "../assets/Portrait/Portrait_Photos04.jpg";
import Portrait05 from "../assets/Portrait/Portrait_Photos05.jpg";
import Portrait06 from "../assets/Portrait/Portrait_Photos06.jpg";
import Portrait07 from "../assets/Portrait/Portrait_Photos07.jpg";

import "./PortraitPage.css";

const galleryItems = [
  { src: Portrait01, alt: "Portrait photo 1" },
  { src: Portrait02, alt: "Portrait photo 2" },
  { src: Portrait03, alt: "Portrait photo 3" },
  { src: Portrait04, alt: "Portrait photo 4" },
  { src: Portrait05, alt: "Portrait photo 5" },
  { src: Portrait06, alt: "Portrait photo 6" },
  { src: Portrait07, alt: "Portrait photo 7" },
];

class Portrait extends React.Component {
  render() {
    return (
      <div className="gallery-container">
        <h1 className="gallery-title text-center">Portrait Photography</h1>
        <LightGallery
          plugins={[lgZoom, lgVideo]}
          mode="lg-fade"
          download={false}
          preload={1}
        >
          {galleryItems.map((item, index) => (
            <a
              key={index}
              className="gallery-item"
              href={item.src}
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

export default Portrait;
