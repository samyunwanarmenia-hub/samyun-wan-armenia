import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationKeys, IntersectionObserverVisibility, ContactModalType } from '../types/global';
import { contactInfoData } from '../data/contactInfo';
import CallToActionButton from './CallToActionButton';

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
      className="relative py-12 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['contact'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50 dark:from-gray-700/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['contact'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-5">
            {t.contact.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfoData.map((item, index) => (
            <motion.div 
              key={item.key} 
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 group"
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['contact'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(248, 113, 113, 0.3), 0 10px 10px -5px rgba(248, 113, 113, 0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mr-3`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-50 text-lg font-bold">{t.contact[item.titleKey]}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base" dangerouslySetInnerHTML={{ __html: item.key === 'phone' ? t.contact.phoneNumbers.description : item.details }}></p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-3 sm:space-y-0"
          variants={buttonVariants}
          initial="hidden"
          animate={isVisible['contact'] ? "visible" : "hidden"}
          transition={{ delay: contactInfoData.length * 0.1 + 0.4 }}
        >
          <CallToActionButton 
            onClick={() => openContactModal('call')} 
            icon={Phone}
            variant="primary" // Changed to primary
            size="sm"
          >
            {t.contact.callNowButton}
          </CallToActionButton>
          <CallToActionButton 
            onClick={() => openContactModal('message')} 
            icon={MessageCircle}
            variant="success"
            size="sm"
            className="bg-green-500 hover:bg-green-600"
          >
            {t.contact.whatsappButton}
          </CallToActionButton>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;