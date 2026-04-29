"use client";

import React, { useState } from 'react';
import { X, Calendar, User, Mail, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';

interface CampusVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CampusVisitModal({ isOpen, onClose }: CampusVisitModalProps) {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="p-12 text-center py-20">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Request Received!</h2>
            <p className="text-slate-600 font-medium mb-10 leading-relaxed">
              Thank you for your interest. Our administration team will contact you shortly to confirm your visit.
            </p>
            <button 
              onClick={onClose}
              className="px-10 py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="p-8 md:p-12">
            <div className="mb-10">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                <Calendar size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">{t('visit.title')}</h2>
              <p className="text-slate-500 font-medium text-sm">{t('visit.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('visit.name')}</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent focus:border-brand-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('visit.email')}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent focus:border-brand-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('visit.date')}</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent focus:border-brand-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all mt-4"
              >
                {t('visit.submit')}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
