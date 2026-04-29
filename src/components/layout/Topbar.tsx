"use client";

import React from 'react';
import { Phone, Mail, Globe, Share2, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const Topbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="bg-brand-primary text-white py-2 px-4 hidden md:block">
      <div className="section-container flex justify-between items-center text-[10px] font-black uppercase tracking-[0.15em]">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone size={12} className="text-brand-accent" />
            <span>{t('topbar.phone')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={12} className="text-brand-accent" />
            <span>{t('topbar.email')}</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 mr-4 border-r border-white/20 pr-6">
            <a href="#" aria-label="Facebook" className="hover:text-brand-accent transition-colors"><Globe size={14} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-brand-accent transition-colors"><MessageSquare size={14} /></a>
            <a href="#" aria-label="Youtube" className="hover:text-brand-accent transition-colors"><Share2 size={14} /></a>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setLanguage('en')}
              className={`hover:text-brand-accent transition-colors ${language === 'en' ? 'text-brand-accent' : ''}`}
            >
              English
            </button>
            <span className="text-white/30">/</span>
            <button 
              onClick={() => setLanguage('bn')}
              className={`hover:text-brand-accent transition-colors font-medium ${language === 'bn' ? 'text-brand-accent' : ''}`}
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
