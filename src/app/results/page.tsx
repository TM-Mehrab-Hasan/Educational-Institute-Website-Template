"use client";

import React, { useState } from 'react';
import { Search, FileText, Download, User, Book, ChevronRight, Award, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ResultsPage() {
  const [studentId, setStudentId] = useState("");
  const [exam, setExam] = useState("");
  const [year, setYear] = useState("2026");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && exam) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);
      }, 1000);
    }
  };

  return (
    <div className="pb-24 min-h-screen">
      {/* Page Header */}
      <header className="bg-brand-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight size={12} />
            <span>Academic</span>
            <ChevronRight size={12} />
            <span>Exam Results</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Internal Exam Results</h1>
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
            Instant access to academic performance reports for our students.
          </p>
        </div>
      </header>

      <div className="section-container mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Search Form Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-ui-border overflow-hidden mb-16">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary">
                  <Search size={24} />
                </div>
                <h2 className="text-xl font-black text-text-main uppercase tracking-tight">Academic Search</h2>
              </div>

              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="space-y-2 lg:col-span-1">
                  <label htmlFor="studentId" className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Student ID / Roll</label>
                  <div className="relative">
                    <input 
                      id="studentId"
                      type="text" 
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. 20261001" 
                      className="w-full pl-10 pr-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold"
                      required
                    />
                    <User className="absolute left-3 top-4 text-slate-400" size={16} />
                  </div>
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label htmlFor="exam" className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Examination</label>
                  <div className="relative">
                    <select 
                      id="exam"
                      value={exam}
                      onChange={(e) => setExam(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select Exam</option>
                      <option value="first-term">First Term Exam</option>
                      <option value="half-yearly">Half Yearly Exam</option>
                      <option value="final">Final Examination</option>
                    </select>
                    <Book className="absolute left-3 top-4 text-slate-400" size={16} />
                  </div>
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label htmlFor="year" className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Session Year</label>
                  <select 
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold cursor-pointer"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={cn(
                    "w-full h-[52px] bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 focus-ring active:scale-95",
                    isLoading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isLoading ? "Searching..." : (
                    <>
                      <Search size={16} />
                      Find Result
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Result View */}
          {showResult && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="bg-white rounded-3xl shadow-2xl border border-ui-border overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                {/* Transcript Header */}
                <header className="p-8 md:p-12 border-b border-ui-border relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-primary/20">
                        <Award size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-text-main uppercase tracking-tight">Academic Transcript</h3>
                        <p className="text-sm font-bold text-text-muted uppercase tracking-[0.2em]">{exam.replace('-', ' ')} - {year}</p>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Passed (A+)</span>
                    </div>
                  </div>
                </header>

                {/* Student Profile Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:px-12 bg-slate-50/50">
                  {[
                    { l: "Full Name", v: "Abdullah Al Mamun" },
                    { l: "Student ID", v: studentId },
                    { l: "Class & Group", v: "Class 9 (Science)" },
                    { l: "Average Grade", v: "GPA 5.00" },
                  ].map((info) => (
                    <div key={info.l}>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{info.l}</p>
                      <p className="text-sm font-black text-text-main">{info.v}</p>
                    </div>
                  ))}
                </div>

                {/* Detailed Marks Table */}
                <div className="p-8 md:p-12">
                  <div className="overflow-hidden border border-ui-border rounded-2xl">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-ui-border">
                        <tr>
                          <th className="px-6 py-4 text-[10px] font-black text-text-muted uppercase tracking-widest">Subject Name</th>
                          <th className="px-6 py-4 text-[10px] font-black text-text-muted uppercase tracking-widest text-center">Marks</th>
                          <th className="px-6 py-4 text-[10px] font-black text-text-muted uppercase tracking-widest text-center">GP</th>
                          <th className="px-6 py-4 text-[10px] font-black text-text-muted uppercase tracking-widest text-right">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ui-border">
                        {[
                          { s: "Bangla Literature", m: 88, gp: 5.0, g: "A+" },
                          { s: "English Grammar", m: 92, gp: 5.0, g: "A+" },
                          { s: "Higher Mathematics", m: 98, gp: 5.0, g: "A+" },
                          { s: "Physics", m: 91, gp: 5.0, g: "A+" },
                          { s: "Chemistry", m: 85, gp: 5.0, g: "A+" },
                          { s: "Biology", m: 89, gp: 5.0, g: "A+" },
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-text-main">{row.s}</td>
                            <td className="px-6 py-4 text-sm font-bold text-text-muted text-center">{row.m}</td>
                            <td className="px-6 py-4 text-sm font-bold text-text-muted text-center">{row.gp.toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm font-black text-brand-primary text-right">{row.g}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Transcript Footer */}
                  <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-8">
                    <div className="text-center sm:text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Transcript ID</p>
                      <p className="text-xs font-mono font-bold text-text-muted">DMC-RES-2026-X8F2L9</p>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-8 py-3.5 bg-text-main text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-black/10 focus-ring">
                        <Download size={16} />
                        Download PDF
                      </button>
                      <button onClick={() => setShowResult(false)} className="px-8 py-3.5 bg-ui-bg text-text-main font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all focus-ring">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center mt-8 text-xs text-text-muted font-bold uppercase tracking-widest opacity-50">
                This is a computer generated document and does not require a physical signature.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
