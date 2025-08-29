import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; // Changed to Font Awesome icon
import { TranslationKeys, UserReviewSubmission } from '../types/global';
import CallToActionButton from './CallToActionButton';

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
    <section className="relative py-16 bg-neutral-light text-neutral-dark overflow-hidden"> {/* Updated colors */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-8" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-4xl font-display font-bold mb-3"> {/* Updated font size and family */}
            {t.testimonials.formTitle}
          </h2>
          <p className="text-lg text-neutral-medium"> {/* Updated font size and color */}
            {t.testimonials.formSubtitle}
          </p>
        </div>

        {submitted ? (
          <div 
            className="bg-secondary-green text-pure-white p-5 rounded-xl text-center text-base font-semibold" // Updated colors
            data-aos="zoom-in" // AOS animation
            data-aos-delay="200"
          >
            {t.testimonials.thankYou}
          </div>
        ) : (
          <>
            {!showForm && (
              <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="200">
                <CallToActionButton
                  onClick={() => setShowForm(true)}
                  icon={FaPaperPlane} // Changed to Font Awesome icon
                  size="md"
                >
                  {t.testimonials.formTitle}
                </CallToActionButton>
              </div>
            )}

            {showForm && (
              <form onSubmit={handleSubmit} className="bg-pure-white p-6 rounded-2xl shadow-xl border border-gray-200" data-aos="fade-up" data-aos-delay="300"> {/* Updated colors */}
                <div className="mb-5">
                  <label htmlFor="name" className="block text-neutral-dark text-sm font-bold mb-2"> {/* Updated colors */}
                    {t.testimonials.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-neutral-dark leading-tight focus:outline-none focus:ring-2 focus:ring-warm-accent bg-neutral-light placeholder-neutral-medium" // Updated colors
                    placeholder={t.testimonials.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="review" className="block text-neutral-dark text-sm font-bold mb-2"> {/* Updated colors */}
                    {t.testimonials.reviewPlaceholder}
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    className="shadow appearance-none border border-gray-200 rounded-lg w-full py-2.5 px-3 text-neutral-dark leading-tight focus:outline-none focus:ring-2 focus:ring-warm-accent bg-neutral-light placeholder-neutral-medium resize-none" // Updated colors
                    placeholder={t.testimonials.reviewPlaceholder}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <CallToActionButton
                    type="submit"
                    icon={FaPaperPlane} // Changed to Font Awesome icon
                    size="md"
                    aos="zoom-in" // AOS animation
                    aosDelay="400"
                  >
                    {t.testimonials.submitButton}
                  </CallToActionButton>
                  <CallToActionButton
                    type="button"
                    onClick={() => setShowForm(false)}
                    variant="subtle"
                    size="md"
                    aos="zoom-in" // AOS animation
                    aosDelay="500"
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