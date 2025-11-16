import React from "react";
import "../components/Navbar.css";
import logo from "../assets/new logo 2025 2.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md fixed-top shadow-0" id="navbar">
      <div className="container-fluid flex-wrap">
        {/* Mobile brand logo (visible on mobile only) */}
        <a href="./index.html" className="navbar-brand d-block d-md-none py-0">
          <img src={logo} alt="VN Logo" className="navbar-logo" />
        </a>

        {/* Toggler */}
        <button
          className="navbar-toggler custom-toggler ms-auto order-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse w-100 order-2 justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="./index.html" className="nav-link">
                <i className="bi bi-image me-1"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#gallery" className="nav-link">
                <i className="bi bi-collection me-1"></i> Gallery
              </a>
            </li>

            {/* Desktop-only centered logo inside menu */}
            <li className="nav-item d-none d-md-block">
              <a href="./index.html" className="nav-link p-0" aria-label="Home">
                <img src={logo} alt="VN Logo" className="navbar-logo" />
              </a>
            </li>

            <li className="nav-item">
              <a href="#about" className="nav-link">
                <i className="bi bi-info-circle me-1"></i> About
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">
                <i className="bi bi-envelope me-1"></i> Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
