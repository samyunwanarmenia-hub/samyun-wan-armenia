"use client"; // This is a client component

import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { useLayoutContext } from '@/context/LayoutContext'; // Import useLayoutContext
import { ContactModalType, ProductShowcaseItem } from '@/types/global'; // Import necessary types
import FloatingActionButton from '@/components/FloatingActionButton'; // Import the new FAB component

interface MainLayoutProps {
  children: React.ReactNode;
  // Props for modals, now passed from LayoutClientProvider
  contactModalOpen: boolean;
  contactModalType: ContactModalType;
  orderModalOpen: boolean;
  initialSelectedProduct: ProductShowcaseItem['labelKey'] | undefined;
  authenticityModalOpen: boolean;
  callbackRequestModalOpen: boolean;
  closeContactModal: () => void;
  closeOrderModal: () => void;
  closeAuthenticityModal: () => void;
  closeCallbackRequestModal: () => void;
  loadingLinkModalOpen: boolean; // Still needed for prop type, but will always be false
  closeLoadingLinkModal: () => void; // Still needed for prop type, but will be a no-op
  loadingLinkClientId: string | null; // Still needed for prop type, but will always be null
}

// Dynamically import client-only components with ssr: false
const DynamicNavbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const DynamicFooter = dynamic(() => import('@/components/Footer'), { ssr: false });
const DynamicMovingBallsBackground = dynamic(() => import('@/components/MovingBallsBackground'), { ssr: false }); // Lazy load MovingBallsBackground
const DynamicScrollToTopButton = dynamic(() => import('@/components/ScrollToTopButton'), { ssr: false }); // Lazy load ScrollToTopButton

// Dynamically import modals with ssr: false
const DynamicContactModal = dynamic(() => import('@/components/ContactModal'), { ssr: false });
const DynamicOrderModal = dynamic(() => import('@/components/OrderModal'), { ssr: false });
const DynamicAuthenticityInfoModal = dynamic(() => import('@/components/AuthenticityInfoModal'), { ssr: false });
const DynamicCallbackRequestModal = dynamic(() => import('@/components/CallbackRequestModal'), { ssr: false });
// Removed DynamicLoadingLinkModal as it's no longer used
// const DynamicLoadingLinkModal = dynamic(() => import('@/components/LoadingLinkModal'), { ssr: false });


const MainLayout = ({
  children,
  contactModalOpen,
  contactModalType,
  orderModalOpen,
  initialSelectedProduct,
  authenticityModalOpen,
  callbackRequestModalOpen,
  closeContactModal,
  closeOrderModal,
  closeAuthenticityModal,
  closeCallbackRequestModal,
  loadingLinkModalOpen, // Keep for prop type, but logic will be removed
  closeLoadingLinkModal, // Keep for prop type, but logic will be removed
  loadingLinkClientId, // Keep for prop type, but logic will be removed
}: MainLayoutProps) => {
  const {
    t,
    currentLang, // Get currentLang from context
    openContactModal, // This is used in FloatingActionButton
    openCallbackRequestModal, // This is used in FloatingActionButton
    // openOrderModal, // Not used directly in MainLayout, handled by child components via their own context or props
    // openAuthenticityModal, // Not used directly in MainLayout, handled by child components via their own context or props
    // openLoadingLinkModal, // Not used directly in MainLayout, handled by LayoutClientProvider
  } = useLayoutContext(); // Consume context here

  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-gray-50 relative overflow-hidden">
      <DynamicMovingBallsBackground /> {/* Use lazy-loaded component */}
      
      <DynamicNavbar />
      
      <motion.main 
        className="flex-grow pt-16 relative z-10" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.main>

      <DynamicFooter /> {/* Use lazy-loaded component */}

      <FloatingActionButton 
        openContactModal={openContactModal} 
        openCallbackRequestModal={openCallbackRequestModal}
      />
      <DynamicScrollToTopButton /> {/* Use lazy-loaded component */}
      
      <AnimatePresence>
        {contactModalOpen && (
          <DynamicContactModal isOpen={contactModalOpen} onClose={closeContactModal} type={contactModalType} t={t} />
        )}
        {orderModalOpen && (
          <DynamicOrderModal isOpen={orderModalOpen} onClose={closeOrderModal} t={t} currentLang={currentLang} initialSelectedProductKey={initialSelectedProduct} />
        )}
        {authenticityModalOpen && (
          <DynamicAuthenticityInfoModal
            isOpen={authenticityModalOpen}
            onClose={closeAuthenticityModal}
            t={t}
          />
        )}
        {callbackRequestModalOpen && (
          <DynamicCallbackRequestModal
            isOpen={callbackRequestModalOpen}
            onClose={closeCallbackRequestModal}
            t={t}
            currentLang={currentLang}
          />
        )}
        {/* Removed DynamicLoadingLinkModal usage */}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;