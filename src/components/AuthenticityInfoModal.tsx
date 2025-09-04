import OptimizedImage from '@/components/OptimizedImage';
import { AuthenticityInfoModalProps } from '@/types/global';
import ModalWrapper from './ModalWrapper'; // Import ModalWrapper

const AuthenticityInfoModal: React.FC<AuthenticityInfoModalProps> = ({ isOpen, onClose, t }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={t.authenticity.title}
      maxWidth="max-w-2xl" // Increased max-w
    >
      <div className="grid md:grid-cols-2 gap-6 mt-5">
        <div className="flex flex-col items-center text-center">
          <OptimizedImage 
            src="/images/samyun-arm-original-whey-certificate.jpg" 
            alt="Samyun Wan Original Certificate" 
            className="w-full h-auto rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 mb-3"
            loading="eager"
            sizes="(max-width: 768px) 90vw, 400px"
          />
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {t.authenticity.certificateDesc}
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <OptimizedImage 
            src="/images/samyun-arm-original-whey-certificate-deferences.jpg"
            alt="Samyun Wan Original vs Fake Differences" 
            className="w-full h-auto rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 mb-3"
            loading="eager"
            sizes="(max-width: 768px) 90vw, 400px"
          />
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {t.authenticity.differencesDesc}
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AuthenticityInfoModal;