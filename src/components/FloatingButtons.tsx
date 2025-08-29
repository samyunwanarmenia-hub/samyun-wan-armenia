import { MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion
import { ContactModalType } from '../types/global';

interface FloatingButtonsProps {
  openContactModal: (type: ContactModalType) => void;
}

const FloatingButtons = ({ openContactModal }: FloatingButtonsProps) => {
  return (
    <>
      {/* Floating WhatsApp/Message Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button 
          onClick={() => openContactModal('message')} 
          className="w-[72px] h-[72px] bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.15 }} // Scale up on hover
          whileTap={{ scale: 0.95 }} // Scale down slightly on tap
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <MessageCircle className="w-9 h-9" />
        </motion.button>
      </div>

      {/* Floating Call Button */}
      <div className="fixed bottom-24 right-6 z-50"> {/* Positioned above WhatsApp */}
        <motion.button 
          onClick={() => openContactModal('call')} 
          className="w-[72px] h-[72px] bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.15 }} // Scale up on hover
          whileTap={{ scale: 0.95 }} // Scale down slightly on tap
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Phone className="w-9 h-9" />
        </motion.button>
      </div>
    </>
  );
};

export default FloatingButtons;