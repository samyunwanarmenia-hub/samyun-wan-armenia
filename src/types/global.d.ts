// src/types/global.d.ts

import React from 'react'; // Import React to use React.ElementType

// Define the structure of the translation object
export interface TranslationKeys {
  nav: {
    home: string;
    about: string;
    benefits: string;
    testimonials: string;
    contact: string;
    faq: string; // New key for FAQ
  };
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    cta: string;
    consultation: string;
    guarantee: string;
    qrVerificationTitle: string; // New key
    qrVerificationSubtitle: string; // New key
  };
  stats: {
    customers: string; // Re-added
    experience: string; // Updated
    // results: string; // Removed
    // countries: string; // Removed
  };
  about: {
    title: string;
    subtitle: string;
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
      description: string;
    };
    callNowButton: string; // Added missing key
    whatsappButton: string; // Added missing key
  };
  footer: {
    about: string;
    products: string;
    support: string;
    follow: string;
    description: string; // New key
    productOriginal: string; // New key
    productAuthenticity: string; // New key
    productUsage: string; // New key
    allRightsReserved: string; // New key
    officialRepresentative: string; // New key
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
    selectProducts: string; // New key for product selection instruction
    freeDeliveryMessage: string; // New key for free delivery message
  };
  authenticity: {
    title: string;
    howToDistinguish: string; // New key
    attention: string; // New key
  };
  gallery: {
    title: string;
    subtitle: string;
  };
  productShowcase: { // New section for product specific labels and descriptions
    weightGainLabel: string;
    weightGainDesc: string;
    weightLossLabel: string;
    weightLossDesc: string;
    orderWeightGain: string; // New key for button
    orderWeightLoss: string; // New key for button
  };
  loadingLinkModal: {
    title: string;
    message: string;
    waitingForAdmin: string;
  };
  faq: Record<FaqQuestionKey | FaqAnswerKey, string>; // Updated to use Record with specific keys
  // cta: { // New CTA section
  //   title: string;
  //   subtitle: string;
  //   orderNow: string;
  //   freeConsultation: string;
  // };
}

// Define the structure of a testimonial
export interface Testimonial {
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

// Define the structure of a stat item
export interface StatItem {
  number: string;
  key: 'customers' | 'experience'; // Updated to include 'customers' and 'experience'
}

// Define the structure for the intersection observer visibility state
export type SectionId = 'home' | 'about' | 'benefits' | 'authenticity' | 'products' | 'testimonials' | 'contact' | 'cta' | 'faq'; // Added 'faq'
export type IntersectionObserverVisibility = Record<SectionId, boolean>;

// Define types for modal interactions
export type ContactModalType = 'call' | 'message';

// Define type for a user review submission
export interface UserReviewSubmission {
  name: string;
  text: string;
}

// Define type for a user testimonial (after submission)
export interface UserTestimonial extends Testimonial {
  // Can add specific fields if needed, e.g., isNew: boolean
}

// New types for data separation
export type AboutItemKey = 'natural' | 'proven' | 'safe' | 'fast';
export interface AboutItem {
  key: AboutItemKey;
  icon: Icon; // Changed from 'any' to 'Icon'
  color: string;
}

export type BenefitItemKey = 'appetite' | 'weight' | 'immunity' | 'energy' | 'metabolism' | 'mood';
export interface BenefitItem {
  key: BenefitItemKey;
  icon: Icon; // Changed from 'any' to 'Icon'
  gradient: string;
}

// Utility type to extract keys that map to string values
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export interface ContactInfoItem {
  key: 'address' | 'phone' | 'hours';
  icon: Icon; // Changed from 'any' to 'Icon'
  titleKey: StringKeys<TranslationKeys['contact']>; // Use the utility type here
  details: string;
  color: string;
}

export interface ProductShowcaseItem {
  src: string;
  alt: string;
  labelKey: 'weightGainLabel' | 'weightLossLabel';
  descKey: 'weightLossDesc' | 'weightGainDesc';
  buttonTextKey: 'orderWeightGain' | 'orderWeightLoss'; // New property
  price: number; // New property for product price
}

export interface SeoHeadProps {
  t: TranslationKeys;
  currentLang: string;
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string;
  ogImage?: string; // Re-added
}

// Update the type for openOrderModal to accept an optional product key
export type OpenOrderModalFunction = (productKey?: ProductShowcaseItem['labelKey']) => void;

// New types for FAQ keys
export type FaqQuestionKey = 'q1' | 'q2' | 'q3' | 'q4'; // Added q4
export type FaqAnswerKey = 'a1' | 'a2' | 'a3' | 'a4'; // Added a4
export type FaqTranslationKey = FaqQuestionKey | FaqAnswerKey;

// Corrected Icon type definition
export type Icon = React.ElementType;