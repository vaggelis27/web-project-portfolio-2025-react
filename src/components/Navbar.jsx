import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import React from "react";

import "./Navbar.css";
import logo from "../assets/navbar-logo/photography_logo 2025.svg";

export default function Navbar() {
  /* REFS & ROUTER */
  const navbarRef = useRef(null);
  const location = useLocation();

  /* NAVBAR SCROLL EFFECT */
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

    /* initialize state on mount */
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* PORTFOLIO SCROLL (HOME PAGE ONLY) */
  const handlePortfolioClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();

      const section = document.getElementById("portfolio");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  /* CONTACT SCROLL (HOME PAGE ONLY) */
  const handleContactClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();

      const section = document.getElementById("ContactPage");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  /* LOGO CLICK (ALWAYS GO HOME, SCROLL TO TOP IF ALREADY THERE) */
  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* JSX RENDER */
  return (
    <nav
      ref={navbarRef}
      className="navbar navbar-expand-md fixed-top shadow-0"
      id="navbar"
    >
      <div className="container-fluid">
        {/* BRAND LOGO (LEFT) */}
        <Link to="/" className="navbar-brand py-0" onClick={handleLogoClick}>
          <img src={logo} alt="VN Logo" className="navbar-logo" />
        </Link>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVIGATION LINKS (RIGHT) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handlePortfolioClick}>
                <i className="bi bi-collection me-1"></i> Portfolio
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="bi bi-info-circle me-1"></i> About
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={handleContactClick}>
                <i className="bi bi-envelope me-1"></i> Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
