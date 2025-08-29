import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import CallToActionButton from './CallToActionButton';
import { TranslationKeys, OpenOrderModalFunction } from '../types/global';
import { productShowcaseData } from '../data/productShowcaseData';

interface SwipeableProductCarouselProps {
  t: TranslationKeys;
  openOrderModal: OpenOrderModalFunction;
}

const SwipeableProductCarousel: React.FC<SwipeableProductCarouselProps> = ({ t, openOrderModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const products = productShowcaseData;
  const numProducts = products.length;

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Determine if we should snap to the next/previous item or stay
    // Threshold for swipe: 50px or a certain velocity
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    if (offset < -swipeThreshold || velocity < -velocityThreshold) {
      // Swiped left
      setCurrentIndex((prev) => Math.min(prev + 1, numProducts - 1));
    } else if (offset > swipeThreshold || velocity > velocityThreshold) {
      // Swiped right
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }

    // Animate to the new position
    x.set(-currentIndex * (constraintsRef.current?.offsetWidth || 0));
  };

  // Calculate the x position for each product based on currentIndex
  const productX = useTransform(x, (latestX) => latestX + (-currentIndex * (constraintsRef.current?.offsetWidth || 0)));

  return (
    <div className="relative w-full max-w-sm mx-auto overflow-hidden">
      <motion.div
        ref={constraintsRef}
        className="flex cursor-grab active:cursor-grabbing"
        style={{ x: productX }}
        drag="x"
        dragConstraints={{
          left: -((numProducts - 1) * (constraintsRef.current?.offsetWidth || 0)),
          right: 0,
        }}
        onDragEnd={handleDragEnd}
        dragElastic={0.2}
      >
        {products.map((product, _index) => (
          <motion.div
            key={product.labelKey}
            className="flex-shrink-0 w-full bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 hover:shadow-glow-green"
            style={{ width: constraintsRef.current?.offsetWidth || '100%' }} // Ensure each item takes full width
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative">
              <div className="relative w-64 h-64 mx-auto mb-5 rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none"></div>
              </div>

              <div className="text-center mb-5">
                <h3 className="text-gray-900 text-2xl font-bold mb-1.5">{t.productShowcase[product.labelKey]}</h3>
                <p className="text-gray-700 text-base mb-2.5">{t.productShowcase[product.descKey]}</p>
                <p className="text-green-600 text-2xl font-bold mb-5">{product.price.toLocaleString()} AMD</p> {/* Исправлено: удалена лишняя '}' */}
                <CallToActionButton
                  onClick={() => openOrderModal(product.labelKey)}
                  icon={ShoppingCart}
                  size="sm"
                >
                  {t.productShowcase[product.buttonTextKey]}
                </CallToActionButton>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-primary-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableProductCarousel;