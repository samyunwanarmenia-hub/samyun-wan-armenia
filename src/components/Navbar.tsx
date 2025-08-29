import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion'; // Removed motion
import { TranslationKeys } from '../types/global';
import MobileNav from './MobileNav';
import useActiveSection from '../hooks/useActiveSection';
import OptimizedImage from './OptimizedImage';

interface NavbarProps {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: TranslationKeys;
  // isVisible: IntersectionObserverVisibility; // Removed isVisible
}

const Navbar = ({ currentLang, setCurrentLang, t }: NavbarProps) => { // Removed isVisible from props
  const [scrolled, setScrolled] = useState(false);
  const { getLinkClasses } = useActiveSection(); // Removed isVisible from hook

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-pure-white/95 shadow-lg' : 'bg-pure-white/85'}`}> {/* Updated colors */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <a href="#home" className="flex items-center">
              <OptimizedImage 
                src="/images/logo.jpg" 
                alt="Samyun Wan Armenia Logo" 
                className="h-10 w-auto"
                loading="eager"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#home" 
              className={getLinkClasses('home')}
            >
              {t.nav.home}
            </a>
            <a 
              href="#about" 
              className={getLinkClasses('about')}
            >
              {t.nav.about}
            </a>
            <a 
              href="#benefits" 
              className={getLinkClasses('benefits')}
            >
              {t.nav.benefits}
            </a>
            <a 
              href="#testimonials" 
              className={getLinkClasses('testimonials')}
            >
              {t.nav.testimonials}
            </a>
            <a 
              href="#faq" 
              className={getLinkClasses('faq')}
            >
              {t.nav.faq}
            </a>
            <a 
              href="#contact" 
              className={getLinkClasses('contact')}
            >
              {t.nav.contact}
            </a>
          </div>

          {/* Language Selector for Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <select 
              value={currentLang} 
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-neutral-light border border-gray-200 rounded px-2.5 py-1 text-sm text-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary-green" // Updated colors
            >
              <option value="hy">🇦🇲 ՀԱՅ</option>
              <option value="ru">🇷🇺 РУС</option>
              <option value="en">🇺🇸 ENG</option>
            </select>
          </div>

          {/* Mobile Navigation (Hamburger Menu) */}
          <MobileNav currentLang={currentLang} setCurrentLang={setCurrentLang} t={t} getLinkClasses={getLinkClasses} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;