"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextAnimationProps {
  text: string;
  delay?: number;
  className?: string;
}

const SplitTextAnimation: React.FC<SplitTextAnimationProps> = ({ text, delay = 0, className }) => {
  // Split the text into two parts: "Samyun Wan" and "Armenia"
  // Find the index of the second space
  const firstSpaceIndex = text.indexOf(' ');
  const secondSpaceIndex = text.indexOf(' ', firstSpaceIndex + 1);

  let part1 = text;
  let part2 = '';

  if (secondSpaceIndex !== -1) {
    part1 = text.substring(0, secondSpaceIndex);
    part2 = text.substring(secondSpaceIndex);
  } else if (firstSpaceIndex !== -1) { // Fallback if only one space
    part1 = text.substring(0, firstSpaceIndex);
    part2 = text.substring(firstSpaceIndex);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const textPartVariants = {
    hidden: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? '-100%' : '100%', // Use 100% for full off-screen translation
      opacity: 0,
    }),
    visible: {
      x: '0%',
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`flex justify-center lg:justify-start overflow-hidden ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        className="inline-block whitespace-nowrap"
        variants={textPartVariants}
        custom="left"
      >
        {part1}
      </motion.span>
      <motion.span
        className="inline-block whitespace-nowrap"
        variants={textPartVariants}
        custom="right"
      >
        {part2}
      </motion.span>
    </motion.div>
  );
};

export default SplitTextAnimation;