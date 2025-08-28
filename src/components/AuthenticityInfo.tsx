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
      className="mt-8 text-center lg:text-left" // Reduced mt-12 to mt-8
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
    >
      {hasAttentionText && (
        <p className="text-2xl font-bold text-red-600 mb-3 animate-pulse-slow"> {/* Reduced text-3xl to text-2xl, mb-4 to mb-3 */}
          {t.authenticity.attention}
        </p>
      )}
      
      {shouldShowQrBlock && (
        <motion.div 
          className="text-center lg:text-left cursor-pointer group mb-3" // Reduced mb-4 to mb-3
          onClick={openLoadingLinkModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="w-20 h-20 bg-white rounded-xl mx-auto lg:mx-0 mb-3 flex items-center justify-center transform hover:scale-110 transition-all border border-gray-200"> {/* Reduced w/h-24 to w/h-20, mb-4 to mb-3 */}
            <QrCode className="w-10 h-10 text-gray-900" /> {/* Reduced w/h-12 to w/h-10 */}
          </div>
          <p className="text-gray-700 font-semibold text-sm">{t.hero.qrVerificationTitle}</p> {/* Reduced text size */}
          {t.hero.qrVerificationSubtitle && <p className="text-xs text-gray-500">{t.hero.qrVerificationSubtitle}</p>} {/* Reduced text size */}
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