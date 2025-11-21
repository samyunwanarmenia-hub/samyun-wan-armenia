"use client";

import { motion } from 'framer-motion';
import SwipeableProductCarousel from './SwipeableProductCarousel';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';

const ProductShowcaseSection = () => {
  const { t, openOrderModal } = useLayoutContext();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } // Faster, smoother easing
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } // Faster, smoother easing
  };

  return (
    <motion.section
      id="products"
      className="relative py-12 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Changed to whileInView
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title={t.nav.products}
          // Removed subtitle={t.hero.tagline}
          // Removed t={t}
        />
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {t.productShowcase.seoHeading}
          </h2>
          <h3 className="text-sm font-medium text-primary-700 dark:text-primary-300">
            {t.productShowcase.seoSubheading}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {t.productShowcase.seoParagraph}
          </p>
        </div>
        <motion.div
          className="w-full flex justify-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible" // Changed to whileInView
          transition={{ delay: 0.2 }}
        >
          <SwipeableProductCarousel t={t} openOrderModal={openOrderModal} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductShowcaseSection;
