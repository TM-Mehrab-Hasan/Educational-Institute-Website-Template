"use client";

import React from 'react';
import { User, LogOut, ClipboardList, Clock, ArrowRight, LayoutDashboard, Calendar, FileText, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { cn } from '@/lib/utils';

interface ApplicantDashboardProps {
  onStartApplication: () => void;
}

const PROCEDURE_STEPS = [
  { id: 1, name: "Applied", desc: "Application Received" },
  { id: 2, name: "Verification", desc: "Document Verification" },
  { id: 3, name: "Testing", desc: "Admission Test" },
  { id: 4, name: "Selection", desc: "Final Selection" },
  { id: 5, name: "Enrolled", desc: "Official Enrollment" },
];

export default function ApplicantDashboard({ onStartApplication }: ApplicantDashboardProps) {
  const { currentUser, logout, updateApplication } = useAuth();

  if (!currentUser) return null;

  const { status, updatedAt, currentStep } = currentUser.application;
  // Clamp to valid range — handles stale localStorage with procedureStep: 0
  const procedureStep = Math.max(1, currentUser.application.procedureStep || 1);

  const simulateProgress = () => {
    const nextStep = Math.min(procedureStep + 1, PROCEDURE_STEPS.length);
    updateApplication({ procedureStep: nextStep });
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ... (rest of component) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Profile & Quick Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-ui-border text-center">
            <div className="w-24 h-24 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary mx-auto mb-6">
              <User size={48} />
            </div>
            <h2 className="text-xl font-black text-text-main uppercase tracking-tight mb-1">{currentUser.name}</h2>
            <p className="text-sm text-text-muted font-bold mb-8">{currentUser.email}</p>
            
            <button 
              onClick={logout}
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>

          <div className="bg-brand-primary text-white rounded-3xl p-8 shadow-xl shadow-brand-primary/20 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <LayoutDashboard size={160} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-white/60">Important Note</h3>
            <p className="text-sm font-medium leading-relaxed relative z-10">
              Please ensure all your documents are scanned and ready before continuing the application process.
            </p>
          </div>
        </div>

        {/* Right Column: Application Status */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-ui-border">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-text-main uppercase tracking-tight">Admission Status</h3>
                <p className="text-sm text-text-muted font-medium mt-1">Session 2026-27 | {currentUser.application.formData.admissionClass || 'TBD'}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={cn(
                  "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border",
                  status === 'Submitted' ? "bg-green-50 text-green-600 border-green-100" :
                  status === 'Draft' ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                  "bg-slate-50 text-slate-400 border-slate-100"
                )}>
                  {status}
                </div>
                {status === 'Submitted' && (
                  <button 
                    onClick={simulateProgress}
                    className="text-[8px] font-black text-slate-400 hover:text-brand-primary uppercase tracking-widest transition-colors underline"
                  >
                    Simulate Next Step
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <StatusCard 
                icon={ClipboardList} 
                label="Application Progress" 
                value={status === 'Submitted' ? "100%" : status === 'Draft' ? `${Math.round((currentStep / 4) * 100)}%` : "0%"} 
                color="brand"
              />
              <StatusCard 
                icon={Clock} 
                label="Last Updated" 
                value={new Date(updatedAt).toLocaleDateString()} 
                color="slate"
              />
            </div>

            {status === 'Submitted' ? (
              <div className="space-y-8">
                <div className="bg-brand-primary/5 rounded-2xl p-6 border border-brand-primary/10">
                  <h4 className="font-black text-brand-primary uppercase tracking-widest text-xs mb-6">Admission Procedure Tracker</h4>

                  <div className="space-y-3">
                    {PROCEDURE_STEPS.map((step) => {
                      const isCompleted = procedureStep > step.id;
                      const isCurrent   = procedureStep === step.id;

                      const stepMessages: Record<number, string> = {
                        1: "Your application has been received and is waiting for initial verification.",
                        2: "We are currently verifying your documents. This usually takes 2–3 business days.",
                        3: "You have been shortlisted for the admission test. Check your email for the schedule.",
                        4: "Congratulations! You have been selected. Please visit the campus for final formalities.",
                        5: "Welcome to Demo Model School & College! You are officially enrolled as a student.",
                      };

                      return (
                        <div
                          key={step.id}
                          className={cn(
                            "rounded-2xl px-5 py-4 border-2 transition-all",
                            isCompleted ? "bg-brand-primary border-brand-primary" :
                            isCurrent   ? "bg-green-50 border-brand-primary" :
                                          "bg-white border-slate-100"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            {/* Step circle */}
                            <div className={cn(
                              "w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-sm border-2",
                              isCompleted ? "bg-white/20 border-white text-white" :
                              isCurrent   ? "bg-brand-primary border-brand-primary text-white" :
                                            "bg-slate-100 border-slate-200 text-slate-400"
                            )}>
                              {isCompleted ? <CheckCircle size={18} /> : step.id}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "font-black text-sm uppercase tracking-tight leading-none",
                                isCompleted ? "text-white" :
                                isCurrent   ? "text-brand-primary" :
                                              "text-slate-400"
                              )}>
                                {step.name}
                              </p>
                              <p className={cn(
                                "text-xs font-semibold mt-1",
                                isCompleted ? "text-white/80" :
                                isCurrent   ? "text-slate-700" :
                                              "text-slate-400"
                              )}>
                                {step.desc}
                              </p>
                            </div>

                            {isCompleted && (
                              <span className="text-[9px] font-black uppercase tracking-widest text-white/70 shrink-0">Done</span>
                            )}
                            {isCurrent && (
                              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-brand-primary shrink-0">
                                <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                                In Progress
                              </span>
                            )}
                          </div>

                          {/* Inline message for current step */}
                          {isCurrent && (
                            <p className="mt-3 ml-13 pl-[52px] text-xs text-slate-600 font-medium leading-relaxed border-t border-brand-primary/20 pt-3">
                              {stepMessages[step.id]}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-ui-bg rounded-2xl p-6 border border-ui-border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm shrink-0">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-text-main uppercase tracking-tight text-sm mb-1">
                        {status === 'Draft' ? 'Resume Application' : 'Start Application'}
                      </h4>
                      <p className="text-xs text-text-muted font-medium">
                        {status === 'Draft' ? `You left at Step ${currentStep}: ${getStepName(currentStep)}` : 'Begin your journey with us today.'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={onStartApplication}
                    className="flex items-center gap-2 px-8 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 transition-all group"
                  >
                    {status === 'Draft' ? 'Continue' : 'Start Now'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info / Help */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-ui-border flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upcoming Event</p>
                <p className="text-sm font-bold text-text-main mt-0.5">Admission Test: June 15</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-ui-border flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Need Help?</p>
                <p className="text-sm font-bold text-text-main mt-0.5">Contact Support: 16222</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatusCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: 'brand' | 'slate' }) {
  return (
    <div className="p-6 rounded-2xl bg-ui-bg border border-ui-border flex items-center gap-4">
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
        color === 'brand' ? "bg-brand-primary text-white" : "bg-white text-slate-400"
      )}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-lg font-black text-text-main uppercase tracking-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function getStepName(step: number) {
  const steps = ["Student Info", "Guardian Info", "Academic Info", "Review"];
  return steps[step - 1] || "";
}
