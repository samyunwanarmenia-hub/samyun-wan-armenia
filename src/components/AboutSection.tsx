import { FaLeaf, FaAward, FaShieldAlt, FaChartLine } from 'react-icons/fa'; // Changed to Font Awesome icons
// import { motion } from 'framer-motion'; // Removed motion
import { TranslationKeys } from '../types/global';

interface AboutSectionProps {
  t: TranslationKeys;
  // isVisible: IntersectionObserverVisibility; // Removed isVisible
}

// Define a type for the keys that are actually iterated over in t.about
type AboutItemKey = 'natural' | 'proven' | 'safe' | 'fast';

const AboutSection = ({ t }: AboutSectionProps) => { // Removed isVisible from props
  const aboutItems: { key: AboutItemKey; icon: any; color: string; }[] = [
    { key: 'natural', icon: FaLeaf, color: 'from-primary-green to-secondary-green' }, // Updated colors
    { key: 'proven', icon: FaAward, color: 'from-blue-500 to-indigo-600' },
    { key: 'safe', icon: FaShieldAlt, color: 'from-purple-500 to-violet-600' },
    { key: 'fast', icon: FaChartLine, color: 'from-warm-accent to-red-500' } // Updated colors
  ];

  return (
    <section 
      id="about" 
      className="relative py-16 bg-neutral-light overflow-hidden" // Updated colors
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
            {t.about.title}
          </h2>
          <p className="text-lg text-neutral-medium max-w-3xl mx-auto"> {/* Updated font size and color */}
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutItems.map((item, index) => (
            <div 
              key={item.key}
              className="bg-pure-white rounded-2xl p-6 shadow-lg border border-gray-200 group transition-all duration-300 hover:scale-105 hover:shadow-xl" // Updated colors and added manual transitions
              data-aos="zoom-in" // AOS animation
              data-aos-delay={`${index * 100 + 200}`}
            >
              <div 
                className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-5 transform group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="w-7 h-7 text-pure-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{t.about[item.key].title}</h3> {/* Updated font size and family */}
              <p className="text-base text-neutral-medium leading-relaxed">{t.about[item.key].desc}</p> {/* Updated font size and color */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;