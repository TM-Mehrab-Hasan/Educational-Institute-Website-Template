"use client";

import React, { useState } from 'react';
import { ChevronRight, Trophy, GraduationCap, Music, Beaker, Users, Calendar, MapPin, Clock, ExternalLink, Search, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'sports' | 'academic' | 'cultural' | 'science' | 'community';
  image: string;
  featured?: boolean;
  gcalDate: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Annual Sports Day 2026",
    description: "Our biggest sporting event of the year! Students from all classes compete in athletics, football, cricket, badminton, and more. Trophies and medals awarded across age groups.",
    date: "25 Jan 2026",
    time: "8:00 AM – 5:00 PM",
    location: "Main Sports Ground",
    category: "sports",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
    featured: true,
    gcalDate: "20260125",
  },
  {
    id: 2,
    title: "Inter-House Debate Championship",
    description: "Students represent their houses in this prestigious debate competition. Topics cover current affairs, ethics, and social issues. Judged by faculty and external experts.",
    date: "12 Feb 2026",
    time: "10:00 AM – 2:00 PM",
    location: "Main Auditorium",
    category: "academic",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop",
    gcalDate: "20260212",
  },
  {
    id: 3,
    title: "Science & Innovation Fair",
    description: "Students showcase original science projects, experiments, and innovations. Best projects receive institutional funding and mentorship for further development.",
    date: "15 Apr 2026",
    time: "9:00 AM – 4:00 PM",
    location: "Science Block & Courtyard",
    category: "science",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    featured: true,
    gcalDate: "20260415",
  },
  {
    id: 4,
    title: "Annual Cultural Night",
    description: "A spectacular evening of music, dance, drama, and poetry. Students perform cultural acts celebrating the rich heritage of Bangladesh alongside original artistic creations.",
    date: "20 Mar 2026",
    time: "6:00 PM – 10:00 PM",
    location: "Open Air Theatre",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    gcalDate: "20260320",
  },
  {
    id: 5,
    title: "Blood Donation Camp",
    description: "In partnership with the National Blood Bank, our students and faculty participate in this life-saving community initiative. Refreshments and certificates for all donors.",
    date: "10 Apr 2026",
    time: "9:00 AM – 3:00 PM",
    location: "College Medical Room",
    category: "community",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop",
    gcalDate: "20260410",
  },
  {
    id: 6,
    title: "Annual Prize Giving Ceremony",
    description: "Celebrating academic excellence, co-curricular achievements, and outstanding contributions to college life. Attended by guardians, distinguished alumni, and special guests.",
    date: "05 Sep 2026",
    time: "10:00 AM – 1:00 PM",
    location: "Main Auditorium",
    category: "academic",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
    featured: true,
    gcalDate: "20260905",
  },
  {
    id: 7,
    title: "Mathematics Olympiad",
    description: "Rigorous problem-solving competition for HSC students. Winners represent the college at the National Mathematics Olympiad. Coaching sessions available beforehand.",
    date: "18 Feb 2026",
    time: "9:00 AM – 12:00 PM",
    location: "Examination Hall",
    category: "academic",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    gcalDate: "20260218",
  },
  {
    id: 8,
    title: "Inter-School Football Tournament",
    description: "Demo Model School & College hosts 8 schools in our prestigious annual football tournament. Come cheer for our team as they defend last year's championship title!",
    date: "08 Mar 2026",
    time: "9:00 AM – 6:00 PM",
    location: "Main Sports Ground",
    category: "sports",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop",
    gcalDate: "20260308",
  },
];

const categoryConfig = {
  sports: { label: "Sports", icon: Trophy, color: "bg-amber-100 text-amber-700 border-amber-200", gradient: "from-amber-500 to-orange-600", dot: "bg-amber-500" },
  academic: { label: "Academic", icon: GraduationCap, color: "bg-brand-primary/10 text-brand-primary border-brand-primary/20", gradient: "from-brand-primary to-brand-secondary", dot: "bg-brand-primary" },
  cultural: { label: "Cultural", icon: Music, color: "bg-rose-100 text-rose-700 border-rose-200", gradient: "from-rose-500 to-pink-600", dot: "bg-rose-500" },
  science: { label: "Science", icon: Beaker, color: "bg-emerald-100 text-emerald-700 border-emerald-200", gradient: "from-emerald-500 to-teal-600", dot: "bg-emerald-500" },
  community: { label: "Community", icon: Users, color: "bg-slate-100 text-slate-700 border-slate-200", gradient: "from-slate-500 to-slate-600", dot: "bg-slate-500" },
};

