import { FaHeart, FaBolt, FaShoppingCart } from 'react-icons/fa'; // Changed to Font Awesome icons
// import { motion } from 'framer-motion'; // Removed motion
import OptimizedImage from './OptimizedImage';
import { TranslationKeys, ProductShowcaseItem, OpenOrderModalFunction } from '../types/global';
import { productShowcaseData } from '../data/productShowcaseData';
import CallToActionButton from './CallToActionButton';

interface HeroProductCardProps {
  t: TranslationKeys;
  openOrderModal: OpenOrderModalFunction;
}

const HeroProductCard: React.FC<HeroProductCardProps> = ({ t, openOrderModal }) => {
  const featuredProduct: ProductShowcaseItem = productShowcaseData[0];

  if (!featuredProduct) {
    return null;
  }

  return (
    <div className="relative">
      <div 
        className="bg-pure-white rounded-3xl p-6 shadow-2xl max-w-sm mx-auto border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-xl" // Updated colors and added manual transitions
        data-aos="zoom-in" // AOS animation
        data-aos-delay="100"
      >
        <div className="relative">
          <div className="relative w-64 h-64 mx-auto mb-5 rounded-2xl overflow-hidden shadow-2xl">
            <OptimizedImage 
              src={featuredProduct.src}
              alt={featuredProduct.alt}
              className="w-full h-full object-contain" 
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pure-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none"></div>
          </div>
          
          <div className="text-center mb-5">
            <h3 className="text-2xl font-display font-bold text-neutral-dark mb-1.5">{t.productShowcase[featuredProduct.labelKey]}</h3> {/* Updated font size, family and color */}
            <p className="text-base text-neutral-medium mb-2.5">{t.productShowcase[featuredProduct.descKey]}</p> {/* Updated font size and color */}
            <p className="text-primary-green text-2xl font-bold mb-5">{featuredProduct.price.toLocaleString()} AMD</p> {/* Updated font size and color */}
            <CallToActionButton
              onClick={() => openOrderModal(featuredProduct.labelKey)}
              icon={FaShoppingCart} // Changed to Font Awesome icon
              variant="primary"
              size="md" // Adjusted size to md (16px text)
              aos="zoom-in" // AOS animation
              aosDelay="200"
            >
              {t.productShowcase[featuredProduct.buttonTextKey]}
            </CallToActionButton>
          </div>
        </div>
      </div>

      <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary-green rounded-full flex items-center justify-center animate-bounce"> {/* Updated colors */}
        <FaHeart className="w-5 h-5 text-pure-white" /> {/* Changed to Font Awesome icon */}
      </div>
      <div className="absolute -bottom-5 -right-5 w-10 h-10 bg-secondary-green rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}> {/* Updated colors */}
        <FaBolt className="w-5 h-5 text-pure-white" /> {/* Changed to Font Awesome icon */}
      </div>
    </div>
  );
};

export default HeroProductCard;