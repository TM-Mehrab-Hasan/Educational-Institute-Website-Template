"use client";

import React, { useState, useRef } from 'react';
import {
  User, GraduationCap, BookOpen, CreditCard,
  Clock, BarChart3, Calendar, FileText,
  ChevronRight, AlertCircle, LayoutDashboard,
  UserCircle, LogOut, CheckCircle, XCircle, Timer,
  Bell, TrendingUp, Award, Hash, Camera, Edit, X
} from 'lucide-react';
import { useStudentAuth } from '@/lib/StudentAuthContext';
import { cn } from '@/lib/utils';
import { compressImage } from '@/lib/storage-utils';
import AcademicHistory from './AcademicHistory';
import FeePortal from './FeePortal';
import AttendanceView from './AttendanceView';

type StudentView = 'Overview' | 'Academic' | 'Fees' | 'Attendance' | 'Profile';

const NOTICES = [
  { id: 'n1', title: 'Half Yearly Exam Fee Submission', body: 'Last date to submit half yearly exam fees is June 5, 2026.', date: '2026-05-15', category: 'Fee' },
  { id: 'n2', title: 'Annual Sports Day', body: 'Annual Sports Day will be held on June 25, 2026 at the school grounds.', date: '2026-05-18', category: 'Event' },
  { id: 'n3', title: 'Semester Final Exam Schedule', body: 'Final exam schedule for Class 11 will be published on June 1, 2026.', date: '2026-05-19', category: 'Exam' },
];

