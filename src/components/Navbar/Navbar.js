import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../ParticleBackground/ThemeContext";
import { useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";

const Navbar = ({ activeSection, setActiveSection }) => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [top, setTop] = useState(0); // State to manage the top position of the navbar

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    navigate(`/${section}`);
  };

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;
      if (currentScrollTop > lastScrollTop) {
        setTop(-80); // Hide navbar
      } else {
        setTop(0); // Show navbar
      }
      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${isDarkTheme ? "dark-navbar" : "light-navbar"}`}
      style={{ top: `${top}px` }}
    >
      <div className="navbar-content">
        {/* Make the logo clickable */}
        <a href="/" onClick={() => handleNavClick("home")} className="logo">
          <span className="rohan">A</span>
          <span className="goyal">J</span>
        </a>

        <div
          className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          role="button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleMenu();
            }
          }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul
          className={`nav-links ${isMenuOpen ? "show" : ""}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <li role="presentation">
            <a
              href="/"
              onClick={() => handleNavClick("home")}
              className={activeSection === "home" ? "active" : ""}
              aria-label="Home section"
            >
              Home
            </a>
          </li>
          <li role="presentation">
            <a
              href="/about"
              onClick={() => handleNavClick("about")}
              className={activeSection === "about" ? "active" : ""}
              aria-label="About section"
            >
              About
            </a>
          </li>
          <li role="presentation">
            <a
              href="/skills"
              onClick={() => handleNavClick("skills")}
              className={activeSection === "skills" ? "active" : ""}
              aria-label="Skills section"
            >
              Skills
            </a>
          </li>
          <li role="presentation">
            <a
              href="/education"
              onClick={() => handleNavClick("education")}
              className={activeSection === "education" ? "active" : ""}
              aria-label="Education section"
            >
              Education
            </a>
          </li>
          <li role="presentation">
            <span
              className="disabled-link"
              title="Under Development 🚧"
              aria-label="Projects section (disabled)"
            >
              Projects
            </span>
          </li>
          <li role="presentation">
            <a
              href="/connect"
              onClick={() => handleNavClick("connect")}
              className={activeSection === "connect" ? "active" : ""}
              aria-label="Connect section"
            >
              Connect
            </a>
          </li>
        </ul>

        <label
          className="theme-switch"
          role="switch"
          aria-checked={!isDarkTheme}
        >
          <div className="slider-shadow"></div>
          <input
            type="checkbox"
            checked={!isDarkTheme}
            onChange={toggleTheme}
            aria-label="Toggle theme"
          />
          <span className="slider"></span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
