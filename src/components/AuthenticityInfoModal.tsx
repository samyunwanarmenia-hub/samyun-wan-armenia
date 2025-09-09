import OptimizedImage from '@/components/OptimizedImage';
import { AuthenticityInfoModalProps } from '@/types/global';
import ModalWrapper from './ModalWrapper';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const AuthenticityInfoModal: React.FC<AuthenticityInfoModalProps> = ({ isOpen, onClose, t, currentLang }) => {
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

  const qrCodeValue = `https://samyunwanarmenia.netlify.app/${currentLang}/verify/qr`;
  const qrLinkPath = `/${currentLang}/verify/qr`;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={t.authenticity.title}
      maxWidth="max-w-xl" // Adjusted max-width for a single column
    >
      <motion.div 
        className="flex flex-col items-center text-center gap-6 mt-5" // Changed to single column flex layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col items-center text-center w-full" // Ensure it takes full width in its column
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="w-full h-auto rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 mb-3 overflow-hidden"
          >
            <OptimizedImage 
              src="/images/samyun-arm-original-whey-certificate-deferences.jpg"
              alt="Samyun Wan Original vs Fake Differences" 
              className="w-full h-auto object-cover"
              loading="eager"
              sizes="(max-width: 768px) 90vw, 400px"
            />
          </motion.div>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
            {t.authenticity.differencesDesc}
          </p>
        </motion.div>

        {/* QR Code Block */}
        <motion.div
          className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs sm:max-w-sm lg:max-w-md mx-auto text-center"
          variants={itemVariants} // Apply itemVariants for animation
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
              {t.hero.qrBlockTitle}
            </h3>
          </div>
          <Link 
            href={qrLinkPath}
            className="group block p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={t.hero.qrBlockTitle}
          >
            <motion.div
              className="w-32 h-32 bg-white dark:bg-gray-700 rounded-xl mx-auto mb-3 flex items-center justify-center transform group-hover:scale-105 transition-all border border-gray-200 dark:border-gray-600 p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <QRCodeCanvas value={qrCodeValue} size={128} level="H" />
            </motion.div>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {t.hero.qrBlockDescription}
            </p>
          </Link>
        </motion.div>
      </motion.div>
    </ModalWrapper>
  );
};

export default AuthenticityInfoModal;