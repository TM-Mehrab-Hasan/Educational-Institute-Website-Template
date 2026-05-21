"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const locale = useLocale() as Language;
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = (lang: Language) => {
    router.replace(pathname, { locale: lang });
  };

  const translate = (key: string) => {
    // next-intl t() returns string, but we cast to satisfy legacy types if needed
    try {
      return t(key);
    } catch (e) {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language: locale, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Fallback for cases where context might not be ready or used outside provider
    // though in this app it should always be inside.
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
