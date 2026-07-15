"use client"; // This is a client component

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useLayoutContext } from '@/context/LayoutContext';
import Link from 'next/link';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import LanguageSwitcher from './LanguageSwitcher';
import { MobileNavProps, TranslationKeys } from '@/types/global';
import { navigationSections } from '@/data/navigationSections';
import { usePathname } from 'next/navigation';

const MobileNav: React.FC<MobileNavProps> = () => {
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const [isOpen, setIsOpen] = useState(false);
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);
  const pathname = usePathname();
  const previousOverflow = useRef<string | null>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

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

  // Close the menu automatically on route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  // Prevent background scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }

    return () => {
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
        previousOverflow.current = null;
      }
    };
  }, [isOpen]);

  return (
    <>
      <motion.button
        onClick={toggleMenu}
        type="button"
        className="relative z-[130] inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-[var(--border-premium)] bg-[var(--surface-glass)] text-[var(--text-primary)] shadow-sm backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] lg:hidden"
        aria-label={isOpen ? t.nav.close : t.nav.open}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.span
          className="block h-0.5 w-6 rounded-full bg-current"
          variants={line1Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block h-0.5 w-6 rounded-full bg-current"
          variants={line2Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-0.5 w-6 rounded-full bg-current"
          variants={line3Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="mobile-nav-overlay"
              className="fixed inset-0 z-[115] bg-black/45 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              id="mobile-nav-drawer"
              className="premium-panel fixed left-0 top-0 z-[120] h-screen w-[88vw] max-w-[420px] rounded-none border-y-0 border-l-0 border-r border-[var(--border-premium)] bg-[var(--surface-glass)] shadow-2xl sm:max-w-[460px] lg:hidden"
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
                    onClick={closeMenu}
                    className="max-w-[240px] whitespace-normal text-base font-bold leading-snug tracking-tight text-[var(--text-primary)]"
                  >
                    {t.hero.title}
                  </Link>
                  <button
                    onClick={closeMenu}
                    className="rounded-lg bg-[var(--muted-surface)] p-2 text-[var(--text-primary)] transition hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    aria-label={t.nav.close}
                    type="button"
                  >
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex flex-col items-start gap-2 overflow-y-auto px-6 py-7" aria-label="Mobile">
                  {navigationSections.map(section => (
                    <motion.div key={section.id} variants={menuItemVariants} className="w-full">
                      <Link
                        href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
                        onClick={closeMenu}
                        className={`${getLinkClasses(section.id)} block rounded-lg border border-transparent px-4 py-3 text-base font-semibold tracking-tight text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--border-premium)] hover:bg-[var(--accent-soft)]`}
                      >
                        {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={menuItemVariants}
                    className="flex items-center gap-3 pt-3 border-t border-[var(--border-soft)] w-full"
                  >
                    <LanguageSwitcher />
                    <ThemeToggle onClose={closeMenu} />
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
