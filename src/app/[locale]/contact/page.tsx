"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Link } from '@/i18n/routing';

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would handle form submission here
  };

  return (
    <div className="pb-24">
      {/* Page Header */}
      <header className="bg-brand-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} />
            <span>{t('nav.contact')}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{t('contact.hero_title')}</h1>
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
            {t('contact.hero_desc')}
          </p>
        </div>
      </header>

      <div className="section-container mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-ui-border p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl font-black text-text-main mb-8 uppercase tracking-tight">{t('contact.form_title')}</h2>
              
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-2">{t('contact.success_title')}</h3>
                  <p className="text-text-muted">{t('contact.success_desc')}</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-brand-primary font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-black text-text-muted uppercase tracking-widest ml-1">{t('contact.name')}</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full px-5 py-4 bg-ui-bg border border-ui-border rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-black text-text-muted uppercase tracking-widest ml-1">{t('contact.email')}</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full px-5 py-4 bg-ui-bg border border-ui-border rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-black text-text-muted uppercase tracking-widest ml-1">{t('contact.subject')}</label>
                    <input 
                      type="text" 
                      id="subject" 
                      required
                      className="w-full px-5 py-4 bg-ui-bg border border-ui-border rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="Admission Inquiry"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-black text-text-muted uppercase tracking-widest ml-1">{t('contact.message')}</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      required
                      className="w-full px-5 py-4 bg-ui-bg border border-ui-border rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-black rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <span>{t('contact.send')}</span>
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-ui-surface rounded-3xl border border-ui-border p-8 md:p-10">
              <h2 className="text-2xl font-black text-text-main mb-8 uppercase tracking-tight">{t('contact.info_title')}</h2>
              
              <div className="space-y-8">
                <ContactInfoItem 
                  icon={<MapPin size={24} />}
                  label={t('contact.address_label')}
                  value={t('about.address_text')}
                />
                <ContactInfoItem 
                  icon={<Phone size={24} />}
                  label={t('contact.phone_label')}
                  value={t('topbar.phone')}
                />
                <ContactInfoItem 
                  icon={<Mail size={24} />}
                  label={t('contact.email_label')}
                  value={t('topbar.email')}
                />
                <ContactInfoItem 
                  icon={<Clock size={24} />}
                  label={t('contact.hours_label')}
                  value={t('contact.hours_value')}
                />
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-200 rounded-3xl border border-ui-border h-[300px] relative overflow-hidden group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.196574705574!2d90.37053537613137!3d23.740417889145946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b2839c9463%3A0xb69747948a39158e!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1714472000000!5m2!1sen!2sbd" 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                {t('contact.map_title')}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-5">
      <div className="w-12 h-12 bg-white rounded-xl border border-ui-border flex items-center justify-center text-brand-primary shadow-sm shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">{label}</p>
        <p className="text-text-main font-bold leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
