// import { motion } from 'framer-motion'; // Removed motion
import { TranslationKeys } from '../types/global';
import { benefitsItemsData } from '../data/benefitsItems';

interface BenefitsSectionProps {
  t: TranslationKeys;
  // isVisible: IntersectionObserverVisibility; // Removed isVisible
}

const BenefitsSection = ({ t }: BenefitsSectionProps) => { // Removed isVisible from props
  return (
    <section 
      id="benefits" 
      className="relative py-16 bg-gradient-to-br from-neutral-light to-pure-white overflow-hidden" // Updated colors
      data-aos="fade-up" // AOS animation
      data-aos-duration="800"
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="text-center mb-12"
          data-aos="fade-up" // AOS animation
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-display font-bold text-neutral-dark mb-5"> {/* Updated font size and family */}
            {t.benefits.title}
          </h2>
          <p className="text-lg text-neutral-medium max-w-3xl mx-auto"> {/* Updated font size and color */}
            {t.benefits.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsItemsData.map((benefit, index) => (
            <div 
              key={benefit.key}
              className="relative overflow-hidden bg-pure-white rounded-3xl p-6 shadow-lg border border-gray-200 group transition-all duration-300 hover:scale-105 hover:shadow-xl" // Updated colors and added manual transitions
              data-aos="zoom-in" // AOS animation
              data-aos-delay={`${index * 100 + 200}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${benefit.gradient} rounded-full`}></div>
              </div>
              
              <div className="relative z-10">
                <div 
                  className={`w-14 h-14 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className="w-7 h-7 text-pure-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{t.benefits[benefit.key].title}</h3> {/* Updated font size and family */}
                <p className="text-base text-neutral-medium leading-relaxed">{t.benefits[benefit.key].desc}</p> {/* Updated font size and color */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;