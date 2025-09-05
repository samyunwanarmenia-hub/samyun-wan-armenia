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

const shadowPulseVariants = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(134, 180, 134, 0.4)", // primary-500 with 40% opacity
      "0 0 15px rgba(134, 180, 134, 0.7)", // primary-500 with 70% opacity
      "0 0 0px rgba(134, 180, 134, 0.4)",
    ],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <motion.div
      className="w-16 h-16 border-4 border-gray-300 dark:border-gray-600 border-t-primary-500 rounded-full shadow-md" // Added shadow-md
      variants={spinnerVariants}
      animate="animate"
    >
      <motion.div
        className="w-full h-full rounded-full" // Inner div for shadow animation
        variants={shadowPulseVariants}
        animate="animate"
      />
    </motion.div>
  );
};

export default LoadingSpinner;