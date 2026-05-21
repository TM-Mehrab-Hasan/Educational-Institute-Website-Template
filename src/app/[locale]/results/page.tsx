"use client";

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, Search, GraduationCap, Download, FileText, Loader, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ResultsPage() {
  const t = useTranslations();
  const [studentId, setStudentId] = useState('');
  const [examType, setSelectExam] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setResult({
        name: "Tanvir Ahmed",
        class: "Class 12",
        section: "Science (A)",
        gpa: "5.00",
        status: "Passed",
        subjects: [
          { name: "Bangla", marks: 85, grade: "A+" },
          { name: "English", marks: 92, grade: "A+" },
          { name: "Mathematics", marks: 98, grade: "A+" },
          { name: "Physics", marks: 88, grade: "A+" },
          { name: "Chemistry", marks: 90, grade: "A+" },
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="section-container">
        <header className="mb-12">
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-brand-primary">{t('admission.home')}</Link>
            <ChevronRight size={12} />
            <span className="text-brand-primary font-bold">{t('results.hero_title')}</span>
          </nav>
          <h1 className="text-4xl font-black text-text-main mb-4">{t('results.hero_title')}</h1>
          <p className="text-text-muted max-w-2xl">{t('results.hero_desc')}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Search Form */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-8 border border-ui-border shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <Search size={20} />
                </div>
                <h2 className="text-xl font-bold text-text-main">{t('results.find_result')}</h2>
              </div>

              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2">
                    {t('results.student_id_label')}
                  </label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder={t('results.student_id_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border border-ui-border focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2">
                    {t('results.select_exam')}
                  </label>
                  <select
                    required
                    value={examType}
                    onChange={(e) => setSelectExam(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-ui-border focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all font-bold appearance-none bg-white"
                  >
                    <option value="">{t('results.select_exam')}</option>
                    <option value="half-yearly">{t('results.half_yearly')}</option>
                    <option value="final">{t('results.final')}</option>
                    <option value="first-term">{t('results.first_term')}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
                  {loading ? t('results.loading') : t('results.search_btn')}
                </button>
              </form>

              <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                <AlertCircle className="text-amber-500 shrink-0" size={18} />
                <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                  {t('results.result_note')}
                </p>
              </div>
            </div>
          </div>

          {/* Result Display */}
          <div className="lg:col-span-8">
            {result ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Result Header */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-ui-border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                    <div className="flex gap-6 items-center">
                      <div className="w-20 h-20 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-xl shadow-brand-primary/20">
                        <GraduationCap size={40} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-text-main mb-1">{result.name}</h2>
                        <div className="flex gap-3 text-sm font-bold text-text-muted">
                          <span>{result.class}</span>
                          <span>•</span>
                          <span>{result.section}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center md:text-right bg-brand-primary/5 px-8 py-4 rounded-2xl border border-brand-primary/10">
                      <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-1">{t('results.avg_gpa')}</p>
                      <p className="text-4xl font-black text-brand-primary">{result.gpa}</p>
                    </div>
                  </div>
                </div>

                {/* Marksheet Table */}
                <div className="bg-white rounded-[2.5rem] border border-ui-border shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-ui-border flex justify-between items-center">
                    <h3 className="text-xl font-black text-text-main uppercase tracking-tight">{t('results.transcript')}</h3>
                    <button className="flex items-center gap-2 text-brand-primary font-bold text-sm hover:gap-3 transition-all">
                      <Download size={18} /> {t('results.transcript')}
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                          <th className="px-8 py-4">{t('results.subject_name')}</th>
                          <th className="px-8 py-4">{t('results.marks')}</th>
                          <th className="px-8 py-4">{t('results.grade')}</th>
                          <th className="px-8 py-4">{t('results.status_label')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ui-border">
                        {result.subjects.map((sub: any) => (
                          <tr key={sub.name} className="hover:bg-slate-50 transition-colors">
                            <td className="px-8 py-6 font-bold text-text-main">{sub.name}</td>
                            <td className="px-8 py-6 font-medium text-text-muted">{sub.marks}</td>
                            <td className="px-8 py-6">
                              <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 font-bold text-xs">{sub.grade}</span>
                            </td>
                            <td className="px-8 py-6">
                              <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                {t('results.passed')}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-[3rem] border-2 border-dashed border-ui-border text-center">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
                  <FileText size={48} />
                </div>
                <h2 className="text-2xl font-black text-slate-400 mb-2">{t('results.find_result')}</h2>
                <p className="text-slate-400 max-w-xs font-medium">
                  {t('results.student_id_placeholder')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
