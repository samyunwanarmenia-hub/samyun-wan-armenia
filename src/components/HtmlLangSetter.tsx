"use client";

import { useEffect } from 'react';

import type { SupportedLang } from '@/config/locales';

interface HtmlLangSetterProps {
  lang: SupportedLang;
}

const HtmlLangSetter = ({ lang }: HtmlLangSetterProps) => {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
};

export default HtmlLangSetter;
