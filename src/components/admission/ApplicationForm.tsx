"use client";

import React, { useState, useEffect, useRef } from 'react';
import { User, Users, GraduationCap, CheckCircle2, ChevronLeft, ChevronRight, X, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { compressImage } from '@/lib/storage-utils';
import { useAuth, StudentType } from '@/lib/AuthContext';

const steps = [
  { id: 1, name: "Student Info", icon: User },
  { id: 2, name: "Guardian Info", icon: Users },
  { id: 3, name: "Academic Info", icon: GraduationCap },
  { id: 4, name: "Review", icon: CheckCircle2 },
];

const ALL_CLASSES = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9 (Science)", "Class 9 (Commerce)", "Class 9 (Humanities)",
  "Class 10", "Class 11 (Science)", "Class 11 (Commerce)", "Class 11 (Humanities)", "Class 12"
];

export default function ApplicationForm() {
  const { currentUser, updateApplication } = useAuth();
  const [currentStep, setCurrentStep] = useState(currentUser?.application.currentStep || 1);
  const [formData, setFormData] = useState(currentUser?.application.formData || {});
  const [studentType, setStudentType] = useState<StudentType>(currentUser?.application.studentType || 'New');
  const [isSubmitted, setIsSubmitted] = useState(currentUser?.application.status === 'Submitted');

  useEffect(() => {
    if (currentUser) {
      setCurrentStep(currentUser.application.currentStep);
      setFormData(currentUser.application.formData);
      setStudentType(currentUser.application.studentType || 'New');
      setIsSubmitted(currentUser.application.status === 'Submitted');
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    updateApplication({ formData: newFormData });
  };

  const handleStudentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as StudentType;
    setStudentType(type);
    updateApplication({ studentType: type });
    if (type === 'Transfer' && (formData.admissionClass === 'Class 10' || formData.admissionClass === 'Class 12')) {
      const newFormData = { ...formData, admissionClass: '' };
      setFormData(newFormData);
      updateApplication({ formData: newFormData });
    }
  };

  const filteredClasses = studentType === 'Transfer'
    ? ALL_CLASSES.filter(c => c !== 'Class 10' && c !== 'Class 12')
    : ALL_CLASSES;

  const nextStep = () => {
    const next = Math.min(currentStep + 1, steps.length);
    setCurrentStep(next);
    updateApplication({ currentStep: next });
  };

  const prevStep = () => {
    const prev = Math.max(currentStep - 1, 1);
    setCurrentStep(prev);
    updateApplication({ currentStep: prev });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length) {
      setIsSubmitted(true);
      updateApplication({ status: 'Submitted', updatedAt: new Date().toISOString() });
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
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12">
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
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Admission Type</label>
                  <div className="flex gap-4">
                    <select
                      value={studentType}
                      onChange={handleStudentTypeChange}
                      className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer"
                    >
                      <option value="New">New Student</option>
                      <option value="Transfer">Transfer Student</option>
                    </select>
                  </div>
                </div>
                <FormInput
                  label="Full Name of Student"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                  placeholder="as per birth certificate"
                  required
                />
                <FormInput
                  label="Date of Birth"
                  name="dob"
                  value={formData.dob || ''}
                  onChange={handleInputChange}
                  type="date"
                  required
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Religion</label>
                  <select
                    name="religion"
                    value={formData.religion || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer"
                  >
                    <option value="">Select Religion</option>
                    <option>Islam</option>
                    <option>Hinduism</option>
                    <option>Christianity</option>
                    <option>Buddhism</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <FormInput
                    label="Nationality"
                    name="nationality"
                    value={formData.nationality || ''}
                    onChange={handleInputChange}
                    placeholder="e.g. Bangladeshi"
                    required
                  />
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
                <FormInput label="Father's Name" name="fatherName" value={formData.fatherName || ''} onChange={handleInputChange} required />
                <FormInput label="Father's Occupation" name="fatherOccupation" value={formData.fatherOccupation || ''} onChange={handleInputChange} />
                <FormInput label="Mother's Name" name="motherName" value={formData.motherName || ''} onChange={handleInputChange} required />
                <FormInput label="Mother's Occupation" name="motherOccupation" value={formData.motherOccupation || ''} onChange={handleInputChange} />
                <FormInput label="Phone Number" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="+880" required />
                <FormInput label="Email Address" name="email" value={formData.email || ''} onChange={handleInputChange} type="email" />
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Permanent Address</label>
                  <textarea
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold min-h-[100px]"
                    placeholder="Street, City, Postal Code"
                    required
                  ></textarea>
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
                  <select
                    name="admissionClass"
                    value={formData.admissionClass || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Class</option>
                    {filteredClasses.map((className) => (
                      <option key={className} value={className}>{className}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Version</label>
                  <select
                    name="version"
                    value={formData.version || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Version</option>
                    <option>Bangla Version</option>
                    <option>English Version</option>
                  </select>
                </div>
                <FormInput
                  label="Previous Institution Name"
                  name="previousInstitution"
                  value={formData.previousInstitution || ''}
                  onChange={handleInputChange}
                  placeholder="where student last studied"
                />
                <FormInput
                  label="Previous Class / GPA"
                  name="previousResult"
                  value={formData.previousResult || ''}
                  onChange={handleInputChange}
                />

                {/* ── PHOTO UPLOAD (functional) ── */}
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                    Upload Photo (Passport Size) <span className="text-red-500">*</span>
                  </label>
                  <PhotoUpload
                    value={formData.photo || ''}
                    onChange={(dataUrl) => {
                      const newFormData = { ...formData, photo: dataUrl };
                      setFormData(newFormData);
                      updateApplication({ formData: newFormData });
                    }}
                  />
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
                  Please review all the information you have provided. Once submitted, you cannot change the details through this online portal. By clicking submit, you agree to follow the rules and regulations of Demo Model School & College.
                </p>
              </div>

              {formData.photo && (
                <div className="flex items-center gap-6 p-4 bg-ui-bg rounded-2xl border border-ui-border">
                  <img src={formData.photo} alt="Applicant photo" className="w-20 h-24 object-cover rounded-xl border-2 border-brand-primary/20 shadow" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Uploaded Photo</p>
                    <p className="text-sm font-bold text-text-main mt-1">{formData.fullName || 'Applicant'}</p>
                    <p className="text-[10px] text-green-600 font-black mt-1">✓ Photo uploaded successfully</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="terms" className="w-4 h-4 rounded border-ui-border text-brand-primary focus:ring-brand-primary cursor-pointer" required />
                  <label htmlFor="terms" className="text-sm font-bold text-text-main cursor-pointer">I declare that the information provided is true and correct.</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rules" className="w-4 h-4 rounded border-ui-border text-brand-primary focus:ring-brand-primary cursor-pointer" required />
                  <label htmlFor="rules" className="text-sm font-bold text-text-main cursor-pointer">I agree to abide by the institution&apos;s discipline and policies.</label>
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
    </div>
  );
}

/* ─── Form Input ────────────────────────────────────────────────────────── */
function FormInput({
  label, name, value, onChange, type = "text", placeholder, required = false
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold placeholder:text-slate-300"
      />
    </div>
  );
}

/* ─── Photo Upload ──────────────────────────────────────────────────────── */
function PhotoUpload({ value, onChange }: { value: string; onChange: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError]       = useState('');

  const processFile = (file: File) => {
    setError('');
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      setError('Please upload a PNG or JPG image.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('File size must be under 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      try {
        const compressed = await compressImage(dataUrl, 300, 0.6);
        onChange(compressed);
      } catch (err) {
        console.error('Compression failed', err);
        onChange(dataUrl); // Fallback
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-2">
      {value ? (
        <div className="flex items-center gap-6 p-5 bg-green-50 border-2 border-green-200 rounded-2xl">
          <img src={value} alt="Preview" className="w-20 h-24 object-cover rounded-xl border-2 border-brand-primary/20 shadow-md" />
          <div className="flex-grow">
            <p className="text-xs font-black text-green-700 uppercase tracking-widest">✓ Photo Uploaded</p>
            <p className="text-[10px] text-green-600 font-medium mt-1">Passport-size photo ready for submission.</p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl border border-ui-border transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) processFile(f);
          }}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
            dragging
              ? 'border-brand-primary bg-brand-primary/5'
              : 'border-ui-border hover:border-brand-primary hover:bg-ui-bg'
          }`}
        >
          <ImageIcon
            size={36}
            className={`mx-auto mb-4 transition-colors ${dragging ? 'text-brand-primary' : 'text-slate-300'}`}
          />
          <p className="text-sm font-bold text-text-muted">Click to upload or drag &amp; drop</p>
          <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">PNG, JPG or JPEG · Max 2MB · Passport size</p>
        </div>
      )}
      {error && <p className="text-xs font-bold text-red-600 mt-2">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpg,image/jpeg"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) processFile(f);
        }}
      />
    </div>
  );
}
