import { useState, useMemo, useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { sendTelegramMessage } from '../utils/telegramApi';
import { showSuccess, showError } from '../utils/toast';
import { motion } from 'framer-motion';
import { TranslationKeys, ProductShowcaseItem } from '../types/global';
import { productShowcaseData } from '../data/productShowcaseData';
import OptimizedImage from './OptimizedImage';
import CallToActionButton from './CallToActionButton'; // Import CallToActionButton

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
  currentLang: string;
  initialSelectedProductKey?: ProductShowcaseItem['labelKey'];
}

const OrderModal = ({ isOpen, onClose, t, currentLang, initialSelectedProductKey }: OrderModalProps) => {
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<ProductShowcaseItem['labelKey'][]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && initialSelectedProductKey) {
      setSelectedProducts([initialSelectedProductKey]);
    } else if (isOpen && !initialSelectedProductKey) {
      setSelectedProducts([]);
    }
  }, [isOpen, initialSelectedProductKey]);

  if (!isOpen) return null;

  const validatePhone = (phoneNumber: string): boolean => {
    const phoneRegex = /^\+?[0-9\s-]{7,20}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleProductSelect = (productKey: ProductShowcaseItem['labelKey']) => {
    setSelectedProducts(prev =>
      prev.includes(productKey)
        ? prev.filter(key => key !== productKey)
        : [...prev, productKey]
    );
  };

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum, key) => {
      const product = productShowcaseData.find(p => p.labelKey === key);
      return sum + (product ? product.price : 0);
    }, 0);
  }, [selectedProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!address.trim() || !phone.trim()) {
      showError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(phone)) {
      showError(t.orderModal.invalidPhone);
      setIsSubmitting(false);
      return;
    }

    if (selectedProducts.length === 0) {
      showError(t.orderModal.selectProducts);
      setIsSubmitting(false);
      return;
    }

    const selectedProductNames = selectedProducts.map(key => t.productShowcase[key]).join(' & ');
    const telegramMessage = `<b>New Order!</b>\n\n<b>Products:</b> ${selectedProductNames}\n<b>Total Price:</b> ${totalPrice} AMD\n<b>Address:</b> ${address}\n<b>Phone:</b> ${phone}\n\n<b>Language:</b> ${currentLang ? currentLang.toUpperCase() : 'N/A'}`;
    
    try {
      await sendTelegramMessage(telegramMessage);
      showSuccess(t.orderModal.orderSuccess1);
      
      setTimeout(() => {
        showSuccess(t.orderModal.orderSuccess2);
      }, 3000);

      setAddress('');
      setPhone('');
      setSelectedProducts([]);
      onClose();
    } catch (error: any) {
      console.error("Error submitting order:", error);
      showError(error.message || "Failed to send order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0, scale: 0.8 },
    visible: { y: "0", opacity: 1, scale: 1, transition: { delay: 0.1, type: "spring", stiffness: 200, damping: 20 } },
    exit: { y: "100vh", opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-900 bg-opacity-70 z-[100] flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white rounded-xl p-5 shadow-2xl relative w-full max-w-sm border border-gray-200" // Reduced p-6 to p-5
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 text-red-600 hover:bg-gray-300 hover:text-red-700 transition-colors" // Reduced p-3 to p-2, top-4 right-4 to top-3 right-3
        >
          <X className="w-5 h-5" /> {/* Reduced w/h-6 to w/h-5 */}
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-5 text-center"> {/* Reduced text-2xl to text-xl, mb-6 to mb-5 */}
          {t.orderModal.title}
        </h3>

        <p className="text-gray-700 text-sm mb-3 text-center font-semibold"> {/* Reduced mb-4 to mb-3 */}
          {t.orderModal.selectProducts}
        </p>
        <div className="flex justify-center space-x-3 mb-5"> {/* Reduced space-x-4 to space-x-3, mb-6 to mb-5 */}
          {productShowcaseData.map((product) => (
            <motion.div
              key={product.labelKey}
              className={`relative p-1.5 rounded-xl cursor-pointer transition-all duration-200 ${ // Reduced p-2 to p-1.5
                selectedProducts.includes(product.labelKey)
                  ? 'border-4 border-green-600 shadow-lg'
                  : 'border-2 border-gray-300'
              }`}
              onClick={() => handleProductSelect(product.labelKey)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <OptimizedImage
                src={product.src}
                alt={product.alt}
                className="w-16 h-16 object-contain rounded-lg" // Reduced w/h-20 to w/h-16
                loading="eager"
              />
              <p className="text-xs text-gray-900 mt-1.5 text-center font-medium"> {/* Reduced mt-2 to mt-1.5 */}
                {t.productShowcase[product.labelKey]}
              </p>
            </motion.div>
          ))}
        </div>

        {selectedProducts.length > 0 && (
          <motion.div 
            className="text-center mb-5 p-3 bg-green-100 rounded-lg border border-green-200" // Reduced mb-6 to mb-5, p-4 to p-3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-900 text-base font-bold mb-0.5"> {/* Reduced text-lg to text-base, mb-1 to mb-0.5 */}
              Total: {totalPrice.toLocaleString()} AMD
            </p>
            <p className="text-green-600 text-xs font-semibold"> {/* Reduced text-sm to text-xs */}
              {t.orderModal.freeDeliveryMessage}
            </p>
          </motion.div>
        )}

        <p className="text-gray-700 text-sm mb-3 text-center"> {/* Reduced mb-4 to mb-3 */}
          {t.orderModal.deliveryInfo1}
        </p>
        <p className="text-gray-700 text-sm mb-5 text-center"> {/* Reduced mb-6 to mb-5 */}
          {t.orderModal.deliveryInfo2}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3"> {/* Reduced space-y-4 to space-y-3 */}
          <input
            type="text"
            className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600" // Reduced px-4 py-3 to px-3 py-2.5
            placeholder={t.orderModal.addressPlaceholder}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="tel"
            className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600" // Reduced px-4 py-3 to px-3 py-2.5
            placeholder={t.orderModal.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <CallToActionButton
            type="submit"
            icon={ShoppingCart}
            disabled={isSubmitting}
            size="md" // Adjusted size from lg to md
          >
            {isSubmitting ? 'Sending...' : t.orderModal.orderButton}
          </CallToActionButton>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OrderModal;