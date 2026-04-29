"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, FileText, Download, Share2, Printer } from 'lucide-react';

export default function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // Mock data for a single notice
  const notice = {
    id: parseInt(id),
    title: "Class XI Online Admission Guidelines for Session 2026-27",
    date: "25 Apr 2026",
    category: "Admission",
    isUrgent: true,
    content: `
      <p>Dear Applicants and Parents,</p>
      <p>We are pleased to announce the commencement of the Class XI Online Admission process for the academic session 2026-2027 at Demo Model College. Following the Ministry of Education guidelines, the admission process will be conducted entirely online through the central admission portal.</p>
      <h3>Key Dates:</h3>
      <ul>
        <li>Application Start: May 1, 2026</li>
        <li>Application Deadline: May 15, 2026</li>
        <li>First Merit List: May 25, 2026</li>
        <li>Admission Period: June 1 - June 10, 2026</li>
      </ul>
      <h3>Required Documents:</h3>
      <p>Candidates are requested to keep digital copies of the following documents ready for the application:</p>
      <ul>
        <li>SSC Transcript/Mark sheet</li>
        <li>Testimonial from the previous school</li>
        <li>Passport size photographs</li>
        <li>Birth Certificate</li>
      </ul>
      <p>For any technical assistance during the application process, please contact our help desk at +880 1234 567890 or email us at admissions@demomodelcollege.edu.</p>
    `
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: notice.title,
          text: `Check out this notice from Demo Model College: ${notice.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    alert(`Generating PDF for: ${notice.title}\n(In a production environment, this would trigger a PDF generation service)`);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 print:bg-white print:py-0">
      <div className="section-container max-w-4xl print:max-w-none">
        <Link 
          href="/notices" 
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary mb-8 hover:gap-3 transition-all print:hidden"
        >
          <ChevronLeft size={18} /> Back to All Notices
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
                className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20"
              >
                <Download size={18} /> Download PDF
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
                <p className="text-xs text-text-muted uppercase tracking-widest">Demo Model College, Dhaka</p>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
