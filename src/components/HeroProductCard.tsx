import { Heart, Zap, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { TranslationKeys, ProductShowcaseItem, OpenOrderModalFunction } from '../types/global';
import { productShowcaseData } from '../data/productShowcaseData';

interface HeroProductCardProps {
  t: TranslationKeys;
  openOrderModal: OpenOrderModalFunction;
}

const HeroProductCard: React.FC<HeroProductCardProps> = ({ t, openOrderModal }) => {
  // Use the first product from productShowcaseData (assuming it's the weight gain product)
  const featuredProduct: ProductShowcaseItem = productShowcaseData[0];

  if (!featuredProduct) {
    return null;
  }

  return (
    <div className="relative">
      <motion.div 
        className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-auto border border-gray-200" // Changed background to white and border to gray-200
        whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(248, 113, 113, 0.3), 0 10px 10px -5px rgba(248, 113, 113, 0.2)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          <div className="relative w-80 h-80 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl">
            <OptimizedImage 
              src={featuredProduct.src}
              alt={featuredProduct.alt}
              className="w-full h-full object-contain" 
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none"></div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-gray-900 text-3xl font-bold mb-2">{t.productShowcase[featuredProduct.labelKey]}</h3> {/* Changed text color to gray-900 */}
            <p className="text-gray-700 text-lg mb-3">{t.productShowcase[featuredProduct.descKey]}</p> {/* Changed text color to gray-700 */}
            <p className="text-green-600 text-3xl font-bold mb-6">{featuredProduct.price.toLocaleString()} AMD</p> {/* Changed to green-600 */}
            <motion.button
              onClick={() => openOrderModal(featuredProduct.labelKey)}
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              {t.productShowcase[featuredProduct.buttonTextKey]}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="absolute -top-6 -left-6 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
        <Heart className="w-6 h-6 text-white" />
      </div>
      <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}>
        <Zap className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export default HeroProductCard;