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
    { key: 'q4', answerKey: 'a4' }, // Added new FAQ question
  ];

  return (
    <motion.section
      id="faq"
      className="relative py-16 bg-gray-100 text-gray-900 overflow-hidden" // Reduced py-20 to py-16
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['faq'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div> {/* Lighter gradient */}
      <div className="container mx-auto px-4 max-w-3xl relative z-10"> {/* Ensure content is above overlay */}
        <motion.div
          className="text-center mb-12" // Reduced mb-16 to mb-12
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['faq'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-5"> {/* Reduced text-4xl/5xl to text-3xl/4xl, mb-6 to mb-5 */}
            {t.nav.faq}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto"> {/* Reduced text-xl to text-lg */}
            {t.faq.q1} {/* Using q1 as a general subtitle for FAQ section */}
          </p>
        </motion.div>

        <div className="space-y-3"> {/* Reduced space-y-4 to space-y-3 */}
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
                className="flex justify-between items-center w-full p-5 text-left text-lg font-semibold text-gray-900 hover:bg-gray-100 transition-colors" // Reduced p-6 to p-5, text-xl to text-lg
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
                  <ChevronDown className="w-5 h-5 text-primary-600" /> {/* Reduced w/h-6 to w/h-5 */}
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
                    className="px-5 pb-5 text-gray-700 text-sm leading-relaxed" // Reduced px/pb-6 to px/pb-5, added text-sm
                  >
                    <p dangerouslySetInnerHTML={{ __html: t.faq[q.answerKey] }}></p>
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