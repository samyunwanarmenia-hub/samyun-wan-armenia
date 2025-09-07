import { SectionId, TranslationKeys } from '@/types/global';

export interface NavSection {
  id: SectionId;
  labelKey: keyof TranslationKeys['nav'];
}

export const navigationSections: NavSection[] = [
  { id: 'home', labelKey: 'home' },
  { id: 'about', labelKey: 'about' },
  { id: 'benefits', labelKey: 'benefits' },
  { id: 'products', labelKey: 'products' },
  { id: 'testimonials', labelKey: 'testimonials' }, // Now a dedicated page
  { id: 'faq', labelKey: 'faq' },                   // Now a dedicated page
  { id: 'contact', labelKey: 'contact' },           // Now a dedicated page
];