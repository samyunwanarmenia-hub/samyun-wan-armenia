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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productShowcaseData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
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
    <div className="relative w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 overflow-hidden">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
        >
          <OptimizedImage
            src={currentProduct.src}
            alt={currentProduct.alt}
            className="w-40 h-40 object-contain mb-4 drop-shadow-lg"
            loading="eager"
          />
          <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
            {t.productShowcase[currentProduct.labelKey]}
          </h3>
          <p className="text-gray-700 text-sm mb-4 text-center">
            {t.productShowcase[currentProduct.descKey]}
          </p>
          <p className="text-2xl font-extrabold text-primary-600 mb-4">
            {currentProduct.price.toLocaleString()} AMD
          </p>
          <CallToActionButton
            onClick={() => openOrderModal(currentProduct.labelKey)}
            icon={ShoppingCart}
            variant="primary"
            size="md"
          >
            {t.productShowcase[currentProduct.buttonTextKey]}
          </CallToActionButton>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-gray-100 transition-colors z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-gray-100 transition-colors z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SwipeableProductCarousel;