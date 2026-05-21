"use client";

import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, Loader2, Sparkles, HeartHandshake } from 'lucide-react';
import { useGuardianAuth } from '@/lib/GuardianAuthContext';

interface GuardianLoginFormProps {
  onRegisterClick: () => void;
  onSuccess: () => void;
}

export default function GuardianLoginForm({ onRegisterClick, onSuccess }: GuardianLoginFormProps) {
  const { login } = useGuardianAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDummyLogin = async () => {
    setFormData({ email: 'guardian@example.com', password: 'password123' });
    setError(null);
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const result = await login('guardian@example.com', 'password123');
    if (result.success) {
      onSuccess();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-2xl border border-ui-border overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6">
              <HeartHandshake size={32} />
            </div>
            <h2 className="text-2xl font-black text-text-main uppercase tracking-tight mb-2">Guardian Portal</h2>
            <p className="text-sm text-text-muted font-medium">Log in to monitor your child's progress</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="parent@example.com"
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
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-brand-primary/20 transition-all focus-ring disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>Log In to Secure Portal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-6">
            <button 
              onClick={handleDummyLogin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-slate-900/10 hover:shadow-brand-primary/20 transition-all focus-ring group"
            >
              <Sparkles size={16} className="text-yellow-400 group-hover:scale-125 transition-transform" />
              Quick Parent Login
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-ui-border text-center">
            <p className="text-xs font-bold text-text-muted">
              New Guardian?{' '}
              <button 
                onClick={onRegisterClick}
                className="text-brand-primary hover:underline"
              >
                Register Now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
