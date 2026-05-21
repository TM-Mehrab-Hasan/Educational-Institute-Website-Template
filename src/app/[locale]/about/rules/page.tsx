"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { ShieldCheck, ChevronRight, Scale, Shirt, Clock, Building, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';

export default function RulesPage() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

  const rulesData = [
    {
      icon: <Scale size={28} />,
      title: t('rules.discipline_title'),
      text: t('rules.discipline_text')
    },
    {
      icon: <Shirt size={28} />,
      title: t('rules.uniform_title'),
      text: t('rules.uniform_text')
    },
    {
      icon: <Clock size={28} />,
      title: t('rules.attendance_title'),
      text: t('rules.attendance_text')
    },
    {
      icon: <Building size={28} />,
      title: t('rules.campus_title'),
      text: t('rules.campus_text')
    }
  ];

  return (
    <div className="pb-24 bg-ui-bg min-h-screen">
      {/* Page Header */}
      <header className="bg-brand-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern-cubes"></div>
        <div 
          ref={headerRef}
          className={`section-container relative z-10 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <nav className="flex items-center gap-2 text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-10">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} />
            <Link href="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
            <ChevronRight size={12} />
            <span className="text-white">{t('nav.rules')}</span>
          </nav>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            {t('rules.title').split(' ')[0]} <span className="text-white/40">{t('rules.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            {t('rules.hero_desc')}
          </p>
        </div>
      </header>

      <div className="section-container mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div 
            ref={contentRef}
            className={`lg:col-span-8 transition-all duration-1000 ease-out ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <div className="space-y-12">
              {rulesData.map((rule, idx) => (
                <div key={idx} className="group flex flex-col md:flex-row gap-8 p-8 md:p-12 bg-white rounded-[3rem] border border-ui-border shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
                    {rule.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-text-main mb-4 group-hover:text-brand-primary transition-colors">
                      {rule.title}
                    </h2>
                    <p className="text-lg text-text-muted font-medium leading-relaxed">
                      {rule.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-amber-50 rounded-3xl border border-amber-100 flex gap-6 items-start">
              <div className="text-amber-600 mt-1">
                <AlertCircle size={24} />
              </div>
              <p className="text-amber-900 font-bold leading-relaxed">
                Note: These rules are subject to change by the Governing Body. All students and guardians are expected to follow the latest version of the Code of Conduct issued by the administration.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden sticky top-32">
              <div className="absolute inset-0 opacity-10 bg-pattern-cubes"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-8 border border-brand-primary/30">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Integrity First</h3>
                <p className="text-white/60 font-medium leading-relaxed mb-8 text-sm">
                  Our discipline is not about punishment, but about creating a culture of mutual respect and institutional integrity.
                </p>
                <div className="h-px bg-white/10 mb-8"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/40">
                    <span>Last Updated</span>
                    <span className="text-white">Jan 2026</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/40">
                    <span>Approved By</span>
                    <span className="text-white">Governing Body</span>
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
