import { ShoppingCart, MessageCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility, StatItem } from '../types/global';
import HeroStats from './HeroStats';
import AuthenticityInfo from './AuthenticityInfo';
import CallToActionButton from './CallToActionButton';
import SwipeableProductCarousel from './SwipeableProductCarousel';

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
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center overflow-hidden py-16 lg:py-0">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100/50 rounded-full opacity-50 animate-pulse dark:bg-primary-900/30"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100/50 rounded-full opacity-50 animate-pulse dark:bg-blue-900/30" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-100/50 rounded-full opacity-50 animate-pulse dark:bg-yellow-900/30" style={{animationDelay: '4s'}}></div>
        <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50 dark:from-gray-700/20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible['home'] ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'} text-center`}>
            <div className="max-w-xl mx-auto">
              <motion.div 
                className="inline-flex items-center bg-primary-100/50 text-primary-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-5 dark:bg-primary-900/50 dark:text-primary-400"
                variants={textVariants}
                initial="hidden"
                animate={isVisible['home'] ? "visible" : "hidden"}
              >
                <Award className="w-4 h-4 mr-2" />
                {t.hero.guarantee}
              </motion.div>
              
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-5 leading-tight"
                variants={textVariants}
                initial="hidden"
                animate={isVisible['home'] ? "visible" : "hidden"}
                transition={{ delay: 0.1 }}
              >
                <span className="relative overflow-hidden inline-block">
                  {t.hero.title}
                  <span className="absolute inset-0 bg-gradient-shine-light dark:bg-gradient-shine-dark opacity-100 animate-shine-slow pointer-events-none"></span>
                </span>
                <span className="block text-2xl lg:text-3xl font-bold mt-1.5 text-gradient bg-gradient-to-r from-primary-500 to-blue-500 dark:from-primary-400 dark:to-blue-400">
                  {t.hero.subtitle}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed relative overflow-hidden inline-block"
                variants={textVariants}
                initial="hidden"
                animate={isVisible['home'] ? "visible" : "hidden"}
                // Increased duration here
                transition={{ delay: 0.2, duration: 1.5 }} 
              >
                {t.hero.tagline}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-100 animate-shine pointer-events-none dark:via-gray-800/50"></span>
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-3 mb-10 justify-center"
                variants={textVariants}
                initial="hidden"
                animate={isVisible['home'] ? "visible" : "hidden"}
                transition={{ delay: 0.3 }}
              >
                <CallToActionButton 
                  onClick={() => openOrderModal('weightGainLabel')} 
                  icon={ShoppingCart} 
                  variant="primary" 
                  size="sm"
                  iconClassName="group-hover:animate-bounce"
                >
                  {t.hero.cta}
                </CallToActionButton>
                <CallToActionButton 
                  href="https://m.me/samyunwanarmenia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  icon={MessageCircle} 
                  variant="ghost"
                  size="sm"
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
          </div>

          <div className={`transform transition-all duration-1000 delay-500 ${isVisible['home'] ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'} flex justify-center lg:justify-end mt-10 lg:mt-0`}>
            <SwipeableProductCarousel t={t} openOrderModal={openOrderModal} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;