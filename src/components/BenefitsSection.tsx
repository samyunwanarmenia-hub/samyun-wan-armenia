import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility } from '../types/global';
import { benefitsItemsData } from '../data/benefitsItems'; // Import data

interface BenefitsSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
}

const BenefitsSection = ({ t, isVisible }: BenefitsSectionProps) => {
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
      className="relative py-16 bg-gradient-to-br from-gray-100 to-white overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['benefits'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['benefits'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
            {t.benefits.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t.benefits.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl"> {/* Added mx-auto and max-w-6xl to center the grid */}
          {benefitsItemsData.map((benefit, index) => (
            <motion.div 
              key={benefit.key}
              className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-lg border border-gray-200 group hover:shadow-glow-green"
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['benefits'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${benefit.gradient} rounded-full`}></div>
              </div>
              
              <div className="relative z-10">
                <motion.div 
                  className={`w-14 h-14 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-5`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-gray-900 text-xl font-bold mb-3">{t.benefits[benefit.key].title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{t.benefits[benefit.key].desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BenefitsSection;