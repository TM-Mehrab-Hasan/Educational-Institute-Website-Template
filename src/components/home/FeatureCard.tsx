"use client";

import { Link } from '@/i18n/routing';
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  img: string;
  href: string;
}

export default function FeatureCard({ title, description, img, href }: FeatureCardProps) {
  return (
    <Link href={href} className="group bg-ui-surface rounded-2xl overflow-hidden border border-ui-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 block focus-ring">
      <div className="h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        <Image 
          src={img} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-brand-primary transition-colors">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed text-justify">{description}</p>
      </div>
    </Link>
  );
}
