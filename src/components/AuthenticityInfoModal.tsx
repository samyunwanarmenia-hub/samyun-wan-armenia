import { FaTimes } from 'react-icons/fa'; // Changed to Font Awesome icon
// import { motion, AnimatePresence } from 'framer-motion'; // Removed motion, AnimatePresence
import { TranslationKeys } from '../types/global';
import OptimizedImage from './OptimizedImage';

interface AuthenticityInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
}

const AuthenticityInfoModal: React.FC<AuthenticityInfoModalProps> = ({ isOpen, onClose, t }) => {
  // Removed framer-motion variants, using conditional rendering and AOS for modal entry/exit
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-neutral-dark bg-opacity-70 z-[100] flex items-center justify-center p-4" // Updated background color
      onClick={onClose} // Close modal when clicking on backdrop
      data-aos="fade" // AOS animation for backdrop
      data-aos-duration="300"
    >
      <div
        className="bg-pure-white rounded-xl p-5 shadow-2xl relative w-full max-w-md border border-gray-200" // Updated background color
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        data-aos="zoom-in" // AOS animation for modal content
        data-aos-duration="400"
        data-aos-delay="100"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-neutral-medium hover:text-neutral-dark transition-colors"> {/* Updated colors */}
          <FaTimes className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-neutral-dark mb-5 text-center"> {/* Updated colors */}
          {t.authenticity.title}
        </h3>
        
        <div className="max-w-sm mx-auto mt-5">
          <OptimizedImage 
            src="/images/samyun-arm-original-whey-certificate.jpg" 
            alt="Samyun Wan Original Certificate" 
            className="w-full h-auto rounded-xl shadow-2xl border border-gray-300"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthenticityInfoModal;