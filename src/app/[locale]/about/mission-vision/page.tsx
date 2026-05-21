"use client";

import React, { use, useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Target, Compass, ChevronRight, Shield, Lightbulb, Star, Heart, Loader } from 'lucide-react';
import { useScrollReveal } from '@/lib/hooks';
import { useTranslations, useLocale } from 'next-intl';
import { getContent } from '@/lib/content-service';

export default function MissionVisionPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: missionRef, isVisible: missionVisible } = useScrollReveal();
  const { ref: visionRef, isVisible: visionVisible } = useScrollReveal();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal();

  const [dynamicContent, setDynamicContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      const data = await getContent(undefined, locale);
      setDynamicContent(data);
      setLoading(false);
    }
    fetchContent();
  }, [locale]);

  const iconMap: Record<string, React.ElementType> = {
    Shield,
    Lightbulb,
    Star,
    Heart
  };

  const coreValues = ['integrity', 'innovation', 'excellence', 'service'].map((key) => {
    return {
      id: key,
      icon: iconMap[t(`value.${key}.title`) === 'Integrity' ? 'Shield' :
                   t(`value.${key}.title`) === 'Innovation' ? 'Lightbulb' :
                   t(`value.${key}.title`) === 'Excellence' ? 'Star' : 'Heart'],
      title: t(`value.${key}.title`),
      description: t(`value.${key}.desc`)
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ui-bg">
        <Loader className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

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
            <span className="text-white">{t('nav.mission')}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            {t('mission.purpose')} <span className="text-white/40">{t('nav.mission')}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            {t('mission.hero_desc')}
          </p>
        </div>
      </header>

      <div className="section-container mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div
            ref={missionRef}
            className={`bg-white p-12 md:p-16 rounded-[3.5rem] border border-ui-border shadow-sm transition-all duration-1000 ease-out ${
              missionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="w-16 h-16 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary mb-10">
              <Target size={32} />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-text-main mb-8">{t('mission.mission_title')}</h2>
            <p className="text-text-muted text-xl leading-relaxed text-justify font-medium">
              {dynamicContent?.mission || t('mission.mission_text')}
            </p>
          </div>

          <div
            ref={visionRef}
            className={`bg-white p-12 md:p-16 rounded-[3.5rem] border border-ui-border shadow-sm transition-all duration-1000 delay-200 ease-out ${
              visionVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="w-16 h-16 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary mb-10">
              <Compass size={32} />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-text-main mb-8">{t('mission.vision_title')}</h2>
            <p className="text-text-muted text-xl leading-relaxed text-justify font-medium">
              {dynamicContent?.vision || t('mission.vision_text')}
            </p>
          </div>
        </div>

        <div
          ref={valuesRef}
          className={`bg-slate-900 rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden transition-all duration-1000 ease-out ${
            valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-pattern-cubes"></div>
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">{t('mission.core_values_title')}</h2>
              <div className="h-1.5 w-24 bg-brand-primary mx-auto rounded-full mb-8"></div>
              <p className="text-white/60 text-lg font-medium">
                {t('mission.core_values_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {coreValues.map((value) => (
                <div key={value.id} className="group text-center">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-500 group-hover:-translate-y-2">
                    <value.icon size={32} className="text-brand-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{value.title}</h3>
                  <p className="text-white/60 font-medium leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
