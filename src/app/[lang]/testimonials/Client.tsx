"use client";

import TestimonialsSection from '@/components/TestimonialsSection';
import ReviewForm from '@/components/ReviewForm';
import { useLayoutContext } from '@/context/LayoutContext';
import { Testimonial, DbReview } from '@/types/global';
import { useState, useMemo, useEffect } from 'react';
import { sendTelegramMessage } from '@/utils/telegramApi';
import { showSuccess, showError } from '@/utils/toast';
import { baseTestimonials } from '@/data/testimonials';
import { formatNameInitialLastName } from '@/utils/testimonialGenerator';

const TestimonialsPageClient = () => {
  const { t, currentLang } = useLayoutContext();
  const dbTestimonials: Testimonial[] = [];
  const [userTestimonial, setUserTestimonial] = useState<Testimonial | null>(null);
  const [_isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const combinedTestimonials = useMemo(() => {
    const initial = [...baseTestimonials, ...dbTestimonials];
    if (userTestimonial) initial.unshift(userTestimonial);
    const unique = Array.from(new Map(initial.map(item => [item.id, item])).values());
    return unique.map(testimonial => ({
      ...testimonial,
      name: formatNameInitialLastName(testimonial.name),
      nameRu: formatNameInitialLastName(testimonial.nameRu),
      nameEn: formatNameInitialLastName(testimonial.nameEn),
    }));
  }, [dbTestimonials, userTestimonial]);

  const handleReviewSubmitted = async (newReview: DbReview) => {
    const newAvatarIndex = combinedTestimonials.length + 20;
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
    setUserTestimonial(formattedReview);

    try {
      const telegramMessage = `<b>New Review Submitted!</b>\n\n<b>Name:</b> ${newReview.name}\n<b>Review:</b> ${newReview.text}\n\n<b>Language:</b> ${currentLang.toUpperCase()}`;
      await sendTelegramMessage(telegramMessage);
      showSuccess(t.testimonials.thankYou);
    } catch (error: unknown) {
      console.error('Error sending review to Telegram:', error);
      showError(error instanceof Error ? error.message : 'Failed to send review notification.');
    }
  };

  return (
    <>
      <TestimonialsSection
        testimonials={combinedTestimonials}
        currentLang={currentLang}
        userTestimonial={userTestimonial}
      />
      <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
    </>
  );
};

export default TestimonialsPageClient;
