"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { 
  Users, Briefcase, Heart, Calendar, User, 
  LogOut, Menu, X, ChevronRight, Search, 
  Download, Plus, Filter, MapPin, Mail,
  Award, Bell, ArrowRight, BookOpen,
  CheckCircle2, Clock, Camera, Phone, Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alumni, JobOpportunity, useAlumniAuth } from '@/lib/AlumniAuthContext';

// Client-side only PDF download
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);
import AlumniReceiptPDF from '@/lib/pdf/AlumniReceiptPDF';

type TabType = 'Directory' | 'Donations' | 'Events' | 'Jobs' | 'Profile';

interface AlumniDashboardProps {
  alumni: Alumni;
  logout: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  getAllAlumni: () => Alumni[];
}

export default function AlumniDashboard({ 
  alumni, 
  logout, 
  activeTab, 
  setActiveTab, 
  getAllAlumni 
}: AlumniDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Alumni | null>(null);

  const navigation = [
    { name: 'Directory', icon: Users, id: 'Directory' as TabType },
    { name: 'Donations', icon: Heart, id: 'Donations' as TabType },
    { name: 'Jobs Board', icon: Briefcase, id: 'Jobs' as TabType },
    { name: 'Events', icon: Calendar, id: 'Events' as TabType },
    { name: 'My Profile', icon: User, id: 'Profile' as TabType },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white border-r border-ui-border z-50 transition-transform duration-300 lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-8 border-bottom border-ui-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white">
                <Award size={24} />
              </div>
              <div>
                <h2 className="text-sm font-black text-text-main uppercase tracking-tight">Alumni Hub</h2>
                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Official Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                  activeTab === item.id 
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                    : "text-text-muted hover:bg-slate-50 hover:text-text-main"
                )}
              >
                <item.icon size={20} className={cn(
                  "transition-colors",
                  activeTab === item.id ? "text-white" : "text-slate-300 group-hover:text-brand-primary"
                )} />
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Section Footer */}
          <div className="p-6 border-t border-ui-border bg-slate-50/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white border border-ui-border flex items-center justify-center overflow-hidden relative">
                {alumni.profilePhoto ? (
                  <Image src={alumni.profilePhoto} alt={alumni.name} fill className="object-cover" />
                ) : (
                  <User size={20} className="text-slate-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-text-main truncate uppercase">{alumni.name}</p>
                <p className="text-[10px] font-bold text-brand-primary tracking-widest uppercase truncate">{alumni.batch}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-100 text-red-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-ui-border flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-text-muted lg:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-black text-text-main uppercase tracking-tight">
              {navigation.find(n => n.id === activeTab)?.name}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-text-muted relative hover:bg-brand-primary/5 hover:text-brand-primary transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-ui-border mx-2 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-3 text-right">
              <div className="text-[10px] font-black text-brand-primary uppercase tracking-widest leading-none">Impact Points</div>
              <div className="text-lg font-black text-text-main leading-none">{alumni.impactPoints || 0}</div>
            </div>
          </div>
        </header>

        {/* Content Scrolling Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'Directory' && <DirectoryView getAllAlumni={getAllAlumni} onViewProfile={setSelectedMember} />}
            {activeTab === 'Donations' && <DonationsView alumni={alumni} />}
            {activeTab === 'Jobs' && <JobsView />}
            {activeTab === 'Events' && <EventsView />}
            {activeTab === 'Profile' && <ProfileView alumni={alumni} />}
          </div>
        </div>
      </main>

      {/* Member Profile Modal */}
      {selectedMember && (
        <MemberProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function DirectoryView({ getAllAlumni, onViewProfile }: { getAllAlumni: () => Alumni[]; onViewProfile: (member: Alumni) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const allAlumni = getAllAlumni();

  const filteredAlumni = allAlumni.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.profession || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.organization || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = deptFilter === 'All' || a.department === deptFilter;
    
    return matchesSearch && matchesDept;
  });

  const departments = ['All', ...new Set(allAlumni.map(a => a.department))];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
          <input 
            type="text"
            placeholder="Search by name, profession or company..."
            className="w-full pl-14 pr-6 py-5 bg-white border border-ui-border rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all font-bold text-sm shadow-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-brand-primary" />
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={cn(
                  "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                  deptFilter === dept 
                    ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20" 
                    : "bg-white text-text-muted border-ui-border hover:border-brand-primary hover:text-brand-primary"
                )}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs font-black text-text-muted uppercase tracking-widest">Showing <span className="text-brand-primary">{filteredAlumni.length}</span> Members</p>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAlumni.map((member) => (
          <div key={member.id} className="bg-white rounded-[2rem] border border-ui-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-ui-border mb-4 overflow-hidden flex items-center justify-center relative">
                {member.profilePhoto ? (
                  <Image src={member.profilePhoto} alt={member.name} fill className="object-cover" />
                ) : (
                  <User size={32} className="text-slate-200" />
                )}
              </div>
              <h4 className="text-sm font-black text-text-main uppercase tracking-tight mb-1 group-hover:text-brand-primary transition-colors">{member.name}</h4>
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-3">{member.batch} · {member.department}</p>
              
              <div className="w-full h-px bg-slate-50 mb-4" />
              
              <div className="space-y-2 w-full">
                {member.profession && (
                  <div className="flex items-center gap-2 text-text-muted">
                    <Briefcase size={12} className="shrink-0" />
                    <span className="text-[10px] font-bold truncate">{member.profession}</span>
                  </div>
                )}
                {member.organization && (
                  <div className="flex items-center gap-2 text-text-muted">
                    <Award size={12} className="shrink-0" />
                    <span className="text-[10px] font-bold truncate">{member.organization}</span>
                  </div>
                )}
                {member.location && (
                  <div className="flex items-center gap-2 text-text-muted">
                    <MapPin size={12} className="shrink-0" />
                    <span className="text-[10px] font-bold truncate">{member.location}</span>
                  </div>
                )}
              </div>

              <button 
                onClick={() => onViewProfile(member)}
                className="mt-6 w-full py-3 bg-slate-50 text-text-muted hover:bg-brand-primary hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                View Profile <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAlumni.length === 0 && (
        <div className="bg-white py-20 rounded-[2.5rem] border border-ui-border text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-slate-200" />
          </div>
          <h3 className="text-lg font-black text-text-main uppercase tracking-tight mb-2">No Members Found</h3>
          <p className="text-sm text-text-muted max-w-xs mx-auto">Try adjusting your search terms or department filters to find who you&apos;re looking for.</p>
        </div>
      )}
    </div>
  );
}

