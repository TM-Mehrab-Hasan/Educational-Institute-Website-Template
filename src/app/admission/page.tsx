"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User, Users, GraduationCap, MapPin, CheckCircle2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: "Student Info", icon: User },
  { id: 2, name: "Guardian Info", icon: Users },
  { id: 3, name: "Academic Info", icon: GraduationCap },
  { id: 4, name: "Review", icon: CheckCircle2 },
];

export default function AdmissionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length) {
      setIsSubmitted(true);
    } else {
      nextStep();
    }
  };

  if (isSubmitted) {
    return (
      <div className="section-container py-32 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-600/10">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black text-text-main mb-4 uppercase tracking-tight">Application Submitted!</h2>
        <p className="text-text-muted max-w-md mx-auto mb-10 leading-relaxed">
          Your admission application has been successfully received. Our administrative office will review your details and contact you via email/phone within 3-5 working days.
        </p>
        <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border inline-block text-left mb-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Application Reference</p>
          <p className="text-lg font-mono font-bold text-brand-primary">DMC-ADM-2026-V7G3X1</p>
        </div>
        <br />
        <button 
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 bg-text-main text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-all"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Page Header */}
      <header className="bg-brand-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight size={12} />
            <span>Admissions</span>
            <ChevronRight size={12} />
            <span>Online Application</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Online Admission Form</h1>
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
            Begin your journey towards excellence. Session 2026-27 is now open for applications.
          </p>
        </div>
      </header>

      <div className="section-container mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="relative flex justify-between mb-16 px-4 md:px-10">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-brand-primary -translate-y-1/2 transition-all duration-500 z-0"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm border-4",
                    currentStep === step.id ? "bg-brand-primary text-white border-white scale-110" : 
                    currentStep > step.id ? "bg-green-100 text-brand-primary border-white" : "bg-white text-slate-300 border-slate-50"
                  )}
                >
                  <step.icon size={20} />
                </div>
                <span className={cn(
                  "absolute -bottom-8 whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-colors duration-500",
                  currentStep >= step.id ? "text-text-main" : "text-slate-300"
                )}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-ui-border overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              
              {/* Step 1: Student Information */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-brand-primary/10 rounded flex items-center justify-center text-brand-primary">
                      <User size={18} />
                    </div>
                    <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Student Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Full Name of Student" placeholder="as per birth certificate" required />
                    <FormInput label="Date of Birth" type="date" required />
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Gender</label>
                      <select className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer">
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Religion</label>
                      <select className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer">
                        <option>Select Religion</option>
                        <option>Islam</option>
                        <option>Hinduism</option>
                        <option>Christianity</option>
                        <option>Buddhism</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <FormInput label="Nationality" placeholder="e.g. Bangladeshi" required />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Guardian Information */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-brand-primary/10 rounded flex items-center justify-center text-brand-primary">
                      <Users size={18} />
                    </div>
                    <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Guardian Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Father's Name" required />
                    <FormInput label="Father's Occupation" />
                    <FormInput label="Mother's Name" required />
                    <FormInput label="Mother's Occupation" />
                    <FormInput label="Phone Number" placeholder="+880" required />
                    <FormInput label="Email Address" type="email" />
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Permanent Address</label>
                      <textarea className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold min-h-[100px]" placeholder="Street, City, Postal Code" required></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Academic Information */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-brand-primary/10 rounded flex items-center justify-center text-brand-primary">
                      <GraduationCap size={18} />
                    </div>
                    <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Academic Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Admission Class</label>
                      <select className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer" required>
                        <option value="">Select Class</option>
                        <option>Class 6</option>
                        <option>Class 9 (Science)</option>
                        <option>Class 9 (Commerce)</option>
                        <option>Class 11 (Science)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Version</label>
                      <select className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer" required>
                        <option value="">Select Version</option>
                        <option>Bangla Version</option>
                        <option>English Version</option>
                      </select>
                    </div>
                    <FormInput label="Previous Institution Name" placeholder="where student last studied" />
                    <FormInput label="Previous Class / GPA" />
                    
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Upload Photo (Passport Size)</label>
                      <div className="mt-2 border-2 border-dashed border-ui-border rounded-2xl p-8 text-center hover:border-brand-primary transition-colors group cursor-pointer">
                        <Upload size={32} className="mx-auto mb-4 text-slate-300 group-hover:text-brand-primary transition-colors" />
                        <p className="text-sm font-bold text-text-muted group-hover:text-text-main transition-colors">Click to upload or drag and drop</p>
                        <p className="text-[10px] text-slate-400 mt-2 uppercase">PNG, JPG or JPEG (Max 2MB)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="bg-brand-primary/5 p-6 rounded-2xl border border-brand-primary/10">
                    <h3 className="text-lg font-black text-brand-primary uppercase tracking-tight mb-4">Application Review</h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      Please review all the information you have provided. Once submitted, you cannot change the details through this online portal. By clicking submit, you agree to follow the rules and regulations of Demo Model College.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="terms" className="w-4 h-4 rounded border-ui-border text-brand-primary focus:ring-brand-primary cursor-pointer" required />
                      <label htmlFor="terms" className="text-sm font-bold text-text-main cursor-pointer">I declare that the information provided is true and correct.</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="rules" className="w-4 h-4 rounded border-ui-border text-brand-primary focus:ring-brand-primary cursor-pointer" required />
                      <label htmlFor="rules" className="text-sm font-bold text-text-main cursor-pointer">I agree to abide by the institution's discipline and policies.</label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-12 pt-10 border-t border-ui-border flex justify-between items-center">
                {currentStep > 1 ? (
                  <button 
                    type="button" 
                    onClick={prevStep}
                    className="flex items-center gap-2 px-8 py-3.5 bg-ui-bg hover:bg-slate-100 text-text-main font-black text-xs uppercase tracking-widest rounded-xl transition-all focus-ring"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button 
                  type="submit" 
                  className="flex items-center gap-2 px-10 py-3.5 bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-brand-primary/20 transition-all focus-ring active:scale-95"
                >
                  {currentStep === steps.length ? "Submit Application" : "Next Step"} 
                  {currentStep !== steps.length && <ChevronRight size={16} />}
                </button>
              </div>

            </form>
          </div>
          
          <p className="text-center mt-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Need help? Contact Admission Helpdesk: <span className="text-brand-primary">+880 1711-XXXXXX</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, type = "text", placeholder, required = false }: { label: string, type?: string, placeholder?: string, required?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        type={type} 
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold placeholder:text-slate-300"
      />
    </div>
  )
}
