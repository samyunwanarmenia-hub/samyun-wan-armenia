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

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden py-12">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Removed grid lg:grid-cols-2 as there's no longer a right-hand image */}
        <div className="flex flex-col items-center text-center"> {/* Centered content */}
          {/* Guarantee Badge */}
          <motion.div 
            className="inline-flex items-center bg-primary-100/50 text-primary-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-5 dark:bg-primary-900/50 dark:text-primary-400"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
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
              delay={0.3}
              duration={1.2}
              className="mb-1.5"
            />
            {/* Subtitle */}
            <motion.span 
              className="block text-2xl lg:text-3xl font-bold mt-1.5 text-gray-900 dark:text-gradient dark:bg-gradient-to-r dark:from-primary-400 dark:to-secondary-400"
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.8 }}
            >
              {t.hero.subtitle}
            </motion.span>
          </h1>
          
          {/* Tagline - NOW WITH SHINE ANIMATION */}
          <motion.p 
            className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed relative overflow-hidden inline-block text-shine-animation"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2.2 }}
          >
            {t.hero.tagline}
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 mb-10 justify-center" // Ensure buttons are centered
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2.5 }}
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
          <HeroStats t={t} stats={stats} startDelay={3.0} />

          {/* New QR Code Block */}
          <HeroQrCodeBlock delay={3.5} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;