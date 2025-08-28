import { motion } from 'framer-motion';
import { TranslationKeys } from '../types/global';
import LoadingSpinner from './LoadingSpinner'; // Import the new spinner
import { X, Copy } from 'lucide-react'; // Import X and Copy icons
import { showSuccess, showError } from '../utils/toast'; // For toast notifications

interface LoadingLinkModalProps {
  isOpen: boolean;
  t: TranslationKeys;
  clientId: string | null; // New prop for client ID
  onClose: () => void; // New prop for closing the modal
}

const LoadingLinkModal = ({ isOpen, t, clientId, onClose }: LoadingLinkModalProps) => {
  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0, scale: 0.8 },
    visible: { y: "0", opacity: 1, scale: 1, transition: { delay: 0.1, type: "spring", stiffness: 200, damping: 20 } },
    exit: { y: "100vh", opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  const handleCopyClientId = async () => {
    if (clientId) {
      try {
        await navigator.clipboard.writeText(clientId);
        showSuccess("Client ID copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy Client ID:", err);
        showError("Failed to copy Client ID.");
      }
    }
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
        className="bg-white rounded-xl p-6 shadow-2xl relative w-full max-w-sm flex flex-col items-center text-center border border-gray-200" // Changed background to white and added border
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-colors"> {/* Changed text color */}
          <X className="w-6 h-6" />
        </button>
        <div className="w-24 h-24 mb-6 flex items-center justify-center">
          <LoadingSpinner />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4"> {/* Changed text color to gray-900 */}
          {t.loadingLinkModal.title}
        </h3>
        <p className="text-gray-700 text-lg mb-2"> {/* Changed text color to gray-700 */}
          {t.loadingLinkModal.message}
        </p>
        <p className="text-gray-500 text-sm mb-4"> {/* Changed text color to gray-500 */}
          {t.loadingLinkModal.waitingForAdmin}
        </p>

        {clientId && (
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-500 text-xs mb-2">Your Client ID:</p> {/* Changed text color to gray-500 */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-gray-200"> {/* Changed background and border */}
              <code className="text-gray-800 text-sm mr-2">{clientId}</code> {/* Changed text color to gray-800 */}
              <motion.button
                onClick={handleCopyClientId}
                className="text-gray-600 hover:text-gray-900 transition-colors" {/* Changed text color */}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        )}

        <motion.button
          onClick={onClose}
          className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-300 transform hover:scale-105 transition-all mt-4" // Changed background and text color
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default LoadingLinkModal;