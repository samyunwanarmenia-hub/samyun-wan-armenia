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
    { key: 'natural', icon: Leaf, color: 'from-green-500 to-emerald-600' },
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
      className="relative py-20 bg-gray-100 overflow-hidden" // Changed background to gray-100
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['about'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div> {/* Lighter gradient */}
      <div className="container mx-auto px-4 relative z-10"> {/* Ensure content is above overlay */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['about'] ? "visible" : "hidden"}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutItems.map((item, index) => (
            <motion.div 
              key={item.key}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 group" // Changed background to white and border to gray-200
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['about'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }} // Staggered animation
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(248, 113, 113, 0.3), 0 10px 10px -5px rgba(248, 113, 113, 0.2)" }} // Enhanced shadow with red glow
              // Removed transition={{ type: "spring", stiffness: 300, damping: 20 }} from here as it's now in itemVariants
            >
              <motion.div 
                className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-6`}
                whileHover={{ scale: 1.1 }} // Анимация для иконки при наведении
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-gray-900 text-xl font-bold mb-4">{t.about[item.key].title}</h3> {/* Changed text color to gray-900 */}
              <p className="text-gray-700 leading-relaxed">{t.about[item.key].desc}</p> {/* Changed text color to gray-700 */}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;