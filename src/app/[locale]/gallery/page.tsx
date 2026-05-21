"use client";

import React, { useState } from 'react';
import { ImageIcon, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';

const categories = ["All Photos", "Campus View", "Academic Life", "Sports & Games", "Cultural Events"];

const images = [
  { id: 1, category: "Campus View", title: "Main Administrative Building", url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=600&auto=format&fit=crop" },
  { id: 2, category: "Cultural Events", title: "Annual Prize Giving Ceremony 2025", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop" },
  { id: 3, category: "Academic Life", title: "Advanced Physics Laboratory", url: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop" },
  { id: 4, category: "Sports & Games", title: "Inter-College Cricket Tournament", url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop" },
  { id: 5, category: "Campus View", title: "The Central Library Reading Hall", url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop" },
  { id: 6, category: "Academic Life", title: "Digital Classroom Session", url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop" },
  { id: 7, category: "Cultural Events", title: "Pahela Baishakh Celebration", url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop" },
  { id: 8, category: "Sports & Games", title: "Annual Athletics Meet", url: "https://images.unsplash.com/photo-1526676023131-d352423b3296?q=80&w=600&auto=format&fit=crop" },
  { id: 9, category: "Campus View", title: "College Auditorium External", url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=600&auto=format&fit=crop" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Photos");

  const filteredImages = activeCategory === "All Photos" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="pb-24">
      {/* Page Header */}
      <header className="bg-brand-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="section-container relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span>Media Center</span>
            <ChevronRight size={12} />
            <span>Photo Gallery</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Campus Photo Gallery</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            A visual journey through the vibrant student life and facilities at Demo Model School & College.
          </p>
        </div>
      </header>

      <div className="section-container mt-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border focus-ring",
                activeCategory === cat 
                  ? "bg-text-main border-text-main text-white shadow-xl shadow-black/10" 
                  : "bg-white border-ui-border text-text-muted hover:border-text-main hover:text-text-main"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              className="group relative rounded-3xl overflow-hidden shadow-sm aspect-square bg-slate-100 border border-ui-border animate-in fade-in zoom-in-95 duration-500"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                loading="lazy"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.2em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {img.category}
                </span>
                <h3 className="text-white text-lg font-bold leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {img.title}
                </h3>
                
                <div className="absolute top-6 right-6">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-150">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-32 bg-ui-surface rounded-3xl border-2 border-dashed border-ui-border">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
              <ImageIcon size={40} />
            </div>
            <h3 className="text-xl font-black text-text-main mb-2 uppercase tracking-tight">No Media Found</h3>
            <p className="text-text-muted">We haven&apos;t added any photos for this category yet.</p>
          </div>
        )}

        {/* Action Call */}
        <div className="mt-24 text-center">
          <p className="text-sm font-bold text-text-muted uppercase tracking-[0.3em] mb-6">Want to see more?</p>
          <button className="px-10 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-brand-primary/20 transition-all focus-ring active:scale-95">
            Visit Our YouTube Channel
          </button>
        </div>
      </div>
    </div>
  );
}
