import { FaShoppingCart, FaCommentAlt, FaAward } from 'react-icons/fa'; // Changed to Font Awesome icons
// import { motion } from 'framer-motion'; // Removed motion
import { TranslationKeys, StatItem } from '../types/global';
import HeroStats from './HeroStats';
import HeroProductCard from './HeroProductCard';
import AuthenticityInfo from './AuthenticityInfo';
import CallToActionButton from './CallToActionButton';

interface HeroSectionProps {
  t: TranslationKeys;
  // isVisible: IntersectionObserverVisibility; // Removed isVisible
  stats: StatItem[];
  openOrderModal: (productKey?: 'weightGainLabel' | 'weightLossLabel') => void;
  openLoadingLinkModal: () => void;
  openAuthenticityModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t, stats, openOrderModal, openLoadingLinkModal, openAuthenticityModal }) => { // Removed isVisible from props
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-neutral-light via-pure-white to-neutral-light flex items-center overflow-hidden py-16 lg:py-0"> {/* Updated colors */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-green/10 rounded-full opacity-50 animate-pulse"></div> {/* Updated colors */}
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100/50 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-warm-accent/10 rounded-full opacity-50 animate-pulse" style={{animationDelay: '4s'}}></div> {/* Updated colors */}
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left" data-aos="fade-right" data-aos-duration="800"> {/* AOS animation */}
            <div 
              className="inline-flex items-center bg-primary-green/10 text-primary-green px-3 py-1.5 rounded-full text-sm font-semibold mb-5" // Updated colors
              data-aos="fade-up" // AOS animation
              data-aos-delay="100"
            >
              <FaAward className="w-4 h-4 mr-2" /> {/* Changed to Font Awesome icon */}
              {t.hero.guarantee}
            </div>
            
            <h1 
              className="text-5xl font-display lg:text-6xl font-bold text-neutral-dark mb-5 leading-tight" // Updated font size, family and color
              data-aos="fade-up" // AOS animation
              data-aos-delay="200"
            >
              {t.hero.title}
              <span className="block text-3xl lg:text-4xl text-primary-green font-normal mt-1.5"> {/* Updated font size and color */}
                {t.hero.subtitle}
              </span>
            </h1>
            
            <p 
              className="text-lg text-neutral-medium mb-6 leading-relaxed relative overflow-hidden inline-block" // Updated font size and color
              data-aos="fade-up" // AOS animation
              data-aos-delay="300"
            >
              {t.hero.tagline}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-pure-white/50 to-transparent opacity-0 hover:opacity-100 animate-shine pointer-events-none"></span> {/* Updated colors */}
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start"
              data-aos="fade-up" // AOS animation
              data-aos-delay="400"
            >
              <CallToActionButton 
                onClick={() => openOrderModal('weightGainLabel')} 
                icon={FaShoppingCart} // Changed to Font Awesome icon
                variant="primary" 
                size="md" // Adjusted size to md (16px text)
                iconClassName="group-hover:animate-bounce"
                aos="zoom-in" // AOS animation
                aosDelay="500"
              >
                {t.hero.cta}
              </CallToActionButton>
              <CallToActionButton 
                href="https://m.me/samyunwanarmenia" 
                target="_blank" 
                rel="noopener noreferrer" 
                icon={FaCommentAlt} // Changed to Font Awesome icon
                variant="ghost"
                size="md" // Adjusted size to md (16px text)
                aos="zoom-in" // AOS animation
                aosDelay="600"
              >
                {t.hero.consultation}
              </CallToActionButton>
            </div>

            <HeroStats t={t} stats={stats} />

            <AuthenticityInfo 
              t={t} 
              openLoadingLinkModal={openLoadingLinkModal} 
              openAuthenticityModal={openAuthenticityModal} 
            />
          </div>

          <div className="flex justify-center lg:justify-end mt-10 lg:mt-0" data-aos="fade-left" data-aos-duration="800" data-aos-delay="400"> {/* AOS animation */}
            <HeroProductCard t={t} openOrderModal={openOrderModal} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;