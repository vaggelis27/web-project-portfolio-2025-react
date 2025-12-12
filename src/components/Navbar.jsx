import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";
import logo from "../assets/navbar-logo/brand-logo2.png";

export default function Navbar() {
  const navbarRef = useRef(null);
  const location = useLocation();

  const [showNav, setShowNav] = useState(true);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const navbarEl = navbarRef.current;

    function handleScroll() {
      if (!navbarEl) return;

      const current = window.scrollY || window.pageYOffset;

      if (current > 10) {
        navbarEl.classList.add("navbar-scrolled");
      } else {
        navbarEl.classList.remove("navbar-scrolled");
      }

      const last = lastScrollRef.current;

      if (current <= 50) {
        setShowNav(true);
      } else if (current > last) {
        setShowNav(false);
      } else if (current < last) {
        setShowNav(true);
      }

      lastScrollRef.current = current;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePortfolioClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const section = document.getElementById("portfolio");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const section = document.getElementById("contact");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-md fixed-top shadow-0 ${
        showNav ? "show-nav" : "hide-nav"
      }`}
      id="navbar"
      ref={navbarRef}
    >
      <div className="container-fluid flex-wrap">
        <Link to="/" className="navbar-brand d-block d-md-none py-0">
          <img src={logo} alt="VN Logo" className="navbar-logo" />
        </Link>

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

        <div
          className="collapse navbar-collapse w-100 order-2 justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handlePortfolioClick}>
                <i className="bi bi-collection me-1"></i> Portfolio
              </Link>
            </li>

            <li className="nav-item d-none d-md-block">
              <Link to="/" className="nav-link p-0">
                <img src={logo} alt="VN Logo" className="navbar-logo" />
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="bi bi-info-circle me-1"></i> About
              </Link>
            </li>

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
