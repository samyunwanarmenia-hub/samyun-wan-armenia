import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility, ContactModalType } from '../types/global';
import { contactInfoData } from '../data/contactInfo';
import CallToActionButton from './CallToActionButton'; // Import CallToActionButton

interface ContactSectionProps {
  t: TranslationKeys;
  isVisible: IntersectionObserverVisibility;
  openContactModal: (type: ContactModalType) => void;
}

const ContactSection = ({ t, isVisible, openContactModal }: ContactSectionProps) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="contact" 
      className="relative py-20 bg-gray-100 text-gray-900 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['contact'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['contact'] ? "visible" : "hidden"}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t.contact.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfoData.map((item, index) => (
            <motion.div 
              key={item.key} 
              className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-200 group"
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['contact'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(248, 113, 113, 0.3), 0 10px 10px -5px rgba(248, 113, 113, 0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-gray-900 text-xl font-bold mb-4">{t.contact[item.titleKey]}</h3>
              <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: item.key === 'phone' ? t.contact.phoneNumbers.description : item.details }}></p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0"
          variants={buttonVariants}
          initial="hidden"
          animate={isVisible['contact'] ? "visible" : "hidden"}
          transition={{ delay: contactInfoData.length * 0.1 + 0.4 }}
        >
          <CallToActionButton 
            onClick={() => openContactModal('call')} 
            icon={Phone}
            variant="success" // Using the new success variant
            size="md"
          >
            {t.contact.callNowButton}
          </CallToActionButton>
          <CallToActionButton 
            onClick={() => openContactModal('message')} 
            icon={MessageCircle}
            variant="success" // Using the new success variant
            size="md"
            className="bg-green-500 hover:bg-green-600" // Slightly different green for WhatsApp
          >
            {t.contact.whatsappButton}
          </CallToActionButton>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;