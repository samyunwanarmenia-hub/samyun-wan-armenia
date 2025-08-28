import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, UserReviewSubmission } from '../types/global';

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
    <section className="relative py-20 bg-gray-900 text-white overflow-hidden"> {/* Added relative and overflow-hidden */}
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-800/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 max-w-2xl relative z-10"> {/* Ensure content is above overlay */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.testimonials.formTitle}
          </h2>
          <p className="text-xl text-gray-300"> {/* Changed text color to gray-300 */}
            {t.testimonials.formSubtitle}
          </p>
        </div>

        {submitted ? (
          <div className="bg-lightGreen-700 text-white p-6 rounded-xl text-center text-lg font-semibold"> {/* Changed background to lightGreen-700 */}
            {t.testimonials.thankYou}
          </div>
        ) : (
          <>
            {!showForm && (
              <div className="flex justify-center">
                <motion.button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t.testimonials.formTitle} {/* Changed to formTitle for opening the form */}
                </motion.button>
              </div>
            )}

            {showForm && (
              <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 animate-fade-in-up"> {/* Changed background and border */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-white text-sm font-bold mb-2"> {/* Changed text color to white */}
                    {t.testimonials.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-700 placeholder-gray-400" // Changed background, border, and text color
                    placeholder={t.testimonials.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="review" className="block text-white text-sm font-bold mb-2"> {/* Changed text color to white */}
                    {t.testimonials.reviewPlaceholder}
                  </label>
                  <textarea
                    id="review"
                    rows={5}
                    className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-700 placeholder-gray-400 resize-none" // Changed background, border, and text color
                    placeholder={t.testimonials.reviewPlaceholder}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {t.testimonials.submitButton}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 transform hover:scale-105 transition-all" // Changed background, text, and hover background
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Cancel
                  </motion.button>
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