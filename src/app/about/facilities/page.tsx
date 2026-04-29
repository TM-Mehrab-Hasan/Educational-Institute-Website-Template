"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, ChevronRight } from 'lucide-react';
import { infrastructure } from '../../../data/about';
import { useLanguage } from '@/lib/LanguageContext';
import CampusVisitModal from '@/components/ui/CampusVisitModal';

export default function FacilitiesPage() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pb-24 bg-ui-bg min-h-screen">
      <CampusVisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <header className="bg-brand-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} />
            <Link href="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
            <ChevronRight size={12} />
            <span className="text-white">{t('nav.facilities')}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            World-Class <span className="text-white/60">Facilities</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            State-of-the-art infrastructure designed to foster a comprehensive learning experience.
          </p>
        </div>
      </header>

      <div className="section-container mt-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
            <Building2 size={32} />
          </div>
          <h2 className="text-4xl font-black text-text-main uppercase tracking-tight">Our Campus</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {infrastructure.map((item) => (
            <div key={item.id} className="group bg-white rounded-[3rem] overflow-hidden border border-ui-border shadow-sm hover:shadow-2xl transition-all duration-700">
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="p-12">
                <h4 className="text-3xl font-black text-text-main mb-4 uppercase tracking-tight group-hover:text-brand-primary transition-colors">{item.title}</h4>
                <p className="text-lg text-text-muted leading-relaxed font-medium text-justify">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-16 bg-brand-primary rounded-[4rem] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-black uppercase tracking-tight mb-6">{t('visit.title')}</h3>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 font-medium">
              {t('visit.subtitle')}
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-10 py-4 bg-white text-brand-primary font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
            >
              {t('visit.schedule')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
