import { useState } from 'react';
import { Send } from 'lucide-react';
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
    <section className="relative py-16 bg-gray-100 text-gray-900 overflow-hidden"> {/* Reduced py-20 to py-16 */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-8"> {/* Reduced mb-12 to mb-8 */}
          <h2 className="text-3xl lg:text-4xl font-bold mb-3"> {/* Reduced text-4xl/5xl to text-3xl/4xl, mb-4 to mb-3 */}
            {t.testimonials.formTitle}
          </h2>
          <p className="text-lg text-gray-700"> {/* Reduced text-xl to text-lg */}
            {t.testimonials.formSubtitle}
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-600 text-white p-5 rounded-xl text-center text-base font-semibold"> {/* Reduced p-6 to p-5, text-lg to text-base */}
            {t.testimonials.thankYou}
          </div>
        ) : (
          <>
            {!showForm && (
              <div className="flex justify-center">
                <CallToActionButton
                  onClick={() => setShowForm(true)}
                  icon={Send}
                  size="md" // Adjusted size from lg to md
                >
                  {t.testimonials.formTitle}
                </CallToActionButton>
              </div>
            )}

            {showForm && (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 animate-fade-in-up"> {/* Reduced p-8 to p-6 */}
                <div className="mb-5"> {/* Reduced mb-6 to mb-5 */}
                  <label htmlFor="name" className="block text-gray-900 text-sm font-bold mb-2">
                    {t.testimonials.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-100 placeholder-gray-500" // Reduced py-3 px-4 to py-2.5 px-3
                    placeholder={t.testimonials.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5"> {/* Reduced mb-6 to mb-5 */}
                  <label htmlFor="review" className="block text-gray-900 text-sm font-bold mb-2">
                    {t.testimonials.reviewPlaceholder}
                  </label>
                  <textarea
                    id="review"
                    rows={4} // Reduced rows from 5 to 4
                    className="shadow appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-100 placeholder-gray-500 resize-none" // Reduced py-3 px-4 to py-2.5 px-3
                    placeholder={t.testimonials.reviewPlaceholder}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-center space-x-3"> {/* Reduced space-x-4 to space-x-3 */}
                  <CallToActionButton
                    type="submit"
                    icon={Send}
                    size="md" // Adjusted size from lg to md
                  >
                    {t.testimonials.submitButton}
                  </CallToActionButton>
                  <CallToActionButton
                    type="button"
                    onClick={() => setShowForm(false)}
                    variant="subtle" // Using the new subtle variant
                    size="md" // Adjusted size from lg to md
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