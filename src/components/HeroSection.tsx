"use client";

import { ShoppingCart, MessageCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatItem } from '../types/global';
import HeroStats from './HeroStats';
import CallToActionButton from './CallToActionButton';
import { productShowcaseData } from '../data/productShowcaseData';
import { useLayoutContext } from '@/context/LayoutContext';
import SplitTextAnimation from './SplitTextAnimation';
import HeroQrCodeBlock from './HeroQrCodeBlock';

interface HeroSectionProps {
  stats: StatItem[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  const { t, openOrderModal } = useLayoutContext();

  // Variants for general fade-in-up animation
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }
  };

  const mainProduct = productShowcaseData[0]; // Still need this for the order button

  // Base delay for elements in HeroSection, relative to the end of the intro animation (1.3s + 0.3s fade-out = 1.6s)
  const introEndDelay = 1.6;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden py-12">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center"> {/* Grid for desktop layout */}
          {/* Left Column: Main content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left"> {/* Align left on large screens */}
            {/* Guarantee Badge */}
            <motion.div 
              className="inline-flex items-center bg-primary-100/50 text-primary-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-5 dark:bg-primary-900/50 dark:text-primary-400"
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: introEndDelay + 0.1 }} // Adjusted delay
            >
              <Award className="w-4 h-4 mr-2" />
              {t.hero.guarantee}
            </motion.div>
            
            {/* Main Title (Samyun Wan Armenia) with split animation */}
            <h1 
              className="text-4xl lg:text-6xl font-bold mb-5 leading-tight text-gray-900 dark:text-gray-50"
            >
              <SplitTextAnimation 
                text="Samyun Wan Armenia" 
                delay={introEndDelay + 0.3} // Adjusted delay to start right after intro
                duration={1.2}
                className="mb-1.5 lg:justify-start" 
              />
              {/* Subtitle */}
              <motion.span 
                className="block text-2xl lg:text-3xl font-bold mt-1.5 text-gray-900 dark:text-gradient dark:bg-gradient-to-r dark:from-primary-400 dark:to-secondary-400"
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: introEndDelay + 1.5 }} // Adjusted delay
              >
                {t.hero.subtitle}
              </motion.span>
            </h1>
            
            {/* Tagline with subtle animation */}
            <motion.p 
              className="text-xs sm:text-sm lg:text-lg font-bold uppercase tracking-[2px] sm:tracking-[3px] lg:tracking-[5px] text-slogan-shine mb-8 leading-relaxed relative overflow-hidden inline-block whitespace-nowrap"
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: introEndDelay + 1.9 }} // Adjusted delay
            >
              {t.hero.tagline}
            </motion.p>

            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start" 
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: introEndDelay + 2.2 }} // Adjusted delay
            >
              <CallToActionButton 
                onClick={() => openOrderModal(mainProduct.labelKey)}
                icon={ShoppingCart} 
                variant="primary" 
                size="sm"
                iconClassName="group-hover:animate-bounce"
                interactionEffect="burst"
                gaEvent={{ category: 'Order', action: 'Click_Hero_OrderNow', label: mainProduct.labelKey }}
                ymEvent={{ category: 'Order', action: 'Click_Hero_OrderNow', label: mainProduct.labelKey }}
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
                gaEvent={{ category: 'Contact', action: 'Click_Hero_Consultation', label: 'Facebook_Messenger' }}
                ymEvent={{ category: 'Contact', action: 'Click_Hero_Consultation', label: 'Facebook_Messenger' }}
              >
                {t.hero.consultation}
              </CallToActionButton>
            </motion.div>

            {/* HeroStats */}
            <HeroStats t={t} stats={stats} startDelay={introEndDelay + 2.7} /> {/* Adjusted startDelay */}
          </div>

          {/* Right Column: QR Code Block */}
          <div className="flex justify-center lg:justify-end items-center mt-10 lg:mt-0"> {/* Align right on large screens */}
            <HeroQrCodeBlock delay={introEndDelay + 3.1} /> {/* Adjusted delay */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;