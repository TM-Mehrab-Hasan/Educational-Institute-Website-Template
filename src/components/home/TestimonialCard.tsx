"use client";

import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  relation: string;
  content: string;
  rating: number;
}

export default function TestimonialCard({ name, relation, content, rating }: TestimonialCardProps) {
  return (
    <div className="bg-slate-50 p-8 rounded-3xl border border-ui-border hover:bg-white hover:shadow-xl transition-all duration-500 group relative">
      <Quote size={40} className="text-brand-primary/5 absolute top-6 right-6 group-hover:text-brand-primary/10 transition-colors" />
      <div className="flex gap-1 mb-4" aria-label={`Rated ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < rating ? "fill-orange-400 text-orange-400" : "text-slate-300"} aria-hidden="true" />
        ))}
      </div>
      <p className="text-text-muted italic mb-6 leading-relaxed text-justify relative z-10">&quot;{content}&quot;</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xl">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-text-main">{name}</h4>
          <p className="text-[10px] uppercase font-black text-brand-primary tracking-widest">{relation}</p>
        </div>
      </div>
    </div>
  );
}
