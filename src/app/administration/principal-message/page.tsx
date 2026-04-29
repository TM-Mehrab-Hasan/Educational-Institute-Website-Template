import React from 'react';
import Link from 'next/link';
import { ChevronRight, Quote, Calendar, Award, BookOpen, GraduationCap, Briefcase } from 'lucide-react';

export default function PrincipalMessagePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="section-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-text-muted">Administration</span>
          <ChevronRight size={12} />
          <span className="text-brand-primary font-bold">Principal's Message</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Info */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl border border-ui-border shadow-xl overflow-hidden sticky top-24">
              <div className="aspect-[3/4] relative">
                <img 
                  src="/images/principal.jpeg" 
                  alt="Dr. AK Azad" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-1">Principal</p>
                  <h2 className="text-xl font-bold">Dr. AK Azad</h2>
                  <p className="text-sm text-white/80">PhD in Educational Leadership</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-text-muted tracking-tighter">Office Hours</p>
                    <p className="text-sm font-bold">Sun - Thu: 9AM - 2PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-text-muted tracking-tighter">Experience</p>
                    <p className="text-sm font-bold">25+ Years in Education</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Message */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-ui-border shadow-sm p-8 md:p-12">
            <Quote size={60} className="text-brand-primary/10 mb-6" />
            
            <h1 className="text-3xl md:text-5xl font-black text-text-main leading-tight mb-8">
              Empowering Minds, <br />
              <span className="text-brand-primary">Building Futures</span>
            </h1>

            <div className="prose prose-slate lg:prose-lg max-w-none text-text-muted leading-relaxed text-justify space-y-6">
              <p>
                Welcome to Demo Model College. It is an honor to serve as the Principal of an institution that has been a cornerstone of academic excellence in Dhaka since 1995. Our mission has always been clear: to provide a nurturing environment where every student can achieve their full potential.
              </p>
              
              <p>
                In today's rapidly evolving world, education must go beyond the traditional boundaries of textbooks. At Demo Model College, we emphasize the "Holistic Development" of our students. We combine a rigorous academic curriculum with a vibrant array of extracurricular activities, ensuring our graduates are not only well-educated but also well-rounded individuals ready to face global challenges.
              </p>

              <div className="my-10 p-8 bg-brand-primary/5 rounded-2xl border-l-4 border-brand-primary italic">
                "We don't just teach subjects; we instill values. Our goal is to create leaders who lead with integrity, compassion, and innovation."
              </div>

              <p>
                Our state-of-the-art facilities, dedicated faculty, and technology-integrated classrooms provide the perfect ecosystem for learning. Whether it's in our science labs, on the sports field, or in the debating hall, we encourage our students to be curious, to ask questions, and to dream big.
              </p>

              <p>
                I invite you to explore our website and learn more about what makes our college unique. To our parents, thank you for trusting us with your child's future. To our students, remember that your journey at Demo Model College is just the beginning of a lifetime of success.
              </p>

              <p>Warm regards,</p>
              
              <div className="pt-6">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch_Signature.png" 
                  alt="Signature" 
                  className="h-16 opacity-70 mb-2 grayscale"
                />
                <p className="font-bold text-text-main">Dr. AK Azad</p>
                <p className="text-sm">Principal, Demo Model College</p>
              </div>
            </div>

            {/* Quick Links for Administration */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/administration/governing-body" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text-main">Governing Body</p>
                    <p className="text-xs text-text-muted uppercase">Leadership</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
              </Link>
              <Link href="/administration/teachers" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text-main">Our Teachers</p>
                    <p className="text-xs text-text-muted uppercase">Faculty</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
              </Link>
              <Link href="/administration/staff" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-ui-border hover:border-brand-primary/30 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text-main">Office Staff</p>
                    <p className="text-xs text-text-muted uppercase">Support</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
