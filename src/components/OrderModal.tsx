import { useState, useMemo, useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { sendTelegramMessage } from '../utils/telegramApi';
import { showSuccess, showError } from '../utils/toast';
import { motion } from 'framer-motion';
import { TranslationKeys, ProductShowcaseItem } from '../types/global';
import { productShowcaseData } from '../data/productShowcaseData';
import OptimizedImage from './OptimizedImage';
import CallToActionButton from './CallToActionButton';

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
        className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-2xl relative w-full max-w-sm border border-gray-200 dark:border-gray-700"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-red-600 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-red-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-5 text-center">
          {t.orderModal.title}
        </h3>

        <p className="text-gray-700 dark:text-gray-300 text-base mb-3 text-center font-semibold">
          {t.orderModal.selectProducts}
        </p>
        <div className="flex justify-center space-x-3 mb-5">
          {productShowcaseData.map((product) => (
            <motion.div
              key={product.labelKey}
              className={`relative p-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedProducts.includes(product.labelKey)
                  ? 'border-4 border-red-600 shadow-lg' // Changed to border-red-600
                  : 'border-2 border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => handleProductSelect(product.labelKey)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <OptimizedImage
                src={product.src}
                alt={product.alt}
                className="w-16 h-16 object-contain rounded-lg"
                loading="eager"
              />
              <p className="text-xs text-gray-900 dark:text-gray-50 mt-1.5 text-center font-medium">
                {t.productShowcase[product.labelKey]}
              </p>
            </motion.div>
          ))}
        </div>

        {selectedProducts.length > 0 && (
          <motion.div 
            className="text-center mb-5 p-3 bg-green-100 dark:bg-green-900/50 rounded-lg border border-green-200 dark:border-green-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-900 dark:text-gray-50 text-base font-bold mb-0.5">
              Total: {totalPrice.toLocaleString()} AMD
            </p>
            <p className="text-green-600 dark:text-green-400 text-xs font-semibold">
              {t.orderModal.freeDeliveryMessage}
            </p>
          </motion.div>
        )}

        <p className="text-gray-700 dark:text-gray-300 text-base mb-3 text-center">
          {t.orderModal.deliveryInfo1}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-5 text-center">
          {t.orderModal.deliveryInfo2}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder={t.orderModal.addressPlaceholder}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="tel"
            className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder={t.orderModal.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <CallToActionButton
            type="submit"
            icon={ShoppingCart}
            disabled={isSubmitting}
            size="md"
          >
            {isSubmitting ? 'Sending...' : t.orderModal.orderButton}
          </CallToActionButton>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OrderModal;