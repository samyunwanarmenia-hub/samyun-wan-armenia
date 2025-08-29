import { useState, useEffect, useCallback } from 'react';
import { SectionId } from '../types/global'; // Removed IntersectionObserverVisibility

// This hook is no longer needed as AOS (Animate On Scroll) is now used for animations.
// The functionality of detecting element visibility for animations is handled by AOS.
// If active section highlighting is still desired, a new implementation not relying on IntersectionObserver would be needed.

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  // This effect would typically observe scroll position or use an IntersectionObserver.
  // Since IntersectionObserver is being removed, this logic needs to be re-evaluated
  // if dynamic active section highlighting is still a requirement.
  // For now, we'll simplify it or remove it if not critical.
  // For the purpose of this refactor, we'll keep a basic structure but acknowledge
  // that it won't dynamically update without a scroll listener or similar.

  useEffect(() => {
    const handleScroll = () => {
      const sections: SectionId[] = ['home', 'about', 'benefits', 'authenticity', 'products', 'testimonials', 'faq', 'contact'];
      let currentActive: SectionId = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section active if its top is within the top 50% of the viewport
          // and it's not scrolled past completely.
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = section;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const getLinkClasses = useCallback((sectionId: SectionId) => 
    `text-neutral-medium hover:text-primary-green transition-colors ${activeSection === sectionId ? 'text-primary-green font-bold' : ''}`, // Updated colors
    [activeSection]
  );

  return { activeSection, getLinkClasses };
};

export default useActiveSection;