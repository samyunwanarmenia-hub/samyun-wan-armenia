import { useMemo } from 'react';
// import { motion } from 'framer-motion'; // Removed motion
import { FaStar } from 'react-icons/fa'; // Changed to Font Awesome icon
import { TranslationKeys, Testimonial, UserTestimonial } from '../types/global';
// import { generateTestimonials } from '../utils/testimonialGenerator'; // Removed unused import

interface TestimonialsSectionProps {
  t: TranslationKeys;
  // isVisible: IntersectionObserverVisibility; // Removed isVisible
  testimonials: Testimonial[];
  currentLang: string;
  userTestimonial: UserTestimonial | null;
}

const TestimonialsSection = ({ t, testimonials, currentLang, userTestimonial }: TestimonialsSectionProps) => { // Removed isVisible from props
  const allTestimonials = useMemo(() => {
    return userTestimonial ? [userTestimonial, ...testimonials] : testimonials;
  }, [userTestimonial, testimonials]);

  const shuffledGridTestimonials = useMemo(() => {
    return [...allTestimonials]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [allTestimonials]);

  return (
    <section 
      id="testimonials" 
      className="relative py-16 bg-neutral-light overflow-hidden" // Updated colors
      data-aos="fade-up" // AOS animation
      data-aos-duration="800"
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-neutral-light/20 z-0"></div> {/* Updated colors */}
      
      {/* Dynamic background elements (circles) */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary-green/10 rounded-full opacity-50 animate-pulse-slow z-0"></div> {/* Updated colors */}
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-100/50 rounded-full opacity-50 animate-pulse-slow z-0" style={{animationDelay: '1.5s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="text-center mb-12"
          data-aos="fade-up" // AOS animation
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-display font-bold text-neutral-dark mb-5"> {/* Updated font size and family */}
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-neutral-medium max-w-3xl mx-auto"> {/* Updated font size and color */}
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shuffledGridTestimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-pure-white rounded-2xl p-4 shadow-lg border border-gray-200 group transition-all duration-300 hover:scale-105 hover:shadow-xl" // Updated colors and added manual transitions
              data-aos="zoom-in" // AOS animation
              data-aos-delay={`${index * 100 + 200}`}
            >
              <div className="flex items-center mb-3">
                <div>
                  <h5 className="font-bold text-neutral-dark text-base font-sans">{currentLang === 'hy' ? testimonial.name : currentLang === 'ru' ? testimonial.nameRu : testimonial.nameEn}</h5> {/* Updated font size and color */}
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" /> 
                    ))}
                  </div>
                </div>
                <div className="ml-auto bg-primary-green text-pure-white px-2 py-1 rounded-full text-xs font-bold"> {/* Updated colors */}
                  {testimonial.result}
                </div>
              </div>
              <p className="text-neutral-medium text-sm leading-relaxed font-lora italic"> {/* Updated font size, color and family */}
                {currentLang === 'hy' ? testimonial.textHy : currentLang === 'ru' ? testimonial.textRu : testimonial.nameEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;