import React from "react";
import { Link } from "react-router-dom";

import "./CallToAction.css";

// images
import nature01 from "../assets/nature/Nature_Photos01.jpg";
import Portrait08 from "../assets/Portrait/Portrait_Photos08.jpg";
import nature03 from "../assets/nature/Nature_Photos03.jpg";

const callToAction = [
  {
    id: 1,
    title: "ΠΗΓΕΣ ΛΟΥΡΟΥ",
    image: nature01,
    to: "/nature",
    meta: "NATURE",
    description:
      "Οι Πηγές του Λούρου, επίσημα γνωστό ως λίμνη Βηρός, είναι μια «γαλάζια λίμνη» παραμυθένιας ομορφιάς κοντά στο χωριό Βουλιάστα, λίγα χιλιόμετρα έξω από τα Ιωάννινα, που χαρακτηρίζεται από τα κρυστάλλινα, γαλαζοπράσινα νερά της και το πλούσιο καταπράσινο περιβάλλον της, ιδανική για περιπάτους, πικνίκ και θαυμασμό της φύσης. Το τοπίο προσφέρει ηρεμία, ενώ τα νερά της λίμνης είναι πεντακάθαρα και αλλάζουν χρώμα ανάλογα με το φως, φιλοξενώντας πλούσια υδρόβια ζωή.",
  },
  {
    id: 2,
    title: "ΗΧΩ ΤΗΣ ΦΥΣΗΣ",
    image: Portrait08,
    to: "/portrait",
    meta: "PORTRAIT",
    reverse: true,
    description:
      "Μια στιγμή απόλυτης αρμονίας στην καρδιά της Ηπείρου. Το βαθύ πορφυρό του υφάσματος έρχεται σε ζωντανή αντίθεση με τους πέτρινους τόνους του μονοπατιού και το καταπράσινο βάθος της Χαράδρας του Βίκου. Η γυναίκα, με την ήρεμη αλλά αποφασιστική της στάση, φαίνεται να αντηχεί τη γαλήνη και τη δύναμη της φύσης γύρω της, δημιουργώντας μια σκηνή που είναι ταυτόχρονα γήινη και αιθέρια.",
  },
  {
    id: 3,
    title: "Ηχώ της Φύσης",
    image: nature03,
    to: "/night",
    meta: "MILKY WAY",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  },
];

const CallToAction = () => {
  return (
    <section className="call-to-action">
      {callToAction.map((item) => (
        <article
          key={item.id}
          className={`cta-article${
            item.reverse ? " cta-article--reverse" : ""
          }`}
        >
          <div className="cta-box cta-text">
            <span className="cta-meta">{item.meta}</span>
            <h2 className="cta-title">{item.title}</h2>
            <p className="cta-paragraph">{item.description}</p>
          </div>

          <div className="cta-box cta-image-wrapper">
            <Link to={item.to} className="cta-link" aria-label={item.title}>
              <img className="cta-image" src={item.image} alt={item.title} />
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
};

export default CallToAction;
