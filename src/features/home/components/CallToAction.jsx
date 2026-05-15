// CallToAction.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { supabase } from "@/core/api/supabase";

import "./CallToAction.css";

// CTA ITEMS
const callToAction = [
  {
    id: 1,
    title: "ΠΗΓΕΣ ΛΟΥΡΟΥ",
    imagePath: "nature/nature_photos16.jpg",
    to: "/nature",
    meta: "nature",
    description:
      "Οι Πηγές του Λούρου, επίσημα γνωστό ως λίμνη Βηρός, είναι μια «γαλάζια λίμνη» παραμυθένιας ομορφιάς κοντά στο χωριό Βουλιάστα, λίγα χιλιόμετρα έξω από τα Ιωάννινα, που χαρακτηρίζεται από τα κρυστάλλινα, γαλαζοπράσινα νερά της και το πλούσιο καταπράσινο περιβάλλον της, ιδανική για περιπάτους, πικνίκ και θαυμασμό της φύσης.",
  },
  {
    id: 2,
    title: "ΗΧΩ ΤΗΣ ΦΥΣΗΣ",
    imagePath: "Portrait/portrait_photos08.jpg",
    to: "/portrait",
    meta: "portrait",
    reverse: true,
    description:
      "Η φωτογραφία πορτραίτου είναι μια τέχνη που αιχμαλωτίζει την ουσία και τον χαρακτήρα ενός ατόμου μέσα από την εικόνα του. Με έμφαση στην έκφραση, τη στάση και το περιβάλλον, η φωτογραφία πορτραίτου αποκαλύπτει την προσωπικότητα και τις μοναδικές πτυχές του υποκειμένου.",
  },
  {
    id: 3,
    title: "ΝΥΧΤΕΡΙΝΟΣ ΟΥΡΑΝΟΣ",
    imagePath: "milky_way/miklyway_photos04.png",
    to: "/night",
    meta: "MILKY WAY",
    description:
      'Η λήψη αποτυπώνει τον κομήτη C/2024 A1 (ATLAS), ο οποίος ανακαλύφθηκε στις αρχές του 2024. Το εντυπωσιακό στοιχείο είναι η τοποθέτησή του: ο κομήτης φαίνεται να "διασχίζει" το φωτεινό ποτάμι του Milky Way.',
  },
];

const BUCKET = "images";

const CallToAction = () => {
  const [imgSrcById, setImgSrcById] = useState({});
  const items = useMemo(() => callToAction, []);

  useEffect(() => {
    const results = items.map((item) => {
      const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(item.imagePath);
      return [item.id, data.publicUrl];
    });
    setImgSrcById(Object.fromEntries(results));
  }, [items]);

  return (
    <section className="call-to-action">
      {items.map((item, index) => (
        <Motion.article
          key={item.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
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
              <img
                className="cta-image"
                src={imgSrcById[item.id]}
                alt={item.title}
              />
            </Link>
          </div>
        </Motion.article>
      ))}
    </section>
  );
};

export default CallToAction;
