import { MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion
import { ContactModalType } from '../types/global';

interface FloatingButtonsProps {
  openContactModal: (type: ContactModalType) => void;
}

const buttonContainerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15, 
      delay: 0.5 // Delay for a smoother entrance after page load
    } 
  },
};

const FloatingButtons = ({ openContactModal }: FloatingButtonsProps) => {
  return (
    <>
      {/* Floating WhatsApp/Message Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        variants={buttonContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button 
          onClick={() => openContactModal('message')} 
          className="w-[72px] h-[72px] bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.15 }} // Scale up on hover
          whileTap={{ scale: 0.95 }} // Scale down slightly on tap
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <MessageCircle className="w-9 h-9" />
        </motion.button>
      </motion.div>

      {/* Floating Call Button */}
      <motion.div 
        className="fixed bottom-24 right-6 z-50" // Positioned above WhatsApp
        variants={buttonContainerVariants}
        initial="hidden"
        animate="visible"
        transition={{ ...buttonContainerVariants.visible.transition, delay: 0.6 }} // Slightly delayed for staggered effect
      >
        <motion.button 
          onClick={() => openContactModal('call')} 
          className="w-[72px] h-[72px] bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.15 }} // Scale up on hover
          whileTap={{ scale: 0.95 }} // Scale down slightly on tap
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Phone className="w-9 h-9" />
        </motion.button>
      </motion.div>
    </>
  );
};

export default FloatingButtons;