import { Leaf, Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, SectionId } from '../types/global'; // Import SectionId

interface FooterProps {
  t: TranslationKeys;
}

const Footer = ({ t }: FooterProps) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10"> {/* Reduced py-12 to py-10 */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 mb-6"> {/* Reduced gap-8 to gap-6, mb-8 to mb-6 */}
          <div>
            <div className="flex items-center space-x-2 mb-5"> {/* Reduced mb-6 to mb-5 */}
              <div className="w-9 h-9 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center"> {/* Reduced w/h-10 to w/h-9 */}
                <Leaf className="w-5 h-5" /> {/* Reduced w/h-6 to w/h-5 */}
              </div>
              <span className="text-lg font-bold">Samyun Wan Armenia</span> {/* Reduced text-xl to text-lg */}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed"> {/* Reduced text size */}
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3">{t.footer.about}</h4> {/* Reduced text-lg to text-base, mb-4 to mb-3 */}
            <ul className="space-y-1.5 text-gray-300 text-sm"> {/* Reduced space-y-2 to space-y-1.5, reduced text size */}
              <li>
                <motion.a 
                  href="#about" 
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-primary-500 transition-colors" // Changed hover color to green
                  whileHover={{ scale: 1.05, color: '#22c55e' }} // Changed hover color to green
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t.nav.about} {/* Reusing nav.about for 'Our Story' */}
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#benefits" 
                  onClick={(e) => handleLinkClick(e, 'benefits')}
                  className="hover:text-primary-500 transition-colors" // Changed hover color to green
                  whileHover={{ scale: 1.05, color: '#22c55e' }} // Changed hover color to green
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t.nav.benefits} {/* Reusing nav.benefits */}
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#testimonials" 
                  onClick={(e) => handleLinkClick(e, 'testimonials')}
                  className="hover:text-primary-500 transition-colors" // Changed hover color to green
                  whileHover={{ scale: 1.05, color: '#22c55e' }} // Changed hover color to green
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t.nav.testimonials} {/* Reusing nav.testimonials */}
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#contact" 
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="hover:text-primary-500 transition-colors" // Changed hover color to green
                  whileHover={{ scale: 1.05, color: '#22c55e' }} // Changed hover color to green
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t.nav.contact} {/* Reusing nav.contact */}
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3">{t.footer.products}</h4> {/* Reduced text-lg to text-base, mb-4 to mb-3 */}
            <ul className="space-y-1.5 text-gray-300 text-sm"> {/* Reduced space-y-2 to space-y-1.5, reduced text size */}
              <li>
                <motion.a 
                  href="#products" 
                  onClick={(e) => handleLinkClick(e, 'products')}
                  className="hover:text-primary-500 transition-colors" // Changed hover color to green
                  whileHover={{ scale: 1.05, color: '#22c55e' }} // Changed hover color to green
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t.footer.productOriginal}
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#authenticity" 
                  onClick={(e) => handleLinkClick(e, 'authenticity')}
                  className="hover:text-primary-500 transition-colors" // Changed hover color to green
                  whileHover={{ scale: 1.05, color: '#22c55e' }} // Changed hover color to green
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t.footer.productAuthenticity}
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#" // Placeholder for usage guide, if a dedicated section is added later
                  className="hover:text-primary-500 transition-colors" // Changed hover color to green
                  whileHover={{ scale: 1.05, color: '#22c55e' }} // Changed hover color to green
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t.footer.productUsage}
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#faq" 
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-primary-500 transition-colors" // Changed hover color to green
                  whileHover={{ scale: 1.05, color: '#22c55e' }} // Changed hover color to green
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t.nav.faq} {/* Reusing nav.faq */}
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3">{t.footer.follow}</h4> {/* Reduced text-lg to text-base, mb-4 to mb-3 */}
            <div className="flex space-x-3 mb-3"> {/* Reduced space-x-4 to space-x-3, mb-4 to mb-3 */}
              <motion.a 
                href="https://www.instagram.com/samyunwanarmenia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center" // Reduced w/h-10 to w/h-9
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Instagram className="w-5 h-5" /> {/* Reduced w/h-5 to w/h-5 (already small) */}
              </motion.a>
              <motion.a 
                href="https://www.facebook.com/samyunwanarmenia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center" // Reduced w/h-10 to w/h-9
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Facebook className="w-5 h-5" /> {/* Reduced w/h-5 to w/h-5 (already small) */}
              </motion.a>
              <motion.a 
                href="https://t.me/samyunwanarmenia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center" // Reduced w/h-10 to w/h-9
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Send className="w-5 h-5" /> {/* Reduced w/h-5 to w/h-5 (already small) */}
              </motion.a>
              <motion.a 
                href="https://wa.me/37496653666" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 bg-gradient-to-r from-primary-500 to-emerald-600 rounded-full flex items-center justify-center" // Reduced w/h-10 to w/h-9
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MessageCircle className="w-5 h-5" /> {/* Reduced w/h-5 to w/h-5 (already small) */}
              </motion.a>
            </div>
            <p className="text-gray-300 text-xs">@samyunwanarmenia</p> {/* Reduced text-sm to text-xs */}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center"> {/* Reduced pt-8 to pt-6 */}
          <p className="text-gray-300 text-sm"> {/* Reduced text size */}
            © 2025 Samyun Wan Armenia. {t.footer.allRightsReserved} | {t.footer.officialRepresentative}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;