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
          className="fixed inset-0 bg-gray-900 bg-opacity-70 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close modal when clicking on backdrop
        >
          <motion.div
            className="bg-white rounded-xl p-5 shadow-2xl relative w-full max-w-md border border-gray-200" // Reduced p-6 to p-5, max-w-lg to max-w-md
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-colors"> {/* Changed close button color */}
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-5 text-center"> {/* Reduced text-2xl to text-xl, mb-6 to mb-5 */}
              {t.authenticity.title}
            </h3>
            
            <div className="max-w-sm mx-auto mt-5"> {/* Reduced max-w-lg to max-w-sm, mt-6 to mt-5 */}
              <OptimizedImage 
                src="/images/samyun-arm-original-whey-certificate.jpg" 
                alt="Samyun Wan Original Certificate" 
                className="w-full h-auto rounded-xl shadow-2xl border border-gray-300" // Changed border color
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