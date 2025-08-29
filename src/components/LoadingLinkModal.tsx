import { FaTimes, FaCopy } from 'react-icons/fa'; // Changed to Font Awesome icons
import LoadingSpinner from './LoadingSpinner'; // Import the new spinner
import { showSuccess, showError } from '../utils/toast'; // For toast notifications
import { TranslationKeys } from '../types/global';

interface LoadingLinkModalProps {
  isOpen: boolean;
  t: TranslationKeys;
  clientId: string | null;
  onClose: () => void;
}

const LoadingLinkModal = ({ isOpen, t, clientId, onClose }: LoadingLinkModalProps) => {
  if (!isOpen) return null;

  const handleCopyClientId = () => {
    if (clientId) {
      navigator.clipboard.writeText(clientId)
        .then(() => showSuccess("Client ID copied to clipboard!"))
        .catch(() => showError("Failed to copy Client ID."));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-neutral-dark bg-opacity-70 z-[100] flex items-center justify-center p-4" // Updated background color
      data-aos="fade" // AOS animation for backdrop
      data-aos-duration="300"
    >
      <div
        className="bg-pure-white rounded-xl p-6 shadow-2xl relative w-full max-w-sm flex flex-col items-center text-center border border-gray-200" // Updated background color
        data-aos="zoom-in" // AOS animation for modal content
        data-aos-duration="400"
        data-aos-delay="100"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-neutral-medium hover:text-neutral-dark transition-colors"> {/* Updated colors */}
          <FaTimes className="w-6 h-6" />
        </button>
        <div className="w-24 h-24 mb-6 flex items-center justify-center">
          <LoadingSpinner />
        </div>
        <h3 className="text-2xl font-bold text-neutral-dark mb-4"> {/* Updated colors */}
          {t.loadingLinkModal.title}
        </h3>
        <p className="text-neutral-medium text-lg mb-2"> {/* Updated colors */}
          {t.loadingLinkModal.message}
        </p>
        <p className="text-neutral-medium text-sm mb-4"> {/* Updated colors */}
          {t.loadingLinkModal.waitingForAdmin}
        </p>

        {clientId && (
          <div className="flex flex-col items-center mb-6">
            <p className="text-neutral-medium text-xs mb-2">Your Client ID:</p> {/* Updated colors */}
            <div className="flex items-center bg-neutral-light rounded-lg px-3 py-2 border border-gray-200"> {/* Updated colors */}
              <code className="text-neutral-dark text-sm mr-2">{clientId}</code> {/* Updated colors */}
              <button
                onClick={handleCopyClientId}
                className="text-neutral-medium hover:text-neutral-dark transition-colors transform hover:scale-110 active:scale-90" // Updated colors and added manual transitions
              >
                <FaCopy className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="bg-neutral-light text-neutral-dark font-bold py-3 px-8 rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all mt-4" // Updated colors and added manual transitions
          data-aos="fade-up" // AOS animation
          data-aos-delay="400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoadingLinkModal;