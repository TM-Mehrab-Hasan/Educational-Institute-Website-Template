"use client";

import React, { useState } from 'react';
import { CalendarDays, ChevronRight, Sun, Moon, Globe, Flag, HelpCircle, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Link } from '@/i18n/routing';

interface Holiday {
  id: number;
  name: string;
  date: string;
  day: string;
  duration: number; // days
  type: 'National' | 'Religious' | 'International';
  description: string;
}

const holidays: Holiday[] = [
  { id: 1, name: "Shab-e-Barat", date: "04 Feb 2026", day: "Wednesday", duration: 1, type: "Religious", description: "Night of Fortune and Forgiveness in Islamic tradition" },
  { id: 2, name: "Shaheed Day & International Mother Language Day", date: "21 Feb 2026", day: "Saturday", duration: 1, type: "National", description: "Commemorating the sacrifice of the language martyrs of 1952" },
  { id: 3, name: "Sheikh Mujibur Rahman's Birthday", date: "17 Mar 2026", day: "Tuesday", duration: 1, type: "National", description: "Birth anniversary of the Father of the Nation" },
  { id: 4, name: "Ramadan, Shab-e-Qadr & Eid-ul-Fitr Break", date: "08–26 Mar 2026", day: "Sun–Thu", duration: 19, type: "Religious", description: "Combined closure for Ramadan, the Night of Power, and Eid-ul-Fitr" },
  { id: 5, name: "Independence & National Day", date: "26 Mar 2026", day: "Thursday", duration: 1, type: "National", description: "Celebrates Bangladesh's declaration of independence in 1971" },
  { id: 6, name: "Pahela Baishakh (Bangla New Year)", date: "14 Apr 2026", day: "Tuesday", duration: 1, type: "National", description: "Celebrating the first day of the Bengali calendar" },
  { id: 7, name: "May Day & Buddha Purnima", date: "01 May 2026", day: "Friday", duration: 1, type: "International", description: "International Workers' Day and Birth of Gautama Buddha" },
  { id: 8, name: "Eid-ul-Azha & Summer Vacation", date: "24 May – 04 Jun 2026", day: "Sun–Thu", duration: 12, type: "Religious", description: "Festival of Sacrifice combined with institutional summer break" },
  { id: 9, name: "Ashura", date: "26 Jun 2026", day: "Friday", duration: 1, type: "Religious", description: "Observance of the 10th of Muharram" },
  { id: 10, name: "National Mourning Day", date: "15 Aug 2026", day: "Saturday", duration: 1, type: "National", description: "Remembrance of the assassination of Sheikh Mujibur Rahman" },
  { id: 11, name: "Janmashtami", date: "16 Aug 2026", day: "Sunday", duration: 1, type: "Religious", description: "Hindu festival celebrating the birth of Lord Krishna" },
  { id: 12, name: "Eid-e-Milad-un-Nabi", date: "26 Aug 2026", day: "Wednesday", duration: 1, type: "Religious", description: "Commemorating the birth and demise of Prophet Muhammad (SM)" },
  { id: 13, name: "Durga Puja (Bijoya Dashami) Break", date: "18–22 Oct 2026", day: "Sun–Thu", duration: 5, type: "Religious", description: "Hindu festival celebrating the victory of Goddess Durga" },
  { id: 14, name: "Victory Day", date: "16 Dec 2026", day: "Wednesday", duration: 1, type: "National", description: "Bangladesh's victory in the Liberation War of 1971" },
  { id: 15, name: "Winter Vacation & Christmas", date: "20–29 Dec 2026", day: "Sun–Tue", duration: 10, type: "International", description: "Institutional winter break including Christmas Day" },
];

const typeConfig = {
  National: {
    label: "National",
    bg: "bg-brand-primary/5",
    border: "border-brand-primary/20",
    badge: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
    icon: Flag,
    iconBg: "bg-brand-primary",
    gradient: "from-brand-primary to-brand-secondary",
  },
  Religious: {
    label: "Religious",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Moon,
    iconBg: "bg-amber-500",
    gradient: "from-amber-500 to-orange-600",
  },
  International: {
    label: "International",
    bg: "bg-slate-50",
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    icon: Globe,
    iconBg: "bg-slate-500",
    gradient: "from-slate-500 to-slate-600",
  },
};

