"use client";

import React, { useState } from 'react';
import { Calendar, ChevronRight, Info, BookOpen, Trophy, GraduationCap, Plane, Star, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Link } from '@/i18n/routing';

interface CalendarEvent {
  id: number;
  event: string;
  date: string;
  day: string;
  month: string;
  category: 'exam' | 'holiday' | 'activity' | 'start' | 'vacation';
}

const events: CalendarEvent[] = [
  { id: 1, event: "Classes Start", date: "01 Jan", day: "Thursday", month: "JAN", category: "start" },
  { id: 2, event: "Winter Vacation Ends", date: "10 Jan", day: "Saturday", month: "JAN", category: "vacation" },
  { id: 3, event: "Annual Sports Day", date: "25 Jan", day: "Sunday", month: "JAN", category: "activity" },
  { id: 4, event: "Shab-e-Barat", date: "04 Feb", day: "Wednesday", month: "FEB", category: "holiday" },
  { id: 5, event: "First Midterm Starts", date: "15 Feb", day: "Sunday", month: "FEB", category: "exam" },
  { id: 6, event: "Language Martyrs' Day", date: "21 Feb", day: "Saturday", month: "FEB", category: "holiday" },
  { id: 7, event: "Ramadan & Eid Break Starts", date: "08 Mar", day: "Sunday", month: "MAR", category: "vacation" },
  { id: 8, event: "Sheikh Mujib's Birthday", date: "17 Mar", day: "Tuesday", month: "MAR", category: "holiday" },
  { id: 9, event: "Independence Day", date: "26 Mar", day: "Thursday", month: "MAR", category: "holiday" },
  { id: 10, event: "Science Fair", date: "15 Apr", day: "Wednesday", month: "APR", category: "activity" },
  { id: 11, event: "First Term Final Exam", date: "10 May", day: "Sunday", month: "MAY", category: "exam" },
  { id: 12, event: "Eid-ul-Azha & Summer Break", date: "24 May", day: "Sunday", month: "MAY", category: "vacation" },
  { id: 13, event: "Half-Yearly Exams Start", date: "26 Jun", day: "Friday", month: "JUN", category: "exam" },
  { id: 14, event: "Second Term Begins", date: "20 Jul", day: "Monday", month: "JUL", category: "start" },
  { id: 15, event: "Annual Prize Giving", date: "05 Sep", day: "Saturday", month: "SEP", category: "activity" },
  { id: 16, event: "Durga Puja Break", date: "18 Oct", day: "Sunday", month: "OCT", category: "holiday" },
  { id: 17, event: "Annual Examinations Start", date: "19 Nov", day: "Thursday", month: "NOV", category: "exam" },
  { id: 18, event: "Victory Day", date: "16 Dec", day: "Wednesday", month: "DEC", category: "holiday" },
  { id: 19, event: "Winter Vacation Starts", date: "20 Dec", day: "Sunday", month: "DEC", category: "vacation" },
];

