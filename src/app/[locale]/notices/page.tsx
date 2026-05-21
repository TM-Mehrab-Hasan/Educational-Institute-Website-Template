import React from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, Calendar, FileText, Search } from 'lucide-react';
import { getContent, LocalizedNotice } from '@/lib/content-service';
import { getTranslations } from 'next-intl/server';

export default async function NoticesPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const notices: LocalizedNotice[] = await getContent('notices', locale) || [];

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="section-container">
        <header className="mb-12">
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-brand-primary">{t('admission.home')}</Link>
            <ChevronRight size={12} />
            <span className="text-brand-primary font-bold">{t('notices.title')}</span>
          </nav>
          <h1 className="text-4xl font-black text-text-main mb-4">{t('notices.title')}</h1>
          <p className="text-text-muted max-w-2xl">{t('notices.desc') || 'Official announcements, examination schedules, and academic updates.'}</p>
        </header>

        <div className="bg-white rounded-2xl border border-ui-border shadow-sm overflow-hidden">
          {/* Search & Filter - Simplified for Server Component or could be extracted to Client Component */}
          <div className="p-4 border-b border-ui-border bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={t('person.search_placeholder')}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-ui-border focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-sm"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {['All', 'Admission', 'Academic', 'Examination', 'Holiday', 'Events'].map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${cat === 'All' ? 'bg-brand-primary text-white' : 'bg-white border border-ui-border text-text-muted hover:border-brand-primary/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-ui-border">
            {notices.length > 0 ? notices.map((notice) => (
              <div key={notice.id} className="p-6 hover:bg-slate-50 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4 items-start">
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${notice.isUrgent ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-slate-100 text-slate-400'}`}>
                      <FileText size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${notice.isUrgent ? 'bg-brand-primary/10 text-brand-primary' : 'bg-slate-200 text-slate-600'}`}>
                          {notice.category}
                        </span>
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Calendar size={14} />
                          {notice.date}
                        </span>
                      </div>
                      <Link href={`/notices/${notice.id}` as any} className="text-lg font-bold text-text-main hover:text-brand-primary transition-colors leading-tight block">
                        {notice.title}
                      </Link>
                    </div>
                  </div>
                  <Link
                    href={`/notices/${notice.id}` as any}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border-2 border-brand-primary/10 text-brand-primary font-bold text-sm hover:bg-brand-primary hover:text-white transition-all group"
                  >
                    {t('common.read_more')} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )) : (
              <div className="p-12 text-center text-text-muted">
                {t('common.not_found')}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
