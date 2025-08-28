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
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center overflow-hidden py-20 lg:py-0"> {/* Changed background to lighter gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-100/50 rounded-full opacity-50 animate-pulse"></div> {/* Lighter, more visible */}
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-100/50 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div> {/* Lighter, more visible */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-100/50 rounded-full opacity-50 animate-pulse" style={{animationDelay: '4s'}}></div> {/* Lighter, more visible */}
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div> {/* Lighter gradient */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible['home'] ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'} text-center lg:text-left`}> {/* Centered text on small screens */}
            <motion.div 
              className="inline-flex items-center bg-red-100/50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6" 
              /* Lighter background, darker text */
              variants={textVariants}
              initial="hidden"
              animate={isVisible['home'] ? "visible" : "hidden"}
            >
              <Award className="w-4 h-4 mr-2" />
              {t.hero.guarantee}
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight" 
              /* Changed text color to gray-900 */
              variants={textVariants}
              initial="hidden"
              animate={isVisible['home'] ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
            >
              {t.hero.title}
              <span className="block text-3xl lg:text-4xl text-red-600 font-normal mt-2"> {/* Changed to red-600 */}
                {t.hero.subtitle}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 mb-8 leading-relaxed relative overflow-hidden inline-block" 
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
              className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
              variants={textVariants}
              initial="hidden"
              animate={isVisible['home'] ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
            >
              <CallToActionButton 
                onClick={() => openOrderModal('weightGainLabel')} 
                icon={ShoppingCart} 
                variant="primary" 
                size="md"
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
                size="md"
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

          <div className={`transform transition-all duration-1000 delay-500 ${isVisible['home'] ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'} flex justify-center lg:justify-end mt-12 lg:mt-0`}> {/* Centered product card on small screens */}
            <HeroProductCard t={t} openOrderModal={openOrderModal} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;