"use client";

import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, BookOpen, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAlumniAuth } from '@/lib/AlumniAuthContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function AlumniRegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register } = useAlumniAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: '',
    department: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await register(
        formData.name,
        formData.email,
        formData.phone,
        formData.batch,
        formData.department,
        formData.password
      );

      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-ui-border rounded-2xl focus:border-brand-primary outline-none transition-all font-medium text-sm"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-ui-border rounded-2xl focus:border-brand-primary outline-none transition-all font-medium text-sm"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-ui-border rounded-2xl focus:border-brand-primary outline-none transition-all font-medium text-sm"
              placeholder="+880 1XXX-XXXXXX"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Graduation Batch</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="batch"
              required
              value={formData.batch}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-ui-border rounded-2xl focus:border-brand-primary outline-none transition-all font-medium text-sm"
              placeholder="Class of 2020"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Department</label>
          <div className="relative">
            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-ui-border rounded-2xl focus:border-brand-primary outline-none transition-all font-medium text-sm appearance-none"
            >
              <option value="">Select Department</option>
              <option value="Science">Science</option>
              <option value="Business Studies">Business Studies</option>
              <option value="Humanities">Humanities</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Create Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-ui-border rounded-2xl focus:border-brand-primary outline-none transition-all font-medium text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20 hover:bg-brand-secondary transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Complete Registration'}
      </button>
    </form>
  );
}
