import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { WeatherBadge } from "@/features/layout/components/WeatherBadge.jsx";
import { supabase } from "@/core/api/supabase";
import moment from "moment";
import "./Navbar.css";
import logo from "@/assets/navbar-logo/photography_logo 2025.svg";

export function Navbar() {
  const togglerRef = useRef(null);
  const location = useLocation();
  const [time, setTime] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));
  const [isSigningOut, setIsSigningOut] = useState(false);

  /* STATE MANAGEMENT */
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  /* NAVBAR SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      // Update state instead of direct DOM manipulation
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* HASH SCROLL LOGIC (HOME PAGE ONLY) */
  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;

    const id = location.hash.slice(1);
    // Use requestAnimationFrame to ensure the DOM is ready before scrolling
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.pathname, location.hash]);

  /* ACCESSIBILITY: CLOSE ON ESCAPE KEY */
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* BRAND LOGO CLICK HANDLER */
  const handleLogoClick = () => {
    closeMenu();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
    closeMenu();
  };

  return (
    <nav
      className={`navbar navbar-expand-md fixed-top ${
        isScrolled ? "navbar-scrolled" : "shadow-0"
      }`}
      id="navbar"
    >
      <div className="container-fluid">
        {/* BRAND LOGO */}
        <Link to="/" className="navbar-brand py-0" onClick={handleLogoClick}>
          <img src={logo} alt="VN Logo" className="navbar-logo" />
        </Link>

        {/* MOBILE TOGGLER */}
        <button
          ref={togglerRef}
          className="navbar-toggler custom-toggler"
          type="button"
          aria-controls="main-navbar-links"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVIGATION LINKS */}
        <div
          id="main-navbar-links"
          className={`navbar-collapse collapse ${menuOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav ms-auto navbar-links">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
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
              <Link to="/#Contact" className="nav-link" onClick={closeMenu}>
                <i className="bi bi-envelope me-1"></i> Contact
              </Link>
            </li>
          </ul>
          <div className="navbar-extras">
            <WeatherBadge />
            <span className="navbar-time">{time}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
