"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.history': 'History',
    'nav.mission': 'Mission & Vision',
    'nav.facilities': 'Facilities',
    'nav.administration': 'Administration',
    'nav.academic': 'Academic',
    'nav.admission': 'Admission',
    'nav.results': 'Results',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'topbar.phone': '+880 1234 567890',
    'topbar.email': 'info@demo.edu.bd',
    'about.heritage': 'Our Heritage &',
    'about.vision': 'Vision',
    'about.nurturing': 'Nurturing excellence and building character in the heart of Dhaka since 1995.',
    'visit.schedule': 'Schedule a Campus Visit',
    'visit.title': 'Book a Visit',
    'visit.subtitle': 'Come and see our world-class campus in person.',
    'visit.name': 'Full Name',
    'visit.email': 'Email Address',
    'visit.date': 'Preferred Date',
    'visit.submit': 'Request Visit',
    'common.back': 'Back',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.about': 'সম্পর্কে',
    'nav.history': 'ইতিহাস',
    'nav.mission': 'লক্ষ্য ও উদ্দেশ্য',
    'nav.facilities': 'সুযোগ-সুবিধা',
    'nav.administration': 'প্রশাসন',
    'nav.academic': 'একাডেমিক',
    'nav.admission': 'ভর্তি',
    'nav.results': 'ফলাফল',
    'nav.gallery': 'গ্যালারি',
    'nav.contact': 'যোগাযোগ',
    'topbar.phone': '+৮৮০ ১২৩৪ ৫৬৭৮৯০',
    'topbar.email': 'info@demo.edu.bd',
    'about.heritage': 'আমাদের ঐতিহ্য ও',
    'about.vision': 'ভিশন',
    'about.nurturing': '১৯৯৫ সাল থেকে ঢাকার প্রাণকেন্দ্রে শ্রেষ্ঠত্ব লালন এবং চরিত্র গঠন।',
    'visit.schedule': 'ক্যাম্পাস ভিজিট শিডিউল করুন',
    'visit.title': 'একটি ভিজিট বুক করুন',
    'visit.subtitle': 'আসুন এবং আমাদের বিশ্বমানের ক্যাম্পাসটি সশরীরে দেখুন।',
    'visit.name': 'পুরো নাম',
    'visit.email': 'ইমেল ঠিকানা',
    'visit.date': 'পছন্দসই তারিখ',
    'visit.submit': 'ভিজিটের জন্য অনুরোধ করুন',
    'common.back': 'ফিরে যান',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
