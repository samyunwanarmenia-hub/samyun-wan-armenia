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
        className="bg-white rounded-xl p-6 shadow-2xl relative w-full max-w-sm border border-gray-200"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-3 rounded-full bg-gray-200 text-red-600 hover:bg-gray-300 hover:text-red-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t.orderModal.title}
        </h3>

        <p className="text-gray-700 text-sm mb-4 text-center font-semibold">
          {t.orderModal.selectProducts}
        </p>
        <div className="flex justify-center space-x-4 mb-6">
          {productShowcaseData.map((product) => (
            <motion.div
              key={product.labelKey}
              className={`relative p-2 rounded-xl cursor-pointer transition-all duration-200 ${
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
                className="w-20 h-20 object-contain rounded-lg"
                loading="eager"
              />
              <p className="text-xs text-gray-900 mt-2 text-center font-medium">
                {t.productShowcase[product.labelKey]}
              </p>
            </motion.div>
          ))}
        </div>

        {selectedProducts.length > 0 && (
          <motion.div 
            className="text-center mb-6 p-4 bg-green-100 rounded-lg border border-green-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-900 text-lg font-bold mb-1">
              Total: {totalPrice.toLocaleString()} AMD
            </p>
            <p className="text-green-600 text-sm font-semibold">
              {t.orderModal.freeDeliveryMessage}
            </p>
          </motion.div>
        )}

        <p className="text-gray-700 text-sm mb-4 text-center">
          {t.orderModal.deliveryInfo1}
        </p>
        <p className="text-gray-700 text-sm mb-6 text-center">
          {t.orderModal.deliveryInfo2}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder={t.orderModal.addressPlaceholder}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="tel"
            className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder={t.orderModal.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <CallToActionButton
            type="submit"
            icon={ShoppingCart}
            disabled={isSubmitting}
            size="lg" // Adjusted size for better fit
          >
            {isSubmitting ? 'Sending...' : t.orderModal.orderButton}
          </CallToActionButton>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OrderModal;