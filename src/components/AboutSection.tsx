"use client";

import { Leaf, Award, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Icon } from '@/types/global';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';

const AboutSection = () => {
  const { t } = useLayoutContext();

  console.log('AboutSection - Received t object:', t);
  console.log('AboutSection - t.about.title:', t.about.title);
  console.log('AboutSection - t.about.description:', t.about.description);
  console.log('AboutSection - t.about.content:', t.about.content);

  type AboutItemKey = 'natural' | 'proven' | 'safe' | 'fast';

  const aboutItems: { key: AboutItemKey; icon: Icon; color: string; }[] = [
    { key: 'natural', icon: Leaf, color: 'from-primary-500 to-primary-600' },
    { key: 'proven', icon: Award, color: 'from-blue-500 to-indigo-600' },
    { key: 'safe', icon: Shield, color: 'from-purple-500 to-violet-600' },
    { key: 'fast', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
  ];

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
      id="about" 
      className="relative py-12 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title={t.about.title}
          subtitle={t.about.subtitle}
        />

        {/* New: Company Description */}
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 text-center leading-relaxed"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.2 }}
        >
          {t.about.description}
        </motion.p>

        {/* New: Additional Content */}
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 text-center leading-relaxed"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.3 }}
        >
          {t.about.content}
        </motion.p>

        {/* Existing "Why Choose Us" section */}
        <motion.div
          className="mt-8 mb-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            {t.about.whyChooseUsTitle}
          </h3>
          <ul className="list-disc list-inside text-left text-gray-700 dark:text-gray-300 space-y-2 text-base">
            <motion.li variants={itemVariants} transition={{ delay: 0.5 }}>
              {t.about.whyChooseUsOriginal}
            </motion.li>
            <motion.li variants={itemVariants} transition={{ delay: 0.6 }}>
              {t.about.whyChooseUsSafety}
            </motion.li>
            <motion.li variants={itemVariants} transition={{ delay: 0.7 }}>
              {t.about.whyChooseUsNoAdditives}
            </motion.li>
            <motion.li variants={itemVariants} transition={{ delay: 0.8 }}>
              {t.about.whyChooseUsTrust}
            </motion.li>
          </ul>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-6xl">
          {aboutItems.map((item, index) => (
            <motion.div 
              key={item.key}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.1 + 0.9 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-3">
                <motion.div 
                  className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mr-3`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-gray-900 dark:text-gray-50 text-lg font-bold">{t.about[item.key].title}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{t.about[item.key].desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;