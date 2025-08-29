import { FaTimes, FaPhone, FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa'; // Changed to Font Awesome icons
// import { motion } from 'framer-motion'; // Removed motion
import { TranslationKeys, ContactModalType } from '../types/global';
import CallToActionButton from './CallToActionButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ContactModalType;
  t: TranslationKeys;
}

const ContactModal = ({ isOpen, onClose, type, t }: ContactModalProps) => {
  if (!isOpen) return null;

  const isCallType = type === 'call';

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
        <button onClick={onClose} className="absolute top-3 right-3 text-neutral-medium hover:text-neutral-dark transition-colors"> {/* Updated colors */}
          <FaTimes className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-neutral-dark mb-5 text-center"> {/* Updated colors */}
          {isCallType ? t.contactModal.chooseCall : t.contactModal.chooseMessage}
        </h3>
        <div className="flex flex-col space-y-3">
          {isCallType ? (
            <>
              <CallToActionButton
                href={`tel:${t.contactModal.callNumbers.number1.replace(/\s/g, '')}`}
                icon={FaPhone}
                className="bg-gradient-to-r from-primary-green to-secondary-green text-pure-white" // Updated colors
                size="md"
              >
                {t.contactModal.callNumbers.number1}
              </CallToActionButton>
              <CallToActionButton
                href={`tel:${t.contactModal.callNumbers.number2.replace(/\s/g, '')}`}
                icon={FaPhone}
                className="bg-gradient-to-r from-primary-green to-secondary-green text-pure-white" // Updated colors
                size="md"
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
                icon={FaWhatsapp}
                className="bg-gradient-to-r from-secondary-green to-primary-green text-pure-white" // Updated colors
                size="md"
              >
                {t.contactModal.whatsapp}
              </CallToActionButton>
              <CallToActionButton
                href="https://m.me/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                icon={FaFacebookMessenger}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-pure-white" // Kept blue gradient for Facebook
                size="md"
              >
                {t.contactModal.facebookMessenger}
              </CallToActionButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;