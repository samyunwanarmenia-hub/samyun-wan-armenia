import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, PanInfo, animate } from 'framer-motion'; // Import `animate`
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
  const x = useMotionValue(0); // x now directly represents the container's offset
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0); // State to store the width of a single carousel item

  const products = productShowcaseData;
  const numProducts = products.length;

  // Effect to update itemWidth on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (constraintsRef.current) {
        const newWidth = constraintsRef.current.offsetWidth;
        setItemWidth(newWidth);
        // Immediately set x to the correct position without animation on resize
        x.set(-currentIndex * newWidth);
      }
    };

    updateWidth(); // Initial calculation
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [currentIndex, x]);

  // Effect to animate x when currentIndex changes (e.g., from dot clicks or drag end)
  useEffect(() => {
    if (itemWidth > 0) {
      const targetX = -currentIndex * itemWidth;
      // Use animate function for imperative animation
      animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [currentIndex, itemWidth, x]);


  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (itemWidth === 0) return; // Prevent dragging if itemWidth is not yet calculated

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    const swipeThreshold = 0.2 * itemWidth; // Swipe if moved 20% of item width
    const velocityThreshold = 500;

    let newIndex = currentIndex;

    if (offset < -swipeThreshold || velocity < -velocityThreshold) {
      // Swiped left
      newIndex = Math.min(currentIndex + 1, numProducts - 1);
    } else if (offset > swipeThreshold || velocity > velocityThreshold) {
      // Swiped right
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentIndex(newIndex);
    // Removed x.set here, as the useEffect above will handle animating x to the new position
  };

  return (
    <div className="relative w-full max-w-sm mx-auto overflow-hidden">
      <motion.div
        ref={constraintsRef}
        className="flex cursor-grab active:cursor-grabbing"
        style={{ x }} // Directly use x for motion
        drag="x"
        dragConstraints={{
          left: -(numProducts - 1) * itemWidth, // Calculate left constraint based on itemWidth
          right: 0,
        }}
        onDragEnd={handleDragEnd}
        dragElastic={0.2}
      >
        {products.map((product, _index) => (
          <motion.div
            key={product.labelKey}
            className="flex-shrink-0 w-full bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 hover:shadow-glow-green"
            style={{ width: itemWidth > 0 ? itemWidth : '100%' }} // Ensure each item takes the full calculated width
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
                <p className="text-green-600 text-2xl font-bold mb-5">{product.price.toLocaleString()} AMD</p>
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