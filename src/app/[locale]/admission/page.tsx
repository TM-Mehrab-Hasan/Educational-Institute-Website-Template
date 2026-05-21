"use client";

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, ArrowRight, UserPlus, LogIn, Sparkles, LayoutDashboard, LogOut, ChevronLeft } from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import LoginForm from '@/components/admission/LoginForm';
import RegisterForm from '@/components/admission/RegisterForm';
import ApplicantDashboard from '@/components/admission/ApplicantDashboard';
import ApplicationForm from '@/components/admission/ApplicationForm';

type ViewState = 'Landing' | 'Login' | 'Register' | 'Dashboard' | 'Form';

function AdmissionContent() {
  const { currentUser, isLoading, logout } = useAuth();
  const [view, setView] = useState<ViewState>('Landing');

  const handleLogout = () => {
    logout();
    setView('Landing');
  };

  // Handle initial view based on auth state
  useEffect(() => {
    if (!isLoading) {
      if (currentUser) {
        if (view === 'Landing' || view === 'Login' || view === 'Register') {
          setView('Dashboard');
        }
      } else {
        if (view === 'Dashboard' || view === 'Form') {
          setView('Landing');
        }
      }
    }
  }, [currentUser, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Dynamic Header */}
      <header className="bg-brand-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <button 
              onClick={() => setView('Landing')} 
              className="text-white font-black transition-colors"
            >
              Admission Portal
            </button>
            {view !== 'Landing' && (
              <>
                <ChevronRight size={12} />
                <span className="text-white font-black capitalize">{view === 'Form' ? 'Application' : view}</span>
              </>
            )}
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                {view === 'Dashboard' ? `Welcome, ${currentUser?.name.split(' ')[0]}` : 
                 view === 'Form' ? 'Online Application' :
                 'Admission Portal'}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                {view === 'Dashboard' ? 'Manage your application and stay updated with the admission process.' :
                 view === 'Form' ? 'Please fill in all the details carefully to complete your application.' :
                 'Begin your journey towards excellence. Session 2026-27 is now open for applications.'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">


              {currentUser && view === 'Form' && (
                <button 
                  onClick={() => setView('Dashboard')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/20 flex items-center gap-2"
                >
                  <LayoutDashboard size={14} /> Dashboard
                </button>
              )}


              {(view === 'Login' || view === 'Register') && !currentUser && (
                <button 
                  onClick={() => setView('Landing')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/20 flex items-center gap-2"
                >
                  <ChevronLeft size={14} /> Back
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="section-container mt-12">
        {/* View Management */}
        {view === 'Landing' && (
          <div className="max-w-4xl mx-auto py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-10 rounded-3xl border border-ui-border shadow-xl hover:border-brand-primary transition-all group">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <UserPlus size={32} />
                </div>
                <h3 className="text-xl font-black text-text-main uppercase tracking-tight mb-4">New Applicant</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed mb-8">
                  First time here? Create an account to start your admission process and track your status.
                </p>
                <button 
                  onClick={() => setView('Register')}
                  className="w-full py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all flex items-center justify-center gap-2"
                >
                  Create Account <ArrowRight size={16} />
                </button>
              </div>

              <div className="bg-white p-10 rounded-3xl border border-ui-border shadow-xl hover:border-brand-primary transition-all group">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <LogIn size={32} />
                </div>
                <h3 className="text-xl font-black text-text-main uppercase tracking-tight mb-4">Already Registered</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed mb-8">
                  Log in to resume your application or check the current status of your admission.
                </p>
                <button 
                  onClick={() => setView('Login')}
                  className="w-full py-4 bg-text-main text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-black/10 hover:bg-brand-primary transition-all flex items-center justify-center gap-2"
                >
                  Log In to Portal <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="bg-brand-primary/5 rounded-3xl p-8 md:p-12 border border-brand-primary/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Sparkles size={120} />
               </div>
               <h3 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em] mb-4">Process Overview</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                 <StepItem number="01" title="Register" desc="Create your secure portal account." />
                 <StepItem number="02" title="Apply" desc="Fill details and upload documents." />
                 <StepItem number="03" title="Verify" desc="Wait for admin review & results." />
               </div>
            </div>
          </div>
        )}

        {view === 'Login' && (
          <LoginForm 
            onRegisterClick={() => setView('Register')} 
            onSuccess={() => setView('Dashboard')} 
          />
        )}

        {view === 'Register' && (
          <RegisterForm 
            onLoginClick={() => setView('Login')} 
            onSuccess={() => setView('Dashboard')} 
          />
        )}

        {view === 'Dashboard' && (
          <ApplicantDashboard onStartApplication={() => setView('Form')} />
        )}

        {view === 'Form' && (
          <ApplicationForm />
        )}
      </div>

      <p className="text-center mt-20 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        Need help? Contact Admission Helpdesk: <span className="text-brand-primary">+880 1711-XXXXXX</span>
      </p>
    </div>
  );
}

function StepItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="space-y-2">
      <p className="text-2xl font-black text-brand-primary/20 font-mono leading-none">{number}</p>
      <h4 className="text-sm font-black text-text-main uppercase tracking-tight">{title}</h4>
      <p className="text-xs text-text-muted font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

export default function AdmissionPage() {
  return (
    <AuthProvider>
      <AdmissionContent />
    </AuthProvider>
  );
}
