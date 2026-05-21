"use client";

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Bell, Calendar, ChevronRight, FileText, Download, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
import { getContent, LocalizedNotice } from '@/lib/content-service';
import { useLocale } from 'next-intl';

interface NoticeItemProps {
  id: number;
  title: string;
  date: string;
  category: string;
  isUrgent?: boolean;
}

export function NoticeItem({ id, title, date, category, isUrgent }: NoticeItemProps) {
  const { t } = useLanguage();
  
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
          {isUrgent && (
            <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter animate-pulse">
              {t('notices.urgent')}
            </span>
          )}
          <span className="text-xs text-text-muted flex items-center gap-1 ml-auto">
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
      <button 
        onClick={() => window.open(`/notices/${id}`, '_blank')}
        aria-label={`${t('notices.download')} ${title}`}
        className="flex-shrink-0 text-text-muted hover:text-brand-primary transition-colors p-2 hover:bg-slate-100 rounded-lg"
        title="View and download"
      >
        <Download size={18} />
      </button>
    </div>
  );
}

export default function NoticeBoard() {
  const { t } = useLanguage();
  const locale = useLocale();
  const [notices, setNotices] = useState<LocalizedNotice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      const data = await getContent('notices', locale);
      if (data) {
        setNotices(data);
      }
      setLoading(false);
    }
    fetchNotices();
  }, [locale]);

  // Increase the loop factor to create a longer sequence for smoother scrolling
  // and add a clear spacer at the end of the set.
  const displayNotices = notices.length > 0 ? [...notices, ...notices, ...notices] : [];

  return (
    <section 
      aria-labelledby="notice-board-title"
      className="bg-ui-surface rounded-lg shadow-sm border border-ui-border overflow-hidden flex flex-col h-[500px]"
    >
      <header className="bg-brand-primary p-4 flex items-center justify-between z-10 relative shadow-md">
        <div className="flex items-center gap-2 text-white">
          <Bell size={20} className="animate-pulse" aria-hidden="true" />
          <h2 id="notice-board-title" className="font-bold uppercase tracking-wide text-sm">{t('notices.title')}</h2>
        </div>
        <Link 
          href="/notices" 
          className="text-[10px] font-bold text-white/90 hover:text-white uppercase tracking-widest flex items-center gap-1"
        >
          {t('notices.view_all')}
          <ChevronRight size={12} />
        </Link>
      </header>

      <div className="flex-grow overflow-hidden relative">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader className="animate-spin text-brand-primary/20" size={32} />
          </div>
        ) : notices.length > 0 ? (
          <div className="animate-vertical-marquee py-2 hover:pause-marquee">
            {displayNotices.map((notice, idx) => (
              <React.Fragment key={`${notice.id}-${idx}`}>
                <NoticeItem 
                  id={notice.id}
                  title={notice.title}
                  date={notice.date}
                  category={notice.category}
                  isUrgent={notice.isUrgent}
                />
                {(idx + 1) % notices.length === 0 && (
                  <div className="py-20 flex flex-col items-center justify-center opacity-30 grayscale pointer-events-none">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-brand-primary flex items-center justify-center mb-4">
                      <FileText size={20} className="text-brand-primary" />
                    </div>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-brand-primary to-transparent mb-3"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">End of Recent Updates</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-text-muted mt-1 italic">Repeating Scroller</p>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <FileText size={48} className="text-slate-200 mb-4" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('home.no_recent_updates')}</p>
          </div>
        )}
      </div>

      <footer className="p-4 border-t border-ui-border bg-slate-50/50 z-10 relative">
        <Link 
          href="/notices" 
          className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-ui-border rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-text-main hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all group shadow-sm"
        >
          Full Archive <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </footer>
    </section>
  );
}
