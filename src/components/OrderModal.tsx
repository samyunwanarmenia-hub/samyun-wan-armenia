import { ShoppingCart } from 'lucide-react';
import { TranslationKeys, ProductShowcaseItem } from '../types/global';
import { productShowcaseData } from '../data/productShowcaseData';
import OptimizedImage from './OptimizedImage';
import CallToActionButton from './CallToActionButton';
import ModalWrapper from './ModalWrapper';
import { motion } from 'framer-motion';
import { useOrderForm } from '@/hooks/useOrderForm'; // Import the new hook

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
  currentLang: string;
  initialSelectedProductKey?: ProductShowcaseItem['labelKey'];
}

const OrderModal = ({ isOpen, onClose, t, currentLang, initialSelectedProductKey }: OrderModalProps) => {
  const {
    address,
    setAddress,
    phone,
    setPhone,
    selectedProducts,
    handleProductSelect,
    totalPrice,
    isSubmitting,
    handleSubmit,
  } = useOrderForm({ t, currentLang, initialSelectedProductKey, onClose });

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={t.orderModal.title}
      maxWidth="max-w-sm"
    >
      <p className="text-gray-700 dark:text-gray-300 text-base mb-3 text-center font-semibold">
        {t.orderModal.selectProducts}
      </p>
      <div className="flex justify-center space-x-3 mb-5">
        {productShowcaseData.map((product) => (
          <motion.div
            key={product.labelKey}
            className={`relative p-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedProducts.includes(product.labelKey)
                ? 'border-4 border-red-600 shadow-lg'
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
          className="text-center mb-5 p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg border border-primary-200 dark:border-primary-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-900 dark:text-gray-50 text-base font-bold mb-0.5">
            Total: {totalPrice.toLocaleString()} AMD
          </p>
          <p className="text-primary-600 dark:text-primary-400 text-xs font-semibold">
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
          className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
          placeholder={t.orderModal.addressPlaceholder}
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          required
        />
        <input
          type="tel"
          className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
          placeholder={t.orderModal.phonePlaceholder}
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          required
        />
        <CallToActionButton
          type="submit"
          icon={ShoppingCart}
          disabled={isSubmitting}
          size="md"
          interactionEffect="pixels"
          gaEvent={{ category: 'Order', action: 'Click_OrderModal_Submit', label: selectedProducts.join('&') }}
          ymEvent={{ category: 'Order', action: 'Click_OrderModal_Submit', label: selectedProducts.join('&') }}
        >
          {isSubmitting ? 'Sending...' : t.orderModal.orderButton}
        </CallToActionButton>
      </form>
    </ModalWrapper>
  );
};

export default OrderModal;