import { useState } from 'react';
import { Send } from 'lucide-react';
// motion import removed
import { TranslationKeys, UserReviewSubmission } from '../types/global';
import CallToActionButton from './CallToActionButton'; // Import CallToActionButton

interface ReviewFormProps {
  t: TranslationKeys;
  onSubmit: (review: UserReviewSubmission) => Promise<void>;
}

const ReviewForm = ({ t, onSubmit }: ReviewFormProps) => {
  const [name, setName] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) {
      // Optionally show an error toast here if fields are empty
      return;
    }

    await onSubmit({ name, text: reviewText });

    setSubmitted(true);
    setName('');
    setReviewText('');
    setShowForm(false); // Hide form after submission
  };

  return (
    <section className="relative py-20 bg-gray-100 text-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.testimonials.formTitle}
          </h2>
          <p className="text-xl text-gray-700">
            {t.testimonials.formSubtitle}
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-600 text-white p-6 rounded-xl text-center text-lg font-semibold">
            {t.testimonials.thankYou}
          </div>
        ) : (
          <>
            {!showForm && (
              <div className="flex justify-center">
                <CallToActionButton
                  onClick={() => setShowForm(true)}
                  icon={Send}
                  size="lg" // Adjusted size for better fit
                >
                  {t.testimonials.formTitle}
                </CallToActionButton>
              </div>
            )}

            {showForm && (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 animate-fade-in-up">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-900 text-sm font-bold mb-2">
                    {t.testimonials.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-100 placeholder-gray-500"
                    placeholder={t.testimonials.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="review" className="block text-gray-900 text-sm font-bold mb-2">
                    {t.testimonials.reviewPlaceholder}
                  </label>
                  <textarea
                    id="review"
                    rows={5}
                    className="shadow appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-100 placeholder-gray-500 resize-none"
                    placeholder={t.testimonials.reviewPlaceholder}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <CallToActionButton
                    type="submit"
                    icon={Send}
                    size="lg" // Adjusted size for better fit
                  >
                    {t.testimonials.submitButton}
                  </CallToActionButton>
                  <CallToActionButton
                    type="button"
                    onClick={() => setShowForm(false)}
                    variant="subtle" // Using the new subtle variant
                    size="lg" // Adjusted size for better fit
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