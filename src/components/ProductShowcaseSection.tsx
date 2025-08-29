import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility, OpenOrderModalFunction } from '../types/global';
import SwipeableProductCarousel from './SwipeableProductCarousel';
import AuthenticityInfo from './AuthenticityInfo';

interface ProductShowcaseSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
  openOrderModal: OpenOrderModalFunction;
  openLoadingLinkModal: () => void;
  openAuthenticityModal: () => void;
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  t,
  isVisible,
  openOrderModal,
  openLoadingLinkModal,
  openAuthenticityModal,
}) => {
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
      className="relative py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-800 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['products'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50 dark:from-gray-700/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Removed the title and subtitle as requested */}
        {/*
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['products'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-5">
            {t.gallery.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>
        */}

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            variants={itemVariants}
            initial="hidden"
            animate={isVisible['products'] ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <SwipeableProductCarousel t={t} openOrderModal={openOrderModal} />
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            variants={itemVariants}
            initial="hidden"
            animate={isVisible['products'] ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <AuthenticityInfo
              t={t}
              openLoadingLinkModal={openLoadingLinkModal}
              openAuthenticityModal={openAuthenticityModal}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductShowcaseSection;