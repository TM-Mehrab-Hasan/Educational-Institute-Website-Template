"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { History, Target, Building2, ChevronRight, Award, GraduationCap, Users, MapPin, Phone, Mail, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import CampusVisitModal from '@/components/ui/CampusVisitModal';

export default function AboutPage() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pb-24 bg-ui-bg min-h-screen">
      <CampusVisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Page Header */}
      <header className="bg-brand-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} />
            <span className="text-white">{t('nav.about')}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            {t('about.heritage')} <br className="hidden md:block" /> <span className="text-white/60">{t('about.vision')}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            {t('about.nurturing')}
          </p>
        </div>
      </header>

      <div className="section-container mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white p-12 rounded-[3rem] border border-ui-border shadow-sm">
              <h2 className="text-3xl font-black text-text-main uppercase tracking-tight mb-8">Institutional Overview</h2>
              <p className="text-text-muted text-lg leading-relaxed text-justify mb-8 font-medium">
                Demo Model College is a premier educational institution in Dhaka, Bangladesh, dedicated to providing a holistic learning experience that combines academic excellence with character development. Since our founding in 1995, we have been at the forefront of educational innovation, preparing students for the challenges of the 21st century.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Link href="/about/history" className="group p-8 bg-slate-50 rounded-3xl border border-ui-border hover:bg-brand-primary hover:text-white transition-all duration-500">
                  <History size={32} className="text-brand-primary group-hover:text-white mb-6 transition-colors" />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('nav.history')}</h3>
                  <p className="text-sm opacity-70 font-medium">Explore our 28-year journey of academic success.</p>
                </Link>
                <Link href="/about/mission-vision" className="group p-8 bg-slate-50 rounded-3xl border border-ui-border hover:bg-brand-primary hover:text-white transition-all duration-500">
                  <Target size={32} className="text-brand-primary group-hover:text-white mb-6 transition-colors" />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('nav.mission')}</h3>
                  <p className="text-sm opacity-70 font-medium">Learn about our mission, vision, and core values.</p>
                </Link>
                <Link href="/about/facilities" className="group p-8 bg-slate-50 rounded-3xl border border-ui-border hover:bg-brand-primary hover:text-white transition-all duration-500">
                  <Building2 size={32} className="text-brand-primary group-hover:text-white mb-6 transition-colors" />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('nav.facilities')}</h3>
                  <p className="text-sm opacity-70 font-medium">Discover our world-class campus and infrastructure.</p>
                </Link>
              </div>
            </div>

            <div className="bg-brand-primary p-12 rounded-[3rem] text-white overflow-hidden relative group text-center">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-6">{t('visit.title')}</h2>
                <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto font-medium">
                  {t('visit.subtitle')}
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-10 py-4 bg-white text-brand-primary font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
                >
                  {t('visit.schedule')}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Quick Stats */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-ui-border shadow-sm group">
              <h3 className="text-2xl font-black text-text-main mb-10 uppercase tracking-tight">At a Glance</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-text-main">2,500+</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Students</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-text-main">150+</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Expert Faculty</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-text-main">28 Years</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Of Excellence</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contacts */}
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-ui-border shadow-sm">
              <h3 className="text-2xl font-black text-text-main mb-8 uppercase tracking-tight">Contact Us</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin size={20} className="text-brand-primary shrink-0" />
                  <p className="text-sm text-text-muted font-medium leading-relaxed">
                    123 Academic Avenue, Dhanmondi, Dhaka-1209, Bangladesh
                  </p>
                </div>
                <div className="flex gap-4">
                  <Phone size={20} className="text-brand-primary shrink-0" />
                  <p className="text-sm text-text-muted font-medium">{t('topbar.phone')}</p>
                </div>
                <div className="flex gap-4">
                  <Mail size={20} className="text-brand-primary shrink-0" />
                  <p className="text-sm text-text-muted font-medium">{t('topbar.email')}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
