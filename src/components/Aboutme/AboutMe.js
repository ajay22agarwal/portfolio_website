import React, { useEffect, useRef, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./AboutMe.css";
import profileDark from "../../assets/profile.jpg";
import profileLight from "../../assets/profile1.jpg";
import { ThemeContext } from "../ParticleBackground/ThemeContext";

const AboutMe = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const aboutMeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  // const navigate = useNavigate(); // Use the navigate function

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const container = aboutMeRef.current;
      const top = container.getBoundingClientRect().top;
      const bottom = container.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (top < windowHeight && bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Duration: 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle content animations
  useEffect(() => {
    setTimeout(() => {
      if (isVisible && !loading) {
        aboutMeRef.current
          .querySelectorAll(
            ".about-me-title, .about-me-card, .about-me-introduction, .about-me-quote"
          )
          .forEach((element, index) => {
            if (element.classList.contains("about-me-title")) {
              element.style.animation = `slideDown 1s ease forwards`;
            } else if (element.classList.contains("about-me-card")) {
              element.style.animation = `slideUp 1s ease forwards`;
              element.style.animationDelay = `${index * 0.3}s`;
            } else if (
              element.classList.contains("about-me-introduction") ||
              element.classList.contains("about-me-quote")
            ) {
              element.style.animation = `fadeIn 1.3s ease forwards`;
              element.style.animationDelay = `${index * 0.3}s`;
            }
          });
      }
    }, 300);
  }, [isVisible, loading]);

  // Function to handle resume button click
  // const handleResumeClick = () => {
  //   navigate("/resume"); // Navigate to the resume page
  // };

  return (
    <section
      className={`about-me-section ${isVisible ? "visible" : ""}`}
      aria-labelledby="about-me-title"
      ref={aboutMeRef}
    >
      {loading ? (
        <div className="loading-container">
          <div className="bouncing-ball"></div>
        </div>
      ) : (
        <div className="about-me-container">
          <h2 id="about-me-title" className="about-me-title">
            👋 About Me
          </h2>
          <div className="about-me-card">
            <div className="about-me-profile-picture">
              <img
                src={isDarkTheme ? profileDark : profileLight}
                alt="Rohan Goyal"
                className="about-me-profile-image"
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </div>
            <div className="about-me-content">
              <p className="about-me-introduction">
                Hello! I'm Ajay Deep, a passionate and detail-driven QA Leader with over 14 years of experience ensuring rock-solid quality across complex digital systems. From startups to enterprise-grade projects, I’ve led QA teams to deliver seamless, high-performing software by focusing on API testing, performance benchmarking, and robust SDLC and Agile practices. 🚀
              </p>
              <p className="about-me-introduction">
                My strength lies not just in identifying bugs, but in building a culture of quality — where testing is proactive, processes are lean, and releases are smooth. Whether it’s managing cross-functional teams or diving into automation strategies, I thrive at the intersection of precision and leadership.
              </p>
              <p className="about-me-introduction">
                When I’m not immersed in test cases or team standups, you’ll likely find me on my bike, riding through winding hillside roads, soaking in the fresh air and scenic views. 🏍️🌄 Those peaceful rides fuel my focus and keep me grounded — reminding me that both in life and work, the journey matters just as much as the destination.
              </p>
              <blockquote className="about-me-quote">
                "Great software may be built with code, but it thrives on quality." - unknown
              </blockquote>
              <div className="about-me-cta-button">
                <button
                  className="about-me-download-resume disabled-resume-button"
                  disabled
                  title="Under Development"
                  aria-label="Resume currently unavailable"
                >
                  View Resume 📝
                </button>

                {/* <button
                  onClick={handleResumeClick}
                  className="about-me-download-resume"
                  aria-label="View Rohan Goyal's Resume"
                >
                  View Resume 📝
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutMe;