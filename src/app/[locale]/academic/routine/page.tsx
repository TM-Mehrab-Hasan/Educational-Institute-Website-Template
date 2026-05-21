"use client";

import React, { useState } from 'react';
import { Download, FileText, Calendar, ChevronRight, Clock, MapPin, Eye, X, Printer } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { academicData, generateRoutine, getSubjects } from '@/data/academic';
import { pdf } from '@react-pdf/renderer';
import { RoutinePDF } from '@/lib/pdf/RoutinePDF';

// ── Types ────────────────────────────────────────────────────────────────────

interface Period {
  time: string;
  subjectId: string;
  teacher?: string;
}

interface DayRoutine {
  day: string;
  periods: Period[];
}

interface RoutineData {
  id: number;
  className: string;
  classNum: number;
  version: 'Bangla' | 'English';
  background?: 'Science' | 'Commerce' | 'Arts';
  shift: 'Morning' | 'Day';
  lastUpdated: string;
  schedule: DayRoutine[];
}

// ── Build routine list ───────────────────────────────────────────────────────

const routines: RoutineData[] = [];

academicData.forEach(data => {
  const versions: ('Bangla' | 'English')[] = ['Bangla', 'English'];
  versions.forEach(version => {
    if (data.subjectsByBackground) {
      (['Science', 'Commerce', 'Arts'] as const).forEach(bg => {
        routines.push({
          id: routines.length + 1,
          className: data.className,
          classNum: data.classNum,
          version,
          background: bg,
          shift: data.classNum <= 5 ? 'Morning' : 'Day',
          lastUpdated: '10 Jan 2026',
          schedule: generateRoutine(data.classNum, bg),
        });
      });
    } else {
      routines.push({
        id: routines.length + 1,
        className: data.className,
        classNum: data.classNum,
        version,
        shift: data.classNum <= 5 ? 'Morning' : 'Day',
        lastUpdated: '10 Jan 2026',
        schedule: generateRoutine(data.classNum),
      });
    }
  });
});

