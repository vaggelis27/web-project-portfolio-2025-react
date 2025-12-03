import logo from "../assets/logo-brand.jpg";
import "./About.css";
function About() {
  return (
    <section id="about" className="py-5 my-5 text-dark about-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <img src={logo} alt="MySite logo" className="hero-logo mb-4" />
            <h2 className="text-uppercase fw-bold mb-4">About Me</h2>
            <p className="lead">
              I am a passionate photographer who captures portraits, landscapes,
              and night skies. This portfolio showcases a curated selection of
              my favorite shots and client work. Let&apos;s create something
              memorable together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
