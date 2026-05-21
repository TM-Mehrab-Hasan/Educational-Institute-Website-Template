"use client";

import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import NoticeBoard from "@/components/home/NoticeBoard";
import FeatureCard from "@/components/home/FeatureCard";
import TestimonialCard from "@/components/home/TestimonialCard";
import Events from "@/components/home/Events";
import { ChevronRight, Pause, Play, Loader } from "lucide-react";
import { Link } from '@/i18n/routing';
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useScrollReveal } from "@/lib/hooks";
import { useTranslations, useLocale } from 'next-intl';
import { getContent, LocalizedNotice } from '@/lib/content-service';
import { useGuardianAuth, Review } from '@/lib/GuardianAuthContext';

export default function Home() {
  const [isTickerPlaying, setIsTickerPlaying] = useState(true);
  const { ref: welcomeRef, isVisible: welcomeVisible } = useScrollReveal();
  const { ref: sidebarRef, isVisible: sidebarVisible } = useScrollReveal();
  const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollReveal();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollReveal();
  const t = useTranslations();
  const locale = useLocale();
  const { getAllReviews } = useGuardianAuth();

  const [notices, setNotices] = useState<LocalizedNotice[]>([]);
  const [dynamicContent, setDynamicContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dynamicReviews, setDynamicReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchAll() {
      const [noticeData, contentData] = await Promise.all([
        getContent('notices', locale),
        getContent(undefined, locale)
      ]);
      if (noticeData) setNotices(noticeData);
      if (contentData) setDynamicContent(contentData);
      setDynamicReviews(getAllReviews());
      setLoading(false);
    }
    fetchAll();
  }, [locale, getAllReviews]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ui-bg">
        <Loader className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* News Ticker */}
      <div
        role="region"
        aria-label="Latest News"
        className="bg-brand-primary/5 border-y border-brand-primary/10 py-3 overflow-hidden group/ticker"
      >
        <div className="section-container flex items-center relative">
          <div className="flex items-center shrink-0 z-20 shadow-sm relative mr-6">
            <span className="bg-brand-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-l uppercase tracking-widest">
              {t('home.updates')}
            </span>
            <button
              onClick={() => setIsTickerPlaying(!isTickerPlaying)}
              className="bg-brand-secondary text-white p-1 rounded-r hover:bg-brand-primary transition-colors focus-ring"
              aria-label={isTickerPlaying ? "Pause news ticker" : "Play news ticker"}
            >
              {isTickerPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>

          <div className="flex-grow overflow-hidden relative h-6">
            {/* Masking gradients for smooth entry/exit */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-ui-bg via-transparent to-transparent w-8"></div>

            <div
              className="animate-marquee whitespace-nowrap text-sm text-brand-secondary font-semibold hover:pause-marquee cursor-default"
              style={{ animationPlayState: isTickerPlaying ? 'running' : 'paused' }}
            >
              {notices.length > 0 ? notices.map((notice, idx) => (
                <React.Fragment key={notice.id}>
                  <Link href={`/notices/${notice.id}` as any} className="mx-4 hover:text-brand-primary transition-colors" aria-label={`Notice: ${notice.title}`}>
                    {notice.title}
                  </Link>
                  {idx < notices.length - 1 && <span className="mx-4">•</span>}
                </React.Fragment>
              )) : (
                <span className="mx-4 text-text-muted">{t('home.no_recent_updates')}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome & Notice Board Section */}
      <section className="py-20 bg-ui-surface overflow-hidden">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Main Content */}
            <div
              ref={welcomeRef}
              className={`lg:col-span-8 space-y-16 transition-all duration-1000 ease-out ${
                welcomeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <article>
                <header className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-text-main leading-tight mb-4">
                    {t('welcome.title')} <span className="text-brand-primary">{t('welcome.institution')}</span>
                  </h2>
                  <div className="h-1.5 w-20 bg-brand-primary rounded-full"></div>
                </header>

                <div className="prose prose-slate lg:prose-lg text-text-muted text-justify">
                  <p className="leading-relaxed mb-6">
                    {t('welcome.text1')}
                  </p>
                  <p className="leading-relaxed mb-6">
                    {t('welcome.text2')}
                  </p>
                </div>

                <footer className="mt-10">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all focus-ring group"
                  >
                    {t('welcome.learn_more')} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </footer>
              </article>

              {/* Principal's Card */}
              <div className="bg-ui-bg rounded-2xl p-8 md:p-10 border border-ui-border flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                <div className="w-48 h-64 shrink-0 rounded-xl overflow-hidden shadow-xl ring-4 ring-white relative z-10">
                  <Image
                    src="/images/principal.jpeg"
                    alt="Principal Dr. AK Azad"
                    fill
                    priority
                    sizes="(max-width: 768px) 192px, 192px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-text-main mb-1">Dr. AK Azad</h3>
                  <p className="text-brand-primary font-bold text-sm uppercase tracking-widest mb-6">{t('principal.title')}</p>
                  <blockquote className="text-text-muted italic leading-relaxed mb-6 border-l-4 border-brand-primary/20 pl-6 text-justify">
                    &ldquo;{dynamicContent?.principalMessage?.quote || t('principal.quote')}&rdquo;
                  </blockquote>
                  <Link
                    href="/administration/principal-message"
                    className="inline-block text-xs font-black text-text-main hover:text-brand-primary uppercase tracking-tighter border-b-2 border-brand-primary pb-1 transition-colors"
                  >
                    {t('principal.read_more')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside
              ref={sidebarRef}
              className={`lg:col-span-4 space-y-10 transition-all duration-1000 delay-300 ease-out ${
                sidebarVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <NoticeBoard />

              <div className="bg-ui-surface rounded-xl border border-ui-border p-8 shadow-sm">
                <h3 className="text-lg font-bold text-text-main mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-brand-primary rounded-full"></span>
                  {t('home.quick_access')}
                </h3>
                <nav className="flex flex-col gap-3">
                  {[
                    { label: t('home.class_routines'), href: "/academic/routine" },
                    { label: t('home.download_syllabus'), href: "/academic/curriculum" },
                    { label: t('home.academic_calendar'), href: "/academic/calendar" },
                    { label: t('home.exam_schedules'), href: "/academic/holidays" },
                    { label: t('home.student_portal'), href: "/student" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href as any}
                      className="flex items-center justify-between p-4 rounded-lg bg-ui-bg border border-transparent hover:border-brand-primary/20 hover:bg-white hover:shadow-md transition-all group focus-ring"
                    >
                      <span className="text-sm font-semibold text-text-muted group-hover:text-brand-primary">{link.label}</span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-primary" />
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Stats />

      <Events />

      {/* Highlights Grid */}
      <section
        ref={highlightsRef}
        className={`py-24 bg-ui-bg transition-all duration-1000 ease-out ${
          highlightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="section-container">
          <header className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-text-main mb-4 uppercase tracking-tight">{t('highlights.title')}</h2>
            <p className="text-text-muted">{t('highlights.desc')}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              title={t('feature.campus.title')}
              description={t('feature.campus.desc')}
              img="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop"
              href="/about"
            />
            <FeatureCard
              title={t('feature.teachers.title')}
              description={t('feature.teachers.desc')}
              img="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
              href="/administration/teachers"
            />
            <FeatureCard
              title={t('feature.activities.title')}
              description={t('feature.activities.desc')}
              img="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop"
              href="/gallery"
            />
          </div>
        </div>
      </section>

      {/* Guardian Testimonials */}
      <section
        ref={testimonialsRef}
        className={`py-24 bg-white relative overflow-hidden transition-all duration-1000 ease-out ${
          testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="section-container relative z-10">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-text-main uppercase tracking-tight mb-4">
                {t('testimonials.title').split(' ')[0]} <span className="text-brand-primary">{t('testimonials.title').split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-text-muted text-justify">
                {t('testimonials.desc')}
              </p>
            </div>
            <Link href="/admission" className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 shrink-0">
              {t('home.join_community')} <ChevronRight size={20} />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name={t('testimonial1.name')}
              relation={t('testimonial1.relation')}
              content={t('testimonial1.content')}
              rating={5}
            />
            <TestimonialCard
              name={t('testimonial2.name')}
              relation={t('testimonial2.relation')}
              content={t('testimonial2.content')}
              rating={5}
            />
            <TestimonialCard
              name={t('testimonial3.name')}
              relation={t('testimonial3.relation')}
              content={t('testimonial3.content')}
              rating={4}
            />
          </div>

          {dynamicReviews.length > 0 && (
            <div className="mt-20 pt-20 border-t border-brand-primary/10">
              <div className="flex items-center gap-4 mb-12 justify-center">
                <div className="h-px bg-brand-primary/10 flex-grow max-w-[100px]"></div>
                <h3 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em] text-center">{t('home.community_reviews')}</h3>
                <div className="h-px bg-brand-primary/10 flex-grow max-w-[100px]"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dynamicReviews.map((review) => (
                  <TestimonialCard
                    key={review.id}
                    name={review.guardianName}
                    relation={review.relation}
                    content={review.content}
                    rating={review.rating}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
