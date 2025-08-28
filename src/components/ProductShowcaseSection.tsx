import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility, ProductShowcaseItem } from '../types/global';
import OptimizedImage from './OptimizedImage';
import { productShowcaseData } from '../data/productShowcaseData';
import { ShoppingCart } from 'lucide-react';
import CallToActionButton from './CallToActionButton'; // Import CallToActionButton

interface ProductShowcaseSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
  openOrderModal: (productKey?: ProductShowcaseItem['labelKey']) => void;
}

const ProductShowcaseSection = ({ t, isVisible, openOrderModal }: ProductShowcaseSectionProps) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section
      id="products"
      className="relative py-16 bg-gray-50 text-gray-900 overflow-hidden" // Reduced py-20 to py-16
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['products'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12" // Reduced mb-16 to mb-12
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['products'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5"> {/* Reduced text-4xl/5xl to text-3xl/4xl, mb-6 to mb-5 */}
            {t.gallery.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto"> {/* Reduced text-xl to text-lg */}
            {t.gallery.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6"> {/* Reduced gap-8 to gap-6 */}
          {productShowcaseData.map((product, index) => (
            <motion.div
              key={product.src}
              className="flex flex-col items-center text-center p-3 rounded-xl shadow-lg group cursor-pointer bg-white border border-gray-200 w-full sm:w-[calc(50%-1rem)] lg:w-60" // Reduced p-4 to p-3, lg:w-64 to lg:w-60
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['products'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.08, boxShadow: "0 20px 25px -5px rgba(248, 113, 113, 0.3), 0 10px 10px -5px rgba(248, 113, 113, 0.2)" }}
            >
              <motion.div 
                className="w-28 h-28 flex items-center justify-center mb-3 overflow-hidden rounded-lg bg-gray-100" // Reduced w/h-32 to w/h-28, mb-4 to mb-3
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              > 
                <OptimizedImage
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </motion.div>
              <p className="text-gray-900 text-xl font-bold mb-1">{t.productShowcase[product.labelKey]}</p> {/* Reduced text-2xl to text-xl */}
              <p className="text-gray-700 text-xs mb-2">{t.productShowcase[product.descKey]}</p> {/* Reduced text-sm to text-xs */}
              <p className="text-green-600 text-lg font-bold mb-3">{product.price.toLocaleString()} AMD</p> {/* Reduced text-xl to text-lg, mb-4 to mb-3 */}
              <CallToActionButton
                onClick={() => openOrderModal(product.labelKey)}
                icon={ShoppingCart}
                size="xs" // Adjusted size from sm to xs
              >
                {t.productShowcase[product.buttonTextKey]}
              </CallToActionButton>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductShowcaseSection;