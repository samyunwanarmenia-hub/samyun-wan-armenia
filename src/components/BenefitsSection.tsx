"use client";

import { motion } from 'framer-motion';
import { benefitsItemsData } from '../data/benefitsItems';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';

const BenefitsSection = () => {
  const { t } = useLayoutContext();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="benefits" 
      className="relative py-12 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title={t.benefits.title}
          subtitle={t.benefits.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl">
          {benefitsItemsData.map((benefit, index) => (
            <motion.div 
              key={benefit.key}
              className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5, // Subtle lift
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)" // Enhanced shadow with glow
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${benefit.gradient} rounded-full`} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <motion.div 
                    className={`w-10 h-10 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mr-3`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <benefit.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <h3 className="text-gray-50 dark:text-gray-50 text-xl font-bold">{t.benefits[benefit.key].title}</h3> {/* Changed text-gray-900 to text-gray-50 */}
                </div>
                <p className="text-gray-300 dark:text-gray-300 text-base leading-relaxed">{t.benefits[benefit.key].desc}</p> {/* Changed text-gray-700 to text-gray-300 */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BenefitsSection;