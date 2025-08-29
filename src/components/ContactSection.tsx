import { FaPhone, FaCommentAlt } from 'react-icons/fa'; // Removed FaMapMarkerAlt and FaClock
// import { motion } from 'framer-motion'; // Removed motion
import { TranslationKeys, ContactModalType } from '../types/global';
import { contactInfoData } from '../data/contactInfo';
import CallToActionButton from './CallToActionButton';

interface ContactSectionProps {
  t: TranslationKeys;
  // isVisible: IntersectionObserverVisibility; // Removed isVisible
  openContactModal: (type: ContactModalType) => void;
}

const ContactSection = ({ t, openContactModal }: ContactSectionProps) => { // Removed isVisible from props
  return (
    <section 
      id="contact" 
      className="relative py-16 bg-neutral-light text-neutral-dark overflow-hidden" // Updated colors
      data-aos="fade-up" // AOS animation
      data-aos-duration="800"
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="text-center mb-12"
          data-aos="fade-up" // AOS animation
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-display font-bold mb-5"> {/* Updated font size and family */}
            {t.contact.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfoData.map((item, index) => (
            <div 
              key={item.key} 
              className="text-center bg-pure-white rounded-2xl p-5 shadow-lg border border-gray-200 group" // Updated background color
              data-aos="fade-up" // AOS animation
              data-aos-delay={`${index * 100 + 200}`}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <item.icon className="w-7 h-7 text-pure-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{t.contact[item.titleKey]}</h3> {/* Updated font size and family */}
              <p className="text-base text-neutral-medium" dangerouslySetInnerHTML={{ __html: item.key === 'phone' ? t.contact.phoneNumbers.description : item.details }}></p> {/* Updated font size and color */}
            </div>
          ))}
        </div>

        <div 
          className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-3 sm:space-y-0"
          data-aos="fade-up" // AOS animation
          data-aos-delay="500"
        >
          <CallToActionButton 
            onClick={() => openContactModal('call')} 
            icon={FaPhone}
            variant="success"
            size="md"
            aos="zoom-in" // AOS animation
            aosDelay="600"
          >
            {t.contact.callNowButton}
          </CallToActionButton>
          <CallToActionButton 
            onClick={() => openContactModal('message')} 
            icon={FaCommentAlt}
            variant="success"
            size="md"
            className="bg-secondary-green hover:bg-primary-green" // Slightly different green for WhatsApp
            aos="zoom-in" // AOS animation
            aosDelay="700"
          >
            {t.contact.whatsappButton}
          </CallToActionButton>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;