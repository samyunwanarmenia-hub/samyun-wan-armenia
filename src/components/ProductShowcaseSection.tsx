// import { motion } from 'framer-motion'; // Removed motion
import { TranslationKeys, ProductShowcaseItem } from '../types/global';
import OptimizedImage from './OptimizedImage';
import { productShowcaseData } from '../data/productShowcaseData';
import { FaShoppingCart } from 'react-icons/fa'; // Changed to Font Awesome icon
import CallToActionButton from './CallToActionButton';

interface ProductShowcaseSectionProps {
  t: TranslationKeys;
  // isVisible: IntersectionObserverVisibility; // Removed isVisible
  openOrderModal: (productKey?: ProductShowcaseItem['labelKey']) => void;
}

const ProductShowcaseSection = ({ t, openOrderModal }: ProductShowcaseSectionProps) => { // Removed isVisible from props
  return (
    <section
      id="products"
      className="relative py-16 bg-neutral-light text-neutral-dark overflow-hidden" // Updated colors
      data-aos="fade-up" // AOS animation
      data-aos-duration="800"
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="text-center mb-12"
          data-aos="fade-up" // AOS animation
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-display font-bold text-neutral-dark mb-5"> {/* Updated font size and family */}
            {t.gallery.title}
          </h2>
          <p className="text-lg text-neutral-medium max-w-3xl mx-auto"> {/* Updated font size and color */}
            {t.gallery.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {productShowcaseData.map((product, index) => (
            <div
              key={product.src}
              className="flex flex-col items-center text-center p-3 rounded-xl shadow-lg group cursor-pointer bg-pure-white border border-gray-200 w-full sm:w-[calc(50%-1rem)] lg:w-60 transition-all duration-300 hover:scale-105 hover:shadow-xl" // Updated colors and added manual transitions
              data-aos="zoom-in" // AOS animation
              data-aos-delay={`${index * 100 + 200}`}
            >
              <div 
                className="w-28 h-28 flex items-center justify-center mb-3 overflow-hidden rounded-lg bg-neutral-light transform group-hover:scale-110 transition-transform duration-300" // Updated colors and added manual transitions
              > 
                <OptimizedImage
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-xl font-display font-bold text-neutral-dark mb-1">{t.productShowcase[product.labelKey]}</p> {/* Updated font size and family */}
              <p className="text-sm text-neutral-medium mb-2">{t.productShowcase[product.descKey]}</p> {/* Updated font size and color */}
              <p className="text-primary-green text-xl font-bold mb-3">{product.price.toLocaleString()} AMD</p> {/* Updated font size and color */}
              <CallToActionButton
                onClick={() => openOrderModal(product.labelKey)}
                icon={FaShoppingCart}
                size="sm" // Adjusted size to sm (16px text)
                aos="fade-up" // AOS animation
                aosDelay={`${index * 100 + 300}`}
              >
                {t.productShowcase[product.buttonTextKey]}
              </CallToActionButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;