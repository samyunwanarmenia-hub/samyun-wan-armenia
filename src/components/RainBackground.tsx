"use client";

import React, { useEffect, useRef } from 'react';

const RainBackground: React.FC = () => {
  const rainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rainRef.current) {
      const dropsContainer = rainRef.current;
      const numDrops = 500;

      // Clear existing drops if any, for re-renders
      dropsContainer.querySelectorAll('.drop').forEach(drop => drop.remove());

      for (let i = 0; i < numDrops; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        
        // Randomize properties for each drop
        drop.style.opacity = `${Math.random() * 0.9 + 0.1}`; // 0.1 to 1.0
        drop.style.left = `${Math.random() * 120}vw`; // 0 to 120vw
        drop.style.borderLeftWidth = `${Math.random() * 0.8 + 0.25}vmin`; // 0.25 to 1.05vmin
        drop.style.setProperty('--animation-delay', `${Math.random() * -12.5}s`); // Random negative delay for continuous animation
        drop.style.setProperty('--animation-duration', `${Math.random() * 1.5 + 0.5}s`); // 0.5s to 2.0s

        dropsContainer.appendChild(drop);
      }
    }
  }, []); // Run once on mount

  return (
    <div className="rain" ref={rainRef}>
      <div className="left"></div>
      <div className="left center"></div>
      <div className="right center"></div>
      <div className="right"></div>
      {/* Drops are dynamically added by useEffect */}
    </div>
  );
};

export default RainBackground;