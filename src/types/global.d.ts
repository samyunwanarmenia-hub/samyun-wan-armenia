import React from 'react';

// Global declaration for gtag (Google Analytics)
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void; // Changed from any[] to unknown[]
    ym: {
      (id: number, method: 'hit', url: string): void;
      (id: number, method: 'reachGoal', target: string, params?: Record<string, unknown>): void; // Changed from any to unknown
      (id: number, method: string, ...args: unknown[]): void; // Changed from any[] to unknown[]
      a?: unknown[]; // Added for Yandex Metrika initialization
      l?: number; // Added for Yandex Metrika initialization
    };
    dataLayer: unknown[]; // Added for Google Analytics initialization
  }
}

export interface TranslationKeys {
  nav: {
    home: string;
    about: string;
    benefits: string;
    testimonials: string;
    contact: string;
    faq: string;
    products: string; // Added
    armenian: string; // Added
    russian: string;  // Added
    english: string;  // Added
    open: string;     // Added
    close: string;    // Added
  };
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    cta: string;
    consultation: string;
    guarantee: string;
    qrVerificationTitle: string;
    qrVerificationSubtitle: string;
    seo_title_addon: string;
  };
  stats: {
    customers: string;
    experience: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string; // Added
    content: string;     // Added
    natural: { title: string; desc: string; };
    proven: { title: string; desc: string; };
    safe: { title: string; desc: string; };
    fast: { title: string; desc: string; };
  };
  benefits: {
    title: string;
    subtitle: string;
    appetite: { title: string; desc: string; };
    weight: { title: string; desc: string; };
    immunity: { title: string; desc: string; };
    energy: { title: string; desc: string; };
    metabolism: { title: string; desc: string; };
    mood: { title: string; desc: string; };
  };
  testimonials: {
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    namePlaceholder: string;
    reviewPlaceholder: string;
    submitButton: string;
    thankYou: string;
    newReviewLabel: string;
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    hours: string;
    phoneNumbers: {
      number1: string;
      number2: string;
      description: string; // Added description property
    };
    callNowButton: string;
    whatsappButton: string;
  };
  footer: {
    about: string;
    products: string;
    support: string;
    follow: string;
    description: string;
    productOriginal: string;
    productAuthenticity: string;
    productUsage: string;
    allRightsReserved: string;
    officialRepresentative: string;
  };
  contactModal: {
    chooseCall: string;
    chooseMessage: string;
    call: string;
    whatsapp: string;
    facebookMessenger: string;
    callNumbers: {
      number1: string;
      number2: string;
    };
    callUsButton: string; // New
    callbackButton: string; // New
  };
  orderModal: {
    title: string;
    deliveryInfo1: string;
    deliveryInfo2: string;
    addressPlaceholder: string;
    phonePlaceholder: string;
    orderButton: string;
    orderSuccess1: string;
    orderSuccess2: string;
    invalidPhone: string;
    selectProducts: string;
    freeDeliveryMessage: string;
  };
  authenticity: {
    title: string;
    howToDistinguish: string;
    attention: string;
    certificateDesc: string; // New
    differencesDesc: string; // New
    waitingForLink: string; // New: Message when waiting for admin to send link
    qrScanInstructions: string; // New: Instructions for scanning QR
    qrScanSuccess: string; // New: Message after successful scan
    qrScanError: string; // New: Message if QR scan fails
    processingRequest: string; // New
    startScanButton: string; // New key
    retakeScanButton: string; // New key
  };
  loadingLinkModal: { // New: For the loading link modal
    title: string;
    message: string;
    waitingForAdmin: string;
  };
  productShowcase: {
    weightGainLabel: string;
    weightLossLabel: string;
    weightGainDesc: string;
    weightLossDesc: string;
    orderWeightGain: string;
    orderWeightLoss: string;
  };
  faq: Record<FaqQuestionKey | FaqAnswerKey, string>;
  callbackRequest: { // New section for callback request
    title: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    productTypeLabel: string;
    weightGainOption: string;
    weightLossOption: string;
    purposeLabel: string;
    purposeDetails: string;
    purposeOrders: string;
    purposeOther: string;
    submitButton: string;
    successMessage: string;
    invalidPhone: string;
    selectProductType: string;
    selectPurpose: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  nameRu: string;
  nameEn: string;
  image: string;
  rating: number;
  result: string;
  textHy: string;
  textRu: string;
  textEn: string;
}

// New interface for reviews directly from the database
export interface DbReview {
  id: string;
  user_id: string | null;
  name: string;
  text: string;
  rating: number;
  created_at: string;
}

