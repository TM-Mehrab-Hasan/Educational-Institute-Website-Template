"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { Mail, Phone, MapPin, Globe, MessageSquare, Play, ExternalLink, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const [year] = React.useState<number>(() => new Date().getFullYear());
  const t = useTranslations();

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Top Footer */}
      <div className="section-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Institution Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-lg shadow-white/5 overflow-hidden">
                <img 
                  src="/images/logo.png" 
                  alt="Demo Model School & College Logo" 
                />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Demo Model School & College</h2>
            </div>
            <p className="text-sm leading-relaxed font-medium">
              Empowering the next generation with holistic education, blending academic rigor with ethical integrity.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"><Globe size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"><MessageSquare size={18} /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"><Play size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-primary rounded-full"></span>
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/about" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> {t('footer.about_us')}</Link></li>
              <li><Link href="/admission" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> {t('footer.admission_info')}</Link></li>
              <li><Link href="/admission" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> {t('nav.admission')}</Link></li>
              <li><Link href="/student" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> {t('nav.student')}</Link></li>
              <li><Link href="/guardian" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> {t('nav.guardian')}</Link></li>
              <li><Link href="/gallery" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> {t('footer.photo_gallery')}</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-primary rounded-full"></span>
              {t('footer.portals')}
            </h3>
            <ul className="space-y-4 text-sm font-bold">
              <li>
                <a href="https://www.educationboardresults.gov.bd/" target="_blank" className="flex items-center justify-between hover:text-brand-primary transition-colors group">
                  {t('footer.board_results')} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="http://www.dshe.gov.bd/" target="_blank" className="flex items-center justify-between hover:text-brand-primary transition-colors group">
                  {t('footer.dshe_website')} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://dhakaeducationboard.gov.bd/" target="_blank" className="flex items-center justify-between hover:text-brand-primary transition-colors group">
                  {t('footer.dhaka_board')} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://pmeat.gov.bd/" target="_blank" className="flex items-center justify-between hover:text-brand-primary transition-colors group">
                  {t('footer.pmeat_portal')} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-primary rounded-full"></span>
              {t('footer.connect')}
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-brand-primary" />
                </div>
                <span className="font-medium leading-relaxed">{t('footer.address')}</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-brand-primary" />
                </div>
                <a href="tel:+8801234567890" className="font-bold hover:text-brand-primary transition-colors">{t('topbar.phone')}</a>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-brand-primary" />
                </div>
                <a href="mailto:info@demo.edu.bd" className="font-bold hover:text-brand-primary transition-colors">{t('topbar.email')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/5 py-8">
        <div className="section-container flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest">
          <p className="text-slate-500">&copy; {year} Demo Model School & College. All Rights Reserved.</p>
          <p className="text-slate-500">
            Powered by <span className="text-white hover:text-brand-primary transition-colors cursor-pointer">Institution Tech Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
