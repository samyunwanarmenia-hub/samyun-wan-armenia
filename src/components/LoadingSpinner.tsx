"use client";

import { motion } from 'framer-motion';

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <motion.div
      className="w-16 h-16 border-4 border-gray-300 dark:border-gray-600 border-t-primary-500 rounded-full shadow-md" // Added shadow-md
      variants={spinnerVariants}
      animate="animate"
    />
  );
};

export default LoadingSpinner;