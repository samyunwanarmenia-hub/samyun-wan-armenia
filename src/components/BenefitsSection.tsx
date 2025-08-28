import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility } from '../types/global';
import { benefitsItemsData } from '../data/benefitsItems'; // Import data

interface BenefitsSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
}

const BenefitsSection = ({ t, isVisible }: BenefitsSectionProps) => {
  // Удалены useState для isVideoPlaying и useRef для videoRef
  // Удалена функция playVideo

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
      className="relative py-20 bg-gradient-to-br from-gray-100 to-white overflow-hidden" // Changed background to lighter gradient
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['benefits'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div> {/* Lighter gradient */}
      <div className="container mx-auto px-4 relative z-10"> {/* Ensure content is above overlay */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['benefits'] ? "visible" : "hidden"}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t.benefits.title}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t.benefits.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsItemsData.map((benefit, index) => (
            <motion.div 
              key={benefit.key}
              className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-lg border border-gray-200 group" // Changed background to white and border to gray-200
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['benefits'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }} // Staggered animation
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(248, 113, 113, 0.3), 0 10px 10px -5px rgba(248, 113, 113, 0.2)" }} // Enhanced shadow with red glow
              // Removed transition={{ type: "spring", stiffness: 300, damping: 20 }} from here
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${benefit.gradient} rounded-full`}></div>
              </div>
              
              <div className="relative z-10">
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1 }} // Анимация для иконки при наведении
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-gray-900 text-2xl font-bold mb-4">{t.benefits[benefit.key].title}</h3> {/* Changed text color to gray-900 */}
                <p className="text-gray-700 leading-relaxed">{t.benefits[benefit.key].desc}</p> {/* Changed text color to gray-700 */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Удалена видео-секция */}
      </div>
    </motion.section>
  );
};

export default BenefitsSection;