import { FaInstagram, FaFacebookF, FaWhatsapp, FaPaperPlane } from 'react-icons/fa'; // Changed to Font Awesome icons
// import { motion } from 'framer-motion'; // Removed motion
import { TranslationKeys, SectionId } from '../types/global';
import OptimizedImage from './OptimizedImage';

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
    <footer className="bg-neutral-dark text-pure-white py-10"> {/* Updated colors */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-5">
              <a href="#home" className="flex items-center">
                <OptimizedImage 
                  src="/images/logo.jpg" 
                  alt="Samyun Wan Armenia Logo" 
                  className="h-9 w-auto"
                  loading="lazy"
                />
              </a>
            </div>
            <p className="text-neutral-medium text-sm leading-relaxed"> {/* Updated colors */}
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3 font-display">{t.footer.about}</h4> {/* Updated font family */}
            <ul className="space-y-1.5 text-neutral-medium text-sm"> {/* Updated colors */}
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-primary-green transition-colors transform hover:scale-105" // Updated colors and added manual transitions
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a 
                  href="#benefits" 
                  onClick={(e) => handleLinkClick(e, 'benefits')}
                  className="hover:text-primary-green transition-colors transform hover:scale-105" // Updated colors and added manual transitions
                >
                  {t.nav.benefits}
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  onClick={(e) => handleLinkClick(e, 'testimonials')}
                  className="hover:text-primary-green transition-colors transform hover:scale-105" // Updated colors and added manual transitions
                >
                  {t.nav.testimonials}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="hover:text-primary-green transition-colors transform hover:scale-105" // Updated colors and added manual transitions
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3 font-display">{t.footer.products}</h4> {/* Updated font family */}
            <ul className="space-y-1.5 text-neutral-medium text-sm"> {/* Updated colors */}
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => handleLinkClick(e, 'products')}
                  className="hover:text-primary-green transition-colors transform hover:scale-105" // Updated colors and added manual transitions
                >
                  {t.footer.productOriginal}
                </a>
              </li>
              <li>
                <a 
                  href="#authenticity" 
                  onClick={(e) => handleLinkClick(e, 'authenticity')}
                  className="hover:text-primary-green transition-colors transform hover:scale-105" // Updated colors and added manual transitions
                >
                  {t.footer.productAuthenticity}
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="hover:text-primary-green transition-colors transform hover:scale-105" // Updated colors and added manual transitions
                >
                  {t.footer.productUsage}
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-primary-green transition-colors transform hover:scale-105" // Updated colors and added manual transitions
                >
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3 font-display">{t.footer.follow}</h4> {/* Updated font family */}
            <div className="flex space-x-3 mb-3">
              <a 
                href="https://www.instagram.com/samyunwanarmenia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125" // Added manual transitions
              >
                <FaInstagram className="w-5 h-5 text-pure-white" /> {/* Changed to Font Awesome icon */}
              </a>
              <a 
                href="https://www.facebook.com/samyunwanarmenia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125" // Added manual transitions
              >
                <FaFacebookF className="w-5 h-5 text-pure-white" /> {/* Changed to Font Awesome icon */}
              </a>
              <a 
                href="https://t.me/samyunwanarmenia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125" // Added manual transitions
              >
                <FaPaperPlane className="w-5 h-5 text-pure-white" /> {/* Changed to Font Awesome icon */}
              </a>
              <a 
                href="https://wa.me/37496653666" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 bg-gradient-to-r from-primary-green to-secondary-green rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125" // Updated colors and added manual transitions
              >
                <FaWhatsapp className="w-5 h-5 text-pure-white" /> {/* Changed to Font Awesome icon */}
              </a>
            </div>
            <p className="text-neutral-medium text-xs">@samyunwanarmenia</p> {/* Updated colors */}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-neutral-medium text-sm"> {/* Updated colors */}
            © 2025 Samyun Wan Armenia. {t.footer.allRightsReserved} | {t.footer.officialRepresentative}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;