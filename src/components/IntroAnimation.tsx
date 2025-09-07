"use client";

import React from 'react';
import { motion } from 'framer-motion';

const IntroAnimation: React.FC = () => {
  const texts = ['S', 'a', 'm', 'y', 'u', 'n', ' ', 'W', 'a', 'n', ' ', 'A', 'r', 'm', 'e', 'n', 'i', 'a'];
  const _number_of_text = texts.length; // 18
  const _number_of_particle = 12;

  return (
    <motion.div
      className="intro-animation-container new" // Added 'new' class for specific styling
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 6.5 } }} // Adjusted exit delay
    >
      {texts.map((_, i) => (
        <div
          key={`background-${i}`}
          className={`background-bar bg-${i}`}
        />
      ))}
      <div className="criterion">
        {texts.map((char, i) => (
          <div
            key={`text-${i}`}
            className={`text-char text-${i}`}
          >
            {char}
            <span
              className="text-char-after"
            />
          </div>
        ))}
        {texts.map((_, i) => (
          <div
            key={`frame-${i}`}
            className={`frame-char frame-${i}`}
          />
        ))}
        {texts.map((_, i) =>
          Array.from({ length: _number_of_particle }).map((__, j) => (
            <div
              key={`particle-${i}-${j}`}
              className={`particle-char particle-${i}-${j}`}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default IntroAnimation;