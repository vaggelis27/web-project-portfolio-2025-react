// IntroContent.jsx
import { motion as Motion } from "framer-motion";
import "./IntroContent.css";
import introImage from "@/assets/imagesIntro/Vangelis_Ntotsikas.png";

const IntroContent = () => {
  return (
    <section className="editorial-section" aria-labelledby="section-title">
      {/* Branding / Typography Header */}
      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-header"
      >
        <h1 id="section-title" className="brand-logo">
          <img src={introImage} alt="Vangelis Ntotsikas Photography" />
        </h1>
      </Motion.div>

      {/* Main Content Layout */}
      <Motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-body"
      >
        <p className="lead-paragraph">
          "Ονομάζομαι Βαγγέλης Ντότσικας και η πορεία μου ξεκίνησε μέσα από τον
          φακό, αναζητώντας την τέλεια ισορροπία φωτός και σύνθεσης. Αυτή η
          ανάγκη μου να «χτίζω» εικόνες με οδήγησε σταδιακά στον κόσμο της
          τεχνολογίας και του Web Development.
        </p>
        <div className="text-content">
          <p>
            Για μένα, ο προγραμματισμός και η φωτογραφία μοιράζονται την ίδια
            φιλοσοφία: τη δημιουργία κάτι ουσιαστικού από το μηδέν. Είτε
            πρόκειται για ένα πορτρέτο στη φύση είτε για ένα component στη
            React, στόχος μου είναι η καθαρότητα, η λεπτομέρεια και η σωστή
            εμπειρία του χρήστη. Σήμερα, συνδυάζω την αισθητική μου αντίληψη με
            σύγχρονα εργαλεία κώδικα για να δημιουργώ ψηφιακά προϊόντα που είναι
            τόσο λειτουργικά όσο και όμορφα."
          </p>
        </div>
      </Motion.div>
    </section>
  );
};

export default IntroContent;
