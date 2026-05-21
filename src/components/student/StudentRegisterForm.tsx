"use client";

import React, { useState } from 'react';
import { User, Hash, Mail, Lock, GraduationCap, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { useStudentAuth, RegisterData } from '@/lib/StudentAuthContext';

const CLASSES = [
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12',
];

interface StudentRegisterFormProps {
  onLoginClick: () => void;
  onSuccess: () => void;
}

export default function StudentRegisterForm({ onLoginClick, onSuccess }: StudentRegisterFormProps) {
  const { register } = useStudentAuth();
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    studentID: '',
    email: '',
    password: '',
    currentClass: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await register(formData);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.message || 'Registration failed.');
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Field = ({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">{label}</label>
      <div className="relative flex items-center">
        <Icon className="absolute left-4 text-slate-300 shrink-0 pointer-events-none" size={16} />
        {children}
      </div>
    </div>
  );

  const inputCls = "w-full pl-11 pr-4 py-3.5 bg-ui-bg border border-transparent rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold placeholder:text-slate-300 outline-none";

  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-2xl border border-ui-border overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-5">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-2xl font-black text-text-main uppercase tracking-tight mb-1">Create Account</h2>
            <p className="text-sm text-text-muted font-medium">Register to access the student portal</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field icon={User} label="Full Name">
              <input
                type="text"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={inputCls}
              />
            </Field>

            <Field icon={Hash} label="Student ID">
              <input
                type="text"
                required
                placeholder="e.g. 20241005"
                value={formData.studentID}
                onChange={e => setFormData({ ...formData, studentID: e.target.value })}
                className={inputCls}
              />
            </Field>

            <Field icon={Mail} label="Email Address">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className={inputCls}
              />
            </Field>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Current Class</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                <select
                  required
                  value={formData.currentClass}
                  onChange={e => setFormData({ ...formData, currentClass: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 bg-ui-bg border border-transparent rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold text-text-main outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select your class</option>
                  {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <Field icon={Lock} label="Password">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className={inputCls + " pr-12"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </Field>

            <Field icon={Lock} label="Confirm Password">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={inputCls}
              />
            </Field>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-brand-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? <Loader2 className="animate-spin" size={18} />
                  : <><ArrowRight size={16} /> Create Account</>
                }
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-ui-border text-center">
            <p className="text-xs font-bold text-text-muted">
              Already have an account?{' '}
              <button
                onClick={onLoginClick}
                className="text-brand-primary font-black hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
