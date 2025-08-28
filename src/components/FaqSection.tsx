import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { TranslationKeys, IntersectionObserverVisibility, FaqQuestionKey, FaqAnswerKey } from '../types/global';

interface FaqSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
}

const FaqSection: React.FC<FaqSectionProps> = ({ t, isVisible }) => {
  const [openQuestion, setOpenQuestion] = useState<FaqQuestionKey | null>(null);

  const toggleQuestion = (questionKey: FaqQuestionKey) => {
    setOpenQuestion(prevKey => (prevKey === questionKey ? null : questionKey));
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
  ];

  return (
    <motion.section
      id="faq"
      className="relative py-20 bg-gray-100 text-gray-900 overflow-hidden" // Changed background to gray-100 and text to gray-900
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['faq'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div> {/* Lighter gradient */}
      <div className="container mx-auto px-4 max-w-3xl relative z-10"> {/* Ensure content is above overlay */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['faq'] ? "visible" : "hidden"}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t.nav.faq}
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {t.faq.q1} {/* Using q1 as a general subtitle for FAQ section */}
          </p>
        </motion.div>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <motion.div
              key={q.key}
              /* Changed background and border */
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden" 
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['faq'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <motion.button
                /* Changed text color and hover background */
                className="flex justify-between items-center w-full p-6 text-left text-xl font-semibold text-gray-900 hover:bg-gray-100 transition-colors" 
                onClick={() => toggleQuestion(q.key)}
                whileHover={{ scale: 1.02 }} // Добавлена анимация при наведении
                whileTap={{ scale: 0.98 }} // Добавлена анимация при нажатии
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t.faq[q.key]}
                <motion.div
                  animate={{ rotate: openQuestion === q.key ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-red-600" /> {/* Changed to red-600 */}
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openQuestion === q.key && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={accordionContentVariants}
                    /* Changed text color */
                    className="px-6 pb-6 text-gray-700 leading-relaxed" 
                  >
                    <p>{t.faq[q.answerKey]}</p>
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