export default function StudentDashboard() {
  const { currentStudent, logout } = useStudentAuth();
  const [view, setView] = useState<StudentView>('Overview');

  if (!currentStudent) return null;

  const navItems: { key: StudentView; icon: any; label: string }[] = [
    { key: 'Overview',    icon: LayoutDashboard, label: 'Overview'   },
    { key: 'Academic',    icon: BookOpen,        label: 'Results'    },
    { key: 'Fees',        icon: CreditCard,      label: 'Finance'    },
    { key: 'Attendance',  icon: Calendar,        label: 'Attendance' },
    { key: 'Profile',     icon: UserCircle,      label: 'Profile'    },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="lg:w-64 shrink-0 space-y-6">

          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-ui-border text-center">
            {currentStudent.profilePhoto ? (
              <img
                src={currentStudent.profilePhoto}
                alt={currentStudent.name}
                className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 border border-brand-primary/20 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-4">
                <User size={40} />
              </div>
            )}
            <h2 className="text-base font-black text-text-main uppercase tracking-tight truncate">{currentStudent.name}</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {currentStudent.studentID}</p>

            <div className="space-y-1 mt-6">
              {navItems.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                    view === key
                      ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                      : "text-text-muted hover:bg-ui-bg hover:text-text-main"
                  )}
                >
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-ui-border">
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </div>

          {/* Session Info Card */}
          <div className="bg-brand-primary text-white rounded-3xl p-6 shadow-xl shadow-brand-primary/20">
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Current Session</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold text-white/70">Class</p>
                <p className="text-sm font-black">{currentStudent.currentClass}{currentStudent.section ? ` (${currentStudent.section})` : ''}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-white/70">Roll Number</p>
                <p className="text-sm font-black">{currentStudent.currentRoll}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-white/70">Attendance</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-grow bg-white/20 rounded-full h-1.5">
                    <div className="bg-white rounded-full h-1.5 transition-all" style={{ width: `${currentStudent.attendance}%` }} />
                  </div>
                  <span className="text-xs font-black">{currentStudent.attendance}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notices */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-ui-border">
            <div className="flex items-center gap-2 mb-5">
              <Bell size={14} className="text-brand-primary" />
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Notices</h3>
            </div>
            <div className="space-y-5">
              {NOTICES.map(n => (
                <div key={n.id} className="pb-5 border-b border-ui-border last:border-0 last:pb-0">
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                    n.category === 'Exam'  ? 'bg-purple-100 text-purple-600' :
                    n.category === 'Fee'   ? 'bg-red-100 text-red-600' :
                    n.category === 'Event' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                  )}>{n.category}</span>
                  <p className="text-xs font-bold text-text-main mt-1.5 leading-snug">{n.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">{new Date(n.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────────────────── */}
        <main className="flex-grow space-y-8 min-w-0">
          {view === 'Overview'   && <Overview student={currentStudent} onNavigate={setView} />}
          {view === 'Academic'   && (
            <AcademicHistory
              records={currentStudent.records}
              currentClass={currentStudent.currentClass}
              currentResults={currentStudent.currentResults}
              student={currentStudent}
            />
          )}
          {view === 'Fees'       && <FeePortal fees={currentStudent.fees} student={currentStudent} />}
          {view === 'Attendance' && <AttendanceView student={currentStudent} />}
          {view === 'Profile'    && <ProfileView student={currentStudent} />}
        </main>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  OVERVIEW                                                               */
/* ═══════════════════════════════════════════════════════════════════════ */
function Overview({ student, onNavigate }: { student: any; onNavigate: (v: StudentView) => void }) {
  const pendingFees = student.fees.filter((f: any) => f.status !== 'Paid');
  const latestRecord = student.records[0];
  const latestCurrentExam = student.currentResults?.find((r: any) => r.published) ?? null;
  const overdueFees = student.fees.filter((f: any) => f.status === 'Overdue');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* ── Overdue alert ── */}
      {overdueFees.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-4">
          <AlertCircle size={20} className="text-red-500 shrink-0" />
          <div className="flex-grow">
            <p className="text-sm font-black text-red-700">You have {overdueFees.length} overdue payment{overdueFees.length > 1 ? 's' : ''}!</p>
            <p className="text-xs text-red-500 font-medium">Late fees may apply. Please clear dues immediately.</p>
          </div>
          <button
            onClick={() => onNavigate('Fees')}
            className="shrink-0 px-4 py-2 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-700 transition-colors"
          >
            Pay Now
          </button>
        </div>
      )}

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={BarChart3}    label="Attendance"   value={`${student.attendance}%`}           sub="Current session"           color="brand" />
        <StatCard icon={GraduationCap} label="Latest GPA"  value={latestRecord?.gpa.toFixed(2) ?? '—'} sub={`Session ${latestRecord?.year}`} color="slate" />
        <StatCard icon={Award}         label="Class Rank"  value={latestRecord ? `#${latestRecord.position}` : '—'} sub={`of ${latestRecord?.totalStudents}`} color="green" />
        <StatCard
          icon={AlertCircle}
          label="Due Fees"
          value={`৳${pendingFees.reduce((acc: number, f: any) => acc + f.amount, 0).toLocaleString()}`}
          sub={`${pendingFees.length} pending`}
          color={pendingFees.length > 0 ? "red" : "green"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current class results snapshot */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-ui-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Recent Exam</h3>
            <button onClick={() => onNavigate('Academic')} className="text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
              All Results <ChevronRight size={12} />
            </button>
          </div>
          {latestCurrentExam ? (
            <>
              <div className="bg-brand-primary/5 rounded-2xl px-5 py-4 border border-brand-primary/10 mb-5">
                <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{latestCurrentExam.examType}</p>
                <p className="text-sm font-black text-text-main mt-0.5">{latestCurrentExam.examName}</p>
                <div className="flex items-center gap-6 mt-3">
                  <span className="text-xs font-bold text-text-muted">Score: <span className="text-brand-primary font-black">
                    {latestCurrentExam.obtainedMarks}/
                    {latestCurrentExam.results.length === 7 ? 650 : latestCurrentExam.results.length * 100}
                  </span></span>
                  {latestCurrentExam.position && <span className="text-xs font-bold text-text-muted">Rank: <span className="text-brand-primary font-black">#{latestCurrentExam.position}</span></span>}
                </div>
              </div>
              <div className="space-y-3">
                {latestCurrentExam.results.slice(0, 4).map((res: any) => (
                  <div key={res.name} className="flex items-center justify-between p-3 bg-ui-bg rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <p className="text-sm font-bold text-text-main">{res.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-text-main">{res.marks}</span>
                      <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-lg",
                        res.grade === 'A+' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      )}>{res.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-center space-y-2">
              <BookOpen size={36} className="text-slate-200" />
              <p className="text-xs font-bold text-slate-400">No current exam results published yet.</p>
            </div>
          )}
        </div>

        {/* Fee summary */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-ui-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Payments</h3>
            <button onClick={() => onNavigate('Fees')} className="text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
              Manage <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {student.fees.slice(0, 4).map((fee: any) => (
              <div key={fee.id} className="flex items-center justify-between p-4 border border-ui-border rounded-2xl hover:border-brand-primary transition-all">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shadow-sm",
                    fee.status === 'Paid' ? "bg-green-50 text-green-600" :
                    fee.status === 'Overdue' ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"
                  )}>
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-main leading-tight">{fee.title}</p>
                    <p className="text-[10px] font-bold text-slate-400">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-text-main">৳{fee.amount.toLocaleString()}</p>
                  <p className={cn(
                    "text-[9px] font-black uppercase tracking-widest",
                    fee.status === 'Paid' ? "text-green-600" : fee.status === 'Overdue' ? "text-red-600" : "text-yellow-600"
                  )}>{fee.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic trend */}
      {student.records.length > 1 && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-ui-border">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={20} className="text-brand-primary" />
            <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Academic Progress</h3>
          </div>
          <div className="flex items-end justify-around gap-6 pt-4">
            {[...student.records].reverse().map((rec: any) => {
              const pct = (rec.gpa / 5) * 100;
              return (
                <div key={`${rec.class}-${rec.year}`} className="flex flex-col items-center gap-3 flex-1">
                  <span className="text-xs font-black text-brand-primary">{rec.gpa.toFixed(2)}</span>
                  <div className="relative w-8 sm:w-12 h-36 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/50 shadow-inner">
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-primary to-green-500 transition-all duration-1000 ease-out"
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-text-main leading-tight">{rec.class.replace('Class ', 'Cl. ')}</p>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5">{rec.year}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  STAT CARD                                                              */
/* ═══════════════════════════════════════════════════════════════════════ */
function StatCard({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-ui-border flex items-start gap-4">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
        color === 'brand' ? "bg-brand-primary text-white" :
        color === 'red'   ? "bg-red-500 text-white" :
        color === 'green' ? "bg-green-500 text-white" : "bg-slate-100 text-slate-500"
      )}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-xl font-black text-text-main uppercase tracking-tight my-0.5">{value}</p>
        <p className="text-[10px] font-bold text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  PROFILE VIEW                                                           */
/* ═══════════════════════════════════════════════════════════════════════ */
function ProfileView({ student }: { student: any }) {
  const { currentStudent, updateStudent } = useStudentAuth() as any;
  const photoRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(student.profilePhoto ?? '');
  const [photoSaving, setPhotoSaving] = useState(false);
  const [photoSaved, setPhotoSaved]   = useState(false);

  // Request form state
  const [showRequest, setShowRequest] = useState(false);
  const [reqField, setReqField]       = useState('');
  const [reqValue, setReqValue]       = useState('');
  const [reqReason, setReqReason]     = useState('');
  const [reqSent, setReqSent]         = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPhotoPreview(dataUrl);
      setPhotoSaving(true);

      try {
        // Compress image to save space in localStorage
        const compressed = await compressImage(dataUrl, 300, 0.6);

        // Persist to student record via context
        if (updateStudent) {
          updateStudent({ ...currentStudent, profilePhoto: compressed });
        }
        setPhotoSaved(true);
        setTimeout(() => setPhotoSaved(false), 2000);
      } catch (err) {
        console.error('Photo save failed:', err);
      } finally {
        setPhotoSaving(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending request (in real app: POST to API)
    setReqSent(true);
    setTimeout(() => { setReqSent(false); setShowRequest(false); setReqField(''); setReqValue(''); setReqReason(''); }, 3000);
  };

  const infoFields = [
    { label: 'Full Name',        value: student.name },
    { label: 'Student ID',       value: student.studentID },
    { label: 'Email Address',    value: student.email },
    { label: 'Current Class',    value: `${student.currentClass}${student.section ? ` (${student.section})` : ''}` },
    { label: 'Class Roll',       value: student.currentRoll || 'TBD' },
    { label: 'Group',            value: student.group || 'Not set' },
    { label: 'Date of Birth',    value: student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : 'Not set' },
    { label: 'Blood Group',      value: student.bloodGroup || 'Not set' },
    { label: 'Guardian Name',    value: student.guardianName || 'Not set' },
    { label: 'Guardian Contact', value: student.guardianContact || 'Not set' },
    { label: 'Home Address',     value: student.address || 'Not set' },
  ];

  const requestableFields = infoFields.map(f => f.label);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* Profile photo card */}
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-ui-border">
        <div className="flex flex-col md:flex-row items-start gap-10">

          {/* Photo + uploader */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="relative group">
              <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-brand-primary/20 shadow-xl bg-brand-primary/5 flex items-center justify-center">
                {photoPreview
                  ? <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                  : <User size={48} className="text-brand-primary/40" />
                }
              </div>
              <button
                onClick={() => photoRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-9 h-9 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/30 transition-all"
                title="Change profile photo"
              >
                <Camera size={16} />
              </button>
            </div>
            <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            <div className="text-center">
              <p className="text-xs font-black text-text-main">{student.name}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">ID: {student.studentID}</p>
              {photoSaving && <p className="text-[10px] font-black text-brand-primary mt-2 animate-pulse">Saving…</p>}
              {photoSaved  && <p className="text-[10px] font-black text-green-600 mt-2">✓ Photo updated!</p>}
            </div>
            <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl px-4 py-2 text-center">
              <p className="text-[9px] font-black text-brand-primary uppercase tracking-widest">Photo only</p>
              <p className="text-[9px] text-slate-400 mt-0.5">You can update your photo directly</p>
            </div>
          </div>

          {/* Info fields */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-text-main uppercase tracking-tight">Student Profile</h3>
              <span className="text-[9px] font-black px-3 py-1 rounded-xl bg-slate-100 text-slate-500 uppercase tracking-widest">Read Only</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {infoFields.map(f => (
                <div key={f.label} className="border-b border-ui-border pb-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{f.label}</p>
                  <p className="text-sm font-bold text-text-main">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Request update CTA */}
        <div className="mt-10 pt-8 border-t border-ui-border flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-black text-text-main">Need to change personal information?</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Submit a request and the administration will review and update it for you.</p>
          </div>
          <button
            onClick={() => setShowRequest(true)}
            className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-brand-primary/20"
          >
            <Edit size={14} /> Request Profile Update
          </button>
        </div>
      </div>

      {/* Request Modal */}
      {showRequest && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg animate-in zoom-in-90 duration-300">
            {reqSent ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-black text-text-main uppercase tracking-tight mb-2">Request Submitted!</h3>
                <p className="text-sm text-slate-400 font-medium">The administration will review your request and contact you within 3–5 working days.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-black text-text-main uppercase tracking-tight">Request Profile Update</h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">All requests are reviewed by the administration</p>
                  </div>
                  <button onClick={() => setShowRequest(false)} className="p-2 hover:bg-ui-bg rounded-xl transition-colors text-slate-400">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleRequestSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Field to Update *</label>
                    <select
                      required
                      value={reqField}
                      onChange={e => setReqField(e.target.value)}
                      className="w-full px-4 py-3.5 bg-ui-bg rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all appearance-none"
                    >
                      <option value="">Select a field…</option>
                      {requestableFields.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correct Value *</label>
                    <input
                      required
                      value={reqValue}
                      onChange={e => setReqValue(e.target.value)}
                      placeholder="Enter the correct information"
                      className="w-full px-4 py-3.5 bg-ui-bg rounded-xl text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason / Supporting Note *</label>
                    <textarea
                      required
                      value={reqReason}
                      onChange={e => setReqReason(e.target.value)}
                      placeholder="Explain why this information needs to be updated (e.g. spelling error, legal name change)"
                      className="w-full px-4 py-3.5 bg-ui-bg rounded-xl text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all min-h-[90px] resize-none"
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                    <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-1">⚠ Note</p>
                    <p className="text-xs text-yellow-700 font-medium">Supporting documents (birth certificate, NID, etc.) may be requested by the office. Changes to Name, Date of Birth, and ID require official documentation.</p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button type="button" onClick={() => setShowRequest(false)} className="flex-1 py-3 bg-ui-bg text-text-main font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all border border-ui-border">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 transition-all">Submit Request</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
