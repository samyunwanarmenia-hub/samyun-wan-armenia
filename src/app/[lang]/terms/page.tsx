"use client";

import React from "react";
import { useLayoutContext } from '@/context/LayoutContext';

const TermsPage = () => {
  const { t, currentLang } = useLayoutContext();
  // TODO: Add the full Terms & Conditions legal text and org details before launch.
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-6">{currentLang === "hy" ? "Օգտագործման կանոններ" : currentLang === "ru" ? "Пользовательское соглашение" : "Terms & Conditions"}</h1>
      <p className="mb-8 text-lg">{
        currentLang === "hy"
          ? "Սա Samyun Wan Armenia պաշտոնական կայքի օգտագործման կանոնների էջի նախնական տարբերակն է։"
          : currentLang === "ru"
          ? "Это временная страница пользовательского соглашения официального сайта Samyun Wan Armenia."
          : "This is a placeholder Terms & Conditions page for the official Samyun Wan Armenia website."
      }</p>
      <p className="mb-8 text-md text-warning-500">{/* TODO: Add the full terms and business legal owner details. */}</p>
    </div>
  );
};

export default TermsPage;
