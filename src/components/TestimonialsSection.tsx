import { useMemo } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility, Testimonial, UserTestimonial } from '../types/global';

interface TestimonialsSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
  testimonials: Testimonial[];
  currentLang: string;
  userTestimonial: UserTestimonial | null;
}

const TestimonialsSection = ({ t, isVisible, testimonials, currentLang, userTestimonial }: TestimonialsSectionProps) => {
  // Memoize allTestimonials to ensure its reference is stable
  const allTestimonials = useMemo(() => {
    return userTestimonial ? [userTestimonial, ...testimonials] : testimonials;
  }, [userTestimonial, testimonials]); // Dependencies: userTestimonial and testimonials props

  // Shuffle testimonials for the grid display
  const shuffledGridTestimonials = useMemo(() => {
    return [...allTestimonials]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4); // Changed to show up to 4 random testimonials in the grid
  }, [allTestimonials]); // Re-shuffle if allTestimonials changes

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="testimonials" 
      className="relative py-16 bg-gray-100 overflow-hidden" // Reduced py-20 to py-16
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['testimonials'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div> {/* Lighter gradient */}
      {/* Semi-transparent black overlay */}
      <div className="absolute inset-0 bg-gray-200/20 z-0"></div> {/* Lighter overlay */}
      
      {/* Dynamic background elements (circles) */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary-100/50 rounded-full opacity-50 animate-pulse-slow z-0"></div> {/* Changed to green-100/50 */}
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-100/50 rounded-full opacity-50 animate-pulse-slow z-0" style={{animationDelay: '1.5s'}}></div> {/* Changed to blue-100/50 */}

      <div className="container mx-auto px-4 relative z-10"> {/* Content needs higher z-index */}
        <motion.div 
          className="text-center mb-12" // Reduced mb-16 to mb-12
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['testimonials'] ? "visible" : "hidden"}
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-5"> {/* Reduced text-3xl/4xl to text-2xl/3xl, mb-6 to mb-5 */}
            {t.testimonials.title}
          </h2>
          <p className="text-base text-gray-700 max-w-3xl mx-auto"> {/* Reduced text-lg to text-base */}
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* More Reviews Grid - now the primary display */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Reduced gap-8 to gap-6 */}
          {shuffledGridTestimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 group hover:shadow-glow-green" // Using custom glow-green shadow
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['testimonials'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }} // Staggered animation
              whileHover={{ scale: 1.05 }} // Removed boxShadow from here
              whileTap={{ scale: 0.98 }} // Added whileTap animation
            >
              <div className="flex items-center mb-3"> {/* Reduced mb-4 to mb-3 */}
                <div>
                  <h5 className="font-bold text-gray-900 text-sm"> {/* Reduced text-base to text-sm */}
                    {currentLang === 'hy' ? testimonial.name : currentLang === 'ru' ? testimonial.nameRu : testimonial.nameEn}
                  </h5>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="ml-auto bg-primary-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold"> {/* Reduced px/py, text-xs (already small) */}
                  {testimonial.result}
                </div>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed"> {/* Reduced text-xs (already small) */}
                {currentLang === 'hy' ? testimonial.textHy : currentLang === 'ru' ? testimonial.textRu : testimonial.nameEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;