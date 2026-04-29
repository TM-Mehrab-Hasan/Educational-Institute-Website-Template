"use client";

import React from 'react';
import Link from 'next/link';
import { Target, Star, ChevronRight, Shield, Lightbulb, Heart } from 'lucide-react';
import { coreValues } from '../../../data/about';

const valueIcons: Record<string, React.ReactNode> = {
  Shield: <Shield size={32} />,
  Lightbulb: <Lightbulb size={32} />,
  Star: <Star size={32} />,
  Heart: <Heart size={32} />
};

export default function MissionVisionPage() {
  return (
    <div className="pb-24 bg-ui-bg min-h-screen">
      <header className="bg-brand-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight size={12} />
            <span className="text-white">Mission & Vision</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            Our <span className="text-white/60">Purpose</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            Defining our path through core values, clear vision, and a steadfast mission.
          </p>
        </div>
      </header>

      <div className="section-container mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="bg-white p-12 rounded-[3rem] border border-ui-border shadow-sm hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <Target size={40} />
            </div>
            <h3 className="text-3xl font-black text-text-main mb-6 uppercase tracking-tight">Our Mission</h3>
            <p className="text-text-muted text-xl leading-relaxed text-justify font-medium">
              To empower students with a holistic education that blends academic rigor with ethical integrity, preparing them to lead with purpose in a global society. We strive to create an environment where intellectual curiosity meets social responsibility.
            </p>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-ui-border shadow-sm hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-10 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
              <Star size={40} />
            </div>
            <h3 className="text-3xl font-black text-text-main mb-6 uppercase tracking-tight">Our Vision</h3>
            <p className="text-text-muted text-xl leading-relaxed text-justify font-medium">
              To be a center of excellence recognized for fostering intellectual curiosity, character development, and a lifelong passion for learning and innovation. Our goal is to set the standard for transformative education in Bangladesh.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Core Values</h2>
              <p className="text-white/60 font-medium">The principles that guide our institutional culture and daily decisions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value) => (
                <div key={value.id} className="p-10 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-brand-primary/50 transition-all text-center group">
                  <div className="text-brand-primary mb-8 flex justify-center group-hover:scale-110 transition-transform duration-500">
                    {valueIcons[value.icon]}
                  </div>
                  <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{value.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed font-medium">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
