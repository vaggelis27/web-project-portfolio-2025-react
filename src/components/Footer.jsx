import React from "react";
import "../components/Footer.css";

export default function Footer() {
  return (
    <footer className="text-center text-light py-4 bg-dark footer-section">
      <div className="white mb-2 footer-title">
        <strong>Photography Portfolio</strong>
      </div>

      <div className="my-2 footer-social">
        <a
          href="https://www.instagram.com/vagelisntotsikas/"
          target="_blank"
          title="Instagram Profile"
          className="mx-2 footer-social-link footer-social-link--instagram"
        >
          <i className="bi bi-instagram"></i>
        </a>

        <a
          href="https://github.com/vaggelis27"
          target="_blank"
          title="GitHub Profile"
          className="mx-2 footer-social-link footer-social-link--github"
        >
          <i className="bi bi-github"></i>
        </a>

        <a
          href="https://www.facebook.com/vagelis.ntotsikas/"
          target="_blank"
          title="View Facebook Profile"
          className="mx-2 footer-social-link footer-social-link--facebook"
        >
          <i className="bi bi-facebook"></i>
        </a>
      </div>

      <div className="small text-white">
        &copy; 2025 Evangelos Ntotsikas. All Rights Reserved.
      </div>
    </footer>
  );
}
