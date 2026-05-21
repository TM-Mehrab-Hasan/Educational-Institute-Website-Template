"use client";

import React, { use, useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronLeft, Calendar, FileText, Download, Share2, Printer, Loader } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import NoticeDetailPDF from '@/lib/pdf/NoticeDetailPDF';
import { getContent, LocalizedNotice } from '@/lib/content-service';
import { useTranslations, useLocale } from 'next-intl';

export default function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations();
  const locale = useLocale();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [notice, setNotice] = useState<LocalizedNotice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotice() {
      const data = await getContent('notices', locale);
      if (data) {
        const found = data.find((n: LocalizedNotice) => n.id === parseInt(id));
        setNotice(found || null);
      }
      setLoading(false);
    }
    fetchNotice();
  }, [id, locale]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (!notice) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: notice.title,
          text: `Check out this notice from Demo Model School & College: ${notice.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = async () => {
    if (!notice) return;
    setPdfLoading(true);
    try {
      const logoUrl = `${window.location.origin}/images/logo.png`;
      const blob = await pdf(
        <NoticeDetailPDF
          title={notice.title}
          date={notice.date}
          category={notice.category}
          isUrgent={!!notice.isUrgent}
          content={notice.content}
          schoolName="Demo Model School & College"
          logoUrl={logoUrl}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF');
    } finally {
      setPdfLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  if (!notice) {
    return (
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="section-container max-w-4xl">
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary mb-8 hover:gap-3 transition-all"
          >
            <ChevronLeft size={18} /> {t('common.back')}
          </Link>
          <div className="bg-white rounded-3xl p-12 text-center border border-ui-border">
            <FileText size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-slate-600">{t('common.not_found')}</h2>
            <p className="text-slate-500 mt-2">{t('common.not_found_desc')}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 print:bg-white print:py-0">
      <div className="section-container max-w-4xl print:max-w-none">
        <Link 
          href="/notices"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary mb-8 hover:gap-3 transition-all print:hidden"
        >
          <ChevronLeft size={18} /> {t('common.back')}
        </Link>

        <article className="bg-white rounded-3xl border border-ui-border shadow-xl overflow-hidden print:shadow-none print:border-none">
          <header className="p-8 md:p-12 border-b border-ui-border bg-slate-50/50 print:bg-white">
            <div className="flex items-center gap-3 mb-6 print:hidden">
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${notice.isUrgent ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-slate-200 text-slate-700'}`}>
                {notice.category}
              </span>
              <span className="text-sm text-text-muted flex items-center gap-1.5 font-medium">
                <Calendar size={16} />
                {notice.date}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-main leading-tight mb-8">
              {notice.title}
            </h1>

            <div className="flex flex-wrap gap-4 print:hidden">
              <button
                onClick={handleDownload}
                disabled={pdfLoading}
                className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
              >
                {pdfLoading ? <Loader size={18} className="animate-spin" /> : <Download size={18} />}
                {pdfLoading ? t('common.loading') : t('notices.download')}
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-ui-border text-text-main font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                <Printer size={18} /> Print
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-ui-border text-text-main font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                <Share2 size={18} /> Share
              </button>
            </div>
          </header>

          <div className="p-8 md:p-12">
            <div
              className="prose prose-slate lg:prose-lg max-w-none text-text-muted leading-relaxed text-justify space-y-6"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            />
          </div>

          <footer className="p-8 bg-slate-50 border-t border-ui-border print:bg-white">
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-ui-border border-l-4 border-l-brand-primary">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-main mb-1">Office of the Principal</p>
                <p className="text-xs text-text-muted uppercase tracking-widest">Demo Model School & College, Dhaka</p>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
