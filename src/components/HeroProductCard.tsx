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
        className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm mx-auto border border-gray-200" // Reduced p-8 to p-6, max-w-md to max-w-sm
        whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.3), 0 10px 10px -5px rgba(34, 197, 94, 0.2)" }} // Changed shadow to green glow
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          <div className="relative w-64 h-64 mx-auto mb-5 rounded-2xl overflow-hidden shadow-2xl"> {/* Reduced w/h-80 to w/h-64, mb-6 to mb-5 */}
            <OptimizedImage 
              src={featuredProduct.src}
              alt={featuredProduct.alt}
              className="w-full h-full object-contain" 
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none"></div>
          </div>
          
          <div className="text-center mb-5"> {/* Reduced mb-6 to mb-5 */}
            <h3 className="text-gray-900 text-2xl font-bold mb-1.5">{t.productShowcase[featuredProduct.labelKey]}</h3> {/* Reduced text-3xl to text-2xl, mb-2 to mb-1.5 */}
            <p className="text-gray-700 text-base mb-2.5">{t.productShowcase[featuredProduct.descKey]}</p> {/* Reduced text-lg to text-base, mb-3 to mb-2.5 */}
            <p className="text-green-600 text-2xl font-bold mb-5">{featuredProduct.price.toLocaleString()} AMD</p> {/* Reduced text-3xl to text-2xl, mb-6 to mb-5 */}
            <motion.button
              onClick={() => openOrderModal(featuredProduct.labelKey)}
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center justify-center mx-auto" // Reduced px/py, text-lg to text-sm
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" /> {/* Reduced w/h-6 to w/h-5, mr-3 to mr-2 */}
              {t.productShowcase[featuredProduct.buttonTextKey]}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center animate-bounce"> {/* Reduced w/h-12 to w/h-10, top/left-6 to top/left-5 */}
        <Heart className="w-5 h-5 text-white" /> {/* Reduced w/h-6 to w/h-5 */}
      </div>
      <div className="absolute -bottom-5 -right-5 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}> {/* Reduced w/h-12 to w/h-10, bottom/right-6 to bottom/right-5 */}
        <Zap className="w-5 h-5 text-white" /> {/* Reduced w/h-6 to w/h-5 */}
      </div>
    </div>
  );
};

export default HeroProductCard;