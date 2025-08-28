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
      className="mt-12 text-center lg:text-left"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
    >
      {hasAttentionText && (
        <p className="text-3xl font-bold text-red-600 mb-4 animate-pulse-slow">
          {t.authenticity.attention}
        </p>
      )}
      
      {shouldShowQrBlock && (
        <motion.div 
          className="text-center lg:text-left cursor-pointer group mb-4" 
          onClick={openLoadingLinkModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="w-24 h-24 bg-white rounded-xl mx-auto lg:mx-0 mb-4 flex items-center justify-center transform hover:scale-110 transition-all border border-gray-200">
            <QrCode className="w-12 h-12 text-gray-900" />
          </div>
          <p className="text-gray-700 font-semibold">{t.hero.qrVerificationTitle}</p>
          {t.hero.qrVerificationSubtitle && <p className="text-sm text-gray-500">{t.hero.qrVerificationSubtitle}</p>}
        </motion.div>
      )}

      {hasHowToDistinguishText && (
        <CallToActionButton
          onClick={openAuthenticityModal}
          variant="subtle" // Using the new subtle variant
          size="xs" // Using the new xs size
        >
          {t.authenticity.howToDistinguish}
        </CallToActionButton>
      )}
    </motion.div>
  );
};

export default AuthenticityInfo;