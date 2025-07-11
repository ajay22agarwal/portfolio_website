import React, { useState, useEffect } from "react";
import "./Experience.css";
import experienceData from "./experience.json"; // Importing the JSON data directly

const Experience = () => {
  const [experiences] = useState(experienceData);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedExperience) {
      setTimeout(() => setShowModal(true), 50);
    } else {
      setShowModal(false);
    }
  }, [selectedExperience]);

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedExperience(null), 400);
  };

  return (
    <section className="experience-section">
      <h2 className="experience-title">Experience</h2>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-card-inner">
              <div className="experience-card-front">
                <h3 className="company-name">{exp.company}</h3>
                <h4 className="position-name">{exp.position}</h4>
                <p className="experience-description">{exp.duration}</p>
              </div>
              <div className="experience-card-back">
                <button
                  className="view-more-button"
                  onClick={() => setSelectedExperience(exp)}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedExperience && (
        <div
          className={`experience-modal ${showModal ? "active" : ""}`}
          onClick={closeModal}
        >
          <div
            className="experience-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal" onClick={closeModal}>
              ×
            </button>

            <div className="header">
              <h2>{selectedExperience.company}</h2>
              <div className="duration">{selectedExperience.duration}</div>
            </div>

            <h3>{selectedExperience.position}</h3>

            <ul className="experience-points">
              {selectedExperience.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
