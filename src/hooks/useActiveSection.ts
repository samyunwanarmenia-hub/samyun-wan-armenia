import { useState, useEffect, useCallback } from 'react';
import { IntersectionObserverVisibility, SectionId } from '../types/global';

const useActiveSection = (isVisible: IntersectionObserverVisibility) => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const sections: SectionId[] = ['home', 'about', 'benefits', 'authenticity', 'products', 'cta', 'testimonials', 'faq', 'contact'];
    for (const section of sections) {
      if (isVisible[section]) {
        setActiveSection(section);
        break;
      }
    }
  }, [isVisible]);

  const getLinkClasses = useCallback((sectionId: SectionId) => 
    `text-gray-700 hover:text-primary-600 transition-colors ${activeSection === sectionId ? 'text-primary-600 font-bold' : ''}`, // Changed base text to gray-700 and active to green-600
    [activeSection]
  );

  return { activeSection, getLinkClasses };
};

export default useActiveSection;