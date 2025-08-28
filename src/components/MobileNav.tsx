import { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TranslationKeys, SectionId } from '../types/global';

interface MobileNavProps {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: TranslationKeys;
  getLinkClasses: (sectionId: SectionId) => string; // New prop
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
    setIsOpen(false); // Close menu after clicking a link
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%", transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { x: "100%", transition: { duration: 0.3 } }
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 }
  };

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"> {/* Changed text and hover background color */}
        <motion.div
          variants={iconVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col p-6" // Changed background to white
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Samyun Wan Armenia</span> {/* Changed text color to gray-900 */}
              </div>
              <button onClick={toggleMenu} className="text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"> {/* Changed text and hover background color */}
                <motion.div
                  variants={iconVariants}
                  animate={isOpen ? "open" : "closed"}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7" />
                </motion.div>
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-xl font-semibold flex-grow">
              <motion.a 
                href="#home" 
                onClick={(e) => handleLinkClick(e, 'home')} 
                className={getLinkClasses('home')} // Reverted to original getLinkClasses
                whileHover={{ scale: 1.05, color: '#ef4444' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t.nav.home}
              </motion.a>
              <motion.a 
                href="#about" 
                onClick={(e) => handleLinkClick(e, 'about')} 
                className={getLinkClasses('about')} // Reverted to original getLinkClasses
                whileHover={{ scale: 1.05, color: '#ef4444' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t.nav.about}
              </motion.a>
              <motion.a 
                href="#benefits" 
                onClick={(e) => handleLinkClick(e, 'benefits')} 
                className={getLinkClasses('benefits')} // Reverted to original getLinkClasses
                whileHover={{ scale: 1.05, color: '#ef4444' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t.nav.benefits}
              </motion.a>
              <motion.a 
                href="#testimonials" 
                onClick={(e) => handleLinkClick(e, 'testimonials')} 
                className={getLinkClasses('testimonials')} // Reverted to original getLinkClasses
                whileHover={{ scale: 1.05, color: '#ef4444' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t.nav.testimonials}
              </motion.a>
              <motion.a 
                href="#faq" 
                onClick={(e) => handleLinkClick(e, 'faq')} 
                className={getLinkClasses('faq')} // Reverted to original getLinkClasses
                whileHover={{ scale: 1.05, color: '#ef4444' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t.nav.faq}
              </motion.a>
              <motion.a 
                href="#contact" 
                onClick={(e) => handleLinkClick(e, 'contact')} 
                className={getLinkClasses('contact')} // Reverted to original getLinkClasses
                whileHover={{ scale: 1.05, color: '#ef4444' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t.nav.contact}
              </motion.a>
            </nav>

            <div className="mt-8">
              {/* Changed background, border, and text color */}
              <select 
                value={currentLang} 
                onChange={(e) => {
                  setCurrentLang(e.target.value);
                  setIsOpen(false);
                }}
                className="bg-gray-100 border border-gray-200 rounded px-4 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 w-full" 
              >
                <option value="hy">🇦🇲 ՀԱՅ</option>
                <option value="ru">🇷🇺 РУС</option>
                <option value="en">🇺🇸 ENG</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;