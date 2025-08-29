import { Leaf, Award, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility } from '../types/global';

interface AboutSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
}

type AboutItemKey = 'natural' | 'proven' | 'safe' | 'fast';

const AboutSection = ({ t, isVisible }: AboutSectionProps) => {
  const aboutItems: { key: AboutItemKey; icon: any; color: string; }[] = [
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
      className="relative py-16 bg-gray-100 dark:bg-gray-900 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['about'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50 dark:from-gray-700/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['about'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-5">
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-6xl">
          {aboutItems.map((item, index) => (
            <motion.div 
              key={item.key}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group hover:shadow-glow-green dark:hover:shadow-glow-green-dark"
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['about'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <motion.div 
                className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-5`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-gray-900 dark:text-gray-50 text-lg font-bold mb-3">{t.about[item.key].title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{t.about[item.key].desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;