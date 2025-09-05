"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { useLayoutContext } from '@/context/LayoutContext';
import { ShieldCheck } from 'lucide-react'; // Using ShieldCheck icon for authenticity

interface HeroQrCodeBlockProps {
  delay?: number;
}

const HeroQrCodeBlock: React.FC<HeroQrCodeBlockProps> = ({ delay = 0 }) => {
  const { t } = useLayoutContext();

  const qrCodeValue = `https://qr-wan.netlify.app/`; // External verification site

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
      className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs mx-auto text-center"
      variants={blockVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-center mb-3">
        <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
          {t.hero.qrBlockTitle}
        </h3>
      </div>
      <a 
        href={qrCodeValue}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label={t.hero.qrBlockTitle}
      >
        <motion.div
          className="w-32 h-32 bg-white dark:bg-gray-700 rounded-xl mx-auto mb-3 flex items-center justify-center transform group-hover:scale-105 transition-all border border-gray-200 dark:border-gray-600 p-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <QRCodeCanvas value={qrCodeValue} size={128} level="H" />
        </motion.div>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {t.hero.qrBlockDescription}
        </p>
      </a>
    </motion.div>
  );
};

export default HeroQrCodeBlock;