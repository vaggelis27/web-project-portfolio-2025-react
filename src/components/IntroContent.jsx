// IntroContent.jsx
import "./IntroContent.css";
import introImage from "../assets/imagesIntro/Vangelis_Ntotsikas.png";

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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
          molestiae pariatur non consectetur sed expedita fugit corrupti! Autem
          earum consectetur quam, esse suscipit consequatur natus voluptatem
          obcaecati repudiandae atque officiis.
        </p>
        <div className="text-content">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
            accusantium debitis eius perferendis, accusamus nobis eveniet, eaque
            corrupti quaerat earum dolor! Itaque, temporibus. Nemo fugiat et
            sapiente, eum dicta doloremque!
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroContent;
