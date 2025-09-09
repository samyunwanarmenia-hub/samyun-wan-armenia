"use client"; // This is a client component

import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useLayoutContext } from '@/context/LayoutContext';
import Link from 'next/link';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import LanguageSwitcher from './LanguageSwitcher';
import { MobileNavProps, TranslationKeys } from '@/types/global';
import { navigationSections } from '@/data/navigationSections';

const MobileNav: React.FC<MobileNavProps> = ({ mobileIconColorClass = 'bg-white dark:bg-gray-300' }) => { // Default to white for transparent/dark background
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const [isOpen, setIsOpen] = useState(false);
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Variants for the hamburger lines
  const line1Variants = {
    closed: { y: 0, rotate: 0 },
    open: { y: 8, rotate: 45 },
  };

  const line2Variants = {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0 },
  };

  const line3Variants = {
    closed: { y: 0, rotate: 0 },
    open: { y: -8, rotate: -45 },
  };

  // Variants for the mobile menu itself
  const menuVariants = {
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const menuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  return (
    <>
      <motion.button
        onClick={toggleMenu}
        className="md:hidden p-2 relative w-9 h-9 flex flex-col justify-around items-center text-white dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md z-50"
        aria-label={isOpen ? t.nav.close : t.nav.open}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.span
          className={`block h-0.5 w-full rounded-full ${mobileIconColorClass}`} // Use dynamic color class
          variants={line1Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={`block h-0.5 w-full rounded-full ${mobileIconColorClass}`} // Use dynamic color class
          variants={line2Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className={`block h-0.5 w-full rounded-full ${mobileIconColorClass}`} // Use dynamic color class
          variants={line3Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen bg-gray-50 dark:bg-gray-900 z-40 overflow-y-auto shadow-lg max-w-[300px]" // Changed bg-white to bg-gray-50
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMenu}
                className="text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
                aria-label={t.nav.close}
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-start space-y-6 pt-10 pb-6 pl-12">
              {navigationSections.map((section) => (
                <motion.div
                  key={section.id}
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
                    onClick={() => setIsOpen(false)}
                    className={`${getLinkClasses(section.id)} text-gray-700 dark:text-gray-300`}
                  >
                    {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} className="mt-4">
                <ThemeToggle onClose={() => setIsOpen(false)} />
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <LanguageSwitcher />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;