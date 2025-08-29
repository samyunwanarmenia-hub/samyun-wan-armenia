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
      className="relative py-16 bg-gray-100 text-gray-900 overflow-hidden" // Reduced py-20 to py-16
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible['contact'] ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-radial from-gray-200/20 via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12" // Reduced mb-16 to mb-12
          variants={itemVariants}
          initial="hidden"
          animate={isVisible['contact'] ? "visible" : "hidden"}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-5"> {/* Reduced text-4xl/5xl to text-3xl/4xl, mb-6 to mb-5 */}
            {t.contact.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12"> {/* Reduced gap-8 to gap-6, mb-16 to mb-12 */}
          {contactInfoData.map((item, index) => (
            <motion.div 
              key={item.key} 
              className="text-center bg-white rounded-2xl p-5 shadow-lg border border-gray-200 group" // Reduced p-6 to p-5
              variants={itemVariants}
              initial="hidden"
              animate={isVisible['contact'] ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(248, 113, 113, 0.3), 0 10px 10px -5px rgba(248, 113, 113, 0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-5`}> {/* Reduced w/h-16 to w/h-14, mb-6 to mb-5 */}
                <item.icon className="w-7 h-7" /> {/* Reduced w/h-8 to w/h-7 */}
              </div>
              <h3 className="text-gray-900 text-lg font-bold mb-3">{t.contact[item.titleKey]}</h3> {/* Reduced text-xl to text-lg, mb-4 to mb-3 */}
              <p className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: item.key === 'phone' ? t.contact.phoneNumbers.description : item.details }}></p> {/* Reduced text size */}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-3 sm:space-y-0" // Reduced space-x-6 to space-x-4, space-y-4 to space-y-3
          variants={buttonVariants}
          initial="hidden"
          animate={isVisible['contact'] ? "visible" : "hidden"}
          transition={{ delay: contactInfoData.length * 0.1 + 0.4 }}
        >
          <CallToActionButton 
            onClick={() => openContactModal('call')} 
            icon={Phone}
            variant="success" // Using the new success variant
            size="sm" // Adjusted size from md to sm
          >
            {t.contact.callNowButton}
          </CallToActionButton>
          <CallToActionButton 
            onClick={() => openContactModal('message')} 
            icon={MessageCircle}
            variant="success" // Using the new success variant
            size="sm" // Adjusted size from md to sm
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