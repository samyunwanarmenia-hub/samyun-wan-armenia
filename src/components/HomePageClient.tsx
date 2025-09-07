"use client";

import { statsData } from '@/data/stats';
import { TranslationKeys } from '@/types/global';

// Directly imported components for server-side rendering
import HeroSection from '@/components/HeroSection';
import ProductShowcaseSection from '@/components/ProductShowcaseSection';

interface HomePageClientProps {
  // testimonials: Testimonial[]; // Removed as testimonials are no longer displayed on the home page
  t: TranslationKeys;
  currentLang: string;
}

const HomePageClient: React.FC<HomePageClientProps> = ({ t, currentLang }) => {
  return (
    <>
      <HeroSection stats={statsData} />
      
      <ProductShowcaseSection />
    </>
  );
};

export default HomePageClient;