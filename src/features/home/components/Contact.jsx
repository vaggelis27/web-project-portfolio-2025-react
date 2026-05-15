import "./Contact.css";
function Contact() {
  return (
    <section id="contact" className="py-4 text-white contact-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-10">
            <div className="contact-card p-4 p-lg-8">
              <h2 className="text-uppercase fw-bold text-center mb-4">
                Contact
              </h2>
              <p className="lead text-center mb-4">
                Have a project in mind or just want to say hello? Drop me a
                message and I&apos;ll get back to you as soon as possible.
              </p>
              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="contact-form"
              >
                <input
                  type="hidden"
                  name="access_key"
                  value="e7a59409-9696-421f-86e1-c2706b3c2d58"
                />
                <input
                  type="hidden"
                  name="redirect"
                  value="https://web3forms.com/success"
                />

                <div className="row g-4">
                  <div className="col-md-6">
                    <label
                      className="form-label text-uppercase small"
                      htmlFor="contactName"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="contactName"
                      name="name"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      className="form-label text-uppercase small"
                      htmlFor="contactEmail"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="contactEmail"
                      name="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label
                      className="form-label text-uppercase small"
                      htmlFor="contactMessage"
                    >
                      Message
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      id="contactMessage"
                      name="message"
                      rows="5"
                      placeholder="Tell me a little about your project..."
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-contact btn-lg">
                    <span className="me-2">
                      <i className="bi bi-send"></i>
                    </span>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
