import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TranslationKeys } from '../types/global';
import OptimizedImage from './OptimizedImage';

interface AuthenticityInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
}

const AuthenticityInfoModal: React.FC<AuthenticityInfoModalProps> = ({ isOpen, onClose, t }) => {
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close modal when clicking on backdrop
        >
          <motion.div
            className="bg-gray-800 rounded-xl p-6 shadow-2xl relative w-full max-w-lg border border-gray-700" // Changed background to gray-800 and added border
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"> {/* Changed close button color */}
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-white mb-6 text-center"> {/* Changed text color to white */}
              {t.authenticity.title}
            </h3>
            
            <div className="max-w-lg mx-auto mt-6">
              <OptimizedImage 
                src="/images/samyun-arm-original-whey-certificate.jpg" 
                alt="Samyun Wan Original Certificate" 
                className="w-full h-auto rounded-xl shadow-2xl border border-gray-600" // Changed border color
                loading="eager" // Load eagerly since it's in a modal
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthenticityInfoModal;