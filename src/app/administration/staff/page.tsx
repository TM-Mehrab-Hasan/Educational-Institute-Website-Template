"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Mail, Phone, Search, ChevronRight, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/lib/hooks';
import { staff, Person } from '@/data/administration';

const departments = ["All", ...Array.from(new Set(staff.map(s => s.department).filter(Boolean)))] as string[];

function StaffCard({ person }: { person: Person }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div 
      ref={ref}
      className={cn(
        "bg-ui-surface rounded-3xl overflow-hidden border border-ui-border shadow-sm group hover:shadow-2xl transition-all duration-700 flex flex-col",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
    >
      <div className="p-8 flex-grow">
        <div className="relative mb-8 flex justify-center md:justify-start">
          <div className="w-32 h-32 rounded-3xl overflow-hidden bg-slate-100 ring-4 ring-ui-bg relative z-10 shadow-lg">
            <img 
              src={person.image} 
              alt={person.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
            />
          </div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-primary/10 rounded-3xl -translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
        </div>
        
        <div className="text-center md:text-left">
          <h3 className="text-xl font-black text-text-main leading-tight mb-1 group-hover:text-brand-primary transition-colors">{person.name}</h3>
          <p className="text-brand-primary font-bold text-xs uppercase tracking-widest mb-4">{person.designation}</p>
          
          <div className="inline-flex items-center px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
            {person.department}
          </div>

          <div className="space-y-3 text-sm text-text-muted">
            <div className="flex items-start gap-3 justify-center md:justify-start">
              <GraduationCap size={18} className="text-brand-primary shrink-0" />
              <p className="leading-snug">{person.education}</p>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Mail size={16} className="text-slate-400 shrink-0" />
              <p className="truncate">{person.email}</p>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Phone size={16} className="text-slate-400 shrink-0" />
              <p>{person.phone}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-6 bg-slate-50 border-t border-ui-border group-hover:bg-brand-primary transition-colors duration-500">
        <Link 
          href={`/administration/staff/${person.id}`}
          className="flex items-center justify-between text-xs font-black uppercase tracking-tighter text-text-main group-hover:text-white transition-colors"
        >
          View Full Profile <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredStaff = useMemo(() => {
    return staff.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.designation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === "All" || person.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, selectedDept]);

  return (
    <main className="min-h-screen bg-ui-bg py-16">
      <div className="section-container">
        {/* Header */}
        <header className="mb-16">
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-text-muted">Administration</span>
            <ChevronRight size={12} />
            <span className="text-brand-primary font-bold">Staff</span>
          </nav>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main leading-none mb-6">
                Administrative <span className="text-brand-primary">Support</span>
              </h1>
              <p className="text-lg text-text-muted text-justify leading-relaxed">
                Our administrative and support staff are the backbone of Demo Model College. They ensure smooth daily operations and provide essential services to students, parents, and faculty.
              </p>
            </div>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-3xl border border-ui-border shadow-sm mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border border-transparent focus:border-brand-primary/20 focus:bg-white outline-none transition-all text-sm font-medium"
            />
          </div>
          
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {departments.map((dept) => (
              <button 
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0",
                  selectedDept === dept 
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                    : "bg-slate-50 text-text-muted hover:bg-slate-100 border border-transparent"
                )}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm font-bold text-text-muted">
            Showing <span className="text-brand-primary">{filteredStaff.length}</span> staff members
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="text-xs font-black text-brand-primary uppercase tracking-tighter hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Staff Grid */}
        {filteredStaff.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredStaff.map((person) => (
              <StaffCard key={person.id} person={person} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-ui-border p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-text-main mb-2">No staff found</h3>
            <p className="text-text-muted">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </main>
  );
}
