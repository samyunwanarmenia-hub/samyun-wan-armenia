"use client"; // This is a client component

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { NavbarProps, TranslationKeys } from '@/types/global';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLayoutContext } from '@/context/LayoutContext';
import { navigationSections } from '@/data/navigationSections';
import { useTheme } from '@/context/ThemeContext'; // Import useTheme

const Navbar: React.FC<NavbarProps> = () => {
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const { theme } = useTheme(); // Get current theme
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getNavbarStyles = useCallback(() => {
    const scroll = currentScrollY;
    let opacity = 0;

    // Define scroll thresholds and corresponding opacities for the black background
    // 0-30px: opaque (1)
    // 30-50px: 1 -> 0.6
    // 50-70px: 0.6 -> 0.25
    // 70-90px: 0.25 -> 0.1
    // 90-100px: 0.1 -> 0
    // >100px: transparent (0)
    const thresholds = [0, 30, 50, 70, 90, 100]; // Scroll positions in pixels
    const opacities = [1, 1, 0.6, 0.25, 0.1, 0]; // Corresponding background opacities (1 = opaque, 0 = transparent)

    // Interpolate opacity based on scroll position
    if (scroll <= thresholds[0]) {
      opacity = opacities[0];
    } else if (scroll >= thresholds[thresholds.length - 1]) {
      opacity = opacities[opacities.length - 1];
    } else {
      for (let i = 0; i < thresholds.length - 1; i++) {
        if (scroll >= thresholds[i] && scroll < thresholds[i + 1]) {
          const startScroll = thresholds[i];
          const endScroll = thresholds[i + 1];
          const startOpacity = opacities[i];
          const endOpacity = opacities[i + 1];

          // Linear interpolation
          opacity = startOpacity + (endOpacity - startOpacity) * ((scroll - startScroll) / (endScroll - startScroll));
          break;
        }
      }
    }

    // Ensure opacity is within [0, 1]
    opacity = Math.max(0, Math.min(1, opacity));

    // Background color (always black, with dynamic opacity)
    const backgroundColor = `rgba(0, 0, 0, ${opacity})`;

    // Text and mobile icon color: always light for visibility against black/colorful background
    const textColorClass = 'text-white dark:text-gray-50';
    const mobileIconColorClass = 'bg-white dark:bg-gray-300';

    return { backgroundColor, textColorClass, mobileIconColorClass };
  }, [currentScrollY, theme]); // Depend on currentScrollY and theme

  const { backgroundColor, textColorClass, mobileIconColorClass } = getNavbarStyles();

  return (
    <nav style={{ backgroundColor }} className={`fixed top-0 w-full z-50 transition-all duration-300 py-4`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href={getHomePath()} className="flex items-center">
              <span className={`text-base sm:text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] sm:max-w-none ${textColorClass}`}>
                {t.hero.title}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationSections.map((section) => (
              <motion.div
                key={section.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
                  className={`${getLinkClasses(section.id)} text-base ${textColorClass}`}
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
          <MobileNav mobileIconColorClass={mobileIconColorClass} /> {/* Pass color class to MobileNav */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;