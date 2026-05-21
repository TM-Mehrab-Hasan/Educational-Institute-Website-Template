"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { governingBody } from '@/data/administration';

export default function GoverningBodyPage() {
  const { t } = useLanguage();
  const members = governingBody;
  return (
    <main className="min-h-screen bg-ui-bg py-16">
      <div className="section-container">
        {/* Header */}
        <header className="mb-16">
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
            <Link href="/" className="hover:text-brand-primary transition-colors">{t('gov.breadcrumb_home')}</Link>
            <ChevronRight size={12} />
            <Link href="/administration" className="hover:text-brand-primary transition-colors">{t('gov.breadcrumb_admin')}</Link>
            <ChevronRight size={12} />
            <span className="text-brand-primary font-bold">{t('gov.breadcrumb_body')}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main leading-none mb-6">
              {t('gov.title_main')}
            </h1>
            <p className="text-lg text-text-muted text-justify leading-relaxed">
              {t('gov.intro')}
            </p>
          </div>
        </header>

        {/* Chairman Highlight */}
        <section className="mb-24">
          <div className="bg-white rounded-4xl border border-ui-border shadow-xl overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 h-[400px] lg:h-auto relative overflow-hidden">
                <img
                  src={members[0].image}
                  alt={members[0].name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-1 bg-brand-primary rounded-full"></span>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary">{members[0].role}</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-text-main mb-4 leading-tight">{members[0].name}</h2>
                <p className="text-xl font-bold text-slate-400 mb-8">{members[0].profession}</p>
                <div className="prose prose-slate text-text-muted text-justify mb-10">
                  <p>
                    {t('gov.chairman_intro')}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <a href={`mailto:${members[0].email}`} className="inline-flex items-center gap-2 text-sm font-bold text-text-main hover:text-brand-primary transition-colors">
                    <Mail size={18} /> {members[0].email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board Members Grid */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black text-text-main uppercase tracking-tight">{t('gov.board_members_title')}</h3>
            <div className="hidden md:block h-px grow mx-8 bg-ui-border"></div>
            <div className="flex items-center gap-2 text-brand-primary">
              <ShieldCheck size={24} />
              <span className="font-bold uppercase tracking-widest text-[10px]">{t('gov.verified_label')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.slice(1).map((member) => (
              <div key={member.id} className="bg-white p-6 rounded-3xl border border-ui-border hover:shadow-2xl transition-all duration-500 group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h4 className="text-lg font-black text-text-main leading-tight mb-1 group-hover:text-brand-primary transition-colors">{member.name}</h4>
                <p className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-3">{member.role}</p>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-1 mb-4">{member.profession}</p>
                <a href={`mailto:${member.email}`} className="text-xs text-slate-400 hover:text-brand-primary transition-colors flex items-center gap-2">
                  <Mail size={14} /> {member.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <footer className="mt-24 p-12 bg-white rounded-3xl border border-ui-border border-l-8 border-l-brand-primary">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
              <MapPin size={32} />
            </div>
            <div>
              <h5 className="text-xl font-bold text-text-main mb-2 uppercase tracking-tight">{t('gov.official_seat_title')}</h5>
              <p className="text-text-muted text-justify">
                {t('gov.seat_desc')}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
