"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Mail, Phone, GraduationCap, Calendar, Briefcase, Award, ArrowLeft, Quote } from 'lucide-react';
import { teachers } from '@/data/administration';

export default function TeacherProfilePage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const teacher = teachers.find(t => t.id === id);

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-text-main mb-4">Teacher Not Found</h1>
          <Link href="/administration/teachers" className="text-brand-primary font-bold hover:underline">
            Back to Teachers Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ui-bg pb-24">
      {/* Profile Header Background */}
      <div className="h-64 md:h-80 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop" 
            alt="Campus" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ui-bg to-transparent"></div>
      </div>

      <div className="section-container -mt-32 relative z-10">
        <Link 
          href="/administration/teachers" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-[10px]">Back to Directory</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Essential Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-ui-border shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative z-10">
                <div className="w-full aspect-square rounded-3xl overflow-hidden mb-8 border-4 border-ui-bg shadow-xl">
                  <img 
                    src={teacher.image} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h1 className="text-3xl font-black text-text-main leading-tight mb-2">{teacher.name}</h1>
                <p className="text-brand-primary font-bold uppercase tracking-[0.2em] text-xs mb-6">{teacher.designation}</p>
                
                <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">
                  {teacher.department} Department
                </div>

                <div className="space-y-4 pt-8 border-t border-ui-border">
                  <a href={`mailto:${teacher.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-brand-primary shadow-sm">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Email Address</p>
                      <p className="text-sm font-bold truncate max-w-[180px]">{teacher.email}</p>
                    </div>
                  </a>
                  
                  <a href={`tel:${teacher.phone}`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-brand-primary shadow-sm">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Phone Number</p>
                      <p className="text-sm font-bold">{teacher.phone}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-brand-primary rounded-[2.5rem] p-8 text-white shadow-xl shadow-brand-primary/20">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Academic Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-sm font-medium text-white/70">Mon - Thu</span>
                  <span className="text-sm font-bold">8:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white/70">Friday</span>
                  <span className="text-sm font-bold">8:00 AM - 12:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Bio & Experience */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-ui-border shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <Quote size={40} className="text-brand-primary/20" />
                <h2 className="text-2xl font-black text-text-main uppercase tracking-tight">Biography</h2>
              </div>
              
              <div className="prose prose-slate prose-lg max-w-none text-text-muted leading-relaxed text-justify">
                <p>{teacher.bio || "No biography available."}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-12 border-t border-ui-border">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary">
                      <GraduationCap size={24} />
                    </div>
                    <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Education</h3>
                  </div>
                  <div className="pl-16">
                    <p className="text-text-muted font-medium">{teacher.education}</p>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Verified Qualification</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary">
                      <Briefcase size={24} />
                    </div>
                    <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Experience</h3>
                  </div>
                  <div className="pl-16">
                    <p className="text-text-muted font-medium">{teacher.experience || "N/A"}</p>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Total Service</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary">
                      <Calendar size={24} />
                    </div>
                    <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Joined On</h3>
                  </div>
                  <div className="pl-16">
                    <p className="text-text-muted font-medium">
                      {teacher.joiningDate ? new Date(teacher.joiningDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "N/A"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Institutional Tenure</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary">
                      <Award size={24} />
                    </div>
                    <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Specialization</h3>
                  </div>
                  <div className="pl-16">
                    <p className="text-text-muted font-medium">{teacher.department}</p>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Core Expertise</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Teaching Philosophy / Message */}
            <div className="bg-slate-50 rounded-[2.5rem] p-12 border border-ui-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Award size={120} />
              </div>
              <h3 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight relative z-10">Professional Promise</h3>
              <p className="text-text-muted text-justify italic leading-relaxed relative z-10">
                &quot;As an educator at Demo Model School & College, my goal is to not only impart knowledge but to inspire curiosity and critical thinking. I believe in creating an inclusive environment where every student feels empowered to explore their potential and prepare for the challenges of tomorrow.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
