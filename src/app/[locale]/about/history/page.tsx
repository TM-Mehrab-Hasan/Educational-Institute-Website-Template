"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { History, ChevronRight, Award } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';

export default function HistoryPage() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();
  const { ref: milestoneRef, isVisible: milestoneVisible } = useScrollReveal();

  return (
    <div className="pb-24 bg-ui-bg min-h-screen">
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
            <span className="text-white">{t('nav.history')}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            {t('history.title').split(' ')[0]} <span className="text-white/40">{t('history.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            {t('history.hero_desc')}
          </p>
        </div>
      </header>

      <div className="section-container mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div 
            ref={contentRef}
            className={`lg:col-span-8 transition-all duration-1000 ease-out ${
              contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                <History size={24} />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-text-main">{t('history.section_title')}</h2>
            </div>
            
            <div className="prose prose-slate lg:prose-lg text-text-muted max-w-none space-y-8 font-medium text-justify">
              <p>{t('history.p1')}</p>
              
              <div 
                ref={milestoneRef}
                className={`bg-white p-10 md:p-16 rounded-[3rem] border border-ui-border shadow-sm my-16 relative overflow-hidden group transition-all duration-1000 ease-out ${
                  milestoneVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/10 transition-colors duration-700"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-primary/20">
                    <Award size={28} />
                  </div>
                  <h3 className="text-3xl font-black text-text-main mb-6 uppercase tracking-tight">{t('history.milestones_title')}</h3>
                  <p className="text-xl leading-relaxed italic text-brand-secondary/80">
                    {t('history.milestones_p')}
                  </p>
                </div>
              </div>

              <p>{t('history.p2')}</p>
              <p>{t('history.p3')}</p>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-brand-primary p-12 rounded-[3rem] text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-pattern-cubes"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Our Legacy</h3>
                <div className="space-y-8">
                  <div className="border-l-2 border-white/20 pl-6">
                    <p className="text-3xl font-black mb-1">1995</p>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Foundation Year</p>
                  </div>
                  <div className="border-l-2 border-white/20 pl-6">
                    <p className="text-3xl font-black mb-1">28+</p>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Years of Excellence</p>
                  </div>
                  <div className="border-l-2 border-white/20 pl-6">
                    <p className="text-3xl font-black mb-1">10k+</p>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Successful Alumni</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
