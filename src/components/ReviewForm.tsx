"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { DbReview } from '../types/global';
import CallToActionButton from './CallToActionButton';
import { useLayoutContext } from '@/context/LayoutContext';
import { useReviewForm } from '@/hooks/useReviewForm';

interface ReviewFormProps {
  onReviewSubmitted: (review: DbReview) => void;
}

const ReviewForm = ({ onReviewSubmitted }: ReviewFormProps) => {
  const { t } = useLayoutContext();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    name,
    setName,
    reviewText,
    setReviewText,
    isSubmitting,
    handleSubmit,
  } = useReviewForm({
    t,
    onReviewSubmitted: (review) => {
      onReviewSubmitted(review);
      setShowForm(false);
      setSubmitted(true);
    },
    initialName: '', // No initial name from user auth
  });

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            {t.testimonials.formTitle}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t.testimonials.formSubtitle}
          </p>
        </div>

        {submitted ? (
          <div className="bg-primary-600 text-white p-5 rounded-xl text-center text-base font-semibold dark:bg-primary-700">
            {t.testimonials.thankYou}
          </div>
        ) : (
          <>
            {!showForm && (
              <div className="flex justify-center">
                <CallToActionButton
                  onClick={() => setShowForm(true)}
                  icon={Send}
                  size="md"
                  interactionEffect="burst"
                  gaEvent={{ category: 'Review', action: 'Click_OpenReviewForm' }}
                  ymEvent={{ category: 'Review', action: 'Click_OpenReviewForm' }}
                >
                  {t.testimonials.formTitle}
                </CallToActionButton>
              </div>
            )}

            {showForm && (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
                <div className="mb-5">
                  <label htmlFor="name" className="block text-gray-900 dark:text-gray-50 text-sm font-bold mb-2">
                    {t.testimonials.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border border-gray-200 dark:border-gray-600 rounded-lg w-full py-2.5 px-3 text-gray-900 dark:text-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder={t.testimonials.namePlaceholder}
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="review" className="block text-gray-900 dark:text-gray-50 text-sm font-bold mb-2">
                    {t.testimonials.reviewPlaceholder}
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    className="shadow appearance-none border border-gray-200 dark:border-gray-600 rounded-lg w-full py-2.5 px-3 text-gray-900 dark:text-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    placeholder={t.testimonials.reviewPlaceholder}
                    value={reviewText}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewText(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <CallToActionButton
                    type="submit"
                    icon={Send}
                    size="md"
                    disabled={isSubmitting}
                    interactionEffect="pixels"
                    gaEvent={{ category: 'Review', action: 'Click_SubmitReview' }}
                    ymEvent={{ category: 'Review', action: 'Click_SubmitReview' }}
                  >
                    {isSubmitting ? 'Sending...' : t.testimonials.submitButton}
                  </CallToActionButton>
                  <CallToActionButton
                    type="button"
                    onClick={() => setShowForm(false)}
                    variant="subtle"
                    size="md"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </CallToActionButton>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewForm;