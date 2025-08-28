import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility, ProductShowcaseItem } from '../types/global';
import OptimizedImage from './OptimizedImage';
import { productShowcaseData } from '../data/productShowcaseData'; // Import data
import { ShoppingCart } from 'lucide-react'; // Import ShoppingCart icon

interface ProductShowcaseSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
  openOrderModal: (productKey?: ProductShowcaseItem['labelKey']) => void; // Updated prop type
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
      className="relative py-20 bg-gray-950 text-white overflow-hidden" // Added relative and overflow-hidden
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['products'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-800/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10"> {/* Ensure content is above overlay */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['products'] ? "visible" : "hidden"}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t.gallery.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8"> {/* Changed to flex-wrap and adjusted gap */}
          {productShowcaseData.map((product, index) => (
            <motion.div
              key={product.src}
              className="flex flex-col items-center text-center p-4 rounded-xl shadow-lg group cursor-pointer bg-gray-800 border border-gray-700 w-full sm:w-[calc(50%-1rem)] lg:w-64" // Adjusted width for responsiveness, removed animate-float
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['products'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.08, boxShadow: "0 20px 25px -5px rgba(248, 113, 113, 0.3), 0 10px 10px -5px rgba(248, 113, 113, 0.2)" }} // Enhanced shadow with red glow
            >
              <motion.div 
                className="w-32 h-32 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-gray-700" 
                whileHover={{ scale: 1.1 }} // Apply scale animation to the image container
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              > 
                <OptimizedImage
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-full object-contain" // Image fills container, maintains aspect ratio
                  loading="lazy"
                />
              </motion.div>
              <p className="text-white text-2xl font-bold mb-1">{t.productShowcase[product.labelKey]}</p> {/* Changed text color to white */}
              <p className="text-gray-300 text-sm mb-2">{t.productShowcase[product.descKey]}</p> {/* Changed text color to gray-300 */}
              <p className="text-green-400 text-xl font-bold mb-4">{product.price.toLocaleString()} AMD</p> {/* Displaying price */}
              <motion.button
                onClick={() => openOrderModal(product.labelKey)} // Pass product.labelKey here
                className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm flex items-center justify-center w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t.productShowcase[product.buttonTextKey]}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductShowcaseSection;