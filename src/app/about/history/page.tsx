"use client";

import React from 'react';
import Link from 'next/link';
import { History, ChevronRight } from 'lucide-react';

export default function HistoryPage() {
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
            <span className="text-white">Our History</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            Our <span className="text-white/60">History</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            A journey of excellence, character building, and academic success since 1995.
          </p>
        </div>
      </header>

      <div className="section-container mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
              <History size={32} />
            </div>
            <h2 className="text-4xl font-black text-text-main uppercase tracking-tight">The Journey Began</h2>
          </div>
          
          <div className="prose prose-slate lg:prose-xl text-text-muted text-justify leading-relaxed space-y-8 font-medium">
            <p>
              Founded in 1995, Demo Model College began with a simple yet profound goal: to provide world-class education that is accessible to all. What started as a small initiative with 10 teachers and 100 students in a modest building has now evolved into one of Bangladesh's premier educational institutions.
            </p>
            
            <div className="bg-white p-10 rounded-[2.5rem] border border-ui-border shadow-sm my-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/10 transition-colors duration-700"></div>
              <h3 className="text-2xl font-black text-text-main mb-6 relative z-10">Early Milestones</h3>
              <p className="relative z-10">
                In its first decade, the college focused on establishing a culture of discipline and rigorous academic standards. By 2005, we had doubled our student capacity and introduced state-of-the-art laboratory facilities, setting a new benchmark for secondary education in Dhaka.
              </p>
            </div>

            <p>
              Over the last three decades, we have consistently secured top positions in the Dhaka Education Board results. Our alumni are now leaders in medicine, engineering, public service, and the arts, carrying forward the values of integrity and service they learned within these walls.
            </p>

            <p>
              Today, Demo Model College stands as a symbol of progress, blending tradition with modern technology. Our commitment remains unchanged: to nurture the next generation of leaders who will contribute meaningfully to the nation and the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
