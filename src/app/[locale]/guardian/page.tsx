"use client";

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, LogOut, ShieldCheck, HeartHandshake, UserPlus, LogIn, ChevronLeft } from 'lucide-react';
import { GuardianAuthProvider, useGuardianAuth } from '@/lib/GuardianAuthContext';
import GuardianLoginForm from '@/components/guardian/GuardianLoginForm';
import GuardianRegisterForm from '@/components/guardian/GuardianRegisterForm';
import GuardianDashboard from '@/components/guardian/GuardianDashboard';
import { cn } from '@/lib/utils';

type ViewState = 'Landing' | 'Login' | 'Register' | 'Dashboard';

function GuardianPortalContent() {
  const { currentGuardian, isLoading, logout } = useGuardianAuth();
  const [view, setView] = useState<ViewState>('Landing');

  useEffect(() => {
    if (!isLoading) {
      if (currentGuardian) {
        setView('Dashboard');
      } else if (view === 'Dashboard') {
        setView('Landing');
      }
    }
  }, [currentGuardian, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Brand Header */}
      <header className="bg-brand-primary py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <button 
              onClick={() => setView('Landing')} 
              className={cn("transition-colors", (view === 'Landing' || view === 'Dashboard') ? "text-white font-black" : "text-white/70 hover:text-white")}
            >
              Guardian Portal
            </button>
            {view !== 'Landing' && view !== 'Dashboard' && (
              <>
                <ChevronRight size={12} />
                <span className="text-white font-black capitalize">{view}</span>
              </>
            )}
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                {view === 'Dashboard' ? `Parent Dashboard` : 'Guardian Access'}
              </h1>
              <p className="text-xl text-white/80 font-medium max-w-2xl leading-relaxed">
                {view === 'Dashboard' 
                  ? 'Monitor student attendance, track academic performance, and manage institutional payments.' 
                  : 'Securely manage your children\'s educational journey at Demo Model School & College.'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {(view === 'Login' || view === 'Register') && !currentGuardian && (
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
        {view === 'Landing' && (
          <div className="max-w-4xl mx-auto py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-10 rounded-3xl border border-ui-border shadow-xl hover:border-brand-primary transition-all group">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <UserPlus size={32} />
                </div>
                <h3 className="text-xl font-black text-text-main uppercase tracking-tight mb-4">New Guardian</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed mb-8">
                  Create a parent account to link with your children's student IDs and receive institutional updates.
                </p>
                <button 
                  onClick={() => setView('Register')}
                  className="w-full py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all"
                >
                  Create Parent Account
                </button>
              </div>

              <div className="bg-white p-10 rounded-3xl border border-ui-border shadow-xl hover:border-brand-primary transition-all group">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <LogIn size={32} />
                </div>
                <h3 className="text-xl font-black text-text-main uppercase tracking-tight mb-4">Existing Parent</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed mb-8">
                  Access your dashboard to check academic standings, fee status, and campus notices.
                </p>
                <button 
                  onClick={() => setView('Login')}
                  className="w-full py-4 bg-text-main text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-black/10 hover:bg-brand-primary hover:shadow-brand-primary/20 transition-all"
                >
                  Log In to Portal
                </button>
              </div>
            </div>

            <div className="bg-brand-primary/5 rounded-3xl p-8 md:p-12 border border-brand-primary/10">
               <h3 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em] mb-8">Oversight Features</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                 <FeatureItem title="Multi-Child Support" desc="Manage multiple students from one single parent account." />
                 <FeatureItem title="Financial Tracking" desc="Monitor and pay monthly/exam fees with full history." />
                 <FeatureItem title="Real-time Alerts" desc="Receive instant notifications for meetings and results." />
               </div>
            </div>
          </div>
        )}

        {view === 'Login' && (
          <GuardianLoginForm 
            onRegisterClick={() => setView('Register')} 
            onSuccess={() => setView('Dashboard')} 
          />
        )}

        {view === 'Register' && (
          <GuardianRegisterForm 
            onLoginClick={() => setView('Login')} 
            onSuccess={() => setView('Dashboard')} 
          />
        )}

        {view === 'Dashboard' && (
          <GuardianDashboard />
        )}
      </div>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-2">
      <div className="w-8 h-8 bg-brand-primary/10 rounded flex items-center justify-center text-brand-primary mb-3">
        <ShieldCheck size={18} />
      </div>
      <h4 className="text-sm font-black text-text-main uppercase tracking-tight">{title}</h4>
      <p className="text-xs text-text-muted font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

export default function GuardianPage() {
  return (
    <GuardianPortalContent />
  );
}
