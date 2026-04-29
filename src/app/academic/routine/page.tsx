import React from 'react';
import { Download, FileText, Calendar, ChevronRight, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Routine {
  id: number;
  className: string;
  version: string;
  shift: string;
  lastUpdated: string;
  fileSize: string;
}

const routines: Routine[] = [
  { id: 1, className: "Class 6", version: "Bangla", shift: "Morning", lastUpdated: "10 Jan 2026", fileSize: "1.2 MB" },
  { id: 2, className: "Class 7", version: "Bangla", shift: "Morning", lastUpdated: "10 Jan 2026", fileSize: "1.1 MB" },
  { id: 3, className: "Class 8", version: "Bangla", shift: "Day", lastUpdated: "12 Jan 2026", fileSize: "1.3 MB" },
  { id: 4, className: "Class 9", version: "Bangla", shift: "Day", lastUpdated: "15 Jan 2026", fileSize: "1.5 MB" },
  { id: 5, className: "Class 10", version: "Bangla", shift: "Day", lastUpdated: "15 Jan 2026", fileSize: "1.4 MB" },
  { id: 6, className: "Class 11", version: "English", shift: "Morning", lastUpdated: "01 Feb 2026", fileSize: "1.8 MB" },
  { id: 7, className: "Class 12", version: "English", shift: "Morning", lastUpdated: "01 Feb 2026", fileSize: "1.9 MB" },
];

function RoutineRow({ routine }: { routine: Routine }) {
  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-ui-border rounded-2xl hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-300 gap-6">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
          <FileText size={28} />
        </div>
        <div>
          <h3 className="text-lg font-black text-text-main mb-1 group-hover:text-brand-primary transition-colors">{routine.className}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-text-muted uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-brand-primary" /> {routine.version} Medium</span>
            <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-primary" /> {routine.shift} Shift</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0">
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Last Updated</p>
          <p className="text-sm font-bold text-text-main">{routine.lastUpdated}</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-black rounded-xl shadow-md shadow-brand-primary/20 transition-all focus-ring active:scale-95 group/btn">
          <Download size={16} />
          <span>DOWNLOAD <span className="text-white/60 ml-1 font-normal">({routine.fileSize})</span></span>
        </button>
      </div>
    </div>
  );
}

export default function RoutinePage() {
  return (
    <div className="pb-24">
      {/* Page Header */}
      <header className="bg-brand-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight size={12} />
            <span>Academic</span>
            <ChevronRight size={12} />
            <span>Class Routine</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Academic Routines</h1>
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
            Stay organized with our latest class schedules and shift information.
          </p>
        </div>
      </header>

      <div className="section-container mt-16">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
            <Calendar size={32} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-blue-900 mb-2 uppercase tracking-tight">Academic Year 2026</h2>
            <p className="text-blue-800/70 text-sm leading-relaxed max-w-2xl">
              These routines are applicable for the first semester of the 2026 academic session. For special holiday schedules or examination routines, please keep an eye on our <a href="/" className="font-black underline hover:text-blue-950 transition-colors">Notice Board</a>.
            </p>
          </div>
        </div>

        {/* Routines List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-text-muted uppercase tracking-[0.2em]">Available Documents</h3>
            <div className="h-px bg-ui-border flex-grow mx-6"></div>
          </div>
          
          {routines.map((routine) => (
            <RoutineRow key={routine.id} routine={routine} />
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-20 text-center bg-ui-surface border border-ui-border rounded-3xl p-12">
          <h3 className="text-2xl font-black text-text-main mb-4 uppercase tracking-tight">Can't find your routine?</h3>
          <p className="text-text-muted mb-8 max-w-md mx-auto">If your class or specific shift routine is missing, please contact the administrative office or check back later.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-text-main text-white font-bold rounded-xl hover:bg-black transition-all focus-ring">Contact Office</button>
            <button className="px-8 py-3 bg-white text-text-main border border-ui-border font-bold rounded-xl hover:border-text-main transition-all focus-ring">Request Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}
