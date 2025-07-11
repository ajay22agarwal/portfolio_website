import React, { useState, useEffect, useRef } from 'react';
import './Certifications.css';
import certificationsData from './certifications.json';

const AllCertifications = ({ limit }) => {
  const certificationsRef = useRef(null);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const certificationsContainer = certificationsRef.current;
      const certifications = certificationsContainer.querySelectorAll('.certification-card');
      const certificationsContainerTop = certificationsContainer.getBoundingClientRect().top;
      const certificationsContainerBottom = certificationsContainer.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (certificationsContainerTop < windowHeight && certificationsContainerBottom > 0) {
        // Certifications are in view, show them
        certifications.forEach((cert, index) => {
          cert.style.animation = `slideUp 1.5s ease forwards`;
          cert.style.animationDelay = `${index * 0.3}s`;
        });

        // Show the heading
        const heading = certificationsContainer.querySelector('.certifications-title');
        heading.style.animation = `slideDown 1.5s ease forwards`;
      } else {
        // Certifications are not in view, hide them
        certifications.forEach((cert, index) => {
          cert.style.animation = `fadeOut 1.5s ease forwards`;
          cert.style.animationDelay = `${index * 0.3}s`;
        });

        // Hide the heading
        const heading = certificationsContainer.querySelector('.certifications-title');
        heading.style.animation = `fadeOut 1.5s ease forwards`;
      }
    };

    // Trigger animations when the component mounts
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setSelectedCertification(null);
  };

  return (
    <div className="certifications-section" ref={certificationsRef}>
      <h2 className="certifications-title">All Certifications</h2>
      <div className="certifications-list">
        {certificationsData.slice(0, limit).map((cert, index) => (
          <div key={index} className="certification-card">
            <div className="certification-card-inner">
              <div className="certification-card-front">
                <h3 className="certification-name">{cert.name}</h3>
                <p className="certification-issuer">{cert.issuer}</p>
                <p className="certification-date">{cert.date}</p>
              </div>
              <div className="certification-card-back">
                <button
                  className="view-more-button"
                  onClick={() => {
                    setSelectedCertification(cert);
                    setShowModal(true);
                  }}
                >
                  View Certificate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedCertification && (
        <div className="modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              ×
            </button>
            <h2>{selectedCertification.name}</h2>
            <p>{selectedCertification.issuer}</p>
            <p>{selectedCertification.date}</p>
            {selectedCertification.Link && (
              selectedCertification.Link.endsWith('.pdf') ? (
                <iframe
                  src={selectedCertification.Link}
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  allowFullScreen
                  title={`Certificate for ${selectedCertification.name}`}
                ></iframe>
              ) : (
                <img
                  src={selectedCertification.Link}
                  alt={`Certificate for ${selectedCertification.name}`}
                  style={{
                    width: '100%',
                    maxHeight: '500px',
                    objectFit: 'contain',
                  }}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCertifications;