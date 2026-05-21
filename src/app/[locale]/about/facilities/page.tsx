"use client";

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Building2, ChevronRight } from 'lucide-react';
import { infrastructure } from '@/data/about';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';
import CampusVisitModal from '@/components/ui/CampusVisitModal';

export default function FacilitiesPage() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const translatedInfrastructure = infrastructure.map(item => {
    const keyMap: Record<number, string> = {
      1: 'labs',
      2: 'library',
      3: 'classrooms',
      4: 'auditorium'
    };
    const key = keyMap[item.id];
    return {
      ...item,
      title: t(`infra.${key}.title`),
      description: t(`infra.${key}.desc`)
    };
  });

  return (
    <div className="pb-24 bg-ui-bg min-h-screen">
      <CampusVisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <header className="bg-brand-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern-cubes"></div>
        <div 
          ref={headerRef}
          className={`section-container relative z-10 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <nav className="flex items-center gap-2 text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} />
            <Link href="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
            <ChevronRight size={12} />
            <span className="text-white">{t('nav.facilities')}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            {t('facilities.hero_title')} <span className="text-white/40">{t('nav.facilities')}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            {t('facilities.hero_desc')}
          </p>
        </div>
      </header>

      <div className="section-container mt-24">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
            <Building2 size={24} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-text-main">{t('facilities.section_title')}</h2>
        </div>

        <div 
          ref={contentRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-1000 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {translatedInfrastructure.map((item) => (
            <div key={item.id} className="group bg-white rounded-[3rem] overflow-hidden border border-ui-border shadow-sm hover:shadow-2xl transition-all duration-700">
              <div className="h-80 overflow-hidden relative">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="p-12">
                <h3 className="text-2xl font-black text-text-main mb-4 group-hover:text-brand-primary transition-colors uppercase tracking-tight">{item.title}</h3>
                <p className="text-text-muted text-lg leading-relaxed font-medium text-justify">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div 
          ref={ctaRef}
          className={`mt-24 p-16 bg-brand-primary rounded-[4rem] text-white text-center relative overflow-hidden transition-all duration-1000 ease-out ${
            ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="absolute inset-0 opacity-10 bg-pattern-cubes"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-black uppercase tracking-tight mb-6">{t('visit.title')}</h3>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              {t('visit.subtitle')}
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-10 py-4 bg-white text-brand-primary font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl hover:-translate-y-1 transition-all focus-ring"
            >
              {t('visit.schedule')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