export interface StatItem {
  number: string;
  key: 'customers' | 'experience';
}

export type SectionId = 'home' | 'about' | 'benefits' | 'products' | 'authenticity' | 'cta' | 'testimonials' | 'contact' | 'faq'; // Removed 'profile'

export type ContactModalType = 'call' | 'message';

export interface UserReviewSubmission {
  name: string;
  text: string;
}

export interface UserTestimonial extends Testimonial {}

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export interface ContactInfoItem {
  key: 'address' | 'phone' | 'hours';
  icon: Icon;
  titleKey: StringKeys<TranslationKeys['contact']>;
  details: string;
  color: string;
}

export interface ProductShowcaseItem {
  src: string;
  alt: string;
  labelKey: 'weightGainLabel' | 'weightLossLabel';
  descKey: 'weightLossDesc' | 'weightGainDesc';
  buttonTextKey: 'orderWeightGain' | 'orderWeightLoss';
  price: number;
}

export interface BenefitItem {
  key: 'appetite' | 'weight' | 'immunity' | 'energy' | 'metabolism' | 'mood';
  icon: Icon;
  gradient: string;
}

export type OpenOrderModalFunction = (productKey?: ProductShowcaseItem['labelKey']) => void;

export type FaqQuestionKey = 'q1' | 'q2' | 'q3' | 'q4';
export type FaqAnswerKey = 'a1' | 'a2' | 'a3' | 'a4';
export type FaqTranslationKey = FaqQuestionKey | FaqAnswerKey;

export type Icon = React.ElementType;

// Removed unused props interfaces, components will get data from context
export interface NavbarProps {}
export interface AuthenticityInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
}
export interface AuthenticityInfoProps {}
export interface AboutSectionProps {}
export interface BenefitsSectionProps {}
export interface ProductShowcaseSectionProps {}
export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentLang: string;
  userTestimonial: Testimonial | null;
}
export interface ContactSectionProps {}
export interface FaqSectionProps {}
export interface HeroSectionProps {
  stats: StatItem[];
}
export interface MobileNavProps {}
export interface ReviewFormProps {
  onReviewSubmitted: (review: DbReview) => void;
}

// This interface is for the hook's parameters, not the component's props
export interface UseReviewFormHookParams { // Renamed to clarify it's for hook params
  onReviewSubmitted: (review: DbReview) => void;
  t: TranslationKeys;
  initialName?: string;
}

export interface NavSection {
  id: SectionId;
  labelKey: keyof TranslationKeys['nav']; // Simplified to only use nav keys
}

export type ProductType = 'weightGain' | 'weightLoss' | '';
export type CallbackPurpose = 'details' | 'orders' | 'other' | '';

export interface CallbackRequestFormData {
  name: string;
  phone: string;
  productType: ProductType;
  purpose: CallbackPurpose;
}

export interface CallbackRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
  currentLang: string;
}

export interface LayoutContextType {
  t: TranslationKeys;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  openContactModal: (type: ContactModalType) => void;
  openOrderModal: (productKey?: ProductShowcaseItem['labelKey']) => void;
  openAuthenticityModal: () => void;
  openCallbackRequestModal: () => void;
  openLoadingLinkModal: () => void;
  getLinkClasses: (sectionId: SectionId) => string;
  getHomePath: () => string; // Added
  getSectionPath: (sectionId: SectionId) => string; // Added
}

// Removed ClientLinkStatus and VerificationRequest as they are no longer used
// export type ClientLinkStatus = 'waiting_scan' | 'scanned' | 'link_sent' | 'error';
// export interface VerificationRequest {
//   status: ClientLinkStatus;
//   link_to_send: string | null;
//   telegram_chat_id?: string;
// }

export interface VerifyPageProps {
  params: { lang: string };
  searchParams: { clientId?: string };
  t: TranslationKeys; // Added t
  currentLang: string; // Added currentLang
}

// New type for analytics events
export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export interface NotifyVisitBody {
  lat: number | null;
  lon: number | null;
  screenWidth: number;
  screenHeight: number;
  isQrScan?: boolean; // Added for QR scan differentiation
}

// New interface for UTM query parameters
export interface NotifyVisitQueryParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

// New interface for sending photo to Telegram
export interface TelegramPhotoData {
  photoBase64: string;
  caption: string;
}

// New interface for sending video to Telegram
export interface TelegramVideoData {
  videoBlob: Blob; // Use Blob for video data
  caption: string;
  filename: string; // e.g., 'qr_scan_video.webm'
}