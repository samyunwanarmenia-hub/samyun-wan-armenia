import { FaQrcode, FaInfoCircle } from 'react-icons/fa'; // Changed to Font Awesome icons
import { TranslationKeys } from '../types/global';
import CallToActionButton from './CallToActionButton';

interface AuthenticityInfoProps {
  t: TranslationKeys;
  openLoadingLinkModal: () => void;
  openAuthenticityModal: () => void;
}

const AuthenticityInfo: React.FC<AuthenticityInfoProps> = ({ t, openLoadingLinkModal, openAuthenticityModal }) => {
  return (
    <div 
      id="authenticity" 
      className="mt-10 p-5 bg-pure-white rounded-2xl shadow-lg border border-gray-200 text-center" // Updated colors
      data-aos="fade-up" // AOS animation
      data-aos-delay="700"
    >
      <h3 className="text-xl font-display font-bold text-neutral-dark mb-3"> {/* Updated font size, family and color */}
        {t.hero.qrVerificationTitle || t.authenticity.title}
      </h3>
      <p className="text-neutral-medium text-base mb-5"> {/* Updated font size and color */}
        {t.hero.qrVerificationSubtitle || t.authenticity.howToDistinguish}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <CallToActionButton
          onClick={openLoadingLinkModal}
          icon={FaQrcode} // Changed to Font Awesome icon
          variant="outline"
          size="sm" // Adjusted size to sm (16px text)
          aos="zoom-in" // AOS animation
          aosDelay="800"
        >
          {t.hero.qrVerificationTitle || 'Get QR Link'}
        </CallToActionButton>
        <CallToActionButton
          onClick={openAuthenticityModal}
          icon={FaInfoCircle} // Changed to Font Awesome icon
          variant="subtle"
          size="sm" // Adjusted size to sm (16px text)
          aos="zoom-in" // AOS animation
          aosDelay="900"
        >
          {t.authenticity.howToDistinguish}
        </CallToActionButton>
      </div>
    </div>
  );
};

export default AuthenticityInfo;