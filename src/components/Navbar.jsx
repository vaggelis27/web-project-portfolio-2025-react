import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";
import logo from "../assets/navbar-logo/photography_logo 2025.svg";

export default function Navbar() {
  const navbarRef = useRef(null);
  const togglerRef = useRef(null);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  /* NAVBAR SCROLL EFFECT */
  useEffect(() => {
    const navbarEl = navbarRef.current;

    const handleScroll = () => {
      if (!navbarEl) return;
      navbarEl.classList.toggle("navbar-scrolled", window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* HASH SCROLL (HOME ONLY) - supports */
  useEffect(() => {
    if (location.pathname !== "/") return;
    if (!location.hash) return;

    const id = location.hash.slice(1);
    // Allow layout to paint first (especially if sections render after route change)
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.pathname, location.hash]);

  /* ESC TO CLOSE (ACCESSIBILITY BASIC) */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
        togglerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  /* LOGO CLICK (ALWAYS GO HOME, SCROLL TO TOP IF ALREADY THERE) */
  const handleLogoClick = () => {
    closeMenu();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
          ref={togglerRef}
          className="navbar-toggler custom-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVIGATION LINKS (RIGHT) */}
        <div
          className={`navbar-collapse collapse${menuOpen ? " show" : ""}`}
          id="navbarNav"
          aria-hidden={!menuOpen}
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>

            <li className="nav-item">
              {/* Works from anywhere: navigates to home + scrolls to #portfolio */}
              <Link to="/#portfolio" className="nav-link" onClick={closeMenu}>
                <i className="bi bi-collection me-1"></i> Portfolio
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeMenu}>
                <i className="bi bi-info-circle me-1"></i> About
              </Link>
            </li>

            <li className="nav-item">
              {/* Works from anywhere: navigates to home + scrolls to #Contact */}
              <Link to="/#Contact" className="nav-link" onClick={closeMenu}>
                <i className="bi bi-envelope me-1"></i> Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
