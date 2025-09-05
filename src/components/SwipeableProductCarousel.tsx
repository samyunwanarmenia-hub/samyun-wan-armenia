import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { TranslationKeys, ProductShowcaseItem, OpenOrderModalFunction } from '../types/global';
import { productShowcaseData } from '../data/productShowcaseData';
import OptimizedImage from './OptimizedImage';
import CallToActionButton from './CallToActionButton';

interface SwipeableProductCarouselProps {
  t: TranslationKeys;
  openOrderModal: OpenOrderModalFunction;
}

const SwipeableProductCarousel: React.FC<SwipeableProductCarouselProps> = ({ t, openOrderModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % productShowcaseData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex: number) =>
      (prevIndex - 1 + productShowcaseData.length) % productShowcaseData.length
    );
  };

  const currentProduct: ProductShowcaseItem = productShowcaseData[currentIndex];

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700 overflow-hidden min-h-[450px]">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex flex-col items-center justify-center p-6 group"
        >
          <motion.div
            className="relative w-full h-full max-w-[300px] max-h-[450px] p-6 rounded-2xl overflow-hidden
                       bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                       flex flex-col items-center justify-center text-center"
            initial={{ boxShadow: "none" }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1), var(--tw-shadow-glow-green)" // More pronounced shadow with glow
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span
              className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500
                         bg-[radial-gradient(circle_at_80px_40px,_rgba(255,255,255,0.8),_transparent)]
                         opacity-0 group-hover:opacity-40"
            />

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="mb-4"
            >
              <OptimizedImage
                src={currentProduct.src}
                alt={currentProduct.alt}
                className="w-28 h-28 object-contain drop-shadow-lg" 
                loading="eager"
                sizes="112px" 
              />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2 text-center">
              {t.productShowcase[currentProduct.labelKey]}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 text-center">
              {t.productShowcase[currentProduct.descKey]}
            </p>
            <p className="text-2xl font-extrabold text-primary-600 dark:text-primary-400 mb-4">
              {currentProduct.price.toLocaleString()} AMD
            </p>
            <CallToActionButton
              onClick={() => openOrderModal(currentProduct.labelKey)}
              icon={ShoppingCart}
              variant="primary"
              size="md"
              gaEvent={{ category: 'Order', action: 'Click_ProductCarousel_Order', label: currentProduct.labelKey }}
              ymEvent={{ category: 'Order', action: 'Click_ProductCarousel_Order', label: currentProduct.labelKey }}
            >
              {t.productShowcase[currentProduct.buttonTextKey]}
            </CallToActionButton>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        onClick={handlePrev}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md text-gray-700 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-20"
        aria-label="Previous product"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>
      <motion.button
        onClick={handleNext}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md text-gray-700 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-20"
        aria-label="Next product"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default SwipeableProductCarousel;