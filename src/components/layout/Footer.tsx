"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, MessageSquare, Play, ExternalLink, ChevronRight } from 'lucide-react';

const Footer = () => {
  const [year, setYear] = React.useState<number>(2026);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Top Footer */}
      <div className="section-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Institution Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-primary/20">
                S
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">DEMO MODEL COLLEGE</h2>
            </div>
            <p className="text-sm leading-relaxed font-medium">
              Empowering students through quality education and character building since 1995. One of the leading educational institutions in Dhaka.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"><Globe size={18} /></a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"><MessageSquare size={18} /></a>
              <a href="#" aria-label="Youtube" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"><Play size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-primary rounded-full"></span>
              Navigation
            </h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/about" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> About Us</Link></li>
              <li><Link href="/admission" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> Admission Info</Link></li>
              <li><Link href="/academic/calendar" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> Academic Calendar</Link></li>
              <li><Link href="/results" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> Exam Results</Link></li>
              <li><Link href="/gallery" className="hover:text-brand-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-brand-primary" /> Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-primary rounded-full"></span>
              Portals
            </h3>
            <ul className="space-y-4 text-sm font-bold">
              <li>
                <a href="https://www.educationboardresults.gov.bd/" target="_blank" className="flex items-center justify-between hover:text-brand-primary transition-colors group">
                  Board Results <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="http://www.dshe.gov.bd/" target="_blank" className="flex items-center justify-between hover:text-brand-primary transition-colors group">
                  DSHE Website <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://dhakaeducationboard.gov.bd/" target="_blank" className="flex items-center justify-between hover:text-brand-primary transition-colors group">
                  Dhaka Board <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://pmeat.gov.bd/" target="_blank" className="flex items-center justify-between hover:text-brand-primary transition-colors group">
                  PMEAT Portal <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-primary rounded-full"></span>
              Connect
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-brand-primary" />
                </div>
                <span className="font-medium leading-relaxed">123 Academy Road, Dhanmondi, Dhaka-1209, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-brand-primary" />
                </div>
                <span className="font-bold">+880 1234 567890</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-brand-primary" />
                </div>
                <span className="font-bold">info@school-name.edu.bd</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/5 py-8">
        <div className="section-container flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest">
          <p className="text-slate-500">&copy; {year} Demo Model College. Official Website.</p>
          <p className="text-slate-500">
            Powered by <span className="text-white hover:text-brand-primary transition-colors cursor-pointer">Institution Tech Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
