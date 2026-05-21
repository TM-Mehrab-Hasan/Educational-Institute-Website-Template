"use client";

import React, { useState } from 'react';
import { Download, BookOpen, ChevronRight, Eye, X, FileText, Printer } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { academicData, getSubjects, Subject as AcademicSubject } from '@/data/academic';
import { pdf } from '@react-pdf/renderer';
import { CurriculumPDF } from '@/lib/pdf/CurriculumPDF';

// ── Types ────────────────────────────────────────────────────────────────────

interface CurriculumData {
  id: number;
  className: string;
  classNum: number;
  version: 'Bangla' | 'English';
  background?: 'Science' | 'Commerce' | 'Arts';
  lastUpdated: string;
  subjects: AcademicSubject[];
}

// ── Build curriculum list ────────────────────────────────────────────────────

const curricula: CurriculumData[] = [];

academicData.forEach(data => {
  const versions: ('Bangla' | 'English')[] = ['Bangla', 'English'];
  versions.forEach(version => {
    if (data.subjectsByBackground) {
      (['Science', 'Commerce', 'Arts'] as const).forEach(bg => {
        curricula.push({
          id: curricula.length + 1,
          className: data.className,
          classNum: data.classNum,
          version,
          background: bg,
          lastUpdated: '15 Jan 2026',
          subjects: getSubjects(data.classNum, bg),
        });
      });
    } else {
      curricula.push({
        id: curricula.length + 1,
        className: data.className,
        classNum: data.classNum,
        version,
        lastUpdated: '15 Jan 2026',
        subjects: getSubjects(data.classNum),
      });
    }
  });
});