const categoryConfig = {
  exam: { label: "Exam", color: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500", icon: GraduationCap },
  holiday: { label: "Holiday", color: "bg-brand-primary/10 text-brand-primary border-brand-primary/20", dot: "bg-brand-primary", icon: Star },
  activity: { label: "Activity", color: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", icon: Trophy },
  start: { label: "Term Start", color: "bg-teal-100 text-teal-700 border-teal-200", dot: "bg-teal-500", icon: BookOpen },
  vacation: { label: "Vacation", color: "bg-slate-100 text-slate-700 border-slate-200", dot: "bg-slate-500", icon: Plane },
};

const monthColors: Record<string, string> = {
  JAN: "from-brand-primary to-emerald-600",
  FEB: "from-brand-primary to-teal-600",
  MAR: "from-brand-primary to-green-600",
  APR: "from-brand-primary to-emerald-500",
  MAY: "from-brand-primary to-teal-500",
  JUN: "from-brand-primary to-green-500",
  JUL: "from-brand-secondary to-brand-primary",
  AUG: "from-brand-secondary to-emerald-700",
  SEP: "from-brand-secondary to-teal-700",
  OCT: "from-brand-secondary to-green-700",
  NOV: "from-brand-secondary to-emerald-600",
  DEC: "from-brand-secondary to-teal-600",
};

export default function CalendarPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { key: 'all', label: 'All Events' },
    { key: 'exam', label: 'Exams' },
    { key: 'holiday', label: 'Holidays' },
    { key: 'activity', label: 'Activities' },
    { key: 'vacation', label: 'Vacations' },
    { key: 'start', label: 'Term Start' },
  ];

  const filtered = activeFilter === 'all' ? events : events.filter(e => e.category === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-slate-900 via-brand-primary/80 to-brand-secondary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        </div>

        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} />
            <Link href="/academic" className="hover:text-white transition-colors">{t('nav.academic')}</Link>
            <ChevronRight size={12} />
            <span className="text-white font-black">{t('nav.calendar')}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20">
                  <Calendar className="text-white" size={24} />
                </div>
                <span className="text-white/70 text-sm font-bold uppercase tracking-widest">Academic Year 2026</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                Academic<br /><span className="text-emerald-300">Calendar</span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl leading-relaxed">
                {t('academic.calendar_desc')}
              </p>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4 shrink-0">
              {[
                { label: "Total Events", value: events.length },
                { label: "Exam Periods", value: events.filter(e => e.category === 'exam').length },
                { label: "Holidays", value: events.filter(e => e.category === 'holiday').length },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="section-container py-12">
        {/* Notice Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5">
            <Info size={20} />
          </div>
          <div>
            <p className="font-bold text-amber-900 text-sm mb-1">Schedule Notice</p>
            <p className="text-amber-800/70 text-sm leading-relaxed">
              This calendar is subject to change based on government directives. Check the{' '}
              <Link href="/notices" className="font-black underline hover:text-amber-950">Notice Board</Link> for real-time updates.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeFilter === f.key
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                  : 'bg-white text-text-muted border border-ui-border hover:border-brand-primary/40 hover:text-brand-primary'
              }`}
            >
              {f.label}
              {f.key !== 'all' && (
                <span className="ml-2 text-xs opacity-70">
                  ({events.filter(e => e.category === f.key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Events Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/30 via-brand-primary/10 to-transparent hidden md:block" />

          <div className="space-y-4">
            {filtered.map((event, idx) => {
              const config = categoryConfig[event.category];
              const Icon = config.icon;
              const prevMonth = idx > 0 ? filtered[idx - 1].month : null;
              const showMonthDivider = prevMonth !== event.month;

              return (
                <div key={event.id}>
                  {showMonthDivider && (
                    <div className="flex items-center gap-4 mb-6 mt-8 first:mt-0">
                      <div className={`hidden md:flex w-[88px] shrink-0 items-center justify-center`} />
                      <div className={`h-px flex-grow bg-gradient-to-r ${monthColors[event.month] || 'from-brand-primary to-emerald-500'} opacity-20`} />
                      <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r ${monthColors[event.month] || 'from-brand-primary to-emerald-500'} text-white shrink-0`}>
                        {event.month} 2026
                      </span>
                      <div className={`h-px flex-grow bg-gradient-to-l ${monthColors[event.month] || 'from-brand-primary to-emerald-500'} opacity-20`} />
                    </div>
                  )}

                  <div className="flex items-center gap-4 md:gap-6 group">
                    {/* Month badge */}
                    <div className={`hidden md:flex w-20 h-16 rounded-2xl bg-gradient-to-br ${monthColors[event.month] || 'from-brand-primary to-emerald-500'} flex-col items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{event.month}</span>
                      <span className="text-xl font-black leading-tight">{event.date.split(' ')[0]}</span>
                    </div>

                    {/* Timeline dot */}
                    <div className={`hidden md:flex w-3 h-3 rounded-full ${config.dot} shrink-0 ring-4 ring-white shadow-sm z-10`} />

                    {/* Card */}
                    <div className="flex-grow bg-white rounded-2xl border border-ui-border p-5 flex items-center justify-between gap-4 hover:shadow-md hover:border-brand-primary/20 transition-all group-hover:-translate-y-0.5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${config.color}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-text-main group-hover:text-brand-primary transition-colors">{event.event}</p>
                          <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1.5">
                            <Clock size={11} />
                            {event.date}, 2026 — {event.day}
                          </p>
                        </div>
                      </div>
                      <span className={`shrink-0 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Calendar size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-text-muted font-medium">No events in this category</p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-16 bg-white rounded-2xl border border-ui-border p-8">
          <h3 className="text-sm font-black text-text-muted uppercase tracking-widest mb-6">Legend</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(categoryConfig).map(([key, cfg]) => {
              const Icon = cfg.icon;
              return (
                <div key={key} className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${cfg.color}`}>
                  <Icon size={14} />
                  <span className="text-xs font-bold">{cfg.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/academic/holidays" className="flex items-center justify-between p-5 bg-white rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:shadow-md transition-all group">
            <span className="font-bold text-text-main group-hover:text-brand-primary transition-colors">Holiday List</span>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
          </Link>
          <Link href="/academic/events" className="flex items-center justify-between p-5 bg-white rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:shadow-md transition-all group">
            <span className="font-bold text-text-main group-hover:text-brand-primary transition-colors">Events & Activities</span>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
          </Link>
          <Link href="/notices" className="flex items-center justify-between p-5 bg-white rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:shadow-md transition-all group">
            <span className="font-bold text-text-main group-hover:text-brand-primary transition-colors">Latest Notices</span>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
