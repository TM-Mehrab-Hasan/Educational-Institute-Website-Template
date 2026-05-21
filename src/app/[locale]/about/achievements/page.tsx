"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { Award, ChevronRight, Trophy, BookOpen, Music, Building2, Calendar } from 'lucide-react';
import { achievements } from '@/data/about';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';

export default function AchievementsPage() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic': return <BookOpen size={20} />;
      case 'Sports': return <Trophy size={20} />;
      case 'Cultural': return <Music size={20} />;
      case 'Infrastructural': return <Building2 size={20} />;
      default: return <Award size={20} />;
    }
  };

  const translatedAchievements = achievements.map(item => {
    // Assuming keys are mapped logically in LanguageContext
    // The keys I found were: achievement.best_model, achievement.ict_champion, etc.
    // Map them based on IDs for now as per established pattern in facilities page
    const keyMap: Record<number, string> = {
      1: 'best_model',
      2: 'ict_champion',
      3: 'sports_champ',
      4: 'science_fair'
    };
    const key = keyMap[item.id];
    return {
      ...item,
      title: t(`achievement.${key}`),
      description: t(`achievement.${key}_desc`)
    };
  });

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
            <span className="text-white">{t('nav.achievements')}</span>
          </nav>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
            {t('nav.achievements').split(' ')[0]} <span className="text-white/40">{t('nav.achievements').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            {t('about.achievements_desc')}
          </p>
        </div>
      </header>

      <div className="section-container mt-24">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
            <Award size={24} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-text-main">
            {t('about.glance_title')}
          </h2>
        </div>

        <div 
          ref={contentRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {translatedAchievements.map((item) => (
            <div key={item.id} className="group bg-white p-8 md:p-10 rounded-[3rem] border border-ui-border shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[5rem] -mr-10 -mt-10 transition-all group-hover:bg-brand-primary/10 duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3 py-2 px-4 bg-ui-bg rounded-full border border-ui-border">
                    <span className="text-brand-primary">{getCategoryIcon(item.category)}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-text-muted">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Calendar size={16} />
                    <span className="text-sm font-bold">{item.year}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-text-main mb-4 group-hover:text-brand-primary transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-lg text-text-muted font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
