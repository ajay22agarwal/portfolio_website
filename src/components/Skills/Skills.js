import React, { useState, useEffect, useRef } from "react";
import "./Skills.css";
import skillsData from "../Skills/Skills.json";
// import { useNavigate } from 'react-router-dom';
import Certifications from "../Certification/Certifications";

const Skills = () => {
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  // const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const skillsContainer = skillsRef.current;
      const skillsContainerTop = skillsContainer.getBoundingClientRect().top;
      const skillsContainerBottom = skillsContainer.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (skillsContainerTop < windowHeight && skillsContainerBottom > 0) {
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
    }, 3500); // Duration: 3.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSkillClick = (skill) => {
    if (expandedSkill === skill) {
      setIsAnimating(true);
      setTimeout(() => {
        setExpandedSkill(null);
        setIsAnimating(false);
      }, 500);
    } else {
      if (expandedSkill) {
        setIsAnimating(true);
        setTimeout(() => {
          setExpandedSkill(skill);
          setIsAnimating(false);
        }, 500);
      } else {
        setExpandedSkill(skill);
      }
    }
  };

  // const viewAllCertifications = () => {
  //   navigate('/certifications');
  // };

  return (
    <div className="hierarchy" ref={skillsRef}>
      {loading ? (
        <div className="loading-container">
          <div className="bouncing-ball"></div>
        </div>
      ) : (
        <div className={`skills-content ${isVisible ? "visible" : ""}`}>
          <h2 className="skills-title">My Skills</h2>
          <div className="managers">
            {skillsData.map((skill, index) => (
              <div
                key={index}
                className="node manager"
                onClick={() => handleSkillClick(skill.name)}
              >
                <h3>{skill.name}</h3>
              </div>
            ))}
          </div>
          {expandedSkill && (
            <div className={`sub-managers ${isAnimating ? "hidden" : "visible"}`}>
              {skillsData
                .find((skill) => skill.name === expandedSkill)
                ?.subSkills.slice(0, 6)
                .map((subSkill, subIndex) => (
                  <div key={subIndex} className="node sub-node">
                    <h3>{subSkill}</h3>
                  </div>
                ))}
              {skillsData
                .find((skill) => skill.name === expandedSkill)
                ?.subSkills.slice(6).length > 0 && (
                <div className="sub-sub-managers">
                  {skillsData
                    .find((skill) => skill.name === expandedSkill)
                    ?.subSkills.slice(6)
                    .map((subSkill, subIndex) => (
                      <div key={subIndex} className="node sub-sub-node">
                        <h3>{subSkill}</h3>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
          <div className="certifications-section">
            <Certifications limit={6} />
            {/* <div className="view-all-button-container">
              <button
                className="view-all-button"
                onClick={viewAllCertifications}
                aria-label="View all certifications"
              >
                Show More
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;