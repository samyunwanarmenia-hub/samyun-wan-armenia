import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import { TranslationKeys } from '../types/global';
import CallToActionButton from './CallToActionButton'; // Import CallToActionButton

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
      className="mt-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md mx-auto text-center" // Added styling for distinct block and centering
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
    >
      {hasAttentionText && (
        <p className="text-2xl font-bold text-red-600 mb-3 animate-pulse-slow">
          {t.authenticity.attention}
        </p>
      )}
      
      {shouldShowQrBlock && (
        <motion.div 
          className="cursor-pointer group mb-3 flex flex-col items-center" // Ensured content is centered
          onClick={openLoadingLinkModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="w-20 h-20 bg-gray-100 rounded-xl mx-auto mb-3 flex items-center justify-center transform hover:scale-110 transition-all border border-gray-200">
            <QrCode className="w-10 h-10 text-gray-900" />
          </div>
          <p className="text-gray-700 font-semibold text-sm">{t.hero.qrVerificationTitle}</p>
          {t.hero.qrVerificationSubtitle && <p className="text-xs text-gray-500">{t.hero.qrVerificationSubtitle}</p>}
        </motion.div>
      )}

      {hasHowToDistinguishText && (
        <CallToActionButton
          onClick={openAuthenticityModal}
          variant="subtle"
          size="xs"
          className="mt-4" // Added margin top for spacing
        >
          {t.authenticity.howToDistinguish}
        </CallToActionButton>
      )}
    </motion.div>
  );
};

export default AuthenticityInfo;