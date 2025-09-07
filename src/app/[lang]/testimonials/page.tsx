"use client";

import TestimonialsSection from '@/components/TestimonialsSection';
import ReviewForm from '@/components/ReviewForm';
import { useLayoutContext } from '@/context/LayoutContext';
import { Testimonial, DbReview } from '@/types/global';
import { useState, useMemo } from 'react';
import { sendTelegramMessage } from '@/utils/telegramApi';
import { showSuccess, showError } from '@/utils/toast';
import { baseTestimonials } from '@/data/testimonials'; // Import base testimonials
import { formatNameInitialLastName } from '@/utils/testimonialGenerator'; // Import formatter

interface TestimonialsPageProps {
  params: { lang: string };
}

const TestimonialsPage = ({ params }: TestimonialsPageProps) => {
  const { t, currentLang } = useLayoutContext();
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]); // Initialize with empty array, will be populated by server or client
  const [userTestimonial, setUserTestimonial] = useState<Testimonial | null>(null);

  // Fetch testimonials on client side if not pre-rendered, or combine with base
  // For simplicity, let's assume baseTestimonials are always available and we add user ones.
  // In a real app, you'd fetch from Supabase here if this page was client-only.
  const combinedTestimonials = useMemo(() => {
    // This is a simplified client-side combination.
    // In a full Next.js app, initial testimonials would likely come from server props.
    // For now, we'll just use baseTestimonials and add userTestimonial if present.
    const initial = [...baseTestimonials];
    if (userTestimonial) {
      initial.unshift(userTestimonial); // Add user's review to the top
    }
    return initial.map(t => ({
      ...t,
      name: formatNameInitialLastName(t.name),
      nameRu: formatNameInitialLastName(t.nameRu),
      nameEn: formatNameInitialLastName(t.nameEn),
    }));
  }, [userTestimonial]);


  const handleReviewSubmitted = async (newReview: DbReview) => {
    const newAvatarIndex = combinedTestimonials.length + 20; // Simple way to get a unique avatar
    const gender = newAvatarIndex % 2 === 0 ? 'men' : 'women';

    const formattedReview: Testimonial = {
      id: newReview.id,
      name: formatNameInitialLastName(newReview.name),
      nameRu: formatNameInitialLastName(newReview.name),
      nameEn: formatNameInitialLastName(newReview.name),
      image: `https://randomuser.me/api/portraits/${gender}/${newAvatarIndex % 100}.jpg`,
      rating: newReview.rating || 5,
      result: t.testimonials.newReviewLabel,
      textHy: newReview.text,
      textRu: newReview.text,
      textEn: newReview.text,
    };
    setUserTestimonial(formattedReview); // Set user testimonial to display it first
    // No need to update allTestimonials state here, as combinedTestimonials re-calculates with userTestimonial
    
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
      <TestimonialsSection testimonials={combinedTestimonials} currentLang={currentLang} userTestimonial={userTestimonial} />
      <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
    </>
  );
};

export default TestimonialsPage;