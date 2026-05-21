"use client";

import React from 'react';
import { Phone, Mail, Globe, Share2, MessageSquare } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

const Topbar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: 'en' | 'bn') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="bg-brand-primary text-white py-2 px-4 hidden md:block">
      <div className="section-container flex justify-between items-center text-[10px] font-black uppercase tracking-[0.15em]">
        <div className="flex items-center space-x-6">
          <a href="tel:+8801234567890" className="flex items-center space-x-2 hover:text-brand-accent transition-colors group">
            <Phone size={12} className="text-brand-accent group-hover:scale-110 transition-transform" />
            <span>{t('topbar.phone')}</span>
          </a>
          <a href="mailto:info@demo.edu.bd" className="flex items-center space-x-2 hover:text-brand-accent transition-colors group">
            <Mail size={12} className="text-brand-accent group-hover:scale-110 transition-transform" />
            <span>{t('topbar.email')}</span>
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 mr-4 border-r border-white/20 pr-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-accent transition-colors"><Globe size={14} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-brand-accent transition-colors"><MessageSquare size={14} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="hover:text-brand-accent transition-colors"><Share2 size={14} /></a>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => switchLocale('en')}
              className={`hover:text-brand-accent transition-all duration-300 ${locale === 'en' ? 'text-brand-accent scale-110' : 'opacity-70 hover:opacity-100'}`}
            >
              English
            </button>
            <span className="text-white/30">/</span>
            <button 
              onClick={() => switchLocale('bn')}
              className={`hover:text-brand-accent transition-all duration-300 font-medium ${locale === 'bn' ? 'text-brand-accent scale-110' : 'opacity-70 hover:opacity-100'}`}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
