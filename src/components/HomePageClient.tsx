"use client";

import { useState, useMemo } from 'react';
import { statsData } from '@/data/stats';
import { Testimonial, UserReviewSubmission, TranslationKeys } from '@/types/global';
import { formatNameInitialLastName } from '@/utils/testimonialGenerator';

// Directly imported components for server-side rendering
import HeroSection from '@/components/HeroSection';
// Removed: import AboutSection from '@/components/AboutSection';
// Removed: import BenefitsSection from '@/components/BenefitsSection';
// Removed: import AuthenticityInfo from '@/components/AuthenticityInfo'; // Already removed in previous step
import ProductShowcaseSection from '@/components/ProductShowcaseSection';
// Removed: import TestimonialsSection from '@/components/TestimonialsSection';
// Removed: import ReviewForm from '@/components/ReviewForm';
// Removed: import ContactSection from '@/components/ContactSection';
// Removed: import FaqSection from '@/components/FaqSection';

// Removed: import { sendTelegramMessage } from '@/utils/telegramApi'; // No longer needed here
// Removed: import { showSuccess, showError } from '@/utils/toast'; // No longer needed here

interface HomePageClientProps {
  testimonials: Testimonial[]; // Still passed, but not directly used here anymore
  t: TranslationKeys;
  currentLang: string;
}

const HomePageClient: React.FC<HomePageClientProps> = ({ testimonials: _testimonials, t, currentLang }) => {
  // Removed state and handlers for userTestimonial and allTestimonials as they are now handled on the dedicated testimonials page.
  // The `testimonials` prop is now unused here, hence renamed to `_testimonials`.

  return (
    <>
      <HeroSection stats={statsData} />
      
      <ProductShowcaseSection />

      {/* Removed sections, now on dedicated pages: */}
      {/* <AboutSection /> */}
      {/* <BenefitsSection /> */}
      {/* <AuthenticityInfo /> */}
      {/* <TestimonialsSection testimonials={generatedTestimonials} currentLang={currentLang} userTestimonial={userTestimonial} /> */}
      {/* <ReviewForm onReviewSubmitted={handleReviewSubmitted} /> */}
      {/* <FaqSection /> */}
      {/* <ContactSection /> */}
    </>
  );
};

export default HomePageClient;