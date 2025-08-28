import { useState, useEffect } from 'react';
import { IntersectionObserverVisibility, SectionId } from '../types/global';

const useIntersectionObserver = (options: IntersectionObserverInit): IntersectionObserverVisibility => {
  const [isVisible, setIsVisible] = useState<IntersectionObserverVisibility>({} as IntersectionObserverVisibility);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id as SectionId]: entry.isIntersecting,
          }));
        });
      },
      options
    );

    // Observe all elements with an 'id' attribute
    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [options]);

  return isVisible;
};

export default useIntersectionObserver;