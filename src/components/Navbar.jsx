import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import React from "react";

import "./Navbar.css";
import logo from "../assets/navbar-logo/brand-logo2.png";

export default function Navbar() {
  // ==== START JAVASCRIPT/REACT  ====

  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const navbarEl = navbarRef.current;
    const handleScroll = () => {
      if (!navbarEl) return;
      if (window.scrollY > 10) {
        navbarEl.classList.add("navbar-scrolled");
      } else {
        navbarEl.classList.remove("navbar-scrolled");
      }
    };

    handleScroll(); // Initialize state on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === Start scroll navbar top down ===
  const handlePortfolioClick = (e) => {
    //  Home
    if (location.pathname === "/") {
      e.preventDefault(); // Prevents navigation
      //portfolio section scroll
      const section = document.getElementById("portfolio");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  //  Contact section scroll
  const handleContactClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault(); // Prevents navigation
      const section = document.getElementById("contact");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // === End scroll navbar top down ===

  // === END JAVASCRIPT/REACT ===

  // === START JSX/HTML RENDER  ===
  return (
    <nav
      className="navbar navbar-expand-md fixed-top shadow-0"
      id="navbar"
      ref={navbarRef}
    >
      <div className="container-fluid flex-wrap">
        {/* Mobile brand logo */}
        <Link to="/" className="navbar-brand d-block d-md-none py-0">
          <img src={logo} alt="VN Logo" className="navbar-logo" />
        </Link>

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
            {/* Home */}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            {/* Portfolio */}
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handlePortfolioClick}>
                <i className="bi bi-collection me-1"></i> Portfolio
              </Link>
            </li>

            {/* DESKTOP LOGO*/}
            <li className="nav-item d-none d-md-block">
              <a href="./" className="nav-link p-0">
                <img src={logo} alt="VN Logo" className="navbar-logo" />
              </a>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="bi bi-info-circle me-1"></i> About
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleContactClick}>
                <i className="bi bi-envelope me-1"></i> Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
// === END JSX/HTML RENDER ===
