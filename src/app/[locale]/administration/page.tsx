"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, UserCog, GraduationCap, Briefcase, Building2, ShieldCheck, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';

export default function AdministrationPage() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  const adminSections = [
    {
      id: 'principal',
      title: t('nav.principal_msg'),
      desc: "Read the guiding vision and leadership message from the Head of the Institution.",
      icon: UserCog,
      href: "/administration/principal-message",
      color: "bg-amber-100 text-amber-700 border-amber-200",
      gradient: "from-amber-500 to-orange-600",
      iconBg: "bg-amber-500"
    },
    {
      id: 'governing',
      title: t('nav.governing'),
      desc: "Meet the esteemed members of our board who guide our institutional policies.",
      icon: Building2,
      href: "/administration/governing-body",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      gradient: "from-blue-500 to-indigo-600",
      iconBg: "bg-blue-500"
    },
    {
      id: 'teachers',
      title: t('nav.teachers'),
      desc: "Explore the profiles of our highly qualified and dedicated teaching faculty.",
      icon: GraduationCap,
      href: "/administration/teachers",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-500"
    },
    {
      id: 'staff',
      title: t('nav.staff'),
      desc: "The administrative and support staff who keep our campus running smoothly.",
      icon: Briefcase,
      href: "/administration/staff",
      color: "bg-purple-100 text-purple-700 border-purple-200",
      gradient: "from-purple-500 to-violet-600",
      iconBg: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-slate-900 via-brand-primary to-emerald-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-64 bg-black/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        </div>

        <div 
          ref={headerRef}
          className={`section-container relative z-10 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <nav className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} />
            <span className="text-white font-black">{t('nav.administration')}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20">
                  <ShieldCheck className="text-white" size={24} />
                </div>
                <span className="text-white/70 text-sm font-bold uppercase tracking-widest">Leadership & Governance</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                Institutional<br /><span className="text-emerald-300">{t('nav.administration')}</span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl leading-relaxed">
                Discover the dedicated team of leaders, educators, and professionals committed to maintaining our standard of excellence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 shrink-0">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 text-center">
                <p className="text-3xl font-black text-white">85+</p>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mt-1">{t('nav.teachers')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 text-center">
                <p className="text-3xl font-black text-white">25+</p>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mt-1">{t('nav.staff')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Administration Cards */}
      <div 
        ref={cardsRef}
        className={`section-container py-16 transition-all duration-1000 ease-out delay-200 ${
          cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 -mt-24 relative z-20">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link 
                key={section.id} 
                href={section.href}
                className="group bg-white rounded-3xl border border-ui-border p-8 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden relative"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${section.gradient} opacity-5 rounded-bl-full group-hover:scale-125 transition-transform duration-700`} />
                
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${section.iconBg} shadow-lg shadow-${section.iconBg.split('-')[1]}-500/30 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={32} />
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${section.color} group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors`}>
                    <ChevronRight size={20} />
                  </div>
                </div>
                
                <div className="mt-auto relative z-10">
                  <h2 className="text-2xl font-black text-text-main mb-3 group-hover:text-brand-primary transition-colors">{section.title}</h2>
                  <p className="text-text-muted leading-relaxed font-medium">
                    {section.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Contact Block */}
      <div className="section-container mt-8">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Need Assistance?</h3>
            <p className="text-white/60 text-lg">
              Contact our administrative office directly for inquiries related to admissions, records, and general information.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="relative z-10 shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl hover:-translate-y-1"
          >
            <Mail size={18} /> Contact Office
          </Link>
        </div>
      </div>
    </div>
  );
}
