"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: "Nurturing the Leaders of Tomorrow",
    subtitle: "A legacy of academic excellence and character building since 1995.",
    image: "https://images.unsplash.com/photo-1523050853063-bd31406796a5?q=80&w=1600&auto=format&fit=crop",
    ctaLabel: "Admissions 2026",
    ctaLink: "/admission"
  },
  {
    id: 2,
    title: "Innovation in the Classroom",
    subtitle: "State-of-the-art laboratories and digital learning environments.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop",
    ctaLabel: "View Facilities",
    ctaLink: "/about"
  },
  {
    id: 3,
    title: "Holistic Development",
    subtitle: "Developing talent through sports, debate, and cultural enrichment.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop",
    ctaLabel: "Student Life",
    ctaLink: "/gallery"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  return (
    <section 
      aria-label="Campus Highlights" 
      className="relative h-[450px] md:h-[550px] lg:h-[650px] w-full overflow-hidden bg-slate-900"
    >
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== current}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent z-10" />
            <img
              src={slide.image}
              alt="" // Decorational, title provides context
              className="h-full w-full object-cover"
            />
            
            {/* Content Container */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="section-container w-full">
                <div className="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-xl">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href={slide.ctaLink}
                      className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-4 rounded-md font-bold transition-all focus-ring shadow-lg shadow-black/20"
                    >
                      {slide.ctaLabel}
                    </Link>
                    <Link 
                      href="/gallery"
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-md font-bold transition-all focus-ring text-center"
                    >
                      Explore Campus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-30">
        <div className="section-container flex items-center justify-between">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "h-1.5 transition-all duration-300 rounded-full focus-ring",
                  index === current ? "w-10 bg-brand-primary" : "w-4 bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              className="text-white/60 hover:text-white transition-colors focus-ring"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors focus-ring"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors focus-ring"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
