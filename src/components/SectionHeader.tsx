"use client";

import { motion } from 'framer-motion';
// Removed TranslationKeys import as 't' prop is no longer needed

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  // Removed 't: TranslationKeys;'
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  // Removed 't: _t,' from destructuring
}) => {
  return (
    <motion.div 
      className={`text-center mb-12 ${className || ''}`}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className={`text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-5 ${titleClassName || ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto ${subtitleClassName || ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;