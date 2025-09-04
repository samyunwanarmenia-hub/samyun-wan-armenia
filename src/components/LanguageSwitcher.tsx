"use client";

import { useLayoutContext } from '@/context/LayoutContext';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { t, currentLang, setCurrentLang } = useLayoutContext();

  const languages = [
    { key: 'hy', label: '🇦🇲 Հայ', ariaLabel: t.nav.armenian },
    { key: 'ru', label: '🇷🇺 Рус', ariaLabel: t.nav.russian },
    { key: 'en', label: '🇺🇸 Eng', ariaLabel: t.nav.english },
  ];

  return (
    <div className="flex justify-center space-x-2">
      {languages.map((lang) => (
        <motion.button
          key={lang.key}
          onClick={() => setCurrentLang(lang.key)}
          disabled={currentLang === lang.key}
          className="text-sm text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:font-semibold disabled:text-primary-600 dark:disabled:text-primary-400 transition-colors"
          aria-label={lang.ariaLabel}
          whileHover={{ scale: currentLang === lang.key ? 1 : 1.1 }}
          whileTap={{ scale: currentLang === lang.key ? 1 : 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;