export default function HolidaysPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'National', label: 'National' },
    { key: 'Religious', label: 'Religious' },
    { key: 'International', label: 'International' },
  ];

  const filtered = activeFilter === 'all' ? holidays : holidays.filter(h => h.type === activeFilter);

  const totalDays = holidays.reduce((sum, h) => sum + h.duration, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-slate-900 via-brand-primary/80 to-brand-secondary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          {/* Stars - Deterministic for purity */}
          {[...Array(20)].map((_, i) => {
            const top = ((i * 137) % 100);
            const left = ((i * 149) % 100);
            return (
              <div key={i} className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                style={{ top: `${top}%`, left: `${left}%` }} />
            );
          })}
        </div>

        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} />
            <Link href="/academic" className="hover:text-white transition-colors">{t('nav.academic')}</Link>
            <ChevronRight size={12} />
            <span className="text-white font-black">{t('nav.holidays')}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20">
                  <Sun className="text-brand-accent" size={24} />
                </div>
                <span className="text-white/60 text-sm font-bold uppercase tracking-widest">Calendar Year 2026</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                Holiday<br /><span className="text-emerald-300">Schedule</span>
              </h1>
              <p className="text-white/60 text-lg max-w-xl leading-relaxed">
                {t('academic.holidays_desc')}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 shrink-0">
              {[
                { label: "Total Holidays", value: holidays.length, color: "text-brand-accent" },
                { label: "National", value: holidays.filter(h => h.type === 'National').length, color: "text-emerald-300" },
                { label: "Total Days Off", value: totalDays, color: "text-brand-accent" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 text-center">
                  <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="section-container py-12">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeFilter === f.key
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                  : 'bg-white text-text-muted border border-ui-border hover:border-brand-primary/30 hover:text-brand-primary'
              }`}
            >
              {f.label}
              {f.key !== 'all' && (
                <span className="ml-2 text-xs opacity-70">
                  ({holidays.filter(h => h.type === f.key).length})
                </span>
              )}
            </button>
          ))}
          <span className="ml-auto flex items-center text-sm text-text-muted font-medium px-4">
            <Calendar size={14} className="mr-2 text-brand-primary" />
            {filtered.length} holiday{filtered.length !== 1 ? 's' : ''} shown
          </span>
        </div>

        {/* Holiday Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {filtered.map((holiday) => {
            const config = typeConfig[holiday.type];
            const Icon = config.icon;
            return (
              <div
                key={holiday.id}
                className={`bg-white rounded-2xl border ${config.border} overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${config.gradient}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 ${config.iconBg} rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main leading-snug group-hover:text-brand-primary transition-colors">{holiday.name}</h3>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">{holiday.description}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${config.badge}`}>
                      {config.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-ui-border">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-text-muted" />
                      <span className="text-sm font-bold text-text-main">{holiday.date}</span>
                    </div>
                    <div className="w-px h-4 bg-ui-border" />
                    <span className="text-xs text-text-muted font-medium">{holiday.day}</span>
                    <div className="ml-auto">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                        holiday.duration > 1 ? 'bg-brand-primary/10 text-brand-primary' : 'bg-slate-100 text-text-muted'
                      }`}>
                        {holiday.duration} {holiday.duration > 1 ? 'days' : 'day'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Sun size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-text-muted font-medium">No holidays in this category</p>
          </div>
        )}

        {/* Type Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(typeConfig).map(([key, cfg]) => {
            const count = holidays.filter(h => h.type === key).length;
            const Icon = cfg.icon;
            return (
              <div key={key} className={`${cfg.bg} border ${cfg.border} rounded-2xl p-5 flex items-center gap-4`}>
                <div className={`w-12 h-12 ${cfg.iconBg} rounded-xl flex items-center justify-center text-white`}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-black text-text-main">{key}</p>
                  <p className="text-sm text-text-muted">{count} holiday{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Note */}
        <div className="bg-white rounded-2xl border border-ui-border p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
            <HelpCircle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-text-main mb-1">{t('academic.important_note')}</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {t('holidays.table_note')}
            </p>
            <Link href="/academic/calendar" className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-brand-primary hover:gap-2 transition-all">
              View Full Academic Calendar <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
