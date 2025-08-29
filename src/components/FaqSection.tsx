import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion'; // Removed motion, AnimatePresence
import { FaChevronDown } from 'react-icons/fa'; // Changed to Font Awesome icon
import { TranslationKeys, FaqQuestionKey, FaqAnswerKey } from '../types/global';

interface FaqSectionProps {
  t: TranslationKeys;
  // isVisible: IntersectionObserverVisibility; // Removed isVisible
}

const FaqSection: React.FC<FaqSectionProps> = ({ t }) => { // Removed isVisible from props
  const [openQuestion, setOpenQuestion] = useState<FaqQuestionKey | null>(null);

  const toggleQuestion = (questionKey: FaqQuestionKey) => {
    setOpenQuestion(prevKey => (prevKey === questionKey ? null : questionKey));
  };

  const questions: { key: FaqQuestionKey; answerKey: FaqAnswerKey }[] = [
    { key: 'q1', answerKey: 'a1' },
    { key: 'q2', answerKey: 'a2' },
    { key: 'q3', answerKey: 'a3' },
  ];

  return (
    <section
      id="faq"
      className="relative py-16 bg-neutral-light text-neutral-dark overflow-hidden" // Updated colors
      data-aos="fade-up" // AOS animation
      data-aos-duration="800"
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div
          className="text-center mb-12"
          data-aos="fade-up" // AOS animation
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-display font-bold mb-5"> {/* Updated font size and family */}
            {t.nav.faq}
          </h2>
          <p className="text-lg text-neutral-medium max-w-2xl mx-auto"> {/* Updated font size and color */}
            {t.faq.q1}
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((q, index) => (
            <div
              key={q.key}
              className="bg-pure-white rounded-xl shadow-lg border border-gray-200 overflow-hidden" // Updated colors
              data-aos="zoom-in" // AOS animation
              data-aos-delay={`${index * 100 + 200}`}
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left text-xl font-display font-semibold text-neutral-dark hover:bg-neutral-light transition-colors" // Updated font size, family and colors
                onClick={() => toggleQuestion(q.key)}
              >
                {t.faq[q.key]}
                <div
                  className={`transform transition-transform duration-300 ${openQuestion === q.key ? 'rotate-180' : 'rotate-0'}`}
                >
                  <FaChevronDown className="w-5 h-5 text-primary-green" /> {/* Changed to Font Awesome icon and updated color */}
                </div>
              </button>
              {openQuestion === q.key && (
                <div
                  className="px-5 pb-5 text-neutral-medium text-base leading-relaxed" // Updated font size and color
                  data-aos="fade-down" // AOS animation for content
                  data-aos-duration="300"
                >
                  <p>{t.faq[q.answerKey]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;