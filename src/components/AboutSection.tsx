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
      className="relative py-16 bg-gray-100 overflow-hidden" // Reduced py-20 to py-16
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['about'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div> {/* Lighter gradient */}
      <div className="container mx-auto px-4 relative z-10"> {/* Ensure content is above overlay */}
        <motion.div 
          className="text-center mb-12" // Reduced mb-16 to mb-12
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['about'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5"> {/* Reduced text-4xl/5xl to text-3xl/4xl, mb-6 to mb-5 */}
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto"> {/* Reduced text-xl to text-lg */}
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Reduced gap-8 to gap-6 */}
          {aboutItems.map((item, index) => (
            <motion.div 
              key={item.key}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 group" // Reduced p-8 to p-6
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['about'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }} // Staggered animation
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.3), 0 10px 10px -5px rgba(34, 197, 94, 0.2)" }} // Changed shadow to green glow
              // Removed transition={{ type: "spring", stiffness: 300, damping: 20 }} from here as it's now in itemVariants
            >
              <motion.div 
                className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-5`} // Reduced w/h-16 to w/h-14, mb-6 to mb-5
                whileHover={{ scale: 1.1 }} // Анимация для иконки при наведении
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className="w-7 h-7 text-white" /> {/* Reduced w/h-8 to w/h-7 */}
              </motion.div>
              <h3 className="text-gray-900 text-lg font-bold mb-3">{t.about[item.key].title}</h3> {/* Reduced text-xl to text-lg, mb-4 to mb-3 */}
              <p className="text-gray-700 text-sm leading-relaxed">{t.about[item.key].desc}</p> {/* Reduced text size */}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;