import React from "react";
import "./CallToAction.css";

// images
import nature01 from "../assets/nature/Nature_Photos01.jpg";
import nature02 from "../assets/nature/Nature_Photos02.jpg";
import nature03 from "../assets/nature/Nature_Photos03.jpg";

const CallToAction = () => {
  return (
    <section className="call-to-action">
      <article className="cta-article">
        <div className="cta-box cta-text">
          <span className="cta-meta">NATURE</span>
          <h2 className="cta-title">ΠΗΓΕΣ ΛΟΥΡΟΥ</h2>
          <p className="cta-paragraph">
            Οι Πηγές του Λούρου, επίσημα γνωστό ως λίμνη Βηρός, είναι μια
            «γαλάζια λίμνη» παραμυθένιας ομορφιάς κοντά στο χωριό Βουλιάστα,
            λίγα χιλιόμετρα έξω από τα Ιωάννινα, που χαρακτηρίζεται από τα
            κρυστάλλινα, γαλαζοπράσινα νερά της και το πλούσιο καταπράσινο
            περιβάλλον της, ιδανική για περιπάτους, πικνίκ και θαυμασμό της
            φύσης. Το τοπίο προσφέρει ηρεμία, ενώ τα νερά της λίμνης είναι
            πεντακάθαρα και αλλάζουν χρώμα ανάλογα με το φως, φιλοξενώντας
            πλούσια υδρόβια ζωή.
          </p>
        </div>

        <div className="cta-box cta-image-wrapper">
          <img className="cta-image" src={nature01} alt="Time Square" />
        </div>
      </article>

      <article className="cta-article cta-article--reverse">
        <div className="cta-box cta-text">
          <span className="cta-meta">ΦΩΤΟΓΡΑΦΙΕΣ ΓΑΜΟΥ</span>
          <h2 className="cta-title">Central Park</h2>
          <p className="cta-paragraph">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
        </div>

        <div className="cta-box cta-image-wrapper">
          <img className="cta-image" src={nature02} alt="Central Park" />
        </div>
      </article>

      <article className="cta-article">
        <div className="cta-box cta-text">
          <span className="cta-meta">ΦΩΤΟΓΡΑΦΙΕΣ ΓΑΜΟΥ</span>
          <h2 className="cta-title">Grand Central Station</h2>
          <p className="cta-paragraph">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
        </div>

        <div className="cta-box cta-image-wrapper">
          <img
            className="cta-image"
            src={nature03}
            alt="Grand Central Station"
          />
        </div>
      </article>
    </section>
  );
};

export default CallToAction;
