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
import { useTheme } from '@/context/ThemeContext'; // Import useTheme to get current theme
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv

const MobileNav: React.FC<MobileNavProps> = ({ scrolled }) => {
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const { theme } = useTheme(); // Get current theme for dynamic icon color
  const [isOpen, setIsOpen] = useState(false);
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);

  const toggleMenu = () => setIsOpen(!isOpen);

  const iconColorClass = scrolled
    ? (theme === 'dark' ? 'bg-gray-200' : 'bg-gray-800')
    : (theme === 'dark' ? 'bg-gray-200' : 'bg-gray-700');

  const safeAreaMenuStyle = {
    paddingTop: 'calc(env(safe-area-inset-top) + 12px)',
    paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
  };

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
        className="md:hidden relative w-11 h-11 inline-flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/70 dark:border-gray-700/80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-primary-500/70 z-50"
        aria-label={isOpen ? t.nav.close : t.nav.open}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.span
          className={`block h-0.5 w-6 rounded-full ${iconColorClass}`}
          variants={line1Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={`block h-0.5 w-6 rounded-full ${iconColorClass}`}
          variants={line2Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className={`block h-0.5 w-6 rounded-full ${iconColorClass}`}
          variants={line3Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 h-screen w-[82vw] max-w-[360px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-r border-gray-200/70 dark:border-gray-800/70 shadow-2xl z-40"
            style={safeAreaMenuStyle}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between px-6">
                <Link
                  href={getHomePath()}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-50"
                >
                  {t.hero.title}
                </Link>
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
                  aria-label={t.nav.close}
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col items-start gap-5 px-6 py-8 overflow-y-auto">
                {navigationSections.map((section) => (
                  <InteractiveDiv
                    key={section.id}
                    variants={menuItemVariants}
                    whileHoverScale={1.05}
                    hoverY={0}
                    hoverShadow="none"
                  >
                    <Link
                      href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
                      onClick={() => setIsOpen(false)}
                      className={`${getLinkClasses(section.id)} text-base font-medium tracking-tight text-gray-800 dark:text-gray-200`}
                    >
                      {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                    </Link>
                  </InteractiveDiv>
                ))}
                <motion.div variants={menuItemVariants} className="flex items-center gap-3 pt-3 border-t border-gray-100/80 dark:border-gray-800/70 w-full">
                  <LanguageSwitcher />
                  <ThemeToggle onClose={() => setIsOpen(false)} />
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
