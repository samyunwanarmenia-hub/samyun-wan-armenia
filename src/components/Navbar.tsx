import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility } from '../types/global';
import MobileNav from './MobileNav';
import useActiveSection from '../hooks/useActiveSection';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
}

const Navbar = ({ currentLang, setCurrentLang, t, isVisible }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { getLinkClasses } = useActiveSection(isVisible);

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
            <a href="#home" className="flex items-center">
              <span className="text-gray-900 dark:text-gray-50 text-xl font-bold">
                {t.hero.title}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.a 
              href="#home" 
              className={getLinkClasses('home')}
              whileHover={{ scale: 1.1, color: '#22c55e' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.home}
            </motion.a>
            <motion.a 
              href="#about" 
              className={getLinkClasses('about')}
              whileHover={{ scale: 1.1, color: '#22c55e' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.about}
            </motion.a>
            <motion.a 
              href="#benefits" 
              className={getLinkClasses('benefits')}
              whileHover={{ scale: 1.1, color: '#22c55e' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.benefits}
            </motion.a>
            <motion.a 
              href="#testimonials" 
              className={getLinkClasses('testimonials')}
              whileHover={{ scale: 1.1, color: '#22c55e' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.testimonials}
            </motion.a>
            <motion.a 
              href="#faq" 
              className={getLinkClasses('faq')}
              whileHover={{ scale: 1.1, color: '#22c55e' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.faq}
            </motion.a>
            <motion.a 
              href="#contact" 
              className={getLinkClasses('contact')}
              whileHover={{ scale: 1.1, color: '#22c55e' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.contact}
            </motion.a>
          </div>

          {/* Language Selector and Theme Toggle for Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <select 
              value={currentLang} 
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2.5 py-1 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="hy">🇦🇲 ՀԱՅ</option>
              <option value="ru">🇷🇺 РУС</option>
              <option value="en">🇺🇸 ENG</option>
            </select>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation (Hamburger Menu) */}
          <MobileNav currentLang={currentLang} setCurrentLang={setCurrentLang} t={t} getLinkClasses={getLinkClasses} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;