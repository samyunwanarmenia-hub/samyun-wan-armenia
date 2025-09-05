"use client"; // This is a client component

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavbarProps, TranslationKeys } from '@/types/global';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLayoutContext } from '@/context/LayoutContext';
import { navigationSections } from '@/data/navigationSections'; // Import centralized data

const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-lg dark:bg-gray-800/95 dark:shadow-xl py-2' : 'bg-white/85 dark:bg-gray-900/85 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href={getHomePath()} className="flex items-center">
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-50 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] sm:max-w-none"> {/* Adjusted text size and added ellipsis for small screens */}
                {t.hero.title}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationSections.map((section) => (
              <motion.div
                key={section.id}
                whileHover={{ scale: 1.1, color: '#22c55e' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
                  className={`${getLinkClasses(section.id)} text-base`}
                >
                  {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Language Selector and Theme Toggle for Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation (Hamburger Menu) */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;