"use client";

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollReveal } from '@/lib/hooks';
import { 
  GraduationCap, Users, Award, Calendar, ChevronRight, 
  Search, Briefcase, Heart, MessageSquare, LogOut, 
  UserCircle, Settings, Bell, ArrowRight, X, BookOpen,
  CheckCircle2, Clock, MapPin, ExternalLink, Filter, Plus, Camera, Save, User, Mail, Phone, Download, FileText
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useAlumniAuth, Alumni, JobOpportunity } from '@/lib/AlumniAuthContext';
import AlumniLoginForm from '@/components/alumni/AlumniLoginForm';
import AlumniRegisterForm from '@/components/alumni/AlumniRegisterForm';
import { cn } from '@/lib/utils';

// Client-side only PDF download
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);
import AlumniReceiptPDF from '@/lib/pdf/AlumniReceiptPDF';

export default function AlumniPage() {
  const { t } = useLanguage();
  const { currentAlumni, logout, getAllAlumni } = useAlumniAuth();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<'Directory' | 'Donations' | 'Events' | 'Jobs' | 'Profile'>('Directory');

  const featuredAlumni = [
    {
      name: "Tanvir Ahmed",
      dept: "Science, Batch 2012",
      quote: "The foundation I received here shaped my career in software engineering. Always proud to be an alumnus.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Sultana Razia",
      dept: "Business Studies, Batch 2015",
      quote: "Grateful for the leadership skills I developed. The alumni network has been incredibly supportive.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  if (currentAlumni) {
    return <AlumniDashboard alumni={currentAlumni} logout={logout} activeTab={activeTab} setActiveTab={setActiveTab} getAllAlumni={getAllAlumni} />;
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <header className="bg-brand-primary py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10 text-center">
          <div ref={heroRef} className={cn("transition-all duration-1000", heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-white/10">
              <Award size={14} className="text-emerald-300" /> Exclusive Alumni Network
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tightest">Our <span className="text-emerald-300">Alumni</span></h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              Celebrating the achievements of our graduates. Join the network to stay connected.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button onClick={() => openAuth('register')} className="px-10 py-5 bg-white text-brand-primary font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-emerald-300 hover:text-brand-primary transition-all flex items-center gap-3">Join Network <ChevronRight size={20} /></button>
              <button onClick={() => openAuth('login')} className="px-10 py-5 bg-brand-primary border-2 border-white/20 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3">Member Login <LogOut size={20} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Alumni */}
      <section className="section-container py-24">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-black text-text-main uppercase tracking-tight mb-4">Success Stories</h2>
          <div className="h-1.5 w-20 bg-brand-primary rounded-full mx-auto"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
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

      {/* Auth Modal Placeholder */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-300">
             {/* Modal Content */}
             <div className="flex justify-between items-center mb-8">
                <div><h3 className="text-2xl font-black text-text-main uppercase tracking-tight">{authMode === 'login' ? 'Alumni Login' : 'Join Network'}</h3></div>
                <button onClick={() => setShowAuthModal(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"><X size={20} /></button>
              </div>
              {authMode === 'login' ? <AlumniLoginForm onSuccess={() => setShowAuthModal(false)} /> : <AlumniRegisterForm onSuccess={() => setShowAuthModal(false)} />}
          </div>
        </div>
      )}
    </main>
  );
}

// DASHBOARD_PLACEHOLDER
