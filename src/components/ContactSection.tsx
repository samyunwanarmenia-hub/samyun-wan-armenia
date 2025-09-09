"use client";

import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactInfoData } from '../data/contactInfo';
import CallToActionButton from './CallToActionButton';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';

const ContactSection = () => {
  const { t, openContactModal } = useLayoutContext();

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
      className="relative py-12 text-gray-900 dark:text-gray-50 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title={t.contact.title}
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12 mx-auto max-w-6xl">
          {contactInfoData.map((item, index) => (
            <motion.div 
              key={item.key} 
              className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 group"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5, // Subtle lift
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)" // Enhanced shadow with glow
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className="w-5 h-5 text-white" />
              </motion.div>
              <h3 className="text-gray-900 dark:text-gray-50 text-lg font-bold">{t.contact[item.titleKey]}</h3> {/* Changed text-gray-50 to text-gray-900 for light mode */}
              <p className="text-gray-700 dark:text-gray-300 text-base" dangerouslySetInnerHTML={{ __html: item.key === 'phone' ? t.contact.phoneNumbers.description : item.details }} /> {/* Changed text-gray-300 to text-gray-700 for light mode */}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-3 sm:space-y-0"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: contactInfoData.length * 0.1 + 0.4 }}
        >
          <CallToActionButton 
            onClick={() => openContactModal('call')} 
            icon={Phone}
            variant="primary"
            size="sm"
            gaEvent={{ category: 'Contact', action: 'Click_ContactSection_CallNow' }}
            ymEvent={{ category: 'Contact', action: 'Click_ContactSection_CallNow' }}
          >
            {t.contact.callNowButton}
          </CallToActionButton>
          <CallToActionButton 
            onClick={() => openContactModal('message')} 
            icon={MessageCircle}
            variant="primary"
            size="sm"
            gaEvent={{ category: 'Contact', action: 'Click_ContactSection_WhatsApp' }}
            ymEvent={{ category: 'Contact', action: 'Click_ContactSection_WhatsApp' }}
          >
            {t.contact.whatsappButton}
          </CallToActionButton>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;