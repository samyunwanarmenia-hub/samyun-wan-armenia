import { ShoppingCart, MessageCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility, StatItem } from '../types/global';
import HeroStats from './HeroStats';
import HeroProductCard from './HeroProductCard';
import AuthenticityInfo from './AuthenticityInfo';
import CallToActionButton from './CallToActionButton'; // Import the new component

interface HeroSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
  stats: StatItem[];
  openOrderModal: (productKey?: 'weightGainLabel' | 'weightLossLabel') => void;
  openLoadingLinkModal: () => void;
  openAuthenticityModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t, isVisible, stats, openOrderModal, openLoadingLinkModal, openAuthenticityModal }) => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center overflow-hidden py-16 lg:py-0"> {/* Reduced py-20 to py-16 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100/50 rounded-full opacity-50 animate-pulse"></div> {/* Changed to green-100/50 */}
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100/50 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div> {/* Changed to blue-100/50 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-100/50 rounded-full opacity-50 animate-pulse" style={{animationDelay: '4s'}}></div> {/* Changed to yellow-100/50 */}
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div> {/* Lighter gradient */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center"> {/* Reduced gap-12 to gap-8 */}
          <div className={`transform transition-all duration-1000 ${isVisible['home'] ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'} text-center lg:text-left`}> {/* Centered text on small screens */}
            <motion.div 
              className="inline-flex items-center bg-primary-100/50 text-primary-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-5" // Reduced px/py, mb-6 to mb-5
              /* Lighter background, darker text */
              variants={textVariants}
              initial="hidden"
              animate={isVisible['home'] ? "visible" : "hidden"}
            >
              <Award className="w-4 h-4 mr-2" />
              {t.hero.guarantee}
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight" // Reduced text-5xl/7xl to text-4xl/6xl, mb-6 to mb-5
              /* Changed text color to gray-900 */
              variants={textVariants}
              initial="hidden"
              animate={isVisible['home'] ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
            >
              {t.hero.title}
              <span className="block text-2xl lg:text-3xl text-primary-600 font-normal mt-1.5"> {/* Reduced text-3xl/4xl to text-2xl/3xl, mt-2 to mt-1.5 */}
                {t.hero.subtitle}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-700 mb-6 leading-relaxed relative overflow-hidden inline-block" // Reduced text-xl to text-lg, mb-8 to mb-6
              /* Changed text color to gray-700 */
              variants={textVariants}
              initial="hidden"
              animate={isVisible['home'] ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              {t.hero.tagline}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 animate-shine pointer-events-none"></span>
            </motion.p>

            {/* Centered buttons on small screens */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start" // Reduced gap-4 to gap-3, mb-12 to mb-10
              variants={textVariants}
              initial="hidden"
              animate={isVisible['home'] ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
            >
              <CallToActionButton 
                onClick={() => openOrderModal('weightGainLabel')} 
                icon={ShoppingCart} 
                variant="primary" 
                size="sm" // Adjusted size from md to sm
                iconClassName="group-hover:animate-bounce"
              >
                {t.hero.cta}
              </CallToActionButton>
              <CallToActionButton 
                href="https://m.me/samyunwanarmenia" 
                target="_blank" 
                rel="noopener noreferrer" 
                icon={MessageCircle} 
                variant="ghost" // Changed to use the new 'ghost' variant with green
                size="sm" // Adjusted size from md to sm
              >
                {t.hero.consultation}
              </CallToActionButton>
            </motion.div>

            <HeroStats t={t} stats={stats} isVisible={isVisible} />

            <AuthenticityInfo 
              t={t} 
              openLoadingLinkModal={openLoadingLinkModal} 
              openAuthenticityModal={openAuthenticityModal} 
            />
          </div>

          <div className={`transform transition-all duration-1000 delay-500 ${isVisible['home'] ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'} flex justify-center lg:justify-end mt-10 lg:mt-0`}> {/* Reduced mt-12 to mt-10 */}
            <HeroProductCard t={t} openOrderModal={openOrderModal} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;