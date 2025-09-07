"use client";

import React from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner'; // Import the existing LoadingSpinner

const IntroAnimation: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[1000] bg-white dark:bg-gray-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }} // Removed delay
    >
      <LoadingSpinner />
    </motion.div>
  );
};

export default IntroAnimation;