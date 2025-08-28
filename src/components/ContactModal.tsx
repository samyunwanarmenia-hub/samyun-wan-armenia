import { X, Phone, MessageCircle, Facebook } from 'lucide-react';
import { motion } from 'framer-motion'; // AnimatePresence removed
import { TranslationKeys, ContactModalType } from '../types/global';
import CallToActionButton from './CallToActionButton'; // Import CallToActionButton

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ContactModalType;
  t: TranslationKeys;
}

const ContactModal = ({ isOpen, onClose, type, t }: ContactModalProps) => {
  if (!isOpen) return null;

  const isCallType = type === 'call';

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
        className="bg-white rounded-xl p-5 shadow-2xl relative w-full max-w-sm border border-gray-200" // Reduced p-6 to p-5, max-w-sm
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-5 text-center"> {/* Reduced text-2xl to text-xl, mb-6 to mb-5 */}
          {isCallType ? t.contactModal.chooseCall : t.contactModal.chooseMessage}
        </h3>
        <div className="flex flex-col space-y-3"> {/* Reduced space-y-4 to space-y-3 */}
          {isCallType ? (
            <>
              <CallToActionButton
                href={`tel:${t.contactModal.callNumbers.number1.replace(/\s/g, '')}`}
                icon={Phone}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white" // Override gradient
                size="md" // Adjusted size from lg to md
              >
                {t.contactModal.callNumbers.number1}
              </CallToActionButton>
              <CallToActionButton
                href={`tel:${t.contactModal.callNumbers.number2.replace(/\s/g, '')}`}
                icon={Phone}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white" // Override gradient
                size="md" // Adjusted size from lg to md
              >
                {t.contactModal.callNumbers.number2}
              </CallToActionButton>
            </>
          ) : (
            <>
              <CallToActionButton
                href="https://wa.me/37496653666"
                target="_blank"
                rel="noopener noreferrer"
                icon={MessageCircle}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white" // Override gradient
                size="md" // Adjusted size from lg to md
              >
                {t.contactModal.whatsapp}
              </CallToActionButton>
              <CallToActionButton
                href="https://m.me/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                icon={Facebook}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white" // Override gradient
                size="md" // Adjusted size from lg to md
              >
                {t.contactModal.facebookMessenger}
              </CallToActionButton>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;