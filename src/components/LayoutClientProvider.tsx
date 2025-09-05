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

interface LayoutClientProviderProps {
  children: React.ReactNode;
  initialLang: string;
}

const LayoutClientProvider: React.FC<LayoutClientProviderProps> = ({ children, initialLang }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [currentLangState, setCurrentLangState] = useState<string>(initialLang);
  // Removed loadingLinkModalOpen and loadingLinkClientId as they are no longer needed
  // const [loadingLinkModalOpen, setLoadingLinkModalOpen] = useState(false);
  // const [loadingLinkClientId, setLoadingLinkClientId] = useState<string | null>(null);

  // Determine if it's the QR verification page (now always false in this app)
  const isQrVerifyPage = false; // This page is now external, so this will always be false

  useEffect(() => {
    // Ensure the client-side state matches the initial server-rendered language
    if (initialLang && initialLang !== currentLangState) {
      setCurrentLangState(initialLang);
    }
  }, [initialLang, currentLangState]);

  // Effect to update the HTML lang attribute and body classes
  useEffect(() => {
    document.documentElement.lang = currentLangState;

    // The body-blank class and dark mode removal logic for QR page is no longer needed here
    // as the QR page is external.
    document.body.classList.remove('body-blank');
    // ThemeContext will handle 'dark' class for other pages

    return () => {
      document.body.classList.remove('body-blank');
    };
  }, [currentLangState, isQrVerifyPage]); // isQrVerifyPage is now a constant false

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

  // Removed openLoadingLinkModal and closeLoadingLinkModal as they are no longer needed
  // const openLoadingLinkModal = () => {
  //   setLoadingLinkModalOpen(true);
  //   setLoadingLinkClientId(crypto.randomUUID());
  // };

  // const closeLoadingLinkModal = () => {
  //   setLoadingLinkModalOpen(false);
  //   setLoadingLinkClientId(null);
  // };

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
    openLoadingLinkModal: () => {}, // Placeholder, as it's no longer used
    getLinkClasses,
    getHomePath,
    getSectionPath,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {/* The QR verification page is now external, so we always render the full MainLayout */}
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
        loadingLinkModalOpen={false} // Always false now
        closeLoadingLinkModal={() => {}} // Placeholder
        loadingLinkClientId={null} // Always null now
      >
        {children}
      </MainLayout>
    </LayoutContext.Provider>
  );
};

export default LayoutClientProvider;