function MemberProfileModal({ member, onClose }: { member: Alumni; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="h-32 bg-brand-primary relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-all flex items-center justify-center"
          >
            <X size={20} />
          </button>
          <div className="absolute -bottom-12 left-10 w-24 h-24 rounded-3xl bg-white border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative">
             {member.profilePhoto ? (
               <Image src={member.profilePhoto} alt={member.name} fill className="object-cover" />
             ) : (
               <User size={40} className="text-slate-200" />
             )}
          </div>
        </div>

        <div className="pt-16 px-10 pb-10">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-text-main uppercase tracking-tight">{member.name}</h2>
            <p className="text-sm font-bold text-brand-primary uppercase tracking-widest">{member.batch} · {member.department}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-text-main">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                  <Briefcase size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Profession</span>
                  <span className="text-xs font-bold">{member.profession || 'Not Specified'}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-text-main">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                  <Award size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Organization</span>
                  <span className="text-xs font-bold">{member.organization || 'Not Specified'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-text-main">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Location</span>
                  <span className="text-xs font-bold">{member.location || 'Not Specified'}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-text-main">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Email Address</span>
                  <span className="text-xs font-bold">{member.email}</span>
                </div>
              </div>
            </div>
          </div>

          {member.bio && (
            <div className="mb-8">
              <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 ml-1">About</h4>
              <div className="p-6 bg-slate-50 rounded-2xl border border-ui-border">
                <p className="text-sm text-text-muted leading-relaxed italic">&quot;{member.bio}&quot;</p>
              </div>
            </div>
          )}

          {member.skills && member.skills.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 ml-1">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white border border-ui-border rounded-xl text-[10px] font-bold text-text-main">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DonationsView({ alumni }: { alumni: Alumni }) {
  const { donate } = useAlumniAuth();
  const [amount, setAmount] = useState('');
  const [project, setProject] = useState('Digital Library');
  const [isDonating, setIsDonating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const projects = ['Digital Library', 'Scholarship Fund', 'Campus Infrastructure', 'Sports Development', 'STEM Labs'];

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    setIsDonating(true);
    try {
      await donate(project, val);
      setShowSuccess(true);
      setAmount('');
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      console.error('Donation failed', err);
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Donation Form */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-ui-border shadow-sm">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-black text-text-main uppercase tracking-tight mb-2">Make a Contribution</h3>
            <p className="text-xs font-bold text-text-muted leading-relaxed mb-8">Your support directly impacts the next generation of students.</p>

            <form onSubmit={handleDonate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Select Project</label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border border-ui-border rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-sm font-bold"
                  value={project}
                  onChange={e => setProject(e.target.value)}
                >
                  {projects.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Amount (BDT)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-300 text-sm">৳</span>
                  <input 
                    type="number"
                    className="w-full pl-10 pr-5 py-4 bg-slate-50 border border-ui-border rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-sm font-bold"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isDonating}
                className="w-full py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2"
              >
                {isDonating ? <Clock className="animate-spin" size={16} /> : <Plus size={16} />}
                {isDonating ? 'Processing...' : 'Contribute Now'}
              </button>

              {showSuccess && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-700 text-[10px] font-bold text-center animate-in fade-in zoom-in-95 uppercase tracking-widest">
                  Thank you for your generous contribution!
                </div>
              )}
            </form>
          </div>

          {/* Impact Stats */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Award size={120} />
            </div>
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Total Impact</h4>
            <div className="text-4xl font-black mb-2">৳{(alumni.donations || []).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Generated {alumni.impactPoints || 0} impact points for institutional development.</p>
          </div>
        </div>

        {/* Donation History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-ui-border shadow-sm overflow-hidden h-full">
            <div className="p-8 border-b border-ui-border flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-black text-text-main uppercase tracking-widest">Contribution History</h3>
              <div className="px-3 py-1.5 bg-white border border-ui-border rounded-lg text-[10px] font-black text-brand-primary uppercase tracking-widest">
                {alumni.donations?.length || 0} Records
              </div>
            </div>

            <div className="overflow-x-auto">
              {alumni.donations && alumni.donations.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-ui-border">
                      <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Project</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Date</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Amount</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ui-border">
                    {alumni.donations.map((d, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 text-sm font-bold text-text-main">{d.project}</td>
                        <td className="px-8 py-5 text-xs font-bold text-text-muted">{new Date(d.date).toLocaleDateString()}</td>
                        <td className="px-8 py-5 text-sm font-black text-brand-primary">৳{d.amount.toLocaleString()}</td>
                        <td className="px-8 py-5 text-right">
                          <PDFDownloadLink
                            document={
                              <AlumniReceiptPDF 
                                alumniName={alumni.name}
                                project={d.project}
                                amount={d.amount}
                                date={d.date}
                                receiptId={`ALM-${new Date(d.date).getTime().toString().slice(-6)}`}
                              />
                            }
                            fileName={`Receipt_${d.project.replace(/\s+/g, '_')}.pdf`}
                          >
                            {({ loading }) => (
                              <button className="p-2 text-slate-300 hover:text-brand-primary hover:bg-white rounded-lg border border-transparent hover:border-ui-border transition-all">
                                {loading ? <Clock size={16} className="animate-spin" /> : <Download size={16} />}
                              </button>
                            )}
                          </PDFDownloadLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-24 text-center">
                  <Heart size={40} className="mx-auto mb-4 text-slate-100" />
                  <p className="text-xs font-black text-slate-300 uppercase tracking-widest">No contributions recorded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobsView() {
  const { getJobs, applyForJob, postJob, currentAlumni } = useAlumniAuth();
  const [showPostModal, setShowPostModal] = useState(false);
  const [jobs, setJobs] = useState<JobOpportunity[]>(getJobs());
  const [isPosting, setIsPosting] = useState(false);
  
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    type: 'Full-time',
    location: '',
    description: '',
    requirements: '',
    link: ''
  });

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPosting(true);
    try {
      await postJob(newJob);
      setJobs(getJobs());
      setShowPostModal(false);
      setNewJob({ title: '', company: '', type: 'Full-time', location: '', description: '', requirements: '', link: '' });
    } catch (err) {
      console.error('Job posting failed', err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleApply = async (jobId: string) => {
    try {
      await applyForJob(jobId);
      alert('Application submitted successfully!');
    } catch (err) {
      console.error('Application failed', err);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h3 className="text-sm font-black text-text-muted uppercase tracking-widest mb-1">Career Opportunities</h3>
          <p className="text-xl font-black text-text-main uppercase tracking-tight">Community Job Board</p>
        </div>
        <button 
          onClick={() => setShowPostModal(true)}
          className="px-8 py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus size={16} /> Post a Job
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-[2rem] border border-ui-border p-8 hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-ui-border flex items-center justify-center text-brand-primary">
                <Briefcase size={28} />
              </div>
              <span className="px-3 py-1.5 bg-slate-50 text-[10px] font-black text-text-muted uppercase tracking-widest rounded-lg">
                {job.type}
              </span>
            </div>

            <h4 className="text-lg font-black text-text-main uppercase tracking-tight mb-1 group-hover:text-brand-primary transition-colors">{job.title}</h4>
            <div className="flex items-center gap-2 text-brand-primary text-xs font-bold mb-4 uppercase tracking-widest">
              {job.company} · <MapPin size={12} /> {job.location || 'Remote'}
            </div>

            <p className="text-sm text-text-muted leading-relaxed mb-8 line-clamp-3">
              {job.description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Posted {new Date(job.posted).toLocaleDateString()}</div>
              <button 
                onClick={() => handleApply(job.id)}
                disabled={currentAlumni?.jobApplications?.includes(job.id)}
                className={cn(
                  "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                  currentAlumni?.jobApplications?.includes(job.id)
                    ? "bg-green-50 text-green-600 border border-green-100 cursor-default"
                    : "bg-brand-primary text-white shadow-lg shadow-brand-primary/10 hover:shadow-brand-primary/20"
                )}
              >
                {currentAlumni?.jobApplications?.includes(job.id) ? (
                  <><CheckCircle2 size={14} /> Applied</>
                ) : (
                  <>Apply Now <ArrowRight size={14} /></>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowPostModal(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-ui-border flex items-center justify-between shrink-0">
              <h3 className="text-xl font-black text-text-main uppercase tracking-tight">Post Job Opportunity</h3>
              <button onClick={() => setShowPostModal(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handlePostJob} className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Job Title</label>
                  <input 
                    className="w-full px-5 py-4 bg-slate-50 border border-ui-border rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-sm font-bold"
                    placeholder="e.g. Frontend Developer"
                    value={newJob.title}
                    onChange={e => setNewJob({...newJob, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Company</label>
                  <input 
                    className="w-full px-5 py-4 bg-slate-50 border border-ui-border rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-sm font-bold"
                    placeholder="e.g. Acme Corp"
                    value={newJob.company}
                    onChange={e => setNewJob({...newJob, company: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Type</label>
                  <select 
                    className="w-full px-5 py-4 bg-slate-50 border border-ui-border rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-sm font-bold"
                    value={newJob.type}
                    onChange={e => setNewJob({...newJob, type: e.target.value})}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Location</label>
                  <input 
                    className="w-full px-5 py-4 bg-slate-50 border border-ui-border rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-sm font-bold"
                    placeholder="e.g. Remote / Dhaka"
                    value={newJob.location}
                    onChange={e => setNewJob({...newJob, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  className="w-full px-5 py-4 bg-slate-50 border border-ui-border rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-sm font-bold h-32 resize-none"
                  placeholder="Tell us about the role..."
                  value={newJob.description}
                  onChange={e => setNewJob({...newJob, description: e.target.value})}
                  required
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isPosting}
                  className="w-full py-5 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  {isPosting ? <Clock className="animate-spin" size={16} /> : <Plus size={16} />}
                  {isPosting ? 'Posting Opportunity...' : 'Post Opportunity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EventsView() {
  const { registerForEvent, currentAlumni } = useAlumniAuth();
  
  const upcomingEvents = [
    {
      id: 'event-1',
      title: 'Grand Reunion 2026',
      date: 'Dec 25, 2026',
      time: '6:00 PM',
      location: 'School Main Grounds',
      description: 'The biggest event of the year. Join us for a night of nostalgia, dinner, and networking.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'event-2',
      title: 'Tech Networking Mixer',
      date: 'Aug 15, 2026',
      time: '4:00 PM',
      location: 'Dhaka IT Park',
      description: 'Connecting alumni in the technology sector. Share insights and explore collaborations.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=400&auto=format&fit=crop'
    },
    {
      id: 'event-3',
      title: 'Annual Gala Dinner',
      date: 'Oct 10, 2026',
      time: '7:30 PM',
      location: 'Radisson Blu, Dhaka',
      description: 'A formal evening to celebrate institutional achievements and outstanding alumni.',
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=400&auto=format&fit=crop'
    }
  ];

  const handleRegister = async (eventId: string) => {
    try {
      await registerForEvent(eventId);
      alert('Registration successful!');
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEvents.map(event => (
          <div key={event.id} className="bg-white rounded-[2.5rem] border border-ui-border overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="h-48 relative overflow-hidden shrink-0">
              <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1 text-emerald-400">Networking</div>
                <h4 className="text-lg font-black uppercase tracking-tight">{event.title}</h4>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-text-muted">
                  <Calendar size={16} className="text-brand-primary" />
                  <span className="text-xs font-bold">{event.date} · {event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-text-muted">
                  <MapPin size={16} className="text-brand-primary" />
                  <span className="text-xs font-bold">{event.location}</span>
                </div>
              </div>

              <p className="text-sm text-text-muted leading-relaxed mb-8 flex-1">
                {event.description}
              </p>

              <button 
                onClick={() => handleRegister(event.id)}
                disabled={currentAlumni?.eventRegistrations?.includes(event.id)}
                className={cn(
                  "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                  currentAlumni?.eventRegistrations?.includes(event.id)
                    ? "bg-green-50 text-green-600 border border-green-100 cursor-default"
                    : "bg-slate-900 text-white shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20"
                )}
              >
                {currentAlumni?.eventRegistrations?.includes(event.id) ? (
                  <><CheckCircle2 size={14} /> Registered</>
                ) : (
                  <>Register Seat <ChevronRight size={14} /></>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView({ alumni }: { alumni: Alumni }) {
  const { updateAlumni } = useAlumniAuth();
  const [formData, setFormData] = useState({
    name: alumni.name || '',
    phone: alumni.phone || '',
    profession: alumni.profession || '',
    organization: alumni.organization || '',
    location: alumni.location || '',
    bio: alumni.bio || '',
    skills: (alumni.skills || []).join(', ')
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const updatedAlumni: Alumni = {
        ...alumni,
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      };
      
      updateAlumni(updatedAlumni);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      console.error('Profile update failed', err);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const inputCls = "w-full px-5 py-4 bg-slate-50 border border-ui-border rounded-2xl focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none transition-all text-sm font-bold placeholder:text-slate-300";
  const labelCls = "text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 mb-2 block";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="bg-white rounded-[2.5rem] border border-ui-border shadow-sm overflow-hidden">
        <div className="h-32 bg-brand-primary relative">
          <div className="absolute -bottom-12 left-10 w-24 h-24 rounded-3xl bg-white border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative">
             {alumni.profilePhoto ? (
               <Image src={alumni.profilePhoto} alt={alumni.name} fill className="object-cover" />
             ) : (
               <User size={40} className="text-slate-200" />
             )}
             <button className="absolute inset-0 bg-slate-900/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white z-10">
               <Camera size={20} />
             </button>
          </div>
        </div>

        <div className="pt-16 px-10 pb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl font-black text-text-main uppercase tracking-tight">{alumni.name}</h2>
              <p className="text-sm font-bold text-brand-primary uppercase tracking-widest">{alumni.batch} · {alumni.department}</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                 <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Impact Status</p>
                 <p className="text-sm font-bold text-text-main">Gold Member</p>
               </div>
               <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                 <Award size={24} />
               </div>
            </div>
          </div>

          {message && (
            <div className={cn(
              "p-4 rounded-2xl mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-2",
              message.type === 'success' ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
            )}>
              {message.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}
              <p className="text-sm font-bold">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelCls}>Professional Title</label>
                <div className="relative flex items-center">
                  <Briefcase size={16} className="absolute left-5 text-slate-300" />
                  <input 
                    className={cn(inputCls, "pl-12")}
                    placeholder="e.g. Senior Software Engineer"
                    value={formData.profession}
                    onChange={e => setFormData({...formData, profession: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Current Organization</label>
                <div className="relative flex items-center">
                  <Award size={16} className="absolute left-5 text-slate-300" />
                  <input 
                    className={cn(inputCls, "pl-12")}
                    placeholder="e.g. Google Inc."
                    value={formData.organization}
                    onChange={e => setFormData({...formData, organization: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Contact Phone</label>
                <div className="relative flex items-center">
                  <Phone size={16} className="absolute left-5 text-slate-300" />
                  <input 
                    className={cn(inputCls, "pl-12")}
                    placeholder="+880 1XXX-XXXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Location</label>
                <div className="relative flex items-center">
                  <MapPin size={16} className="absolute left-5 text-slate-300" />
                  <input 
                    className={cn(inputCls, "pl-12")}
                    placeholder="e.g. Dhaka, Bangladesh"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelCls}>Skills & Expertise (Comma separated)</label>
              <div className="relative flex items-center">
                <BookOpen size={16} className="absolute left-5 text-slate-300" />
                <input 
                  className={cn(inputCls, "pl-12")}
                  placeholder="React, TypeScript, Project Management..."
                  value={formData.skills}
                  onChange={e => setFormData({...formData, skills: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelCls}>Short Bio</label>
              <textarea 
                className={cn(inputCls, "min-h-[120px] resize-none py-4")}
                placeholder="Tell fellow alumni about your journey..."
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
              />
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                disabled={isSaving}
                className="px-10 py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center gap-3"
              >
                {isSaving ? <Clock className="animate-spin" size={16} /> : <Save size={16} />}
                {isSaving ? 'Saving Changes...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
