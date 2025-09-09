"use client";

import { Leaf, Award, Shield, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react'; // Added CheckCircle and AlertTriangle
import { motion } from 'framer-motion';
import { Icon } from '@/types/global';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';

const AboutSection = () => {
  const { t } = useLayoutContext();

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

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-6xl">
          {aboutItems.map((item, index) => (
            <motion.div 
              key={item.key}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group"
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

        {/* New Authenticity Header */}
        <motion.div
          className="mt-16 text-center max-w-4xl mx-auto"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            {t.about.mainAuthenticityHeader}
          </h2>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
            {t.about.whyChooseUs.title}
          </h3>
          <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <motion.li variants={listItemVariants} transition={{ delay: 0.5 }}>
              <CheckCircle className="inline-block w-5 h-5 text-primary-600 mr-3" />
              {t.about.whyChooseUs.originalProduct}
            </motion.li>
            <motion.li variants={listItemVariants} transition={{ delay: 0.6 }}>
              <CheckCircle className="inline-block w-5 h-5 text-primary-600 mr-3" />
              {t.about.whyChooseUs.safety}
            </motion.li>
            <motion.li variants={listItemVariants} transition={{ delay: 0.7 }}>
              <CheckCircle className="inline-block w-5 h-5 text-primary-600 mr-3" />
              {t.about.whyChooseUs.noFakeAdditives}
            </motion.li>
            <motion.li variants={listItemVariants} transition={{ delay: 0.8 }}>
              <CheckCircle className="inline-block w-5 h-5 text-primary-600 mr-3" />
              {t.about.whyChooseUs.customerTrust}
            </motion.li>
          </ul>
        </motion.div>

        {/* Warning Section */}
        <motion.div
          className="mt-12 bg-red-100 dark:bg-red-900/50 rounded-2xl p-8 shadow-xl border border-red-200 dark:border-red-700 max-w-4xl mx-auto text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 mr-3" />
            {t.about.warningSection.attention}
          </h3>
          <p className="text-lg text-red-700 dark:text-red-300 mb-4 leading-relaxed">
            {t.about.warningSection.mainText}
          </p>
          <p className="text-base text-red-600 dark:text-red-400 font-semibold">
            {t.about.warningSection.ageRestriction}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;