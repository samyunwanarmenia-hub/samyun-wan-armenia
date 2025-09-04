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
import { AuthSessionProvider } from './AuthSessionProvider'; // Import AuthSessionProvider

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

  // Determine if it's the QR verification page
  const isQrVerifyPage = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    return pathSegments.length >= 2 && pathSegments[1] === 'verify' && pathSegments[2] === 'qr';
  }, [pathname]);

  // Determine if it's an authentication page
  const isAuthPage = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    return pathSegments.length >= 2 && pathSegments[1] === 'auth' && pathSegments[2] === 'login';
  }, [pathname]);

  useEffect(() => {
    // Ensure the client-side state matches the initial server-rendered language
    if (initialLang && initialLang !== currentLangState) {
      setCurrentLangState(initialLang);
    }
  }, [initialLang, currentLangState]);

  // Effect to update the HTML lang attribute and body classes
  useEffect(() => {
    document.documentElement.lang = currentLangState;

    if (isQrVerifyPage || isAuthPage) { // Apply body-blank for auth pages too
      document.body.classList.add('body-blank');
      document.documentElement.classList.remove('dark'); // Ensure light mode for blank page
    } else {
      document.body.classList.remove('body-blank');
      // ThemeContext will handle 'dark' class for other pages
    }

    return () => {
      // Clean up when component unmounts or isQrVerifyPage changes
      document.body.classList.remove('body-blank');
    };
  }, [currentLangState, isQrVerifyPage, isAuthPage]);

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

  // Wrap the entire application with AuthSessionProvider
  return (
    <AuthSessionProvider>
      <LayoutContext.Provider value={contextValue}>
        {/* If it's the QR verification or Auth page, only render children (the page content itself) */}
        {(isQrVerifyPage || isAuthPage) ? (
          children
        ) : (
          // For all other pages, render the full MainLayout
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
      </LayoutContext.Provider>
    </AuthSessionProvider>
  );
};

export default LayoutClientProvider;