import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion'; // Removed motion, AnimatePresence
import { FaArrowUp } from 'react-icons/fa'; // Changed to Font Awesome icon

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Removed framer-motion variants, AOS will handle visibility if needed, or simple CSS transition
  // For a simple show/hide, direct conditional rendering with CSS transitions is sufficient.

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-50 p-3 bg-gradient-to-r from-primary-green to-secondary-green text-pure-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-opacity-75 transition-all duration-300 transform hover:scale-110 active:scale-95" // Updated colors and added manual transitions
          data-aos="fade-up" // AOS animation
          data-aos-anchor-placement="bottom-bottom"
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;