"use client";

import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import NoticeBoard from "@/components/home/NoticeBoard";
import { ChevronRight, ExternalLink, Star, Quote } from "lucide-react";
import Link from "next/link";
import { useScrollReveal } from "@/lib/hooks";

export default function Home() {
  const welcomeReveal = useScrollReveal();
  const sidebarReveal = useScrollReveal();
  const highlightsReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* News Ticker */}
      <div 
        role="region" 
        aria-label="Latest News"
        className="bg-brand-primary/5 border-y border-brand-primary/10 py-3 overflow-hidden"
      >
        <div className="section-container flex items-center relative">
          <span className="bg-brand-primary text-white text-[10px] font-bold px-3 py-1.5 rounded mr-6 uppercase tracking-widest shrink-0 z-20 shadow-sm relative">
            Updates
          </span>
          <div className="flex-grow overflow-hidden relative h-6">
            {/* Masking gradients for smooth entry/exit */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-ui-bg via-transparent to-transparent w-8"></div>
            
            <div className="animate-marquee whitespace-nowrap text-sm text-brand-secondary font-semibold hover:pause-marquee cursor-default">
              <Link href="/notices/1" className="mx-4 hover:text-brand-primary transition-colors">Class XI Online Admission for Session 2026-27 is now open until May 15.</Link>
              <span className="mx-4">•</span>
              <Link href="/notices/2" className="mx-4 hover:text-brand-primary transition-colors">HSC 2026 Examinees are requested to collect their admit cards from the office.</Link>
              <span className="mx-4">•</span>
              <Link href="/notices/3" className="mx-4 hover:text-brand-primary transition-colors">Inter-College Sports Tournament begins from next Saturday.</Link>
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
              ref={welcomeReveal.ref}
              className={`lg:col-span-8 space-y-16 transition-all duration-1000 ease-out ${
                welcomeReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <article>
                <header className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-text-main leading-tight mb-4">
                    Welcome to <span className="text-brand-primary">Demo Model College</span>
                  </h2>
                  <div className="h-1.5 w-20 bg-brand-primary rounded-full"></div>
                </header>
                
                <div className="prose prose-slate lg:prose-lg text-text-muted text-justify">
                  <p className="leading-relaxed mb-6">
                    At Demo Model College, we believe in providing more than just academic instructions. Since our establishment in 1995, we have committed ourselves to fostering an environment where curiosity is encouraged, and character is built.
                  </p>
                  <p className="leading-relaxed mb-6">
                    Our institution stands as a beacon of quality education in Dhaka, offering both Bangla and English versions to cater to diverse student needs. We pride ourselves on our state-of-the-art facilities and a curriculum that balances rigorous academics with vibrant extracurricular activities.
                  </p>
                </div>
                
                <footer className="mt-10">
                  <Link 
                    href="/about" 
                    className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all focus-ring group"
                  >
                    Learn more about our heritage <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </footer>
              </article>

              {/* Principal's Card */}
              <div className="bg-ui-bg rounded-2xl p-8 md:p-10 border border-ui-border flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                
                <div className="w-48 h-64 shrink-0 rounded-xl overflow-hidden shadow-xl ring-4 ring-white relative z-10">
                  <img 
                    src="/images/principal.jpeg" 
                    alt="Principal Dr. AK Azad" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-text-main mb-1">Dr. AK Azad</h3>
                  <p className="text-brand-primary font-bold text-sm uppercase tracking-widest mb-6">Principal's Message</p>
                  <blockquote className="text-text-muted italic leading-relaxed mb-6 border-l-4 border-brand-primary/20 pl-6 text-justify">
                    "Education is the most powerful weapon which you can use to change the world. At Demo Model College, we don't just teach students; we empower them with values that last a lifetime."
                  </blockquote>
                  <Link 
                    href="/administration/principal-message" 
                    className="inline-block text-xs font-black text-text-main hover:text-brand-primary uppercase tracking-tighter border-b-2 border-brand-primary pb-1 transition-colors"
                  >
                    Read Full Statement
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside 
              ref={sidebarReveal.ref}
              className={`lg:col-span-4 space-y-10 transition-all duration-1000 delay-300 ease-out ${
                sidebarReveal.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <NoticeBoard />
              
              <div className="bg-ui-surface rounded-xl border border-ui-border p-8 shadow-sm">
                <h3 className="text-lg font-bold text-text-main mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-brand-primary rounded-full"></span>
                  Quick Access
                </h3>
                <nav className="flex flex-col gap-3">
                  {[
                    { label: "Class Routines", href: "/academic/routine" },
                    { label: "Exam Schedules", href: "/academic/exam-schedule" },
                    { label: "Download Syllabus", href: "/academic/syllabus" },
                    { label: "Academic Calendar", href: "/academic/calendar" },
                    { label: "Student Portal Login", href: "https://portal.demomodelcollege.edu", external: true },
                    { label: "Payment Gateway", href: "https://pay.demomodelcollege.edu", external: true },
                  ].map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      className="flex items-center justify-between p-4 rounded-lg bg-ui-bg border border-transparent hover:border-brand-primary/20 hover:bg-white hover:shadow-md transition-all group focus-ring"
                    >
                      <span className="text-sm font-semibold text-text-muted group-hover:text-brand-primary">{link.label}</span>
                      {link.external ? <ExternalLink size={14} className="text-slate-300 group-hover:text-brand-primary" /> : <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-primary" />}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Stats />

      {/* Highlights Grid */}
      <section 
        ref={highlightsReveal.ref}
        className={`py-24 bg-ui-bg transition-all duration-1000 ease-out ${
          highlightsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="section-container">
          <header className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-text-main mb-4 uppercase tracking-tight">Why Choose Our Institution?</h2>
            <p className="text-text-muted">We combine traditional values with modern methodology to create a unique learning experience.</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              title="Modern Campus" 
              description="High-speed internet, air-conditioned digital classrooms, and well-equipped science laboratories."
              img="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=400&auto=format&fit=crop"
              href="/about"
            />
            <FeatureCard 
              title="Expert Faculty" 
              description="Our educators are not just teachers; they are mentors with decades of academic experience."
              img="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=400&auto=format&fit=crop"
              href="/administration/teachers"
            />
            <FeatureCard 
              title="Extra-Curriculars" 
              description="Over 15 active clubs ranging from Robotics to Debating to help students find their passion."
              img="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=400&auto=format&fit=crop"
              href="/gallery"
            />
          </div>
        </div>
      </section>

      {/* Guardian Testimonials */}
      <section 
        ref={testimonialsReveal.ref}
        className={`py-24 bg-white relative overflow-hidden transition-all duration-1000 ease-out ${
          testimonialsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="section-container relative z-10">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-text-main uppercase tracking-tight mb-4">
                What <span className="text-brand-primary">Guardians</span> Say
              </h2>
              <p className="text-text-muted text-justify">
                The trust of our parents is our greatest achievement. Hear from the guardians of our students about their experience with Demo Model College.
              </p>
            </div>
            <Link href="/admission" className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 shrink-0">
              Join Our Community <ChevronRight size={20} />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Mrs. Sultana Razia"
              relation="Mother of Class XII Student"
              content="The transformation I've seen in my son's confidence and academic performance since he joined this college is remarkable. The teachers are incredibly supportive."
              rating={5}
            />
            <TestimonialCard 
              name="Mr. Ahmed Ullah"
              relation="Father of HSC 2025 Examinee"
              content="Demo Model College doesn't just focus on grades. They truly care about character building. My daughter has learned to be more disciplined and responsible here."
              rating={5}
            />
            <TestimonialCard 
              name="Engr. Kamrul Islam"
              relation="Guardian of Class XI Student"
              content="The digital classroom facilities and the modern science labs are among the best in the city. It's a great environment for science-minded students."
              rating={4}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, img, href }: { title: string, description: string, img: string, href: string }) {
  return (
    <Link href={href} className="group bg-ui-surface rounded-2xl overflow-hidden border border-ui-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 block">
      <div className="h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        <img 
          src={img} 
          alt="" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-brand-primary transition-colors">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed text-justify">{description}</p>
      </div>
    </Link>
  )
}

function TestimonialCard({ name, relation, content, rating }: { name: string, relation: string, content: string, rating: number }) {
  return (
    <div className="bg-slate-50 p-8 rounded-3xl border border-ui-border hover:bg-white hover:shadow-xl transition-all duration-500 group relative">
      <Quote size={40} className="text-brand-primary/5 absolute top-6 right-6 group-hover:text-brand-primary/10 transition-colors" />
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < rating ? "fill-orange-400 text-orange-400" : "text-slate-300"} />
        ))}
      </div>
      <p className="text-text-muted italic mb-6 leading-relaxed text-justify relative z-10">"{content}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xl">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-text-main">{name}</h4>
          <p className="text-[10px] uppercase font-black text-brand-primary tracking-widest">{relation}</p>
        </div>
      </div>
    </div>
  )
}
