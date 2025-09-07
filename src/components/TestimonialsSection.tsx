"use client";

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Testimonial } from '../types/global';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';
import OptimizedImage from './OptimizedImage';
// Removed generateReviewStructuredData import as it's no longer needed here

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentLang: string;
  userTestimonial: Testimonial | null; // Added userTestimonial prop
}

const TestimonialsSection = ({ testimonials, currentLang, userTestimonial }: TestimonialsSectionProps) => {
  const { t } = useLayoutContext();
  
  // Combine userTestimonial with existing testimonials, placing userTestimonial first if it exists
  const combinedTestimonials = userTestimonial ? [userTestimonial, ...testimonials] : testimonials;
  const displayedTestimonials = combinedTestimonials.slice(0, 6);

  // Removed reviewStructuredData generation as it's handled by the layout
  // const reviewStructuredData = displayedTestimonials.map((testimonial: Testimonial) => 
  //   generateReviewStructuredData(t, testimonial, currentLang)
  // );

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Removed script tag for structured data as it's handled by the layout */}
      <motion.section 
        id="testimonials" 
        className="relative py-12 overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title={t.testimonials.title}
            subtitle={t.testimonials.subtitle}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {displayedTestimonials.map((testimonial: Testimonial) => (
              <motion.div 
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 group flex flex-col"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5, // Subtle lift
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)" // Enhanced shadow with glow
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-3">
                  <OptimizedImage
                    src={testimonial.image}
                    alt={currentLang === 'hy' ? testimonial.name : currentLang === 'ru' ? testimonial.nameRu : testimonial.nameEn}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                    sizes="40px"
                  />
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
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed flex-grow">
                  {currentLang === 'hy' ? testimonial.textHy : currentLang === 'ru' ? testimonial.textRu : testimonial.textEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default TestimonialsSection;