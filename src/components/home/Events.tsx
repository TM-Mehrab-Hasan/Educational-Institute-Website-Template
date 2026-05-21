"use client";

import React from 'react';
import { Calendar, MapPin, ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';;

export default function Events() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const router = useRouter();

  const events = [
    {
      id: 1,
      title: t('event1.title'),
      date: t('event1.date'),
      location: t('event1.location'),
      category: "Sports",
      gcalDate: "20260520",
    },
    {
      id: 2,
      title: t('event2.title'),
      date: t('event2.date'),
      location: t('event2.location'),
      category: "Academic",
      gcalDate: "20260605",
    },
    {
      id: 3,
      title: t('event3.title'),
      date: t('event3.date'),
      location: t('event3.location'),
      category: "Co-curricular",
      gcalDate: "20260612",
    }
  ];

  const buildGCalUrl = (title: string, gcalDate: string, location: string) => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `${title} — Demo Model School & College`,
      dates: `${gcalDate}/${gcalDate}`,
      details: `Demo Model School & College event: ${title}`,
      location: `${location}, Demo Model School & College, Dhaka`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <section 
      ref={ref}
      className={`py-24 bg-ui-surface transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="section-container">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl font-black text-text-main uppercase tracking-tight mb-4">
              {t('events.title').split(' ')[0]} <span className="text-brand-primary">{t('events.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-text-muted max-w-xl">{t('events.desc')}</p>
          </div>
          <Link href="/academic/calendar" className="text-brand-primary font-bold hover:underline inline-flex items-center gap-2 shrink-0">
            {t('home.academic_calendar')} <ChevronRight size={20} />
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              role="link"
              tabIndex={0}
              onClick={() => router.push('/academic/events')}
              onKeyDown={(e) => e.key === 'Enter' && router.push('/academic/events')}
              className="group bg-ui-bg rounded-2xl border border-ui-border p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {event.category}
                </span>
                <div className="w-10 h-10 rounded-full bg-ui-surface border border-ui-border flex items-center justify-center text-text-muted group-hover:text-brand-primary transition-colors">
                  <Calendar size={20} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-text-main mb-4 group-hover:text-brand-primary transition-colors leading-tight">
                {event.title}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-text-muted text-sm font-medium">
                  <Calendar size={16} className="text-brand-primary/60" />
                  {event.date}
                </div>
                <div className="flex items-center gap-3 text-text-muted text-sm font-medium">
                  <MapPin size={16} className="text-brand-primary/60" />
                  {event.location}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-ui-border">
                <a
                  href={buildGCalUrl(event.title, event.gcalDate, event.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-black text-text-main uppercase tracking-tighter hover:text-brand-primary transition-colors flex items-center gap-2 rounded"
                  aria-label={`Add ${event.title} to Google Calendar`}
                >
                  Add to Google Calendar <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
