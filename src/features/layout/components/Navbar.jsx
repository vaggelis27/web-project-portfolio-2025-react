import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { WeatherBadge } from "@/features/layout/components/WeatherBadge.jsx";
import moment from "moment";
import "./Navbar.css";
import logo from "@/assets/navbar-logo/photography_logo 2025.svg";

export function Navbar() {
  const navRef = useRef(null);
  const togglerRef = useRef(null);
  const location = useLocation();
  const [time, setTime] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));

  /* STATE MANAGEMENT */
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  /* NAVBAR SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* HASH SCROLL LOGIC (HOME PAGE ONLY) */
  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;

    const id = location.hash.slice(1);
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.pathname, location.hash]);

  /* CLOSE MENU ON ROUTE/HASH CHANGE */
  useEffect(() => {
    closeMenu();
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

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  /* CLOSE WHEN CLICKING OUTSIDE THE NAV */
  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
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

  return (
    <nav
      ref={navRef}
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
