"use client";

import { useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutContext } from '@/context/LayoutContext';
import { translations } from '@/i18n/translations';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslationKeys, ContactModalType, ProductShowcaseItem, SectionId } from '@/types/global';
import { useModals } from '@/hooks/useModals';
import useActiveLink from '@/hooks/useActiveLink';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import MainLayout from '@/layouts/MainLayout'; // Import MainLayout
import IntroAnimation from './IntroAnimation'; // Import the new IntroAnimation component
import { AnimatePresence, motion } from 'framer-motion'; // Import AnimatePresence and motion

interface LayoutClientProviderProps {
  children: React.ReactNode;
  initialLang: string;
}

const LayoutClientProvider: React.FC<LayoutClientProviderProps> = ({ children, initialLang }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [currentLangState, setCurrentLangState] = useState<string>(initialLang);
  const [loadingLinkModalOpen, setLoadingLinkModalOpen] = useState(false);
  const [loadingLinkClientId, setLoadingLinkClientId] = useState<string | null>(null);
  const [showIntroAnimation, setShowIntroAnimation] = useState(true); // New state for intro animation

  // Determine if it's the QR verification page
  const isQrVerifyPage = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    return pathSegments.length >= 2 && pathSegments[1] === 'verify' && pathSegments[2] === 'qr';
  }, [pathname]);

  useEffect(() => {
    // Ensure the client-side state matches the initial server-rendered language
    if (initialLang && initialLang !== currentLangState) {
      setCurrentLangState(initialLang);
    }
  }, [initialLang, currentLangState]);

  // Effect to manage intro animation and body overflow
  useEffect(() => {
    const animationDuration = 1300; // Adjusted duration for a smoother transition

    const timer = setTimeout(() => {
      setShowIntroAnimation(false);
    }, animationDuration);

    // Set initial overflow hidden for the animation
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      // Restore overflow when component unmounts or animation finishes
      document.body.style.overflow = '';
    };
  }, []); // Run only once on mount

  // Effect to update the HTML lang attribute and body classes
  useEffect(() => {
    document.documentElement.lang = currentLangState;

    if (isQrVerifyPage) {
      document.body.classList.add('body-blank');
      document.documentElement.classList.remove('dark'); // Ensure light mode for blank page
      document.body.style.overflow = ''; // Ensure scrolling is enabled for QR page
    } else {
      document.body.classList.remove('body-blank');
      // ThemeContext will handle 'dark' class for other pages
      // Only set overflow to hidden if intro animation is active
      document.body.style.overflow = showIntroAnimation ? 'hidden' : '';
    }

    return () => {
      // Clean up when component unmounts or isQrVerifyPage changes
      document.body.classList.remove('body-blank');
      document.body.style.overflow = ''; // Always reset overflow on cleanup
    };
  }, [currentLangState, isQrVerifyPage, showIntroAnimation]);

  const t: TranslationKeys = useMemo(() => translations[currentLangState], [currentLangState]);

  const {
    contactModalOpen,
    contactModalType,
    orderModalOpen,
    initialSelectedProduct,
    authenticityModalOpen,
    callbackRequestModalOpen,
    openContactModal,
    closeContactModal,
    openOrderModal,
    closeOrderModal,
    openAuthenticityModal,
    closeAuthenticityModal,
    openCallbackRequestModal,
    closeCallbackRequestModal,
  } = useModals({ currentLang: currentLangState, t });

  const openLoadingLinkModal = () => {
    setLoadingLinkModalOpen(true);
    setLoadingLinkClientId(crypto.randomUUID());
  };

  const closeLoadingLinkModal = () => {
    setLoadingLinkModalOpen(false);
    setLoadingLinkClientId(null);
  };

  const { getLinkClasses } = useActiveLink();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLangState); // Передаем currentLangState сюда

  const setCurrentLang = (newLang: string) => {
    setCurrentLangState(newLang);
    const currentPath = pathname || '/';
    const pathSegments = currentPath.split('/').filter(Boolean);
    let newPathname = `/${newLang}`;
    if (pathSegments.length > 1) {
      newPathname += `/${pathSegments.slice(1).join('/')}`;
    }
    router.push(newPathname);
  };

  const contextValue = {
    t,
    currentLang: currentLangState,
    setCurrentLang,
    openContactModal,
    openOrderModal,
    openAuthenticityModal,
    openCallbackRequestModal,
    openLoadingLinkModal,
    getLinkClasses,
    getHomePath,
    getSectionPath,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <AnimatePresence mode="wait"> {/* Use mode="wait" to ensure one animation finishes before the next starts */}
        {showIntroAnimation ? (
          <IntroAnimation key="intro-animation" />
        ) : (
          <motion.div
            key="main-app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }} // Match IntroAnimation's exit duration
            className="min-h-screen flex flex-col text-gray-900 dark:text-gray-50 relative overflow-hidden" // Apply layout classes here
          >
            {isQrVerifyPage ? (
              children
            ) : (
              <MainLayout
                contactModalOpen={contactModalOpen}
                contactModalType={contactModalType}
                orderModalOpen={orderModalOpen}
                initialSelectedProduct={initialSelectedProduct}
                authenticityModalOpen={authenticityModalOpen}
                callbackRequestModalOpen={callbackRequestModalOpen}
                closeContactModal={closeContactModal}
                closeOrderModal={closeOrderModal}
                closeAuthenticityModal={closeAuthenticityModal}
                closeCallbackRequestModal={closeCallbackRequestModal}
                loadingLinkModalOpen={loadingLinkModalOpen}
                closeLoadingLinkModal={closeLoadingLinkModal}
                loadingLinkClientId={loadingLinkClientId}
              >
                {children}
              </MainLayout>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutContext.Provider>
  );
};

export default LayoutClientProvider;