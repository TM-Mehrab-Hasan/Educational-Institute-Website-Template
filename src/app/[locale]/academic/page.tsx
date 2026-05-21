"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, Calendar, BookOpen, Clock, Trophy, Map, Sparkles, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';

export default function AcademicPage() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  const academicSections = [
    {
      id: 'routine',
      title: t('nav.routine'),
      desc: "View the daily class schedules for all grades and sections.",
      icon: Clock,
      href: "/academic/routine",
      color: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
      gradient: "from-brand-primary to-brand-secondary",
      iconBg: "bg-brand-primary"
    },
    {
      id: 'curriculum',
      title: t('nav.syllabus'),
      desc: "Detailed curriculum and academic outlines for the academic year.",
      icon: BookOpen,
      href: "/academic/curriculum",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-500"
    },
    {
      id: 'calendar',
      title: t('nav.calendar'),
      desc: "The complete timeline of exams, term starts, and academic milestones.",
      icon: Calendar,
      href: "/academic/calendar",
      color: "bg-amber-100 text-amber-700 border-amber-200",
      gradient: "from-amber-500 to-orange-600",
      iconBg: "bg-amber-500"
    },
    {
      id: 'holidays',
      title: t('nav.holidays'),
      desc: "Schedule of national, religious, and international holidays.",
      icon: Map,
      href: "/academic/holidays",
      color: "bg-teal-100 text-teal-700 border-teal-200",
      gradient: "from-teal-500 to-emerald-600",
      iconBg: "bg-teal-500"
    },
    {
      id: 'events',
      title: 'Events & Activities',
      desc: "Explore our vibrant calendar of sports, cultural celebrations, and community initiatives.",
      icon: Trophy,
      href: "/academic/events",
      color: "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20",
      gradient: "from-brand-secondary to-brand-primary",
      iconBg: "bg-brand-secondary"
    },
    {
      id: 'notices',
      title: t('notices.title'),
      desc: "Official announcements, examination schedules, and academic updates.",
      icon: FileText,
      href: "/notices",
      color: "bg-indigo-100 text-indigo-700 border-indigo-200",
      gradient: "from-indigo-500 to-blue-600",
      iconBg: "bg-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-slate-900 via-brand-primary/80 to-brand-secondary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
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
            <span className="text-white font-black">{t('nav.academic')}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20">
                  <Sparkles className="text-brand-accent" size={24} />
                </div>
                <span className="text-white/70 text-sm font-bold uppercase tracking-widest">Academic Hub</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                Academic<br /><span className="text-emerald-300">Resources</span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl leading-relaxed">
                Everything you need to navigate the academic year, from daily class routines to the full curriculum and event schedules.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Academic Cards */}
      <div 
        ref={cardsRef}
        className={`section-container py-16 transition-all duration-1000 ease-out delay-200 ${
          cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 -mt-24 relative z-20">
          {academicSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link 
                key={section.id} 
                href={section.href}
                className="group bg-white rounded-3xl border border-ui-border p-8 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden relative"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${section.gradient} opacity-5 rounded-bl-full group-hover:scale-125 transition-transform duration-700`} />
                
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${section.iconBg} shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform duration-300`}>
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
    </div>
  );
}
