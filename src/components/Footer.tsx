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
    <footer className="relative z-30 w-full min-h-[50vh] flex flex-col justify-end items-center pt-20 pb-8 px-4 md:px-8 text-gray-300 dark:text-gray-400">
      {/* Backdrop for blur effect */}
      <div className="absolute inset-0 backdrop-blur-xl z-[-5] [mask-image:linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_10%,rgba(0,0,0,0.8)_20%,rgba(0,0,0,1)_30%,rgb(0,0,0)_100%)] [-webkit-mask-image:linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_10%,rgba(0,0,0,0.8)_20%,rgba(0,0,0,1)_30%,rgb(0,0,0)_100%)]"></div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-[-7]"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {/* Column 1: Legal Info, Warning, and Social Media */}
          <div className="flex flex-col items-start justify-start p-4 md:p-6 rounded-xl bg-gray-900 dark:bg-gray-950 shadow-lg">
            <Link href={getHomePath()} className="flex items-center mb-4" aria-label={t.hero.title}>
              <h2 className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] sm:max-w-none">
                {t.hero.title}
              </h2>
            </Link>
            
            {/* Legal Info / Warning Section */}
            <h3 className="font-bold text-lg mb-2 text-white">{t.footer.legalInfo.split('\n')[0]}</h3>
            <p className="text-sm leading-relaxed mb-2 whitespace-pre-line">
              {t.footer.legalInfo.split('\n').slice(1).join('\n')}
            </p>
            <p className="text-sm leading-relaxed mb-4">
              {t.footer.purchaseWarning}
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-gray-700 dark:bg-gray-600 my-4" />

            {/* Official Links Section */}
            <h3 className="font-bold text-lg mb-2 text-white">{t.footer.officialLinksIntro.split('\n')[0]}</h3>
            <p className="text-sm leading-relaxed mb-4">
              {t.footer.officialLinksIntro.split('\n')[1]}
            </p>

            <div className="flex space-x-3 mb-4">
              <motion.a
                href="https://www.instagram.com/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-center text-white"
                whileHover={{ scale: 1.2, backgroundColor: '#E1306C' }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-center text-white"
                whileHover={{ scale: 1.2, backgroundColor: '#1877F2' }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://t.me/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-center text-white"
                whileHover={{ scale: 1.2, backgroundColor: '#0088CC' }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Join us on Telegram"
              >
                <Send className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://wa.me/37496653666"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-center text-white"
                whileHover={{ scale: 1.2, backgroundColor: '#25D366' }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </motion.a>
            </div>
            <p className="text-xs leading-relaxed text-red-400 dark:text-red-300">
              {t.footer.officialLinksDisclaimer}
            </p>
          </div>

          {/* Column 2: About Links */}
          <div className="flex flex-col items-start justify-start p-4 md:p-6 rounded-xl bg-gray-900 dark:bg-gray-950 shadow-lg">
            <h3 className="font-bold text-lg mb-4 text-white">{t.footer.about}</h3>
            <ul className="space-y-2 text-sm">
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
          <div className="flex flex-col items-start justify-start p-4 md:p-6 rounded-xl bg-gray-900 dark:bg-gray-950 shadow-lg">
            <h3 className="font-bold text-lg mb-4 text-white">{t.footer.products}</h3>
            <ul className="space-y-2 text-sm">
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
                  className="hover:text-primary-500 transition-colors text-sm text-left"
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
        </div>

        <div className="border-t border-gray-700 dark:border-gray-600 pt-6 text-center">
          <p className="text-sm">
            © 2025 Samyun Wan Armenia. {t.footer.allRightsReserved} | {t.footer.officialRepresentative}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;