async function openCurriculumPDF(item: CurriculumData) {
  const logoUrl = `${window.location.origin}/images/logo.png`;

  const blob = await pdf(
    <CurriculumPDF
      className={item.className}
      background={item.background}
      version={item.version}
      lastUpdated={item.lastUpdated}
      subjects={item.subjects}
      schoolName="Demo Model School & College"
      logoUrl={logoUrl}
    />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

// ── Sub-Components ────────────────────────────────────────────────────────────

const SubjectTable = ({ subjects, label, badgeClass }: { subjects: AcademicSubject[]; label: string; badgeClass: string }) => {
  if (subjects.length === 0) return null;
  return (
    <div className="mb-6">
      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">{label}</h4>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-5 py-3 border border-slate-100 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest w-8">#</th>
              <th className="px-5 py-3 border border-slate-100 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
              <th className="px-5 py-3 border border-slate-100 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Bengali Name</th>
              <th className="px-5 py-3 border border-slate-100 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Marks</th>
              <th className="px-5 py-3 border border-slate-100 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest w-28">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subjects.map((sub, i) => (
              <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-4 border border-slate-100 text-xs font-bold text-slate-400">{i + 1}</td>
                <td className="px-5 py-4 border border-slate-100 font-bold text-slate-900 text-sm">{sub.name}</td>
                <td className="px-5 py-4 border border-slate-100 text-slate-500 text-sm">{sub.bengaliName ?? '—'}</td>
                <td className="px-5 py-4 border border-slate-100 text-center font-black text-brand-primary">{sub.marks}</td>
                <td className="px-5 py-4 border border-slate-100 text-center">
                  <span className={`badge text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${badgeClass}`}>{sub.type}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Curriculum Modal ─────────────────────────────────────────────────────────

function CurriculumModal({ data, onClose }: { data: CurriculumData; onClose: () => void }) {
  const compulsory = data.subjects.filter(s => s.type === 'Compulsory');
  const elective   = data.subjects.filter(s => s.type === 'Elective');
  const optional   = data.subjects.filter(s => s.type === 'Optional');
  const totalMarks = data.subjects.reduce((sum, s) => sum + s.marks, 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-4xl max-h-[92vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <header className="p-8 bg-white border-b-2 border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl shrink-0">
              <Image src="/images/logo.png" alt="School Logo" width={56} height={56} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Academic Curriculum</h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full">{data.className}</span>
                {data.background && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full">{data.background}</span>
                )}
                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">{data.version} Version</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">Session 2026</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => openCurriculumPDF(data)} title="Download PDF" className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-900 border border-slate-100">
              <Printer size={22} />
            </button>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-900 border border-slate-100">
              <X size={22} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-grow overflow-auto p-8 bg-slate-50/50">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Subject List & Marks Distribution</h3>
              <span className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">
                Total: {totalMarks} Marks
              </span>
            </div>

            <SubjectTable
              subjects={compulsory}
              label={`Compulsory Subjects (${compulsory.length})`}
              badgeClass="bg-brand-primary/5 text-brand-primary border-brand-primary/10 c"
            />
            <SubjectTable
              subjects={elective}
              label={`Elective Subjects (${elective.length})`}
              badgeClass="bg-emerald-50 text-emerald-600 border-emerald-100 e"
            />
            <SubjectTable
              subjects={optional}
              label={`Optional / 4th Subject (${optional.length}) — Choose one`}
              badgeClass="bg-amber-50 text-amber-600 border-amber-100 o"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">NCTB Official Curriculum</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Follows the latest National Curriculum and Textbook Board standards for session 2026.</p>
              </div>
            </div>
            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-amber-900 uppercase tracking-tight mb-1">Lesson Plans Included</h4>
                <p className="text-xs text-amber-700 leading-relaxed">Weekly targets, lesson plans, and suggested readings are in the full printed copy available at the office.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Updated: <span className="text-slate-900">{data.lastUpdated}</span>
          </p>
          <button
            onClick={() => openCurriculumPDF(data)}
            className="flex items-center gap-2 px-8 py-3.5 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20 hover:bg-brand-secondary transition-all active:scale-95"
          >
            <Printer size={16} />
            Download PDF
          </button>
        </footer>
      </div>
    </div>
  );
}

// ── Curriculum Card ───────────────────────────────────────────────────────────

function CurriculumCard({ item, onOpen }: { item: CurriculumData; onOpen: (s: CurriculumData) => void }) {
  return (
    <div
      onClick={() => onOpen(item)}
      className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-ui-border rounded-3xl hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 gap-4 cursor-pointer"
    >
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all relative overflow-hidden shrink-0">
          <BookOpen size={28} />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform" />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900 mb-0.5 group-hover:text-brand-primary transition-colors">{item.className}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.version} Version</span>
            {item.background && (
              <>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{item.background}</span>
              </>
            )}
            <span className="w-1 h-1 bg-slate-200 rounded-full" />
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{item.subjects.length} Subjects</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session 2026</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:shrink-0">
        <div className="hidden sm:block text-right">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Updated</p>
          <p className="text-sm font-bold text-slate-900">{item.lastUpdated}</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-slate-100 hover:border-brand-primary hover:text-brand-primary text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm">
          <Eye size={16} />
          VIEW
        </button>
        <button
          onClick={e => { e.stopPropagation(); openCurriculumPDF(item); }}
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

export default function CurriculumPage() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<CurriculumData | null>(null);
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

  const filtered = curricula.filter(item =>
    (activeLevel === 'All' || getLevel(item.classNum) === activeLevel) &&
    item.version === activeVersion
  );

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.className]) acc[item.className] = [];
    acc[item.className].push(item);
    return acc;
  }, {} as Record<string, CurriculumData[]>);

  const classOrder = Object.keys(grouped).sort((a, b) =>
    parseInt(a.replace(/\D/g, '')) - parseInt(b.replace(/\D/g, ''))
  );

  return (
    <div className="pb-24 min-h-screen bg-slate-50">
      <header className="bg-brand-primary py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern-cubes" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl" />
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={14} className="text-white/30" />
            <Link href="/academic" className="hover:text-white transition-colors">{t('nav.academic')}</Link>
            <ChevronRight size={14} className="text-white/30" />
            <span className="text-white bg-white/10 px-3 py-1 rounded-full">{t('nav.syllabus')}</span>
          </nav>
          <h1 className="text-6xl md:text-8xl font-black tracking-tightest mb-6 leading-none">
            Class <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">Curriculum</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl font-medium leading-relaxed border-l-4 border-white/20 pl-8">
            {t('academic.syllabus_desc')}
          </p>
        </div>
      </header>

      <div className="section-container -mt-12 relative z-20">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-ui-border flex flex-col md:flex-row items-center justify-between gap-4 mb-14">
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

        {/* Grouped Content */}
        <div className="space-y-12">
          {classOrder.length > 0 ? classOrder.map(className => (
            <div key={className} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-7 w-1.5 bg-brand-primary rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{className}</h2>
                <div className="h-px bg-slate-100 flex-grow" />
              </div>
              <div className="grid grid-cols-1 gap-3">
                {grouped[className].map(item => (
                  <CurriculumCard key={item.id} item={item} onOpen={setSelected} />
                ))}
              </div>
            </div>
          )) : (
            <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
              <BookOpen size={40} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No curriculum found</h3>
              <p className="text-slate-400 mt-2">Try changing your filters.</p>
            </div>
          )}
        </div>

        <div className="mt-24 p-16 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-pattern-cubes" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h3 className="text-4xl font-black mb-3 tracking-tight">Need a Physical Copy?</h3>
              <p className="text-white/60 text-lg max-w-md font-medium leading-relaxed">Printed curriculum books are available at the administrative office.</p>
            </div>
            <Link href="/contact" className="group flex items-center gap-3 px-10 py-5 bg-brand-primary text-white font-black text-sm uppercase tracking-widest rounded-[2rem] shadow-2xl shadow-brand-primary/30 hover:bg-white hover:text-brand-primary transition-all duration-300">
              Contact Admin Office
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {selected && <CurriculumModal data={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
