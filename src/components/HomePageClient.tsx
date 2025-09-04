"use client";

import { useState, useMemo } from 'react';
import { statsData } from '@/data/stats';
import { Testimonial, UserReviewSubmission, TranslationKeys } from '@/types/global';
import { formatNameInitialLastName } from '@/utils/testimonialGenerator';

// Directly imported components for server-side rendering
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import BenefitsSection from '@/components/BenefitsSection';
import AuthenticityInfo from '@/components/AuthenticityInfo';
import ProductShowcaseSection from '@/components/ProductShowcaseSection';
// Removed: import VideoTestimonialSection from '@/components/VideoTestimonialSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ReviewForm from '@/components/ReviewForm';
import ContactSection from '@/components/ContactSection';
import FaqSection from '@/components/FaqSection';

import { sendTelegramMessage } from '@/utils/telegramApi';
import { showSuccess, showError } from '@/utils/toast';

interface HomePageClientProps {
  testimonials: Testimonial[];
  t: TranslationKeys;
  currentLang: string;
}

const HomePageClient: React.FC<HomePageClientProps> = ({ testimonials, t, currentLang }) => {
  const [allTestimonials, setAllTestimonials] = useState(testimonials);
  const [userTestimonial, setUserTestimonial] = useState<Testimonial | null>(null);

  const generatedTestimonials = useMemo(() => formatNameInitialLastName ? testimonials.map(t => ({
    ...t,
    name: formatNameInitialLastName(t.name),
    nameRu: formatNameInitialLastName(t.nameRu),
    nameEn: formatNameInitialLastName(t.nameEn),
  })) : testimonials, [testimonials]);

  const handleReviewSubmitted = async (newReview: UserReviewSubmission & { id: string, created_at: string, rating: number }) => {
    const newAvatarIndex = allTestimonials.length + 20;
    const gender = newAvatarIndex % 2 === 0 ? 'men' : 'women';

    const formattedReview: Testimonial = {
      id: newReview.id,
      name: formatNameInitialLastName(newReview.name),
      nameRu: formatNameInitialLastName(newReview.name),
      nameEn: formatNameInitialLastName(newReview.name),
      image: `https://randomuser.me/api/portraits/${gender}/${newAvatarIndex % 100}.jpg`,
      rating: newReview.rating,
      result: t.testimonials.newReviewLabel,
      textHy: newReview.text,
      textRu: newReview.text,
      textEn: newReview.text,
    };
    setUserTestimonial(formattedReview);
    setAllTestimonials([formattedReview, ...allTestimonials]);

    try {
      const telegramMessage = `<b>New Review Submitted!</b>\n\n<b>Name:</b> ${newReview.name}\n<b>Review:</b> ${newReview.text}\n\n<b>Language:</b> ${currentLang.toUpperCase()}`;
      await sendTelegramMessage(telegramMessage);
      showSuccess(t.testimonials.thankYou);
    } catch (error: unknown) {
      console.error("Error sending review to Telegram:", error);
      showError(error instanceof Error ? error.message : "Failed to send review notification.");
    }
  };

  return (
    <>
      <HeroSection stats={statsData} />
      
      <AboutSection />

      <BenefitsSection />
      
      <ProductShowcaseSection />

      <AuthenticityInfo />
      
      {/* Removed VideoTestimonialSection */}

      <TestimonialsSection testimonials={generatedTestimonials} currentLang={currentLang} userTestimonial={userTestimonial} />
      
      <ReviewForm onReviewSubmitted={handleReviewSubmitted} />

      <FaqSection />
      
      <ContactSection />
    </>
  );
};

export default HomePageClient;