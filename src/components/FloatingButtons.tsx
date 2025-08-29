import { FaCommentAlt, FaPhone } from 'react-icons/fa'; // Changed to Font Awesome icons
// import { motion } from 'framer-motion'; // Removed motion
import { ContactModalType } from '../types/global';

interface FloatingButtonsProps {
  openContactModal: (type: ContactModalType) => void;
}

const FloatingButtons = ({ openContactModal }: FloatingButtonsProps) => {
  return (
    <>
      {/* Floating WhatsApp/Message Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => openContactModal('message')} 
          className="w-[72px] h-[72px] bg-secondary-green hover:bg-primary-green text-pure-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-115 active:scale-95" // Updated colors and added manual transitions
          data-aos="zoom-in" // AOS animation
          data-aos-delay="200"
        >
          <FaCommentAlt className="w-9 h-9" />
        </button>
      </div>

      {/* Floating Call Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <button 
          onClick={() => openContactModal('call')} 
          className="w-[72px] h-[72px] bg-blue-500 hover:bg-blue-600 text-pure-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-115 active:scale-95" // Updated colors and added manual transitions
          data-aos="zoom-in" // AOS animation
          data-aos-delay="100"
        >
          <FaPhone className="w-9 h-9" />
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;