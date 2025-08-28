import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Import motion
import Navbar from './components/Navbar';
import ContactModal from './components/ContactModal';
import OrderModal from './components/OrderModal';
import LoadingLinkModal from './components/LoadingLinkModal';
import AuthenticityInfoModal from './components/AuthenticityInfoModal';
import ScrollToTopButton from './components/ScrollToTopButton';
import FloatingButtons from './components/FloatingButtons';
import HomePage from './pages/HomePage';
import StructuredData from './components/StructuredData';
import useIntersectionObserver from './hooks/useIntersectionObserver';

import Footer from './components/Footer';

import { translations } from './i18n/translations';
import { TranslationKeys, ContactModalType, IntersectionObserverVisibility, ProductShowcaseItem } from './types/global';
import { sendTelegramMessage } from './utils/telegramApi';
import { showError } from './utils/toast'; // Ensure showError is imported here

const App = () => {
  const [currentLang, setCurrentLang] = useState<string>('hy');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [contactModalType, setContactModalType] = useState<ContactModalType>('call');
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [initialSelectedProduct, setInitialSelectedProduct] = useState<ProductShowcaseItem['labelKey'] | undefined>(undefined);
  const [loadingLinkModalOpen, setLoadingLinkModalOpen] = useState<boolean>(false);
  const [authenticityModalOpen, setAuthenticityModalOpen] = useState<boolean>(false);
  const [currentLinkId, setCurrentLinkId] = useState<string | null>(null);

  const t: TranslationKeys = useMemo(() => translations[currentLang], [currentLang]);

  const isVisible: IntersectionObserverVisibility = useIntersectionObserver({
    threshold: 0.1,
  });

  const openContactModal = (type: ContactModalType) => {
    setContactModalType(type);
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
  };

  const openOrderModal = (productKey?: ProductShowcaseItem['labelKey']) => {
    setInitialSelectedProduct(productKey);
    setOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
    setInitialSelectedProduct(undefined);
  };

  const closeLoadingLinkModal = () => {
    setLoadingLinkModalOpen(false);
    setCurrentLinkId(null);
  };

  const openAuthenticityModal = () => {
    setAuthenticityModalOpen(true);
  };

  const closeAuthenticityModal = () => {
    setAuthenticityModalOpen(false);
  };

  const openLoadingLinkModal = async () => {
    const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setCurrentLinkId(uniqueId);
    setLoadingLinkModalOpen(true);
    const telegramMessage = `<b>New Link Request!</b>\n\nUser is waiting for a link. Please send it to them via Telegram.\n\n<b>Client ID:</b> <code>${uniqueId}</code>\n<b>Language:</b> ${currentLang.toUpperCase()}\n\n<i>To send a link, use the format:</i> <code>open://example.com</code>`;
    
    try {
      await sendTelegramMessage(telegramMessage);
      console.log("Telegram notification sent for link request.");
    } catch (error: any) { // Catch the error thrown by sendTelegramMessage
      console.error("Failed to send Telegram notification for link request:", error);
      showError(error.message || "Failed to notify admin for link request. Please try again later."); // Display the error message
      setLoadingLinkModalOpen(false);
      setCurrentLinkId(null);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50"> {/* Changed background to gray-50 */}
        <StructuredData t={t} currentLang={currentLang} />
        <Navbar currentLang={currentLang} setCurrentLang={setCurrentLang} t={t} isVisible={isVisible} />
        
        <motion.main 
          className="flex-grow pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }} // Small delay after navbar
        >
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  currentLang={currentLang} 
                  t={t} 
                  openContactModal={openContactModal} 
                  openOrderModal={openOrderModal} 
                  openLoadingLinkModal={openLoadingLinkModal}
                  openAuthenticityModal={openAuthenticityModal}
                />
              } 
            />
          </Routes>
        </motion.main>

        <Footer t={t} />
        <FloatingButtons openContactModal={openContactModal} />
        <ScrollToTopButton />
        
        <AnimatePresence>
          {contactModalOpen && <ContactModal isOpen={contactModalOpen} onClose={closeContactModal} type={contactModalType} t={t} />}
          {orderModalOpen && <OrderModal isOpen={orderModalOpen} onClose={closeOrderModal} t={t} currentLang={currentLang} initialSelectedProductKey={initialSelectedProduct} />}
          {loadingLinkModalOpen && (
            <LoadingLinkModal 
              isOpen={loadingLinkModalOpen} 
              t={t} 
              clientId={currentLinkId}
              onClose={closeLoadingLinkModal}
            />
          )}
          {authenticityModalOpen && (
            <AuthenticityInfoModal
              isOpen={authenticityModalOpen}
              onClose={closeAuthenticityModal}
              t={t}
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;