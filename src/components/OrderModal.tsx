import { useState, useMemo, useEffect } from 'react';
import { FaTimes, FaShoppingCart } from 'react-icons/fa'; // Changed to Font Awesome icons
import { sendTelegramMessage } from '../utils/telegramApi';
import { showSuccess, showError } from '../utils/toast';
// import { motion } from 'framer-motion'; // Removed motion
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
    const telegramMessage = `<b>New Order!</b>\n\n<b>Products:</b> ${selectedProductNames}\n<b>Total Price:</b> ${totalPrice.toLocaleString()} AMD\n<b>Address:</b> ${address}\n<b>Phone:</b> ${phone}\n\n<b>Language:</b> ${currentLang ? currentLang.toUpperCase() : 'N/A'}`;
    
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

  return (
    <div
      className="fixed inset-0 bg-neutral-dark bg-opacity-70 z-[100] flex items-center justify-center p-4" // Updated background color
      data-aos="fade" // AOS animation for backdrop
      data-aos-duration="300"
    >
      <div
        className="bg-pure-white rounded-xl p-5 shadow-2xl relative w-full max-w-sm border border-gray-200" // Updated background color
        data-aos="zoom-in" // AOS animation for modal content
        data-aos-duration="400"
        data-aos-delay="100"
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 p-2 rounded-full bg-neutral-light text-warm-accent hover:bg-gray-200 hover:text-orange-600 transition-colors" // Updated colors
        >
          <FaTimes className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-neutral-dark mb-5 text-center"> {/* Updated colors */}
          {t.orderModal.title}
        </h3>

        <p className="text-neutral-medium text-sm mb-3 text-center font-semibold"> {/* Updated colors */}
          {t.orderModal.selectProducts}
        </p>
        <div className="flex justify-center space-x-3 mb-5">
          {productShowcaseData.map((product) => (
            <div
              key={product.labelKey}
              className={`relative p-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedProducts.includes(product.labelKey)
                  ? 'border-4 border-primary-green shadow-lg' // Updated border color
                  : 'border-2 border-gray-300'
              }`}
              onClick={() => handleProductSelect(product.labelKey)}
              data-aos="zoom-in" // AOS animation
              data-aos-delay="150"
            >
              <OptimizedImage
                src={product.src}
                alt={product.alt}
                className="w-16 h-16 object-contain rounded-lg"
                loading="eager"
              />
              <p className="text-neutral-dark text-xs mt-1.5 text-center font-medium"> {/* Updated colors */}
                {t.productShowcase[product.labelKey]}
              </p>
            </div>
          ))}
        </div>

        {selectedProducts.length > 0 && (
          <div 
            className="text-center mb-5 p-3 bg-secondary-green/10 rounded-lg border border-secondary-green/20" // Updated colors
            data-aos="fade-in" // AOS animation
            data-aos-delay="200"
          >
            <p className="text-neutral-dark text-base font-bold mb-0.5"> {/* Updated colors */}
              Total: {totalPrice.toLocaleString()} AMD
            </p>
            <p className="text-primary-green text-xs font-semibold"> {/* Updated colors */}
              {t.orderModal.freeDeliveryMessage}
            </p>
          </div>
        )}

        <p className="text-neutral-medium text-sm mb-3 text-center"> {/* Updated colors */}
          {t.orderModal.deliveryInfo1}
        </p>
        <p className="text-neutral-medium text-sm mb-5 text-center"> {/* Updated colors */}
          {t.orderModal.deliveryInfo2}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            className="bg-neutral-light border border-gray-200 rounded-lg px-3 py-2.5 text-neutral-dark placeholder-neutral-medium focus:outline-none focus:ring-2 focus:ring-warm-accent" // Updated colors
            placeholder={t.orderModal.addressPlaceholder}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="tel"
            className="bg-neutral-light border border-gray-200 rounded-lg px-3 py-2.5 text-neutral-dark placeholder-neutral-medium focus:outline-none focus:ring-2 focus:ring-warm-accent" // Updated colors
            placeholder={t.orderModal.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <CallToActionButton
            type="submit"
            icon={FaShoppingCart} // Changed to Font Awesome icon
            disabled={isSubmitting}
            size="md"
            aos="fade-up" // AOS animation
            aosDelay="300"
          >
            {isSubmitting ? 'Sending...' : t.orderModal.orderButton}
          </CallToActionButton>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;