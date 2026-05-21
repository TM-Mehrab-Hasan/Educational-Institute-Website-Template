"use client";

import React, { useState } from 'react';
import { GraduationCap, Award, BarChart, Download, BookOpen, TrendingUp, Trophy, Calendar, Loader } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import MarksheetPDF from '@/lib/pdf/MarksheetPDF';
import { AcademicRecord, CurrentClassResult, Student } from '@/lib/student-types';
import { cn } from '@/lib/utils';

interface AcademicHistoryProps {
  records: AcademicRecord[];
  currentClass: string;
  currentResults: CurrentClassResult[];
  student?: Student;
}

type Tab = 'current' | 'history';

const gradeColor = (grade: string) => {
  if (grade === 'A+') return 'bg-green-100 text-green-700';
  if (grade === 'A')  return 'bg-blue-100 text-blue-700';
  if (grade === 'A-') return 'bg-cyan-100 text-cyan-700';
  if (grade === 'B+') return 'bg-yellow-100 text-yellow-700';
  if (grade === 'B')  return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
};

export default function AcademicHistory({ records: initialRecords, currentClass, currentResults: initialCurrentResults, student }: AcademicHistoryProps) {
  const records = initialRecords || [];
  const currentResults = initialCurrentResults || [];
  const [tab, setTab]                     = useState<Tab>('current');
  const [selectedRecord, setSelectedRecord] = useState<AcademicRecord | null>(records[0] ?? null);
  const [selectedExam, setSelectedExam]     = useState<CurrentClassResult | null>(
    currentResults.find(r => r.published) ?? null
  );
  const [pdfLoading, setPdfLoading]         = useState(false);

  const openMarksheetPDF = async (rec: AcademicRecord) => {
    setPdfLoading(true);
    try {
      const logoUrl = `${window.location.origin}/images/logo.png`;
      
      // Calculate GPA as average of subject GPs
      const averageGPA = rec.results.length > 0 
        ? rec.results.reduce((sum, r) => sum + r.gp, 0) / rec.results.length
        : 0;
      
      // Use the obtained marks from record, calculate total based on results structure
      // Standard Bangladesh exam structure: 6 subjects at 100 + ICT at 50 = 650 total
      let totalMarksPossible = 0;
      if (rec.results.length === 7) {
        totalMarksPossible = 650;  // 6×100 + 1×50
      } else if (rec.results.length === 6) {
        totalMarksPossible = 600;  // 6×100
      } else if (rec.results.length === 4) {
        totalMarksPossible = 400;  // 4×100
      } else {
        totalMarksPossible = rec.results.length * 100;  // Default
      }
      const obtainedMarkTotal = rec.results.reduce((s, r) => s + r.marks, 0);
      
      // Get attendance percentage from student data
      const attendancePercentage = student?.attendance ?? rec.attendancePercent;
      
      const blob = await pdf(
        <MarksheetPDF data={{
          studentName:       student?.name      ?? 'Student',
          studentID:         student?.studentID ?? 'N/A',
          roll:              rec.roll,
          className:         rec.class,
          examName:          `Final Examination ${rec.year}`,
          examYear:          String(rec.year),
          group:             rec.group,
          position:          rec.position,
          totalStudents:     rec.totalStudents,
          gpa:               averageGPA,
          obtainedMarks:     obtainedMarkTotal,
          totalMarks:        totalMarksPossible,
          attendancePercent: attendancePercentage,
          results:           rec.results,
          schoolName:        'Demo Model School & College',
          logoUrl,
        }} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } finally {
      setPdfLoading(false);
    }
  };

  const publishedResults = currentResults.filter(r => r.published);
  const unpublishedResults = currentResults.filter(r => !r.published);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Tab Switcher */}
      <div className="flex gap-2 bg-ui-bg rounded-2xl p-1.5 border border-ui-border w-fit">
        {([['current', 'Current Class'], ['history', 'Past Records']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              tab === key
                ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                : "text-text-muted hover:text-text-main"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ─── CURRENT CLASS TAB ─────────────────────────────────────────── */}
      {tab === 'current' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Exam selector */}
            <div className="md:w-64 shrink-0 space-y-4">
              <h3 className="text-base font-black text-text-main uppercase tracking-tight">{currentClass} – Exams</h3>

              {publishedResults.length === 0 && unpublishedResults.length === 0 && (
                <div className="p-6 bg-white rounded-2xl border border-ui-border text-center">
                  <BookOpen size={32} className="text-slate-200 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-400">No results yet for this session.</p>
                </div>
              )}

              {publishedResults.map(exam => (
                <button
                  key={exam.examName}
                  onClick={() => setSelectedExam(exam)}
                  className={cn(
                    "w-full p-4 rounded-2xl border text-left transition-all",
                    selectedExam?.examName === exam.examName
                      ? "bg-white border-brand-primary shadow-lg ring-1 ring-brand-primary/20"
                      : "bg-white border-ui-border hover:border-brand-primary/40"
                  )}
                >
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest",
                    selectedExam?.examName === exam.examName ? "text-brand-primary" : "text-slate-400"
                  )}>
                    {exam.examType} · {new Date(exam.date).toLocaleDateString()}
                  </span>
                  <p className="text-sm font-black text-text-main mt-1 leading-tight">{exam.examName}</p>
                  {exam.position && (
                    <p className="text-[10px] font-bold text-slate-500 mt-2 flex items-center gap-1">
                      <Trophy size={10} className="text-brand-primary" /> Rank #{exam.position} in class
                    </p>
                  )}
                </button>
              ))}

              {unpublishedResults.map(exam => (
                <div key={exam.examName} className="w-full p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-left opacity-60">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{exam.examType}</span>
                  <p className="text-sm font-black text-slate-400 mt-1">{exam.examName}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">Result not yet published</p>
                </div>
              ))}
            </div>

            {/* Exam detail */}
            <div className="flex-grow">
              {selectedExam ? (
                <div className="space-y-6">
                  {/* Summary banner */}
                  <div className="bg-brand-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-brand-primary/20">
                    <div className="absolute -right-8 -bottom-8 opacity-10"><Award size={160} /></div>
                    <div className="flex flex-wrap items-start justify-between gap-6 relative z-10">
                      <div>
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{selectedExam.examType}</p>
                        <h3 className="text-2xl font-black tracking-tight">{selectedExam.examName}</h3>
                        <p className="text-white/70 text-sm mt-1">{currentClass} · {new Date(selectedExam.date).toLocaleDateString('en-BD', {day:'numeric',month:'long',year:'numeric'})}</p>
                      </div>
                      <div className="flex gap-4">
                        {(() => {
                          const calcTotalPossible = selectedExam.results.length === 7 ? 650 : selectedExam.results.length * 100;
                          return (
                            <>
                              <div className="bg-white/10 rounded-2xl px-5 py-3 text-center">
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Score</p>
                                <p className="text-2xl font-black">{selectedExam.obtainedMarks}/{calcTotalPossible}</p>
                              </div>
                              <div className="bg-white/10 rounded-2xl px-5 py-3 text-center">
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Pct.</p>
                                <p className="text-2xl font-black">{Math.round((selectedExam.obtainedMarks / calcTotalPossible) * 100)}%</p>
                              </div>
                            </>
                          );
                        })()}
                        {selectedExam.position && (
                          <div className="bg-white/10 rounded-2xl px-5 py-3 text-center">
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Rank</p>
                            <p className="text-2xl font-black">#{selectedExam.position}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subject table */}
                  <div className="bg-white rounded-3xl shadow-xl border border-ui-border overflow-hidden">
                    <div className="px-8 py-5 border-b border-ui-border flex items-center justify-between bg-ui-bg/30">
                      <h4 className="text-sm font-black text-text-main uppercase tracking-widest">Subject-wise Marks</h4>
                      <button
                        onClick={() => {
                          if (selectedExam) {
                            // Calculate GPA as average of subject GPs
                            const averageGPA = selectedExam.results.length > 0
                              ? selectedExam.results.reduce((sum, r) => sum + r.gp, 0) / selectedExam.results.length
                              : 0;
                            
                            // Calculate total marks (assuming 100 per subject, except ICT which is 50 if 7th subject)
                            let totalMarksPossible = selectedExam.results.length * 100;
                            if (selectedExam.results.length === 7) {
                              totalMarksPossible = 650; // Standard: 6 subjects * 100 + 1 (ICT) * 50
                            }
                            
                            // Get attendance from student data
                            const attendancePercentage = student?.attendance ?? 0;
                            
                            // Create a temporary record object for PDF generation
                            const tempRecord: AcademicRecord = {
                              class: currentClass,
                              year: new Date().getFullYear(),
                              roll: student?.currentRoll ?? '0',
                              gpa: averageGPA,
                              position: selectedExam.position ?? 0,
                              totalStudents: 0,
                              results: selectedExam.results,
                              attendancePercent: attendancePercentage,
                              group: student?.group ?? ''
                            };
                            openMarksheetPDF(tempRecord);
                          }
                        }}
                        disabled={pdfLoading || !selectedExam}
                        className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline disabled:opacity-50"
                      >
                        {pdfLoading ? <Loader size={14} className="animate-spin" /> : <Download size={14} />}
                        {pdfLoading ? 'Preparing...' : 'Download'}
                      </button>
                    </div>
                    <div className="overflow-x-auto scrollbar-hide">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-ui-border bg-slate-50/50">
                            <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                            <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Marks</th>
                            <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Grade</th>
                            <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">GP</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-ui-border">
                          {selectedExam.results.map(res => (
                            <tr key={res.name} className="hover:bg-ui-bg/30 transition-colors">
                              <td className="px-6 py-3.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40" />
                                  <span className="text-xs font-bold text-text-main">{res.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-3.5 text-center">
                                <div className="flex flex-col items-center">
                                  <span className="text-xs font-black text-text-main">{res.marks}</span>
                                  <div className="mt-1 w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-brand-primary rounded-full"
                                      style={{ width: `${res.marks}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-3.5 text-center">
                                <span className={cn("px-2 py-0.5 rounded text-[10px] font-black", gradeColor(res.grade))}>
                                  {res.grade}
                                </span>
                              </td>
                              <td className="px-6 py-3.5 text-right font-black text-text-main text-xs">{res.gp.toFixed(1)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                  <BookOpen size={48} className="text-slate-200" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Select an exam to view results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── HISTORY TAB ────────────────────────────────────────────────── */}
      {tab === 'history' && (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Record list */}
          <div className="md:w-72 shrink-0 space-y-4">
            <h3 className="text-base font-black text-text-main uppercase tracking-tight">Previous Classes</h3>
            {records.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl border border-ui-border text-center">
                <GraduationCap size={32} className="text-slate-200 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-400">No previous records available.</p>
              </div>
            ) : records.map(record => (
              <button
                key={`${record.class}-${record.year}`}
                onClick={() => setSelectedRecord(record)}
                className={cn(
                  "w-full p-4 rounded-2xl border text-left transition-all",
                  selectedRecord?.class === record.class && selectedRecord?.year === record.year
                    ? "bg-white border-brand-primary shadow-lg ring-1 ring-brand-primary/20"
                    : "bg-white border-ui-border hover:border-brand-primary/40"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    selectedRecord?.class === record.class ? "text-brand-primary" : "text-slate-400"
                  )}>
                    Session {record.year}
                  </span>
                </div>
                <p className="text-sm font-black text-text-main uppercase tracking-tight">{record.class}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-xs font-bold text-text-muted">
                    <BarChart size={12} className="text-brand-primary" /> GPA {record.gpa.toFixed(2)}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-text-muted">
                    <Award size={12} className="text-brand-primary" /> #{record.position}/{record.totalStudents}
                  </span>
                </div>
                {record.group && (
                  <span className="mt-2 inline-block text-[9px] font-black px-2 py-0.5 rounded-lg bg-brand-primary/10 text-brand-primary uppercase tracking-widest">{record.group}</span>
                )}
              </button>
            ))}
          </div>

          {/* Record detail */}
          <div className="flex-grow space-y-6">
            {selectedRecord ? (
              <>
                {/* Summary */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-ui-border relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><Award size={120} /></div>
                  <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
                    <div>
                      <h3 className="text-2xl font-black text-text-main uppercase tracking-tight">{selectedRecord.class}</h3>
                      <p className="text-sm text-text-muted font-bold mt-1">Academic Year {selectedRecord.year} · Final Standing</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="px-6 py-3 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 text-center">
                        <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1">Final GPA</p>
                        <p className="text-2xl font-black text-brand-primary leading-none">{selectedRecord.gpa.toFixed(2)}</p>
                      </div>
                      <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Class Position</p>
                        <p className="text-2xl font-black text-text-main leading-none">#{selectedRecord.position}</p>
                        <p className="text-[9px] font-bold text-slate-400">of {selectedRecord.totalStudents}</p>
                      </div>
                      <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Class Roll</p>
                        <p className="text-2xl font-black text-text-main leading-none">{selectedRecord.roll}</p>
                      </div>
                      {selectedRecord.group && (
                        <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Group</p>
                          <p className="text-sm font-black text-text-main leading-none">{selectedRecord.group}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subject table */}
                <div className="bg-white rounded-3xl shadow-xl border border-ui-border overflow-hidden">
                  <div className="px-8 py-5 border-b border-ui-border flex items-center justify-between bg-ui-bg/30">
                    <h4 className="text-sm font-black text-text-main uppercase tracking-widest">Mark Sheet</h4>
                    <button
                      onClick={() => openMarksheetPDF(selectedRecord)}
                      disabled={pdfLoading}
                      className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline disabled:opacity-50"
                    >
                      {pdfLoading ? <Loader size={14} className="animate-spin" /> : <Download size={14} />}
                      {pdfLoading ? 'Preparing...' : 'View / Print'}
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-ui-border">
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Marks</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Grade</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">GP</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ui-border">
                        {selectedRecord.results.map(res => (
                          <tr key={res.name} className="hover:bg-ui-bg/20 transition-colors">
                            <td className="px-8 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-brand-primary" />
                                <span className="text-sm font-bold text-text-main">{res.name}</span>
                              </div>
                            </td>
                            <td className="px-8 py-4 text-center font-bold text-text-main text-sm">{res.marks}</td>
                            <td className="px-8 py-4 text-center">
                              <span className={cn("px-3 py-1 rounded-lg text-xs font-black", gradeColor(res.grade))}>
                                {res.grade}
                              </span>
                            </td>
                            <td className="px-8 py-4 text-right font-black text-text-main text-sm">{res.gp.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Attendance */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/20">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h4 className="font-black uppercase tracking-tight">Yearly Attendance</h4>
                        <p className="text-xs text-white/60 font-medium">Session {selectedRecord.year} completed successfully.</p>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-4xl font-black">
                        {selectedRecord.attendancePercent != null ? `${selectedRecord.attendancePercent}%` : '—'}
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Attendance Rate</p>
                    </div>
                  </div>
                  <div className="mt-6 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-brand-primary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${selectedRecord.attendancePercent ?? 0}%` }}
                    />
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-full bg-brand-primary opacity-20 blur-3xl rounded-full translate-x-1/2" />
                </div>
              </>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <GraduationCap size={48} className="text-slate-200" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Select a record to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
