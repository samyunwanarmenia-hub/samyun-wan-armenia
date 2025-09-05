import OptimizedImage from '@/components/OptimizedImage';
import { AuthenticityInfoModalProps } from '@/types/global';
import ModalWrapper from './ModalWrapper'; // Import ModalWrapper
import { motion } from 'framer-motion'; // Import motion

const AuthenticityInfoModal: React.FC<AuthenticityInfoModalProps> = ({ isOpen, onClose, t }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={t.authenticity.title}
      maxWidth="max-w-2xl" // Increased max-w
    >
      <motion.div 
        className="grid md:grid-cols-2 gap-6 mt-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col items-center text-center"
          variants={itemVariants}
        >
          <OptimizedImage 
            src="/images/samyun-arm-original-whey-certificate.jpg" 
            alt="Samyun Wan Original Certificate" 
            className="w-full h-auto rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 mb-3"
            loading="eager"
            sizes="(max-width: 768px) 90vw, 400px"
          />
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {t.authenticity.certificateDesc}
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center text-center"
          variants={itemVariants}
        >
          <OptimizedImage 
            src="/images/samyun-arm-original-whey-certificate-deferences.jpg"
            alt="Samyun Wan Original vs Fake Differences" 
            className="w-full h-auto rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 mb-3"
            loading="eager"
            sizes="(max-width: 768px) 90vw, 400px"
          />
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {t.authenticity.differencesDesc}
          </p>
        </motion.div>
      </motion.div>
    </ModalWrapper>
  );
};

export default AuthenticityInfoModal;