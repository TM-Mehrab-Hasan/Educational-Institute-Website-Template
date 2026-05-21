"use client";

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';;
import { 
  User, Users, GraduationCap, CreditCard, 
  Clock, BarChart3, Calendar, Bell, 
  ChevronRight, ArrowRight, ShieldCheck,
  LayoutDashboard, UserCircle, LogOut,
  TrendingUp, MessageSquare, ChevronDown, X, Star
} from 'lucide-react';
import { useGuardianAuth } from '@/lib/GuardianAuthContext';
import { Student } from '@/lib/student-types';
import { cn } from '@/lib/utils';
import AttendanceView from '../student/AttendanceView';
import AcademicHistory from '../student/AcademicHistory';
import FeePortal from '../student/FeePortal';
import GuardianProfileView from './GuardianProfileView';
import GuardianReviewForm from './GuardianReviewForm';

export default function GuardianDashboard() {
  const router = useRouter();
  const { currentGuardian, logout, linkStudent } = useGuardianAuth();
  const [view, setView] = useState<'Dashboard' | 'Profile' | 'Feedback'>('Dashboard');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkID, setLinkID] = useState('');
  const [linkError, setLinkIDError] = useState('');
  const [linkLoading, setLinkLoading] = useState(false);
  const [activeStudentTab, setActiveStudentTab] = useState<'Overview' | 'Attendance' | 'Results' | 'Payments'>('Overview');

  if (!currentGuardian) return null;

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinkIDError('');
    if (!linkID.trim()) return;

    setLinkLoading(true);
    const result = await linkStudent(linkID.trim());
    setLinkLoading(false);

    if (result.success) {
      setShowLinkModal(false);
      setLinkID('');
    } else {
      setLinkIDError(result.message || 'Failed to link student');
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Profile Sidebar */}
        <aside className="lg:w-64 shrink-0 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-ui-border text-center">
            <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-inner overflow-hidden">
              {currentGuardian.profilePhoto ? (
                <img src={currentGuardian.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserCircle size={48} className="text-brand-primary" />
              )}
            </div>
            <h2 className="text-xl font-black text-text-main uppercase tracking-tight">{currentGuardian.name}</h2>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Official Guardian</p>
            
            <nav className="mt-8 space-y-2">
              <button 
                onClick={() => setView('Dashboard')}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                  view === 'Dashboard' ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "bg-ui-bg text-text-muted hover:text-text-main hover:bg-slate-100"
                )}
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button 
                onClick={() => setView('Profile')}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                  view === 'Profile' ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "bg-ui-bg text-text-muted hover:text-text-main hover:bg-slate-100"
                )}
              >
                <User size={16} /> My Profile
              </button>
              <button 
                onClick={() => setView('Feedback')}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                  view === 'Feedback' ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "bg-ui-bg text-text-muted hover:text-text-main hover:bg-slate-100"
                )}
              >
                <Star size={16} /> My Feedback
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 bg-ui-bg text-text-main font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-ui-border"
              >
                <LogOut size={16} /> Log Out
              </button>
            </nav>
          </div>

          <div className="bg-brand-primary text-white rounded-3xl p-8 shadow-xl shadow-brand-primary/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <ShieldCheck size={120} />
            </div>
            <div className="relative z-10">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Verified Access</h4>
              <p className="text-sm font-bold leading-relaxed">Your account is linked with institutional records for real-time monitoring.</p>
            </div>
          </div>

          {/* Conditional Sidebar Blocks */}
          {(activeStudentTab === 'Attendance' || activeStudentTab === 'Results' || activeStudentTab === 'Payments') && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
               <div className="bg-white rounded-3xl p-6 border border-ui-border shadow-lg">
                  <h5 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Bell size={12} className="text-brand-primary" /> Recent Alerts
                  </h5>
                  <div className="space-y-4">
                    <AlertItem icon={Bell} title="PTM Meeting" time="June 10" color="brand" compact />
                    <AlertItem icon={CreditCard} title="Fee Due" time="5 days" color="red" compact />
                  </div>
               </div>
               <div className="bg-white rounded-3xl p-6 border border-ui-border shadow-lg">
                  <h5 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Calendar size={12} className="text-brand-primary" /> Academic Events
                  </h5>
                  <div className="space-y-4">
                    <AlertItem icon={Calendar} title="Summer Break" time="July 01" color="slate" compact />
                    <AlertItem icon={GraduationCap} title="Results" time="June 25" color="slate" compact />
                  </div>
               </div>
            </div>
          )}
          
          <div className="bg-white rounded-3xl p-8 border border-ui-border shadow-xl">
            <h5 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-6">Need Assistance?</h5>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ui-bg flex items-center justify-center">
                  <MessageSquare size={18} className="text-text-main" />
                </div>
                <div>
                  <p className="text-xs font-black text-text-main">Support Desk</p>
                  <p className="text-[10px] font-bold text-slate-400">Available 9AM - 5PM</p>
                </div>
              </div>
              <button onClick={() => router.push('/contact')} className="w-full py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-brand-secondary transition-all">
                Contact Office
              </button>
            </div>
          </div>


        </aside>

        {/* Main Content */}
        <main className="flex-grow space-y-10">
          {view === 'Dashboard' ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-text-main uppercase tracking-tight">Active Oversight</h3>
                    <p className="text-sm text-text-muted font-medium">Monitoring {currentGuardian.children.length} registered student(s)</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLinkModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-ui-bg text-text-main font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all border border-ui-border"
                >
                  <Users size={16} /> Link Student
                </button>
              </div>

              {/* Tab Content with Conditional Sidebar Blocks */}
              {currentGuardian.children.length > 0 ? (
                <div className="space-y-10">
                  {currentGuardian.children.map((student) => (
                    <StudentCard key={student.studentID} student={student} onTabChange={setActiveStudentTab} />
                  ))}

                  {/* Sidebar Blocks - only show at bottom for Overview, or move them for other tabs if desired (handled within StudentCard now) */}
                  {activeStudentTab === 'Overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white rounded-3xl p-8 border border-ui-border shadow-xl">
                        <h5 className="text-sm font-black text-text-main uppercase tracking-widest mb-6">Recent Alerts</h5>
                        <div className="space-y-4">
                          <AlertItem icon={Bell} title="Parent-Teacher Meeting" time="Scheduled for June 10" color="brand" />
                          <AlertItem icon={CreditCard} title="Pending Half-Yearly Fee" time="Due in 5 days" color="red" />
                        </div>
                      </div>
                      <div className="bg-white rounded-3xl p-8 border border-ui-border shadow-xl">
                        <h5 className="text-sm font-black text-text-main uppercase tracking-widest mb-6">Academic Events</h5>
                        <div className="space-y-4">
                          <AlertItem icon={Calendar} title="Summer Vacation Starts" time="From July 01, 2026" color="slate" />
                          <AlertItem icon={GraduationCap} title="Final Result Publication" time="Expected June 25" color="slate" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-ui-bg/50 border border-dashed border-ui-border rounded-3xl p-12 text-center">
                  <Users size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No students linked</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">Please provide student ID to start monitoring.</p>
                </div>
              )}
            </>
          ) : view === 'Profile' ? (
            <GuardianProfileView />
          ) : (
            <GuardianReviewForm />
          )}
        </main>

      </div>

      {/* Link Student Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-ui-border animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                  <Users size={20} />
                </div>
                <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Link Student</h3>
              </div>
              <button 
                onClick={() => setShowLinkModal(false)}
                className="p-2 hover:bg-ui-bg rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleLinkSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Enter Student ID</label>
                <input 
                  type="text" 
                  value={linkID}
                  onChange={(e) => setLinkID(e.target.value)}
                  placeholder="e.g. 20241005"
                  className="w-full px-4 py-4 bg-ui-bg border border-ui-border rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all uppercase"
                  required
                />
                {linkError && (
                  <p className="text-[10px] font-bold text-red-600 ml-1">{linkError}</p>
                )}
              </div>

              <div className="bg-brand-primary/5 rounded-2xl p-4 flex gap-3">
                <ShieldCheck size={16} className="text-brand-primary shrink-0 mt-0.5" />
                <p className="text-[10px] font-medium text-slate-500 leading-relaxed">
                  Linking requires a valid institutional ID. Once linked, you will gain access to real-time academic and financial records.
                </p>
              </div>

              <button 
                type="submit"
                disabled={linkLoading}
                className="w-full py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all disabled:opacity-50"
              >
                {linkLoading ? 'Linking...' : 'Link Student Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

type TabType = 'Overview' | 'Attendance' | 'Results' | 'Payments';

function StudentCard({ student: initialStudent, onTabChange }: { student: Student, onTabChange?: (tab: TabType) => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const { markFeePaidForStudent, getStudentData } = useGuardianAuth();
  const [student, setStudent] = React.useState(initialStudent);
  
  // Notify parent when tab changes
  React.useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab, onTabChange]);
  
  // Fetch fresh student data whenever tab changes or component mounts
  React.useEffect(() => {
    const freshData = getStudentData(initialStudent.studentID);
    if (freshData) {
      setStudent(freshData);
    }
  }, [activeTab, initialStudent.studentID, getStudentData]);
  
  const fees = student.fees || [];
  const records = student.records || [];
  const currentResults = student.currentResults || [];
  const attendance = student.attendance || 0;

  const pendingFees = fees.filter(f => f.status !== 'Paid').reduce((acc, f) => acc + f.amount, 0);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-ui-border overflow-hidden transition-all group relative">
      <div className="p-8 pb-0 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
              <User size={28} />
            </div>
            <div>
              <h3 className="text-lg font-black text-text-main uppercase tracking-tight">{student.name}</h3>
              <p className="text-xs text-text-muted font-bold">ID: {student.studentID} | {student.currentClass} {student.section ? `(${student.section})` : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
              Active
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-ui-bg rounded-2xl border border-ui-border w-fit">
          {(['Overview', 'Attendance', 'Results', 'Payments'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === tab 
                  ? "bg-white text-brand-primary shadow-sm ring-1 ring-black/5" 
                  : "text-text-muted hover:text-text-main hover:bg-white/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 pt-0 min-h-[300px]">
        {activeTab === 'Overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <DetailStat label="Attendance" value={`${attendance}%`} icon={Clock} />
              <DetailStat label="Latest GPA" value={(records[0]?.gpa ?? 0).toFixed(2)} icon={TrendingUp} />
              <DetailStat label="Due Fees" value={`৳${pendingFees.toLocaleString()}`} icon={CreditCard} highlight={pendingFees > 0} />
              <DetailStat label="Rank/Standing" value={records[0] ? `#${records[0].position}` : 'N/A'} icon={BarChart3} />
            </div>

            <div className="bg-ui-bg/50 rounded-2xl p-6 border border-ui-border flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Quick summary</p>
                <p className="text-sm font-bold text-text-main leading-relaxed">
                  {student.name.split(' ')[0]} is currently maintaining a <span className="text-brand-primary font-black">{attendance}%</span> attendance rate. 
                  {pendingFees > 0 ? ` There are pending dues of ৳${pendingFees.toLocaleString()} that require attention.` : " All institutional fees are up to date."}
                </p>
              </div>
              <button className="shrink-0 flex items-center gap-2 px-6 py-3 bg-text-main text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-all">
                Full Profile <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Attendance' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <AttendanceView student={student} />
          </div>
        )}

        {activeTab === 'Results' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <AcademicHistory 
              records={records} 
              currentClass={student.currentClass} 
              currentResults={currentResults}
              student={student}
            />
          </div>
        )}

        {activeTab === 'Payments' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <FeePortal 
              fees={fees} 
              student={student}
              onPay={(feeId) => {
                markFeePaidForStudent(student.studentID, feeId);
                // Refresh student data after payment
                setTimeout(() => {
                  const freshData = getStudentData(student.studentID);
                  if (freshData) setStudent(freshData);
                }, 500);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function DetailStat({ label, value, icon: Icon, highlight }: { label: string, value: string, icon: any, highlight?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Icon size={12} className="text-slate-400" />
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className={cn(
        "text-lg font-black uppercase tracking-tight",
        highlight ? "text-red-600" : "text-text-main"
      )}>{value}</p>
    </div>
  );
}

function AlertItem({ icon: Icon, title, time, color, compact }: { icon: any, title: string, time: string, color: 'brand' | 'red' | 'slate', compact?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-4 rounded-2xl bg-ui-bg/50 border border-ui-border",
      compact ? "p-3 gap-3" : "p-4 gap-4"
    )}>
      <div className={cn(
        "rounded-xl flex items-center justify-center shrink-0 shadow-sm",
        compact ? "w-8 h-8" : "w-10 h-10",
        color === 'brand' ? "bg-brand-primary text-white" :
        color === 'red' ? "bg-red-50 text-red-600" : "bg-white text-slate-400"
      )}>
        <Icon size={compact ? 14 : 18} />
      </div>
      <div>
        <p className={cn("font-bold text-text-main leading-none", compact ? "text-xs" : "text-sm")}>{title}</p>
        <p className="text-[10px] font-bold text-slate-400 mt-1.5">{time}</p>
      </div>
    </div>
  );
}
