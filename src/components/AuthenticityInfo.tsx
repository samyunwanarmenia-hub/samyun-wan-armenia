import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import { TranslationKeys } from '../types/global';
import CallToActionButton from './CallToActionButton';

interface AuthenticityInfoProps {
  t: TranslationKeys;
  openLoadingLinkModal: () => void;
  openAuthenticityModal: () => void;
}

const AuthenticityInfo: React.FC<AuthenticityInfoProps> = ({ t, openLoadingLinkModal, openAuthenticityModal }) => {
  const shouldShowQrBlock = !!t.hero.qrVerificationTitle;
  const hasAttentionText = !!t.authenticity.attention;
  const hasHowToDistinguishText = !!t.authenticity.howToDistinguish;

  if (!shouldShowQrBlock && !hasAttentionText && !hasHowToDistinguishText) {
    return null;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto text-center" // Reduced p-6 to p-4
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
    >
      {hasAttentionText && (
        <motion.span
          className="inline-block bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xl font-bold px-4 py-2 rounded-full mb-3" // Reduced mb-5 to mb-3
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          {t.authenticity.attention}
        </motion.span>
      )}
      
      {shouldShowQrBlock && (
        <motion.div 
          className="cursor-pointer group mb-3 flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200" // Reduced mb-4 to mb-3
          onClick={openLoadingLinkModal}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl mx-auto mb-3 flex items-center justify-center transform group-hover:scale-110 transition-all border border-gray-200 dark:border-gray-600">
            <QrCode className="w-10 h-10 text-gray-900 dark:text-gray-50" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-semibold text-base">{t.hero.qrVerificationTitle}</p>
          {t.hero.qrVerificationSubtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{t.hero.qrVerificationSubtitle}</p>}
        </motion.div>
      )}

      {hasHowToDistinguishText && (
        <CallToActionButton
          onClick={openAuthenticityModal}
          variant="subtle"
          size="sm"
          className="mt-3 mx-auto" // Reduced mt-4 to mt-3 and added mx-auto for centering
        >
          {t.authenticity.howToDistinguish}
        </CallToActionButton>
      )}
    </motion.div>
  );
};

export default AuthenticityInfo;