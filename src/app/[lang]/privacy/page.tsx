"use client";

import React from "react";
import { useLayoutContext } from '@/context/LayoutContext';

const PrivacyPage = () => {
  const { t, currentLang } = useLayoutContext();
  // TODO: Replace this placeholder with the official Privacy Policy legal text and add organization details before launch.
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-6">{currentLang === "hy" ? "Գաղտնիության քաղաքականություն" : currentLang === "ru" ? "Политика конфиденциальности" : "Privacy Policy"}</h1>
      <p className="mb-8 text-lg">{
        currentLang === "hy"
          ? "Սա Samyun Wan Armenia պաշտոնական կայքի գաղտնիության քաղաքականության էջի նախնական նմուշն է։"
          : currentLang === "ru"
          ? "Это временная страница политики конфиденциальности официального сайта Samyun Wan Armenia."
          : "This is a placeholder Privacy Policy page for the official Samyun Wan Armenia website."
      }</p>
      <p className="mb-8 text-md text-warning-500">{/* TODO: Add the full legal privacy text and business owner info. */}</p>
    </div>
  );
};

export default PrivacyPage;
