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
      className="relative py-16 bg-gradient-to-br from-gray-100 to-white overflow-hidden" // Reduced py-20 to py-16
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['benefits'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div> {/* Lighter gradient */}
      <div className="container mx-auto px-4 relative z-10"> {/* Ensure content is above overlay */}
        <motion.div 
          className="text-center mb-12" // Reduced mb-16 to mb-12
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['benefits'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5"> {/* Reduced text-4xl/5xl to text-3xl/4xl, mb-6 to mb-5 */}
            {t.benefits.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto"> {/* Reduced text-xl to text-lg */}
            {t.benefits.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Reduced gap-8 to gap-6 */}
          {benefitsItemsData.map((benefit, index) => (
            <motion.div 
              key={benefit.key}
              className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-lg border border-gray-200 group hover:shadow-glow-green" // Using custom glow-green shadow
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['benefits'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }} // Staggered animation
              whileHover={{ scale: 1.05 }} // Removed boxShadow from here
              // Removed transition={{ type: "spring", stiffness: 300, damping: 20 }} from here
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${benefit.gradient} rounded-full`}></div>
              </div>
              
              <div className="relative z-10">
                <motion.div 
                  className={`w-14 h-14 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-5`} // Reduced w/h-16 to w/h-14, mb-6 to mb-5
                  whileHover={{ scale: 1.1 }} // Анимация для иконки при наведении
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <benefit.icon className="w-7 h-7 text-white" /> {/* Reduced w/h-8 to w/h-7 */}
                </motion.div>
                <h3 className="text-gray-900 text-xl font-bold mb-3">{t.benefits[benefit.key].title}</h3> {/* Reduced text-2xl to text-xl, mb-4 to mb-3 */}
                <p className="text-gray-700 text-sm leading-relaxed">{t.benefits[benefit.key].desc}</p> {/* Reduced text size */}
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