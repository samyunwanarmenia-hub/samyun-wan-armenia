"use client";

import { motion } from 'framer-motion';
import SwipeableProductCarousel from './SwipeableProductCarousel';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';

const ProductShowcaseSection = () => {
  const { t, openOrderModal } = useLayoutContext();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
          subtitle={t.hero.tagline}
          // Removed t={t}
        />
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