"use client";

import React from 'react';

const StarfallBackground: React.FC = () => {
  // Generate 40 falling-star divs
  const fallingStars = Array.from({ length: 40 }, (_, i) => (
    <div key={i} className={`falling-star falling-star-${i + 1}`}></div>
  ));

  return (
    <div className="starfall">
      {fallingStars}
    </div>
  );
};

export default StarfallBackground;