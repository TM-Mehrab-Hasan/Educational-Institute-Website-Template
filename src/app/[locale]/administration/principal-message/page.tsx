"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, Quote, Calendar, Award, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function PrincipalMessagePage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="section-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
          <Link href="/" className="hover:text-brand-primary transition-colors">{t('principal.breadcrumb_home')}</Link>
          <ChevronRight size={12} />
          <Link href="/administration" className="hover:text-brand-primary transition-colors">{t('principal.breadcrumb_admin')}</Link>
          <ChevronRight size={12} />
          <span className="text-brand-primary font-bold">{t('principal.breadcrumb_msg')}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Info */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl border border-ui-border shadow-xl overflow-hidden sticky top-24">
              <div className="aspect-[3/4] relative">
                <img 
                  src="/images/principal.jpeg" 
                  alt="Dr. AK Azad" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-1">{t('principal.sidebar_principal')}</p>
                  <h2 className="text-xl font-bold">Dr. AK Azad</h2>
                  <p className="text-sm text-white/80">{t('principal.phd')}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-text-muted tracking-tighter">{t('principal.office_hours_label')}</p>
                    <p className="text-sm font-bold">{t('principal.office_time')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-text-muted tracking-tighter">{t('principal.experience_label')}</p>
                    <p className="text-sm font-bold">{t('principal.experience_value')}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Message */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-ui-border shadow-sm p-8 md:p-12">
            <Quote size={60} className="text-brand-primary/10 mb-6" />
            
            <h1 className="text-3xl md:text-5xl font-black text-text-main leading-tight mb-8">
              {t('principal.title_main')}
            </h1>

            <div className="prose prose-slate lg:prose-lg max-w-none text-text-muted leading-relaxed text-justify space-y-6">
              <p>
                {t('principal.msg_intro')}
              </p>
              
              <p>
                {t('principal.msg_holistic')}
              </p>

              <div className="my-10 p-8 bg-brand-primary/5 rounded-2xl border-l-4 border-brand-primary italic">
                &quot;{t('principal.msg_quote')}&quot;
              </div>

              <p>
                {t('principal.msg_facilities')}
              </p>

              <p>
                {t('principal.msg_closing')}
              </p>

              <p>{t('principal.warm_regards')}</p>
              
              <div className="pt-6">
                <img 
                  src="/images/principal's%20signature.png" 
                  alt="Principal Signature" 
                  className="h-10 mb-4 object-contain"
                />
                <p className="font-bold text-text-main">Dr. AK Azad</p>
                <p className="text-sm">Principal, Demo Model School & College</p>
              </div>
            </div>

            {/* Quick Links for Administration */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/administration/governing-body" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text-main">{t('principal.quick_link_governing')}</p>
                    <p className="text-xs text-text-muted uppercase">{t('principal.quick_link_leadership')}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
              </Link>
              <Link href="/administration/teachers" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text-main">{t('principal.quick_link_teachers')}</p>
                    <p className="text-xs text-text-muted uppercase">{t('principal.quick_link_faculty')}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
              </Link>
              <Link href="/administration/staff" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text-main">{t('principal.quick_link_staff')}</p>
                    <p className="text-xs text-text-muted uppercase">{t('principal.quick_link_support')}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
