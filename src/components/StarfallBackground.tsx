"use client";

import React from 'react';

const StarfallBackground: React.FC = () => {
  return (
    <div className="starfall">
      {Array.from({ length: 40 }).map((_, index) => (
        <div key={index} className="falling-star" />
      ))}
    </div>
  );
};

export default StarfallBackground;





