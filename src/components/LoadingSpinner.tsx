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
      className="w-16 h-16 border-4 border-t-4 border-red-500 border-t-transparent rounded-full"
      variants={spinnerVariants}
      animate="animate"
    />
  );
};

export default LoadingSpinner;