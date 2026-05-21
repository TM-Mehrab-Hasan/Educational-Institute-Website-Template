"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { Network, ChevronRight, User, Users, GraduationCap, Briefcase, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';

export default function OrganogramPage() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

  const structure = [
    {
      level: 1,
      title: t('organogram.level1'),
      desc: t('organogram.level1_desc'),
      icon: <ShieldCheck size={24} />,
      color: 'bg-brand-primary',
      textColor: 'text-white'
    },
    {
      level: 2,
      title: t('organogram.level2'),
      desc: t('organogram.level2_desc'),
      icon: <User size={24} />,
      color: 'bg-white',
      textColor: 'text-text-main'
    },
    {
      level: 3,
      title: t('organogram.level3'),
      desc: t('organogram.level3_desc'),
      icon: <GraduationCap size={24} />,
      color: 'bg-white',
      textColor: 'text-text-main'
    },
    {
      level: 4,
      items: [
        {
          title: t('organogram.level4_academic'),
          desc: t('organogram.level4_academic_desc'),
          icon: <Users size={20} />,
          color: 'bg-green-50',
          borderColor: 'border-green-100'
        },
        {
          title: t('organogram.level4_admin'),
          desc: t('organogram.level4_admin_desc'),
          icon: <Briefcase size={20} />,
          color: 'bg-blue-50',
          borderColor: 'border-blue-100'
        }
      ]
    },
    {
      level: 5,
      title: t('organogram.level5_support'),
      desc: t('organogram.level5_support_desc'),
      icon: <Network size={24} />,
      color: 'bg-slate-50',
      textColor: 'text-text-main'
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
            <span className="text-white">{t('nav.organogram')}</span>
          </nav>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            {t('organogram.title').split(' ')[0]} <span className="text-white/40">{t('organogram.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            {t('organogram.hero_desc')}
          </p>
        </div>
      </header>

      <div className="section-container mt-24">
        <div 
          ref={contentRef}
          className={`max-w-4xl mx-auto space-y-12 relative transition-all duration-1000 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {/* Vertical line through the center */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-brand-primary/10 -translate-x-1/2 hidden md:block"></div>

          {structure.map((node, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              {node.items ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {node.items.map((item, subIdx) => (
                    <div key={subIdx} className={`p-8 rounded-[2.5rem] border ${item.borderColor} ${item.color} shadow-sm hover:shadow-md transition-all`}>
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-primary mb-6">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-text-main mb-2">{item.title}</h3>
                      <p className="text-sm text-text-muted font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`w-full max-w-md p-8 md:p-10 rounded-[3rem] border border-ui-border ${node.color} shadow-lg text-center hover:scale-[1.02] transition-transform duration-500`}>
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${node.level === 1 ? 'bg-white/20 text-white' : 'bg-brand-primary/10 text-brand-primary'}`}>
                    {node.icon}
                  </div>
                  <h2 className={`text-2xl font-black uppercase tracking-tight mb-2 ${node.textColor}`}>
                    {node.title}
                  </h2>
                  <p className={`text-base font-medium opacity-70 ${node.textColor}`}>
                    {node.desc}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
