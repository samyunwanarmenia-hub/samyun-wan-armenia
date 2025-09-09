"use client";

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const GradientBackground: React.FC = () => {
  const { theme } = useTheme();

  const lightGradient = "linear-gradient(135deg, #f7fcf7, #eef3f4, #f7fcf7)";
  const darkGradient = "linear-gradient(135deg, #0d1218, #18202b, #0d1218)";

  const gradientContainerVariants = {
    animate: {
      x: ["-50%", "0%", "-50%"], // Animate x position to simulate movement
      y: ["-50%", "0%", "-50%"], // Animate y position
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="fixed inset-0 w-full h-full z-[-10] overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]" // Make it larger than viewport
        style={{
          background: theme === 'dark' ? darkGradient : lightGradient,
        }}
        variants={gradientContainerVariants}
        initial={false}
        animate="animate"
      />
    </div>
  );
};

export default GradientBackground;