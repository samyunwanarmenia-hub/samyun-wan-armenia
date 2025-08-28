import { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility } from '../types/global';
import MobileNav from './MobileNav';
import useActiveSection from '../hooks/useActiveSection'; // Import the new hook

interface NavbarProps {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility; // New prop
}

const Navbar = ({ currentLang, setCurrentLang, t, isVisible }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { getLinkClasses } = useActiveSection(isVisible); // Removed activeSection from destructuring

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) { // Add shadow/background after scrolling 50px
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 shadow-lg' : 'bg-black/85'}`}> {/* Changed background to black */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Samyun Wan Armenia</span> {/* Changed text color to white */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#home" 
              className={getLinkClasses('home')} // Reverted to original getLinkClasses which uses text-gray-300
              whileHover={{ scale: 1.1, color: '#ef4444' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.home}
            </motion.a>
            <motion.a 
              href="#about" 
              className={getLinkClasses('about')} // Reverted to original getLinkClasses
              whileHover={{ scale: 1.1, color: '#ef4444' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.about}
            </motion.a>
            <motion.a 
              href="#benefits" 
              className={getLinkClasses('benefits')} // Reverted to original getLinkClasses
              whileHover={{ scale: 1.1, color: '#ef4444' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.benefits}
            </motion.a>
            <motion.a 
              href="#testimonials" 
              className={getLinkClasses('testimonials')} // Reverted to original getLinkClasses
              whileHover={{ scale: 1.1, color: '#ef4444' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.testimonials}
            </motion.a>
            <motion.a 
              href="#faq" 
              className={getLinkClasses('faq')} // Reverted to original getLinkClasses
              whileHover={{ scale: 1.1, color: '#ef4444' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.faq}
            </motion.a>
            <motion.a 
              href="#contact" 
              className={getLinkClasses('contact')} // Reverted to original getLinkClasses
              whileHover={{ scale: 1.1, color: '#ef4444' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t.nav.contact}
            </motion.a>
          </div>

          {/* Language Selector for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Changed background, border, and text color */}
            <select 
              value={currentLang} 
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600" 
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