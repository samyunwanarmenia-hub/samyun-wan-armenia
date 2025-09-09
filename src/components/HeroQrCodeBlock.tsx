"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { useLayoutContext } from '@/context/LayoutContext';
import { ShieldCheck } from 'lucide-react'; // Using ShieldCheck icon for authenticity
import Link from 'next/link'; // Import Link for internal navigation

interface HeroQrCodeBlockProps {
  delay?: number;
}

const HeroQrCodeBlock: React.FC<HeroQrCodeBlockProps> = ({ delay = 0 }) => {
  const { t, currentLang } = useLayoutContext();

  // Change qrCodeValue to point to the internal /verify/qr page
  const qrCodeValue = `https://samyunwanarmenia.netlify.app/${currentLang}/verify/qr`; // Use dynamic currentLang
  const qrLinkPath = `/${currentLang}/verify/qr`; // Internal link path

  const blockVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut", 
        delay: delay 
      } 
    }
  };

  return (
    <motion.div
      className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs sm:max-w-sm lg:max-w-md mx-auto text-center"
      variants={blockVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.05, 
        y: -5, // Subtle lift
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)" // Enhanced shadow with glow
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-center mb-3">
        <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-50"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
          {t.hero.qrBlockTitle}
        </h3>
      </div>
      <Link 
        href={qrLinkPath} // Use Link for internal navigation
        className="group block p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label={t.hero.qrBlockTitle}
      >
        <motion.div
          className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-xl mx-auto mb-3 flex items-center justify-center transform group-hover:scale-105 transition-all border border-gray-200 dark:border-gray-600 p-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <QRCodeCanvas value={qrCodeValue} size={128} level="H" />
        </motion.div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"> {/* Changed text-gray-700 to text-gray-600 for light mode */}
          {t.hero.qrBlockDescription}
        </p>
      </Link>
    </motion.div>
  );
};

export default HeroQrCodeBlock;