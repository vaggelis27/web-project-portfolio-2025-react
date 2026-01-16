// CallToAction.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

import "./CallToAction.css";
// SUPABASE STORAGE DATA

//  console log public URL check for error debugging
// SUPABASE PUBLIC URL DEBUG
const { data } = supabase.storage
  .from("images")
  .getPublicUrl("portrait/Portrait_Photos08.jpg");
console.log(data.publicUrl);

// CTA ITEMS
const callToAction = [
  {
    id: 1,
    title: "ΠΗΓΕΣ ΛΟΥΡΟΥ",
    imagePath: "nature/nature_photos16.jpg", // https://supabase.com/dashboard/project/dhfnkvncfzerhctejqbj/storage/files/buckets/images
    to: "/nature",
    meta: "nature",
    description:
      "Οι Πηγές του Λούρου, επίσημα γνωστό ως λίμνη Βηρός, είναι μια «γαλάζια λίμνη» παραμυθένιας ομορφιάς κοντά στο χωριό Βουλιάστα, λίγα χιλιόμετρα έξω από τα Ιωάννινα, που χαρακτηρίζεται από τα κρυστάλλινα, γαλαζοπράσινα νερά της και το πλούσιο καταπράσινο περιβάλλον της, ιδανική για περιπάτους, πικνίκ και θαυμασμό της φύσης. Το τοπίο προσφέρει ηρεμία, ενώ τα νερά της λίμνης είναι πεντακάθαρα και αλλάζουν χρώμα ανάλογα με το φως, φιλοξενώντας πλούσια υδρόβια ζωή.",
  },
  {
    id: 2,
    title: "ΗΧΩ ΤΗΣ ΦΥΣΗΣ",
    imagePath: "Portrait/portrait_photos08.jpg",
    to: "/portrait",
    meta: "portrait",
    reverse: true,
    description:
      "Η φωτογραφία πορτραίτου είναι μια τέχνη που αιχμαλωτίζει την ουσία και τον χαρακτήρα ενός ατόμου μέσα από την εικόνα του. Με έμφαση στην έκφραση, τη στάση και το περιβάλλον, η φωτογραφία πορτραίτου αποκαλύπτει την προσωπικότητα και τις μοναδικές πτυχές του υποκειμένου, δημιουργώντας μια σύνδεση μεταξύ του θεατή και του ατόμου που απεικονίζεται.",
  },
  {
    id: 3,
    title: "Ηχώ της Φύσης",
    imagePath: "milky_way/miklyway_photos04.png",
    to: "/night",
    meta: "MILKY WAY",
    description:
      'Η λήψη αποτυπώνει τον κομήτη C/2024 A1 (ATLAS), ο οποίος ανακαλύφθηκε στις αρχές του 2024. Το εντυπωσιακό στοιχείο είναι η τοποθέτησή του: ο κομήτης φαίνεται να "διασχίζει" το φωτεινό ποτάμι του Milky Way. Είναι μια συνάντηση δύο διαφορετικών κόσμων — ενός παγωμένου σώματος από τις παρυφές του ηλιακού μας συστήματος και των δισεκατομμυρίων άστρων που σχηματίζουν τον γαλαξία μας.',
  },
];

// SUPABASE BUCKET
const BUCKET = "images";

// COMPONENT
const CallToAction = () => {
  // IMAGE URL MAP
  const [imgSrcById, setImgSrcById] = useState({}); // { [id]: "blob:..." }

  // STATIC ITEMS
  const items = useMemo(() => callToAction, []);

  // LOAD PUBLIC URLS
  useEffect(() => {
    const results = items.map((item) => {
      // Public bucket: use public URL instead of download/blob. (sos) (https://supabase.com/docs/guides/storage/public-buckets)
      const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(item.imagePath);
      return [item.id, data.publicUrl];
    });

    setImgSrcById(Object.fromEntries(results));
  }, [items]);

  return (
    <section className="call-to-action">
      {items.map((item) => (
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
              <img
                className="cta-image"
                src={imgSrcById[item.id] || ""}
                alt={item.title}
              />
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
};

export default CallToAction;
