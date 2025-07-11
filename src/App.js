// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/Aboutme/AboutMe";
import Resume from "./components/Resume/Resume";
import Skills from "./components/Skills/Skills";
import Contact from "./components/contact/contact";
import AllCertifications from "./components/Certification/AllCertifications";
import Projects from "./components/Projects/Projects";
import Education from "./components/Education/Education"; // Import the new Education component
// import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./components/ParticleBackground/ThemeContext";
import "./App.css";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
          <div className="content-section">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/certifications" element={<AllCertifications />} />
              <Route path="/education" element={<Education />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/connect" element={<Contact />} />
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;