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
      className="relative py-20 bg-gray-50 text-gray-900 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['products'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['products'] ? "visible" : "hidden"}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t.gallery.title}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {productShowcaseData.map((product, index) => (
            <motion.div
              key={product.src}
              className="flex flex-col items-center text-center p-4 rounded-xl shadow-lg group cursor-pointer bg-white border border-gray-200 w-full sm:w-[calc(50%-1rem)] lg:w-64"
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['products'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.08, boxShadow: "0 20px 25px -5px rgba(248, 113, 113, 0.3), 0 10px 10px -5px rgba(248, 113, 113, 0.2)" }}
            >
              <motion.div 
                className="w-32 h-32 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-gray-100"
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
              <p className="text-gray-900 text-2xl font-bold mb-1">{t.productShowcase[product.labelKey]}</p>
              <p className="text-gray-700 text-sm mb-2">{t.productShowcase[product.descKey]}</p>
              <p className="text-green-600 text-xl font-bold mb-4">{product.price.toLocaleString()} AMD</p>
              <CallToActionButton
                onClick={() => openOrderModal(product.labelKey)}
                icon={ShoppingCart}
                size="sm" // Adjusted size for better fit
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