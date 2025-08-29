import { useState, useEffect, useMemo } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility, Testimonial, UserTestimonial } from '../types/global';

interface TestimonialsSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
  testimonials: Testimonial[];
  currentLang: string;
  userTestimonial: UserTestimonial | null;
}

const TestimonialsSection = ({ t, isVisible, testimonials, currentLang, userTestimonial }: TestimonialsSectionProps) => {
  const [displayIndices, setDisplayIndices] = useState<[number, number]>([0, 1]);
  const [shuffledTestimonials, setShuffledTestimonials] = useState<Testimonial[]>([]);

  const allTestimonials = useMemo(() => {
    return userTestimonial ? [userTestimonial, ...testimonials] : testimonials;
  }, [userTestimonial, testimonials]);

  useEffect(() => {
    const newShuffled = [...allTestimonials].sort(() => 0.5 - Math.random());
    setShuffledTestimonials(newShuffled);
    setDisplayIndices([0, 1]);
  }, [allTestimonials]);

  useEffect(() => {
    if (shuffledTestimonials.length < 2) return;

    const interval = setInterval(() => {
      setDisplayIndices(prevIndices => {
        const [idx1, idx2] = prevIndices;
        let newIdx1 = (idx1 + 2) % shuffledTestimonials.length;
        let newIdx2 = (idx2 + 2) % shuffledTestimonials.length;

        if (newIdx1 === newIdx2 && shuffledTestimonials.length > 1) {
          newIdx2 = (newIdx2 + 1) % shuffledTestimonials.length;
        }
        
        return [newIdx1, newIdx2];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [shuffledTestimonials]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  const displayedTestimonials = [
    shuffledTestimonials[displayIndices[0]],
    shuffledTestimonials[displayIndices[1]]
  ].filter(Boolean) as Testimonial[];

  return (
    <motion.section 
      id="testimonials" 
      className="relative py-12 bg-gray-100 dark:bg-gray-900 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['testimonials'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50 dark:from-gray-700/20"></div>
      <div className="absolute inset-0 bg-gray-200/20 z-0 dark:bg-gray-800/20"></div>
      
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary-100/50 rounded-full opacity-50 animate-pulse-slow z-0 dark:bg-primary-900/30"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-100/50 rounded-full opacity-50 animate-pulse-slow z-0 dark:bg-blue-900/30" style={{animationDelay: '1.5s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['testimonials'] ? "visible" : "hidden"}
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-5">
            {t.testimonials.title}
          </h2>
          {t.testimonials.subtitle && (
            <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 justify-center">
          <AnimatePresence mode="wait">
            {displayedTestimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id} // Using unique ID as key
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 group hover:shadow-glow-green dark:hover:shadow-glow-green-dark"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.2 }} // Removed index-based delay as it's now for individual items
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-3">
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-gray-50 text-sm">
                      {currentLang === 'hy' ? testimonial.name : currentLang === 'ru' ? testimonial.nameRu : testimonial.nameEn}
                    </h5>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto bg-primary-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold dark:bg-primary-600">
                    {testimonial.result}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {currentLang === 'hy' ? testimonial.textHy : currentLang === 'ru' ? testimonial.textRu : testimonial.textEn}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;