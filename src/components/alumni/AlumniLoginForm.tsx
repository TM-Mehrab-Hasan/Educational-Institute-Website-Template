"use client";

import React, { useState } from 'react';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAlumniAuth } from '@/lib/AlumniAuthContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function AlumniLoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { login } = useAlumniAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-ui-border rounded-2xl focus:border-brand-primary outline-none transition-all font-medium text-sm"
            placeholder="alumni@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-ui-border rounded-2xl focus:border-brand-primary outline-none transition-all font-medium text-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20 hover:bg-brand-secondary transition-all flex items-center justify-center gap-3 disabled:opacity-70"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Login to Portal'}
      </button>
    </form>
  );
}
