"use client";

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';
import { GraduationCap, Users, Award, Calendar, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function AlumniPage() {
  const { t } = useLanguage();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();

  const alumniStats = [
    { label: 'Total Alumni', value: '5,000+', icon: Users },
    { label: 'University Placement', value: '95%', icon: GraduationCap },
    { label: 'Global Presence', value: '12+ Countries', icon: Award },
  ];

  const featuredAlumni = [
    {
      name: t('about.alumni_name1'),
      dept: t('about.alumni_dept1'),
      quote: t('about.alumni_quote1'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: t('about.alumni_name2'),
      dept: t('about.alumni_dept2'),
      quote: t('about.alumni_quote2'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: t('about.alumni_name3'),
      dept: t('about.alumni_dept3'),
      quote: t('about.alumni_quote3'),
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <header className="bg-brand-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10 text-center">
          <div 
            ref={heroRef}
            className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tightest mb-6 uppercase">
              Our <span className="text-emerald-300">Alumni</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
              Celebrating the achievements of our graduates who continue to excel and lead in various fields across the globe.
            </p>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="section-container -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alumniStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-3xl border border-ui-border shadow-xl flex items-center gap-6 group hover:border-brand-primary transition-all">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <div>
                  <p className="text-3xl font-black text-text-main">{stat.value}</p>
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Alumni */}
      <section className="section-container py-24">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-black text-text-main uppercase tracking-tight mb-4">Success Stories</h2>
          <div className="h-1.5 w-20 bg-brand-primary rounded-full mx-auto"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredAlumni.map((alumnus, i) => (
            <div key={i} className="bg-slate-50 rounded-[2.5rem] p-10 border border-ui-border relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-24 h-24 rounded-3xl overflow-hidden mb-8 border-4 border-white shadow-lg group-hover:scale-105 transition-transform mx-auto">
                <img src={alumnus.image} alt={alumnus.name} className="w-full h-full object-cover" />
              </div>
              <blockquote className="text-text-muted italic leading-relaxed mb-8 text-center text-sm">
                &quot;{alumnus.quote}&quot;
              </blockquote>
              <div className="text-center">
                <h3 className="text-lg font-black text-text-main uppercase tracking-tight">{alumnus.name}</h3>
                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mt-1">{alumnus.dept}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Network */}
      <section className="section-container">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">Join the Network</h2>
              <p className="text-white/60 text-lg leading-relaxed font-medium">
                Stay connected with your alma mater. Register as an alumnus to receive exclusive updates, event invitations, and networking opportunities.
              </p>
            </div>
            <button className="px-10 py-5 bg-brand-primary text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-brand-primary/30 hover:bg-white hover:text-brand-primary transition-all flex items-center gap-3">
              Register Now <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
