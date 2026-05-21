"use client";

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { History, Target, Building2, ChevronRight, Award, GraduationCap, Users, Shield, BookOpen, Layers, Clock, Library, Scale, Network } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';
import CampusVisitModal from '@/components/ui/CampusVisitModal';
import Stats from '@/components/home/Stats';

export default function AboutPage() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: structureRef, isVisible: structureVisible } = useScrollReveal();
  const { ref: overviewRef, isVisible: overviewVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  return (
    <div className="pb-24 bg-ui-bg min-h-screen">
      <CampusVisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Page Header */}
      <header className="bg-brand-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern-cubes"></div>
        <div 
          ref={headerRef}
          className={`section-container relative z-10 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <nav className="flex items-center gap-2 text-white/70 text-xs font-black uppercase tracking-[0.2em]">
              <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <span className="text-white">{t('nav.about')}</span>
            </nav>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{t('about.eiin_label')}</span>
              <span className="text-sm font-bold tracking-tighter">{t('about.eiin_value')}</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            {t('about.heritage')} <br className="hidden md:block" /> <span className="text-white/40">{t('about.vision')}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            {t('about.nurturing')}
          </p>
        </div>
      </header>

      <div className="section-container -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Award, label: t('about.excellence_label'), value: "28+ Years" },
            { icon: Users, label: t('about.students_label'), value: "2,500+" },
            { icon: GraduationCap, label: t('about.faculty_label'), value: "85+" },
            { icon: Shield, label: t('gov.verified'), value: "Govt. Approved" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl border border-ui-border flex flex-col items-center text-center group hover:bg-brand-primary hover:text-white transition-all duration-500 hover:-translate-y-2">
              <item.icon size={32} className="text-brand-primary group-hover:text-white mb-4 transition-colors" />
              <p className="text-2xl font-black uppercase tracking-tighter">{item.value}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Structure Section */}
      <section 
        ref={structureRef}
        className={`section-container mt-24 transition-all duration-1000 ease-out ${
          structureVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-[3.5rem] border border-ui-border p-12 md:p-16 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/10 transition-colors duration-700"></div>
          
          <div className="relative z-10">
            <header className="mb-16">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-text-main mb-4">{t('about.structure_title')}</h2>
              <div className="h-1.5 w-20 bg-brand-primary rounded-full"></div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: BookOpen, label: t('about.curriculum_label'), value: t('about.curriculum_value') },
                { icon: Layers, label: t('about.versions_label'), value: t('about.versions_value') },
                { icon: Clock, label: t('about.shifts_label'), value: t('about.shifts_value') },
                { icon: Library, label: t('about.groups_label'), value: t('about.groups_value') },
              ].map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">{item.label}</h3>
                    <p className="text-lg font-bold text-text-main leading-tight">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-container mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div 
            ref={overviewRef}
            className={`lg:col-span-8 transition-all duration-1000 ease-out ${
              overviewVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-4xl font-black uppercase tracking-tight text-text-main mb-8 leading-tight">{t('about.overview_title')}</h2>
            <div className="prose prose-slate lg:prose-lg text-text-muted text-justify mb-12 font-medium">
              <p className="leading-relaxed mb-6">{t('about.overview_text')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/about/history" className="group p-8 bg-white rounded-3xl border border-ui-border hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl">
                <History size={32} className="text-brand-primary group-hover:text-white mb-6 transition-colors" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('nav.history')}</h3>
                <p className="text-sm opacity-70 font-medium">{t('about.history_desc')}</p>
              </Link>
              <Link href="/about/mission-vision" className="group p-8 bg-white rounded-3xl border border-ui-border hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl">
                <Target size={32} className="text-brand-primary group-hover:text-white mb-6 transition-colors" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('nav.mission')}</h3>
                <p className="text-sm opacity-70 font-medium">{t('about.mission_desc')}</p>
              </Link>
              <Link href="/about/facilities" className="group p-8 bg-white rounded-3xl border border-ui-border hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl">
                <Building2 size={32} className="text-brand-primary group-hover:text-white mb-6 transition-colors" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('nav.facilities')}</h3>
                <p className="text-sm opacity-70 font-medium">{t('about.facilities_desc')}</p>
              </Link>
              <Link href="/about/achievements" className="group p-8 bg-white rounded-3xl border border-ui-border hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl">
                <Award size={32} className="text-brand-primary group-hover:text-white mb-6 transition-colors" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('nav.achievements')}</h3>
                <p className="text-sm opacity-70 font-medium">{t('about.achievements_desc')}</p>
              </Link>
              <Link href="/about/rules" className="group p-8 bg-white rounded-3xl border border-ui-border hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl">
                <Scale size={32} className="text-brand-primary group-hover:text-white mb-6 transition-colors" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('nav.rules')}</h3>
                <p className="text-sm opacity-70 font-medium">{t('about.rules_desc')}</p>
              </Link>
              <Link href="/about/organogram" className="group p-8 bg-white rounded-3xl border border-ui-border hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl">
                <Network size={32} className="text-brand-primary group-hover:text-white mb-6 transition-colors" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('nav.organogram')}</h3>
                <p className="text-sm opacity-70 font-medium">{t('about.organogram_desc')}</p>
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden sticky top-32">
              <div className="absolute inset-0 opacity-10 bg-pattern-cubes"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                  <span className="w-2 h-6 bg-brand-primary rounded-full"></span>
                  {t('about.contact_title')}
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Users size={18} className="text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Students</p>
                      <p className="text-lg font-bold">2,500+ Active</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Award size={18} className="text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Ranking</p>
                      <p className="text-lg font-bold">Top 10 in Dhaka</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-12 border-t border-white/10">
                  <Link href="/contact" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
                    Get in touch <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div 
        ref={statsRef}
        className={`mt-24 transition-all duration-1000 ease-out ${
          statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Stats />
      </div>

      <div 
        ref={ctaRef}
        className={`section-container mt-24 transition-all duration-1000 ease-out ${
          ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="bg-brand-primary p-12 md:p-20 rounded-[4rem] text-white overflow-hidden relative group text-center">
          <div className="absolute inset-0 opacity-10 bg-pattern-cubes"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">{t('visit.title')}</h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              {t('visit.subtitle')}
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-12 py-5 bg-white text-brand-primary font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl hover:-translate-y-1 transition-all focus-ring"
            >
              {t('visit.schedule')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
