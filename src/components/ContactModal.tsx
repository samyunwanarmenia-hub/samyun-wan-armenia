import { X, Phone, MessageCircle, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, ContactModalType } from '../types/global';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ContactModalType;
  t: TranslationKeys;
}

const ContactModal = ({ isOpen, onClose, type, t }: ContactModalProps) => {
  if (!isOpen) return null;

  const isCallType = type === 'call';

  // Animation variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Animation variants for the modal content
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
      exit="hidden" // Use exit for when the component unmounts
    >
      <motion.div
        className="bg-white rounded-xl p-6 shadow-2xl relative w-full max-w-sm border border-gray-200" // Changed background to white and added border
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit" // Use exit for when the component unmounts
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-colors"> {/* Changed close button color */}
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center"> {/* Changed text color to gray-900 */}
          {isCallType ? t.contactModal.chooseCall : t.contactModal.chooseMessage}
        </h3>
        <div className="flex flex-col space-y-4">
          {isCallType ? (
            <>
              <motion.a 
                href={`tel:${t.contactModal.callNumbers.number1.replace(/\s/g, '')}`} 
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-3 rounded-full font-bold text-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Phone className="w-6 h-6 mr-3" />
                {t.contactModal.callNumbers.number1}
              </motion.a>
              <motion.a 
                href={`tel:${t.contactModal.callNumbers.number2.replace(/\s/g, '')}`} 
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-3 rounded-full font-bold text-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Phone className="w-6 h-6 mr-3" />
                {t.contactModal.callNumbers.number2}
              </motion.a>
            </>
          ) : (
            <>
              <motion.a 
                href="https://wa.me/37496653666" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-3 rounded-full font-bold text-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                {t.contactModal.whatsapp}
              </motion.a>
              <motion.a 
                href="https://m.me/samyunwanarmenia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-full font-bold text-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Facebook className="w-6 h-6 mr-3" />
                {t.contactModal.facebookMessenger}
              </motion.a>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;