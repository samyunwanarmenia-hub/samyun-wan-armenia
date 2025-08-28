import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import { TranslationKeys } from '../types/global';

interface AuthenticityInfoProps {
  t: TranslationKeys;
  openLoadingLinkModal: () => void;
  openAuthenticityModal: () => void;
}

const AuthenticityInfo: React.FC<AuthenticityInfoProps> = ({ t, openLoadingLinkModal, openAuthenticityModal }) => {
  // Теперь проверяем, есть ли заголовок для QR-блока, чтобы решить, показывать ли его
  const shouldShowQrBlock = !!t.hero.qrVerificationTitle;
  const hasAttentionText = !!t.authenticity.attention;
  const hasHowToDistinguishText = !!t.authenticity.howToDistinguish;

  // Если абсолютно нечего показывать, возвращаем null
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
        <p className="text-3xl font-bold text-red-600 mb-4 animate-pulse-slow"> {/* Changed to red-600 */}
          {t.authenticity.attention}
        </p>
      )}
      
      {shouldShowQrBlock && ( // Рендерим QR-блок только если есть заголовок
        <motion.div 
          className="text-center lg:text-left cursor-pointer group mb-4" 
          onClick={openLoadingLinkModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="w-24 h-24 bg-white rounded-xl mx-auto lg:mx-0 mb-4 flex items-center justify-center transform hover:scale-110 transition-all border border-gray-200"> {/* Changed background to white and border to gray-200 */}
            <QrCode className="w-12 h-12 text-gray-900" /> {/* Changed text color to gray-900 */}
          </div>
          <p className="text-gray-700 font-semibold">{t.hero.qrVerificationTitle}</p> {/* Changed text color to gray-700 */}
          {t.hero.qrVerificationSubtitle && <p className="text-sm text-gray-500">{t.hero.qrVerificationSubtitle}</p>} {/* Changed text color to gray-500 */}
        </motion.div>
      )}

      {hasHowToDistinguishText && (
        <motion.button
          onClick={openAuthenticityModal}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-xs font-semibold transition-all border border-gray-300" // Changed to lighter gray background and darker text
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {t.authenticity.howToDistinguish}
        </motion.button>
      )}
    </motion.div>
  );
};

export default AuthenticityInfo;