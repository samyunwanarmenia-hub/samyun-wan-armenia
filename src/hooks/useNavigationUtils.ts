"use client";

import { useCallback } from 'react';
// Removed: import { useLayoutContext } from '@/context/LayoutContext'; // Больше не нужен
import { SectionId } from '@/types/global';

const useNavigationUtils = (currentLang: string) => { // Принимаем currentLang как параметр
  // Removed: const { currentLang } = useLayoutContext(); // Больше не нужен

  const getHomePath = useCallback(() => {
    return `/${currentLang}`;
  }, [currentLang]);

  const getSectionPath = useCallback((sectionId: SectionId) => {
    const pageRoutes: SectionId[] = ['products'];
    
    if (pageRoutes.includes(sectionId)) {
      return `/${currentLang}/${sectionId}`;
    }
    return `/${currentLang}#${sectionId}`;
  }, [currentLang]);

  return { getHomePath, getSectionPath };
};

export default useNavigationUtils;