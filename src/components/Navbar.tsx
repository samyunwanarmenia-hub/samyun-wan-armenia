"use client"; // This is a client component

import { useState, useEffect } from 'react';
import { NavbarProps, TranslationKeys } from '@/types/global';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLayoutContext } from '@/context/LayoutContext';
import { navigationSections } from '@/data/navigationSections';
import { useTheme } from '@/context/ThemeContext'; // Import useTheme
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv

const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const { theme: _theme } = useTheme(); // Get current theme
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

  // Determine text color based on scroll and theme
  const textColorClass = scrolled 
    ? 'text-gray-800 dark:text-gray-50' // Darker text on scrolled background
    : 'text-gray-700 dark:text-gray-300'; // Lighter text on transparent background

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-50/95 shadow-lg dark:bg-gray-800/95 dark:shadow-xl py-2' : 'bg-transparent py-4'}`}>
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
              <InteractiveDiv
                key={section.id}
                whileHoverScale={1.1}
                whileTapScale={0.95}
                hoverY={0}
                hoverShadow="none"
              >
                <Link
                  href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
                  className={`${getLinkClasses(section.id)} text-base ${textColorClass}`}
                >
                  {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                </Link>
              </InteractiveDiv>
            ))}
          </div>

          {/* Language Selector and Theme Toggle for Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation (Hamburger Menu) */}
          <MobileNav scrolled={scrolled} /> {/* Pass scrolled state to MobileNav */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;