import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Changed to Font Awesome icons
// import { motion, AnimatePresence } from 'framer-motion'; // Removed motion, AnimatePresence
import { TranslationKeys, SectionId } from '../types/global';
import OptimizedImage from './OptimizedImage';

interface MobileNavProps {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: TranslationKeys;
  getLinkClasses: (sectionId: SectionId) => string;
}

const MobileNav = ({ currentLang, setCurrentLang, t, getLinkClasses }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Removed framer-motion variants, using conditional rendering and AOS for menu entry/exit
  // For a simple mobile menu, direct conditional rendering with CSS transitions is sufficient.

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="text-neutral-dark focus:outline-none p-2 rounded-md hover:bg-neutral-light transition-colors"> {/* Updated colors */}
        <div
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        >
          {isOpen ? <FaTimes className="w-7 h-7" /> : <FaBars className="w-7 h-7" />} {/* Changed to Font Awesome icons */}
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-pure-white z-50 flex flex-col p-5" // Updated colors
          data-aos="slide-left" // AOS animation for mobile menu
          data-aos-duration="300"
        >
          <div className="flex items-center justify-between mb-6">
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
            <button onClick={toggleMenu} className="text-neutral-dark focus:outline-none p-2 rounded-md hover:bg-neutral-light transition-colors"> {/* Updated colors */}
              <div
                className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
              >
                <FaTimes className="w-7 h-7" />
              </div>
            </button>
          </div>

          <nav className="flex flex-col space-y-4 text-xl font-semibold flex-grow">
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, 'home')} 
              className={getLinkClasses('home')}
            >
              {t.nav.home}
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleLinkClick(e, 'about')} 
              className={getLinkClasses('about')}
            >
              {t.nav.about}
            </a>
            <a 
              href="#benefits" 
              onClick={(e) => handleLinkClick(e, 'benefits')} 
              className={getLinkClasses('benefits')}
            >
              {t.nav.benefits}
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => handleLinkClick(e, 'testimonials')} 
              className={getLinkClasses('testimonials')}
            >
              {t.nav.testimonials}
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleLinkClick(e, 'faq')} 
              className={getLinkClasses('faq')}
            >
              {t.nav.faq}
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleLinkClick(e, 'contact')} 
              className={getLinkClasses('contact')}
            >
              {t.nav.contact}
            </a>
          </nav>

          <div className="mt-6">
            <select 
              value={currentLang} 
              onChange={(e) => {
                setCurrentLang(e.target.value);
                setIsOpen(false);
              }}
              className="bg-neutral-light border border-gray-200 rounded px-3 py-2 text-base text-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary-green w-full" // Updated colors
            >
              <option value="hy">🇦🇲 ՀԱՅ</option>
              <option value="ru">🇷🇺 РУС</option>
              <option value="en">🇺🇸 ENG</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;