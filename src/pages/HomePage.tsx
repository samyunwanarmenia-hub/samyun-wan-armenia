import { useState, useMemo, lazy, Suspense } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import BenefitsSection from '../components/BenefitsSection';
import ProductShowcaseSection from '../components/ProductShowcaseSection';
import SeoHead from '../components/SeoHead';

const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'));
const ReviewForm = lazy(() => import('../components/ReviewForm'));
const ContactSection = lazy(() => import('../components/ContactSection'));
const FaqSection = lazy(() => import('../components/FaqSection'));

import { generateTestimonials } from '../utils/testimonialGenerator';
import { statsData } from '../data/stats';
// import useIntersectionObserver from '../hooks/useIntersectionObserver'; // Removed useIntersectionObserver
import { sendTelegramMessage } from '../utils/telegramApi';
import { showSuccess, showError } from '../utils/toast';
import { TranslationKeys, UserTestimonial, UserReviewSubmission, ContactModalType } from '../types/global'; // Removed IntersectionObserverVisibility

interface HomePageProps {
  currentLang: string;
  t: TranslationKeys;
  openContactModal: (type: ContactModalType) => void;
  openOrderModal: (productKey?: 'weightGainLabel' | 'weightLossLabel') => void;
  openLoadingLinkModal: () => void;
  openAuthenticityModal: () => void;
  // isVisible: IntersectionObserverVisibility; // Removed isVisible prop
}

const HomePage = ({ currentLang, t, openContactModal, openOrderModal, openLoadingLinkModal, openAuthenticityModal }: HomePageProps) => { // Removed isVisible from props
  const [userTestimonial, setUserTestimonial] = useState<UserTestimonial | null>(null);

  const testimonials = useMemo(() => generateTestimonials(10), []);

  // Removed useIntersectionObserver as AOS will handle scroll animations
  // const isVisible: IntersectionObserverVisibility = useIntersectionObserver({
  //   threshold: 0.1,
  // });

  const handleReviewSubmit = async (review: UserReviewSubmission) => {
    try {
      setUserTestimonial({
        name: review.name,
        nameRu: review.name,
        nameEn: review.name,
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cfdfeeab?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        result: t.testimonials.newReviewLabel || 'New Review',
        textHy: review.text,
        textRu: review.text,
        textEn: review.text,
      });

      const telegramMessage = `<b>New Review Submitted!</b>\n\n<b>Name:</b> ${review.name}\n<b>Review:</b> ${review.text}\n\n<b>Language:</b> ${currentLang.toUpperCase()}`;
      await sendTelegramMessage(telegramMessage);

      showSuccess(t.testimonials.thankYou);
      console.log('Review submitted:', review);
    } catch (error: any) {
      console.error("Error submitting review:", error);
      showError(error.message || "Failed to submit review. Please try again.");
    }
  };

  return (
    <>
      <SeoHead 
        t={t} 
        currentLang={currentLang} 
        pageTitle={t.hero.title + ' – ' + t.hero.subtitle}
        pageDescription={t.hero.tagline}
        pageKeywords={t.hero.title + ', ' + t.hero.subtitle + ', ' + t.hero.tagline + ', samyun wan, armenia, քաշի ավելացում, բնական կապսուլներ, ինդոնեզական, samyun wan оригинал ереван, նաբոր վеса հայաստան'}
        ogImage="/optimized/og-image.jpg"
      />
      {/* isVisible prop is no longer needed for sections */}
      <HeroSection t={t} stats={statsData} openOrderModal={openOrderModal} openLoadingLinkModal={openLoadingLinkModal} openAuthenticityModal={openAuthenticityModal} />
      <AboutSection t={t} />
      <BenefitsSection t={t} />
      <ProductShowcaseSection t={t} openOrderModal={openOrderModal} />
      
      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <TestimonialsSection t={t} testimonials={testimonials} currentLang={currentLang} userTestimonial={userTestimonial} />
      </Suspense>
      
      <Suspense fallback={<div>Loading Review Form...</div>}>
        <ReviewForm t={t} onSubmit={handleReviewSubmit} />
      </Suspense>

      <Suspense fallback={<div>Loading FAQ...</div>}>
        <FaqSection t={t} />
      </Suspense>
      
      <Suspense fallback={<div>Loading Contact Info...</div>}>
        <ContactSection t={t} openContactModal={openContactModal} />
      </Suspense>
    </>
  );
};

export default HomePage;