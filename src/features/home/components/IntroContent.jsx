// IntroContent.jsx
import "./IntroContent.css";
import introImage from "@/assets/imagesIntro/Vangelis_Ntotsikas.png";

const IntroContent = () => {
  return (
    <section className="editorial-section" aria-labelledby="section-title">
      {/* Branding / Typography Header */}
      <div className="section-header">
        <h1 id="section-title" className="brand-logo">
          <img src={introImage} alt="Vangelis Ntotsikas Photography" />
        </h1>
      </div>

      {/* Main Content Layout */}
      <div className="section-body">
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
      </div>
    </section>
  );
};

export default IntroContent;
