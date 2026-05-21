"use client";

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, LogOut, GraduationCap, Clock, UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { StudentAuthProvider, useStudentAuth } from '@/lib/StudentAuthContext';
import StudentLoginForm from '@/components/student/StudentLoginForm';
import StudentRegisterForm from '@/components/student/StudentRegisterForm';
import StudentDashboard from '@/components/student/StudentDashboard';
import { cn } from '@/lib/utils';

type View = 'Landing' | 'Login' | 'Register' | 'Dashboard';

function StudentPortalContent() {
  const { currentStudent, isLoading, logout } = useStudentAuth();
  const [view, setView] = useState<View>('Landing');

  useEffect(() => {
    if (!isLoading) {
      if (currentStudent) {
        setView('Dashboard');
      } else if (view === 'Dashboard') {
        setView('Landing');
      }
    }
  }, [currentStudent, isLoading]);

  const handleLogout = () => {
    logout();
    setView('Landing');
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const headerTitle = {
    Landing:   'Student Portal',
    Login:     'Student Portal',
    Register:  'Student Portal',
    Dashboard: `Hello, ${currentStudent?.name.split(' ')[0] ?? ''}`,
  }[view];

  const headerSub = {
    Landing:   'Secure access for enrolled students to manage results, fees, and attendance.',
    Login:     'Log in with your student email and password.',
    Register:  'Register to create your student portal account.',
    Dashboard: 'Access your academic records, results, fees, and attendance.',
  }[view];

  return (
    <div className="pb-24">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="bg-brand-primary py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <button 
              onClick={() => !currentStudent && setView('Landing')} 
              className={cn("transition-colors", (view === 'Landing' || view === 'Dashboard') ? "text-white font-black" : "text-white/70 hover:text-white")}
            >
              Student Portal
            </button>
            {(view === 'Login' || view === 'Register') && (
              <>
                <ChevronRight size={12} />
                <span className="text-white font-black capitalize">{view}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">{headerTitle}</h1>
              <p className="text-lg text-white/80 font-medium max-w-xl leading-relaxed">{headerSub}</p>
            </div>

            <div className="flex items-center gap-3">
              {(view === 'Login' || view === 'Register') && !currentStudent && (
                <button
                  onClick={() => setView('Landing')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/20"
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="section-container mt-12">

        {/* Landing */}
        {view === 'Landing' && (
          <div className="max-w-4xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* New student card */}
              <div className="bg-white p-10 rounded-3xl border border-ui-border shadow-xl hover:border-brand-primary transition-all group">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <UserPlus size={32} />
                </div>
                <h3 className="text-xl font-black text-text-main uppercase tracking-tight mb-3 text-center">New Student</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed mb-8 text-center">
                  First time here? Create a portal account to access your academic records and fees.
                </p>
                <button
                  onClick={() => setView('Register')}
                  className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  Register Now <ArrowRight size={16} />
                </button>
              </div>

              {/* Existing student card */}
              <div className="bg-white p-10 rounded-3xl border border-ui-border shadow-xl hover:border-brand-primary transition-all group">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <LogIn size={32} />
                </div>
                <h3 className="text-xl font-black text-text-main uppercase tracking-tight mb-3 text-center">Already Registered</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed mb-8 text-center">
                  Log in to view your results, attendance, fee status, and more from your dashboard.
                </p>
                <button
                  onClick={() => setView('Login')}
                  className="w-full py-4 bg-text-main hover:bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2"
                >
                  Log In <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Portal features overview */}
            <div className="bg-brand-primary/5 rounded-3xl p-8 md:p-12 border border-brand-primary/10">
              <h3 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em] mb-8 text-center">What You Can Do</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: GraduationCap, label: 'View Results',   desc: 'Current & past class results with grades' },
                  { icon: Clock,         label: 'Attendance',     desc: 'Daily attendance records & percentage' },
                  { icon: LogIn,         label: 'Pay Fees',       desc: 'Monthly fees, exam fees & receipts' },
                  { icon: UserPlus,      label: 'Your Profile',   desc: 'Personal info & academic history' },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-3 shadow-sm border border-brand-primary/10">
                      <item.icon size={22} />
                    </div>
                    <p className="text-xs font-black text-text-main uppercase tracking-tight">{item.label}</p>
                    <p className="text-[10px] text-text-muted font-medium mt-1 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Login */}
        {view === 'Login' && (
          <div className="py-12">
            <StudentLoginForm
              onSuccess={() => setView('Dashboard')}
              onRegisterClick={() => setView('Register')}
            />
          </div>
        )}

        {/* Register */}
        {view === 'Register' && (
          <div className="py-12">
            <StudentRegisterForm
              onLoginClick={() => setView('Login')}
              onSuccess={() => setView('Dashboard')}
            />
          </div>
        )}

        {/* Dashboard */}
        {view === 'Dashboard' && <StudentDashboard />}
      </div>

      {/* Footer notices */}
      {view !== 'Dashboard' && (
        <div className="section-container mt-20 text-center">
          <div className="max-w-2xl mx-auto p-8 bg-ui-bg rounded-3xl border border-ui-border">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Portal Notices</h4>
            <div className="space-y-4 text-left">
              <div className="flex gap-4">
                <Clock size={16} className="text-brand-primary shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-text-muted leading-relaxed">
                  Semester Final results for Class 11 will be published on <span className="text-text-main">June 20, 2026</span>.
                </p>
              </div>
              <div className="flex gap-4">
                <GraduationCap size={16} className="text-brand-primary shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-text-muted leading-relaxed">
                  Demo login: <span className="text-text-main">student@example.com</span> / <span className="text-text-main">password123</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudentPage() {
  return (
    <StudentAuthProvider>
      <StudentPortalContent />
    </StudentAuthProvider>
  );
}