async function openRoutinePDF(routine: RoutineData) {
  const subjects = getSubjects(routine.classNum, routine.background);
  const logoUrl  = `${window.location.origin}/images/logo.png`;

  const blob = await pdf(
    <RoutinePDF
      className={routine.className}
      background={routine.background}
      shift={routine.shift}
      version={routine.version}
      lastUpdated={routine.lastUpdated}
      schedule={routine.schedule}
      subjects={subjects}
      schoolName="Demo Model School & College"
      logoUrl={logoUrl}
    />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

// ── Routine Modal ────────────────────────────────────────────────────────────

function RoutineModal({ routine, onClose }: { routine: RoutineData; onClose: () => void }) {
  const subjects = getSubjects(routine.classNum, routine.background);

  const firstDayPeriods = routine.schedule[0]?.periods ?? [];
  let periodCounter = 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-6xl max-h-[95vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <header className="p-8 bg-white border-b-2 border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl shrink-0">
              <Image src="/images/logo.png" alt="School Logo" width={56} height={56} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Class Routine 2026</h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{routine.className}</span>
                {routine.background && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full">{routine.background}</span>
                )}
                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">{routine.version} Version</span>
                <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full">{routine.shift} Shift</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => openRoutinePDF(routine)} title="Download PDF" className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-900 border border-slate-100">
              <Printer size={22} />
            </button>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-900 border border-slate-100">
              <X size={22} />
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-grow overflow-auto p-8 bg-slate-50/50">
          <div ref={undefined}>

            {/* Screen institution header */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-6">
              <div className="p-8 text-center border-b border-slate-50">
                <h3 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-widest">Demo Model School & College</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Academic Session 2026-2027</p>
              </div>

              {/* Timetable */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#E8F5EE]">
                      <th className="p-5 border border-[#C8E6D4] text-left text-[10px] font-black text-[#008236] uppercase tracking-widest w-36">Day</th>
                      {firstDayPeriods.map((p, i) => {
                        const isBreak = p.subjectId === 'break';
                        if (!isBreak) periodCounter++;
                        const label = isBreak ? 'Break' : `Period ${periodCounter}`;
                        return (
                          <th key={i} className="p-4 border border-[#C8E6D4] text-center min-w-[140px]">
                            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isBreak ? 'text-amber-500' : 'text-[#008236]'}`}>{label}</p>
                            <p className="text-[10px] font-semibold text-slate-600">{p.time}</p>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {routine.schedule.map(day => (
                      <tr key={day.day}>
                        <td className="p-5 border border-slate-100 font-black text-slate-900 uppercase text-xs tracking-widest bg-slate-50/40">{day.day}</td>
                        {day.periods.map((p, i) => {
                          const isBreak = p.subjectId === 'break';
                          const subject = isBreak ? null : subjects.find(s => s.id === p.subjectId);
                          return (
                          <td key={i} className={`p-4 border border-slate-100 text-center align-top ${isBreak ? 'bg-amber-50/60 break' : 'hover:bg-brand-primary/5'}`}>
                              <p className={`text-xs font-bold leading-tight ${isBreak ? 'text-amber-600 italic font-black' : 'text-slate-900'}`}>
                                {isBreak ? 'Tiffin Break' : (subject?.name ?? p.subjectId)}
                              </p>
                              {!isBreak && p.teacher && (
                                <p className="text-[10px] text-slate-400 mt-1 font-medium">{p.teacher}</p>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subject legend */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Subject List ({subjects.length} subjects)</p>
              <div className="flex flex-wrap gap-2">
                {subjects.map(s => (
                  <span key={s.id} className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    s.type === 'Compulsory' ? 'bg-brand-primary/5 text-brand-primary border-brand-primary/10' :
                    s.type === 'Elective'   ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                              'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {s.name} <span className="opacity-50">({s.type[0]})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Signature area */}
            <div className="signatures bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-end p-8">
                {['Class Teacher', 'Head of Academic'].map(role => (
                  <div key={role} className="text-center">
                    <div className="w-40 h-px bg-slate-200 mb-3 mx-auto" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{role}</p>
                  </div>
                ))}
                <div className="text-center">
                  <div className="mb-2 relative flex items-center justify-center">
                    {/* CSS Seal for Web */}
                    <div className="w-20 h-20 rounded-full border-2 border-brand-primary border-dashed p-1 flex items-center justify-center bg-brand-primary/5">
                      <div className="w-full h-full rounded-full border border-brand-primary border-double flex items-center justify-center relative overflow-hidden">
                        <img 
                          src="/images/logo.png" 
                          alt="Seal Logo" 
                          className="w-10 h-10 object-contain opacity-80"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <span className="text-[5px] font-black text-brand-primary/40 uppercase tracking-tighter -rotate-12">Official Seal</span>
                        </div>
                      </div>
                    </div>
                    <img 
                      src="/images/principal's%20signature.png" 
                      alt="Principal's Signature" 
                      className="h-8 w-auto absolute -top-4 object-contain"
                    />
                  </div>
                  <div className="w-40 h-px bg-slate-200 mb-3 mx-auto" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Principal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-slate-400" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Updated: <span className="text-slate-900 ml-1">{routine.lastUpdated}</span></p>
          </div>
          <button
            onClick={() => openRoutinePDF(routine)}
            className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-brand-primary transition-all active:scale-95"
          >
            <Printer size={16} />
            Download PDF
          </button>
        </footer>
      </div>
    </div>
  );
}

// ── Routine Card ─────────────────────────────────────────────────────────────

function RoutineCard({ routine, onOpen }: { routine: RoutineData; onOpen: (r: RoutineData) => void }) {
  const subjects = getSubjects(routine.classNum, routine.background);
  return (
    <div
      onClick={() => onOpen(routine)}
      className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-ui-border rounded-2xl hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-300 gap-4 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors relative shrink-0">
          <FileText size={24} />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">PDF</span>
        </div>
        <div>
          <h3 className="text-base font-black text-text-main mb-0.5 group-hover:text-brand-primary transition-colors">{routine.className}</h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold text-text-muted uppercase tracking-widest">
            <span className="flex items-center gap-1"><MapPin size={10} className="text-brand-primary" /> {routine.version} Medium</span>
            {routine.background && <span>· {routine.background}</span>}
            <span className="flex items-center gap-1"><Clock size={10} className="text-brand-primary" /> {routine.shift} Shift</span>
            <span className="text-slate-300">· {subjects.length} subjects</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:shrink-0">
        <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-slate-100 hover:border-brand-primary hover:text-brand-primary text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm">
          <Eye size={16} />
          VIEW
        </button>
        <button
          onClick={e => { e.stopPropagation(); openRoutinePDF(routine); }}
          className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95"
        >
          <Download size={16} />
          DOWNLOAD
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RoutinePage() {
  const { t } = useLanguage();
  const [selectedRoutine, setSelectedRoutine] = useState<RoutineData | null>(null);
  const [activeLevel, setActiveLevel] = useState('All');
  const [activeVersion, setActiveVersion] = useState<'Bangla' | 'English'>('Bangla');

  const levels = [
    { id: 'All',     label: 'All Levels' },
    { id: 'Primary', label: 'Primary (1–5)' },
    { id: 'Junior',  label: 'Junior (6–8)' },
    { id: 'SSC',     label: 'SSC (9–10)' },
    { id: 'HSC',     label: 'HSC (11–12)' },
  ];

  const getLevel = (num: number) => {
    if (num <= 5)  return 'Primary';
    if (num <= 8)  return 'Junior';
    if (num <= 10) return 'SSC';
    return 'HSC';
  };

  const filtered = routines.filter(r =>
    (activeLevel === 'All' || getLevel(r.classNum) === activeLevel) &&
    r.version === activeVersion
  );

  const grouped = filtered.reduce((acc, r) => {
    if (!acc[r.className]) acc[r.className] = [];
    acc[r.className].push(r);
    return acc;
  }, {} as Record<string, RoutineData[]>);

  const classOrder = Object.keys(grouped).sort((a, b) =>
    parseInt(a.replace(/\D/g, '')) - parseInt(b.replace(/\D/g, ''))
  );

  return (
    <div className="pb-24 min-h-screen bg-slate-50">
      <header className="bg-brand-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern-cubes" />
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} />
            <Link href="/academic" className="hover:text-white transition-colors">{t('nav.academic')}</Link>
            <ChevronRight size={12} />
            <span className="text-white">{t('nav.routine')}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none">
            Class <span className="text-white/40">Routine</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl font-medium">{t('routine.hero_desc')}</p>
        </div>
      </header>

      <div className="section-container -mt-10 relative z-20">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-ui-border flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            {levels.map(level => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeLevel === level.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 shrink-0">
            {(['Bangla', 'English'] as const).map(v => (
              <button
                key={v}
                onClick={() => setActiveVersion(v)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeVersion === v ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {v} Version
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Routines */}
        <div className="space-y-12">
          {classOrder.length > 0 ? classOrder.map(className => (
            <div key={className} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-7 w-1.5 bg-brand-primary rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{className}</h2>
                <div className="h-px bg-slate-100 flex-grow" />
              </div>
              <div className="grid grid-cols-1 gap-3">
                {grouped[className].map(item => (
                  <RoutineCard key={item.id} routine={item} onOpen={setSelectedRoutine} />
                ))}
              </div>
            </div>
          )) : (
            <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
              <Calendar size={40} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No routines found</h3>
              <p className="text-slate-400 mt-2">Try changing your filters.</p>
            </div>
          )}
        </div>

        <div className="mt-20 text-center bg-slate-900 rounded-[3rem] p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-pattern-cubes" />
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">{t('routine.support_title')}</h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto font-medium">{t('routine.support_text')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-10 py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all">{t('routine.contact_office')}</Link>
              <Link href="/contact" className="px-10 py-4 bg-white/10 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all">{t('routine.request_support')}</Link>
            </div>
          </div>
        </div>
      </div>

      {selectedRoutine && (
        <RoutineModal routine={selectedRoutine} onClose={() => setSelectedRoutine(null)} />
      )}
    </div>
  );
}
