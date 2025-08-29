import { Leaf, Award, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility } from '../types/global';

interface AboutSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
}

// Define a type for the keys that are actually iterated over in t.about
type AboutItemKey = 'natural' | 'proven' | 'safe' | 'fast';

const AboutSection = ({ t, isVisible }: AboutSectionProps) => {
  const aboutItems: { key: AboutItemKey; icon: any; color: string; }[] = [
    { key: 'natural', icon: Leaf, color: 'from-primary-500 to-primary-600' }, // Changed to green gradient
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
      className="relative py-16 bg-gray-100 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['about'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['about'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-6xl"> {/* Added mx-auto and max-w-6xl to center the grid */}
          {aboutItems.map((item, index) => (
            <motion.div 
              key={item.key}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 group hover:shadow-glow-green"
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['about'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-5`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-gray-900 text-lg font-bold mb-3">{t.about[item.key].title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{t.about[item.key].desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;