const buildGCalUrl = (title: string, gcalDate: string, location: string) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${title} — Demo Model School & College`,
    dates: `${gcalDate}/${gcalDate}`,
    details: `Demo Model School & College event: ${title}`,
    location: `${location}, Demo Model School & College, Dhaka`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filters = [
    { key: 'all', label: 'All Events' },
    { key: 'sports', label: 'Sports' },
    { key: 'academic', label: 'Academic' },
    { key: 'cultural', label: 'Cultural' },
    { key: 'science', label: 'Science' },
    { key: 'community', label: 'Community' },
  ];

  const filtered = events.filter(e => {
    const matchCategory = activeFilter === 'all' || e.category === activeFilter;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
                        e.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => a.gcalDate.localeCompare(b.gcalDate));
  
  const now = new Date();
  const currentMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;

  const featured = sorted.filter(e => 
    e.featured && e.gcalDate.substring(0, 6) >= currentMonth
  );
  
  const regular = sorted.filter(e => 
    !e.featured || (e.featured && e.gcalDate.substring(0, 6) < currentMonth)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <header className="relative bg-gradient-to-br from-slate-900 via-brand-primary/80 to-brand-secondary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
        </div>

        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/academic" className="hover:text-white transition-colors">Academic</Link>
            <ChevronRight size={12} />
            <span className="text-white font-black">Events</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20">
                  <Sparkles className="text-yellow-300" size={22} />
                </div>
                <span className="text-white/60 text-sm font-bold uppercase tracking-widest">Demo Model School & College</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-4">
                Events &<br /><span className="text-emerald-300">Activities</span>
              </h1>
              <p className="text-white/60 text-lg max-w-xl leading-relaxed mt-4">
                Explore our vibrant calendar of sports, academics, cultural celebrations, and community initiatives throughout the year.
              </p>
            </div>

            {/* Category counts */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              {Object.entries(categoryConfig).slice(0, 3).map(([key, cfg]) => {
                const Icon = cfg.icon;
                const count = events.filter(e => e.category === key).length;
                return (
                  <div key={key} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <Icon size={20} className="text-white/60 mx-auto mb-2" />
                    <p className="text-2xl font-black text-white">{count}</p>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{cfg.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="section-container py-12">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-ui-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeFilter === f.key
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                    : 'bg-white text-text-muted border border-ui-border hover:border-brand-primary/40 hover:text-brand-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Events */}
        {featured.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={16} className="text-brand-primary" />
              <h2 className="text-lg font-black text-text-main uppercase tracking-tight">Featured Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((event) => {
                const config = categoryConfig[event.category];
                const Icon = config.icon;
                return (
                  <div key={event.id} className="group bg-white rounded-3xl border border-ui-border overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-40 z-10`} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/90 backdrop-blur text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-text-main shadow-sm flex items-center gap-1.5">
                          <Sparkles size={10} className="text-brand-primary" /> Featured
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full border ${config.color} bg-white/90 backdrop-blur flex items-center gap-1`}>
                          <Icon size={10} /> {config.label}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-black text-text-main mb-2 group-hover:text-brand-primary transition-colors leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed mb-5 flex-grow">{event.description}</p>

                      <div className="space-y-2 mb-5 pt-4 border-t border-ui-border">
                        <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                          <Calendar size={13} className="text-brand-primary" /> {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                          <Clock size={13} className="text-brand-primary" /> {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                          <MapPin size={13} className="text-brand-primary" /> {event.location}
                        </div>
                      </div>

                      <a
                        href={buildGCalUrl(event.title, event.gcalDate, event.location)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                      >
                        Add to Google Calendar <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Regular Events */}
        {regular.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={16} className="text-text-muted" />
              <h2 className="text-lg font-black text-text-main uppercase tracking-tight">All Events</h2>
              <span className="text-xs text-text-muted font-medium">({regular.length})</span>
            </div>
            <div className="space-y-4">
              {regular.map((event) => {
                const config = categoryConfig[event.category];
                const Icon = config.icon;
                return (
                  <div key={event.id} className="bg-white rounded-2xl border border-ui-border overflow-hidden hover:shadow-lg hover:border-brand-primary/20 transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-48 h-40 md:h-auto shrink-0 overflow-hidden relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-30 z-10`} />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>

                      {/* Content */}
                      <div className="flex-grow p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${config.color} flex items-center gap-1`}>
                              <Icon size={10} /> {config.label}
                            </span>
                          </div>
                          <h3 className="text-base font-black text-text-main mb-1.5 group-hover:text-brand-primary transition-colors">{event.title}</h3>
                          <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-3">{event.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-text-muted">
                            <span className="flex items-center gap-1"><Calendar size={11} className="text-brand-primary" /> {event.date}</span>
                            <span className="flex items-center gap-1"><Clock size={11} className="text-brand-primary" /> {event.time}</span>
                            <span className="flex items-center gap-1"><MapPin size={11} className="text-brand-primary" /> {event.location}</span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <a
                            href={buildGCalUrl(event.title, event.gcalDate, event.location)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all whitespace-nowrap"
                          >
                            <Calendar size={13} /> Add to Calendar
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={36} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">No events found</h3>
            <p className="text-text-muted text-sm">Try changing the filter or search term</p>
            <button
              onClick={() => { setActiveFilter('all'); setSearch(''); }}
              className="mt-5 px-6 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-bold hover:bg-brand-secondary transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/academic/calendar" className="flex items-center justify-between p-5 bg-white rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <Calendar size={18} />
              </div>
              <span className="font-bold text-text-main group-hover:text-brand-primary transition-colors">Academic Calendar</span>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
          </Link>
          <Link href="/academic/holidays" className="flex items-center justify-between p-5 bg-white rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <Sparkles size={18} />
              </div>
              <span className="font-bold text-text-main group-hover:text-brand-primary transition-colors">Holiday Schedule</span>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
