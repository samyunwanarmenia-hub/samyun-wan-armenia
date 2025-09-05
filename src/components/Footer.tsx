"use client"; // This is a client component

import { Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys } from '../types/global'; // Removed SectionId
import Link from 'next/link'; // Import Next.js Link component
import { useLayoutContext } from '@/context/LayoutContext'; // Import useLayoutContext
import useNavigationUtils from '@/hooks/useNavigationUtils'; // Import useNavigationUtils
import { navigationSections } from '@/data/navigationSections'; // Import centralized data

// Removed FooterProps interface as 't' will be accessed via context
// interface FooterProps {
//   t: TranslationKeys;
// }

const Footer = () => { // Removed t from props
  const { t, currentLang, openAuthenticityModal } = useLayoutContext(); // Get t, currentLang and openAuthenticityModal from context
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang); // Get navigation utilities, передаем currentLang

  // Filter navigation sections for footer links
  const aboutLinks = navigationSections.filter(s => ['about', 'benefits', 'testimonials', 'contact'].includes(s.id));
  const productLinks = navigationSections.filter(s => ['products', 'faq'].includes(s.id)); 

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 mb-6 mx-auto max-w-7xl"> {/* Added mx-auto max-w-7xl for centering */}
          <div>
            <div className="flex items-center space-x-2 mb-5">
              <Link href={getHomePath()} className="flex items-center">
                <span className="text-gray-900 dark:text-gray-50 text-xl font-bold">
                  {t.hero.title}
                </span>
              </Link>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-base leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3">{t.footer.about}</h4>
            <ul className="space-y-1.5 text-gray-300 dark:text-gray-400 text-sm">
              {aboutLinks.map((section) => (
                <li key={section.id}>
                  <motion.div
                    whileHover={{ scale: 1.05, color: '#22c55e' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link href={getSectionPath(section.id)} className="hover:text-primary-500 transition-colors">
                      {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3">{t.footer.products}</h4>
            <ul className="space-y-1.5 text-gray-300 dark:text-gray-400 text-sm">
              {productLinks.map((section) => (
                <li key={section.id}>
                  <motion.div
                    whileHover={{ scale: 1.05, color: '#22c55e' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link href={getSectionPath(section.id)} className="hover:text-primary-500 transition-colors">
                      {t.nav[section.labelKey as keyof TranslationKeys['nav']]} {/* Use nav translation for products and faq */}
                    </Link>
                  </motion.div>
                </li>
              ))}
              <li>
                <motion.button
                  onClick={openAuthenticityModal}
                  className="hover:text-primary-500 transition-colors text-sm"
                  whileHover={{ scale: 1.05, color: '#22c55e' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {t.footer.productAuthenticity}
                </motion.button>
              </li>
              <li>
                <motion.div
                  whileHover={{ scale: 1.05, color: '#22c55e' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* This link currently points to #, assuming it's a placeholder or will be a modal/page */}
                  <Link href="#" className="hover:text-primary-500 transition-colors">
                    {t.footer.productUsage}
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3">{t.footer.follow}</h4>
            <div className="flex space-x-3 mb-3">
              <motion.a
                href="https://www.instagram.com/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://t.me/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Send className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://wa.me/37496653666"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gradient-to-r from-primary-500 to-emerald-600 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-xs">@samyunwanarmenia</p>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-600 pt-6 text-center">
          <p className="text-gray-300 dark:text-gray-400 text-sm">
            © 2025 Samyun Wan Armenia. {t.footer.allRightsReserved} | {t.footer.officialRepresentative}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;