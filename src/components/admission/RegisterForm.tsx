"use client";

import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

interface RegisterFormProps {
  onLoginClick: () => void;
  onSuccess: () => void;
}

export default function RegisterForm({ onLoginClick, onSuccess }: RegisterFormProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-2xl border border-ui-border overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-text-main uppercase tracking-tight mb-2">Create Account</h2>
            <p className="text-sm text-text-muted font-medium">Register to start your admission process</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-ui-bg border-none rounded-xl focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all text-sm font-bold placeholder:text-slate-300"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-brand-primary/20 transition-all focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (
                <>Register Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-ui-border text-center">
            <p className="text-xs font-bold text-text-muted">
              Already have an account?{' '}
              <button 
                onClick={onLoginClick}
                className="text-brand-primary hover:underline"
              >
                Log In Here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
