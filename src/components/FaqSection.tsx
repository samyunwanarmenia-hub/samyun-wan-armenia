"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FaqQuestionKey, FaqAnswerKey } from '../types/global';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';

const FaqSection = () => {
  const { t } = useLayoutContext();
  const [openQuestion, setOpenQuestion] = useState<FaqQuestionKey | null>(null);

  const toggleQuestion = (questionKey: FaqQuestionKey) => {
    setOpenQuestion((prevKey: FaqQuestionKey | null) => (prevKey === questionKey ? null : questionKey));
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const accordionContentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
  };

  const questions: { key: FaqQuestionKey; answerKey: FaqAnswerKey }[] = [
    { key: 'q1', answerKey: 'a1' },
    { key: 'q2', answerKey: 'a2' },
    { key: 'q3', answerKey: 'a3' },
    { key: 'q4', answerKey: 'a4' },
  ];

  return (
    <motion.section
      id="faq"
      className="relative py-12 text-gray-800 dark:text-gray-50 overflow-hidden" /* Changed text-gray-900 to text-gray-800 for light mode */
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <SectionHeader
          title={t.nav.faq}
        />

        <div className="space-y-3">
          {questions.map((q, index) => (
            <motion.div
              key={q.key}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 400, damping: 17 }}
              whileHover={{ 
                scale: 1.02, 
                y: -2, // Subtle lift
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.04)" // Enhanced shadow
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.button
                className="flex justify-between items-center w-full p-5 text-left text-lg font-semibold text-gray-800 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" /* Changed text-gray-900 to text-gray-800 for light mode */
                onClick={() => toggleQuestion(q.key)}
                whileHover={{ scale: 1.01 }} // Slightly less scale for the button itself
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t.faq[q.key]}
                <motion.div
                  animate={{ rotate: openQuestion === q.key ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openQuestion === q.key && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={accordionContentVariants}
                    className="px-5 pb-5 text-gray-600 dark:text-gray-300 text-base leading-relaxed" /* Changed text-gray-700 to text-gray-600 for light mode */
                  >
                    <p dangerouslySetInnerHTML={{ __html: t.faq[q.answerKey] }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FaqSection;