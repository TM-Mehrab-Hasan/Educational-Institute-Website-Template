"use client";

import React from 'react';
import Link from 'next/link';
import { Bell, Calendar, ChevronRight, FileText, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NoticeItemProps {
  id: number;
  title: string;
  date: string;
  category: string;
  isUrgent?: boolean;
}

export function NoticeItem({ id, title, date, category, isUrgent }: NoticeItemProps) {
  return (
    <div 
      className={cn(
        "group flex items-start gap-4 p-4 border-b border-ui-border last:border-0 hover:bg-ui-bg/50 transition-colors focus-within:bg-ui-bg",
        isUrgent && "bg-brand-primary/5"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded flex items-center justify-center",
        isUrgent ? "bg-brand-primary text-white" : "bg-slate-100 text-slate-500"
      )}>
        <FileText size={20} aria-hidden="true" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
            isUrgent ? "bg-brand-primary text-white" : "bg-slate-200 text-slate-700"
          )}>
            {category}
          </span>
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Calendar size={12} aria-hidden="true" />
            {date}
          </span>
        </div>
        <Link 
          href={`/notices/${id}`} 
          className="block text-sm font-semibold text-text-main hover:text-brand-primary transition-colors focus-ring leading-tight"
        >
          {title}
        </Link>
      </div>
      <a 
        href={`/api/notices/download/${id}`}
        download
        aria-label={`Download ${title}`}
        className="flex-shrink-0 text-text-muted hover:text-brand-primary transition-colors p-2"
        onClick={(e) => {
          e.preventDefault();
          alert(`Downloading: ${title}\n(In a real app, this would download a PDF)`);
        }}
      >
        <Download size={18} />
      </a>
    </div>
  );
}

export default function NoticeBoard() {
  const notices = [
    { id: 1, title: "Class XI Online Admission Guidelines for Session 2026-27", date: "25 Apr 2026", category: "Admission", isUrgent: true },
    { id: 2, title: "SSC 2026 Test Examination Schedule and Seat Plan", date: "22 Apr 2026", category: "Examination" },
    { id: 3, title: "Summer Vacation and Eid-ul-Adha Holidays Notification", date: "18 Apr 2026", category: "Holiday" },
    { id: 4, title: "Revised Academic Calendar for Second Semester", date: "15 Apr 2026", category: "Academic" },
    { id: 5, title: "Annual Science & Technology Fair Registration Open", date: "10 Apr 2026", category: "Events" },
  ];

  // Double the notices to create a seamless loop
  const displayNotices = [...notices, ...notices];

  return (
    <section 
      aria-labelledby="notice-board-title"
      className="bg-ui-surface rounded-lg shadow-sm border border-ui-border overflow-hidden flex flex-col h-[500px]"
    >
      <header className="bg-brand-primary p-4 flex items-center justify-between z-10 relative shadow-md">
        <div className="flex items-center gap-2 text-white">
          <Bell size={20} className="animate-pulse" aria-hidden="true" />
          <h2 id="notice-board-title" className="font-bold uppercase tracking-wide text-sm">Notice Board</h2>
        </div>
        <Link 
          href="/notices" 
          className="text-[10px] font-bold text-white/90 hover:text-white uppercase tracking-widest flex items-center gap-1"
        >
          All Notices <ChevronRight size={12} />
        </Link>
      </header>

      <div className="flex-grow overflow-hidden relative">
        <div className="animate-vertical-marquee py-2 hover:pause-marquee">
          {displayNotices.map((notice, idx) => (
            <NoticeItem 
              key={`${notice.id}-${idx}`}
              id={notice.id}
              title={notice.title}
              date={notice.date}
              category={notice.category}
              isUrgent={notice.isUrgent}
            />
          ))}
        </div>
      </div>

      <footer className="p-4 border-t border-ui-border bg-slate-50/50 z-10 relative shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link 
          href="/admission" 
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded shadow-sm transition-all focus-ring"
        >
          Proceed to Online Admission <ChevronRight size={14} />
        </Link>
      </footer>
    </section>
  );
}
