"use client"; // This is a client component

import { Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys } from '../types/global';
import Link from 'next/link';
import { useLayoutContext } from '@/context/LayoutContext';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import { navigationSections } from '@/data/navigationSections';

const Footer = () => {
  const { t, currentLang, openAuthenticityModal } = useLayoutContext();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);

  const aboutLinks = navigationSections.filter(s => ['about', 'benefits', 'testimonials', 'contact'].includes(s.id));
  const productLinks = navigationSections.filter(s => ['products', 'faq'].includes(s.id)); 

  return (
    <footer className="new-footer-style"> {/* Applied new custom class */}
      <div className="backdrop"></div> {/* Added backdrop div */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-space-evenly items-end w-full"> {/* Adjusted container for flex layout */}
        
        {/* Column 1: Brand Info */}
        <div className="footer-col"> {/* Applied new custom class */}
          <div className="flex items-center space-x-2 mb-5">
            <Link href={getHomePath()} className="flex items-center" aria-label={t.hero.title}>
              <h3 className="text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] sm:max-w-none"> {/* Using h3 for title, styled by new-footer-style h3 */}
                {t.hero.title}
              </h3>
            </Link>
          </div>
          <p className="text-gray-300"> {/* Styled by new-footer-style p */}
            {t.footer.description}
          </p>
        </div>

        {/* Column 2: About Links */}
        <div className="footer-col footer-col-bg"> {/* Applied new custom classes */}
          <h4 className="font-bold text-white mb-3"> {/* Styled by new-footer-style h3 */}
            {t.footer.about}
          </h4>
          <ul className="space-y-1.5 text-gray-300"> {/* Styled by new-footer-style p and a */}
            {aboutLinks.map((section) => (
              <li key={section.id}>
                <motion.div
                  whileHover={{ scale: 1.05, color: '#86b486' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link href={getSectionPath(section.id)} className="hover:text-primary-500 transition-colors" aria-label={t.nav[section.labelKey as keyof TranslationKeys['nav']]}>
                    {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Product Links */}
        <div className="footer-col footer-col-bg"> {/* Applied new custom classes */}
          <h4 className="font-bold text-white mb-3"> {/* Styled by new-footer-style h3 */}
            {t.footer.products}
          </h4>
          <ul className="space-y-1.5 text-gray-300"> {/* Styled by new-footer-style p and a */}
            {productLinks.map((section) => (
              <li key={section.id}>
                <motion.div
                  whileHover={{ scale: 1.05, color: '#86b486' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link href={getSectionPath(section.id)} className="hover:text-primary-500 transition-colors" aria-label={t.nav[section.labelKey as keyof TranslationKeys['nav']]}>
                    {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                  </Link>
                </motion.div>
              </li>
            ))}
            <li>
              <motion.button
                onClick={openAuthenticityModal}
                className="hover:text-primary-500 transition-colors text-sm"
                whileHover={{ scale: 1.05, color: '#86b486' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label={t.footer.productAuthenticity}
              >
                {t.footer.productAuthenticity}
              </motion.button>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.05, color: '#86b486' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link href="#" className="hover:text-primary-500 transition-colors" aria-label={t.footer.productUsage}>
                  {t.footer.productUsage}
                </Link>
              </motion.div>
            </li>
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div className="footer-col"> {/* Applied new custom class */}
          <h4 className="font-bold text-white mb-3"> {/* Styled by new-footer-style h3 */}
            {t.footer.follow}
          </h4>
          <div className="social-links-container mb-3"> {/* Applied new custom class */}
            <motion.a
              href="https://www.instagram.com/samyunwanarmenia"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-wrapper bg-gradient-to-r from-purple-600 to-pink-600"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label="Follow us on Instagram"
            >
              <Instagram className="social-link-icon" /> {/* Applied new custom class */}
            </motion.a>
            <motion.a
              href="https://www.facebook.com/samyunwanarmenia"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-wrapper bg-gradient-to-r from-blue-600 to-indigo-600"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label="Follow us on Facebook"
            >
              <Facebook className="social-link-icon" /> {/* Applied new custom class */}
            </motion.a>
            <motion.a
              href="https://t.me/samyunwanarmenia"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-wrapper bg-gradient-to-r from-sky-500 to-blue-500"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label="Join us on Telegram"
            >
              <Send className="social-link-icon" /> {/* Applied new custom class */}
            </motion.a>
            <motion.a
              href="https://wa.me/37496653666"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-wrapper bg-gradient-to-r from-primary-500 to-emerald-600"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="social-link-icon" /> {/* Applied new custom class */}
            </motion.a>
          </div>
          <p className="text-gray-300"> {/* Styled by new-footer-style p */}
            @samyunwanarmenia
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 pt-6 pb-4 text-center z-10"> {/* Adjusted positioning */}
        <p className="text-gray-300 text-sm"> {/* Styled by new-footer-style p */}
          © 2025 Samyun Wan Armenia. {t.footer.allRightsReserved} | {t.footer.officialRepresentative}
        </p>
      </div>
    </footer>
  );
};

export default Footer;