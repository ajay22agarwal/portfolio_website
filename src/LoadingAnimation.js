// src/LoadingAnimation.js

import React, { useEffect, useState } from 'react';
import './LoadingAnimation.css'; // Import the CSS file for styling

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating loading process
    setTimeout(() => {
      setIsLoading(false); // Hide loading after 2 seconds
    }, 2000);
  }, []);

  return (
    <div>
      {/* Loading screen */}
      {isLoading && (
        <div className="loading-wrapper">
          <div className="ball"></div>
        </div>
      )}

      {/* Content after loading */}
      {!isLoading && (
        <div className="content">
          <h1>Website Content Loaded</h1>
          <p>Welcome to my website!</p>
        </div>
      )}
    </div>
  );
};

export default LoadingAnimation;
