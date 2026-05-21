import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Timer, ChevronDown, ChevronRight, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Student } from '@/lib/student-types';

export default function AttendanceView({ student }: { student: Student }) {
  const allRecords: any[] = student.attendanceRecords || [];
  const present = allRecords.filter((r: any) => r.status === 'Present').length;
  const absent  = allRecords.filter((r: any) => r.status === 'Absent').length;
  const late    = allRecords.filter((r: any) => r.status === 'Late').length;

  // Calculate actual percentage from records
  const calculatedAttendance = allRecords.length > 0 
    ? Math.round((present / allRecords.length) * 100) 
    : student.attendance || 0;

  // Group by YYYY-MM
  const grouped: Record<string, any[]> = {};
  [...allRecords].sort((a, b) => b.date.localeCompare(a.date)).forEach(r => {
    const key = r.date.slice(0, 7);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(r);
  });

  const monthKeys = Object.keys(grouped).sort().reverse();
  const [expandedMonths, setExpandedMonths] = useState<string[]>([monthKeys[0]]);

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const statusIcons: Record<string, any> = {
    Present: <CheckCircle size={14} className="text-green-500" />,
    Absent:  <XCircle size={14} className="text-red-500" />,
    Late:    <Timer size={14} className="text-yellow-500" />,
  };

  const badgeColor: Record<string, string> = {
    Present: 'bg-green-50 text-green-700 border-green-200',
    Absent:  'bg-red-50 text-red-700 border-red-200',
    Late:    'bg-yellow-50 text-yellow-700 border-yellow-200',
  };

  const rowBorder: Record<string, string> = {
    Present: 'border-l-green-500',
    Absent:  'border-l-red-500',
    Late:    'border-l-yellow-500',
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-text-main uppercase tracking-tight">Attendance Record</h3>
        <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-xl">
          <Activity size={16} className="text-brand-primary" />
          <span className="text-xs font-black text-brand-primary uppercase tracking-widest">Live Sync</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-brand-primary text-white rounded-3xl p-6 shadow-xl shadow-brand-primary/20 text-center">
          <p className="text-3xl font-black">{calculatedAttendance}%</p>
          <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-70">Overall Rate</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-green-200 text-center">
          <p className="text-3xl font-black text-green-600">{present}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Present</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-red-200 text-center">
          <p className="text-3xl font-black text-red-600">{absent}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Absent</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-yellow-200 text-center">
          <p className="text-3xl font-black text-yellow-600">{late}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Late</p>
        </div>
      </div>

      {/* Ladder Style Month-by-month grouped records */}
      <div className="space-y-4">
        {monthKeys.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-ui-border">
            <Calendar size={40} className="text-slate-200 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No records found</p>
          </div>
        ) : (
          monthKeys.map((month) => {
            const dateObj = new Date(month + "-01");
            const monthName = dateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });
            const isExpanded = expandedMonths.includes(month);
            const recs = grouped[month];
            const mPresent = recs.filter(r => r.status === 'Present').length;
            const mRate = Math.round((mPresent / recs.length) * 100);

            return (
              <div key={month} className="bg-white rounded-2xl border border-ui-border shadow-sm overflow-hidden transition-all">
                <button 
                  onClick={() => toggleMonth(month)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                      <Calendar size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-text-main uppercase tracking-tight">{monthName}</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-0.5">
                        {recs.length} Days Recorded
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2">
                       <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-primary" style={{ width: `${mRate}%` }} />
                       </div>
                       <span className="text-[10px] font-black text-brand-primary w-8">{mRate}%</span>
                    </div>
                    {isExpanded ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-ui-border bg-ui-bg/30 divide-y divide-ui-border">
                    {recs.map((rec: any) => (
                      <div key={rec.date} className={cn("px-8 py-4 flex items-center justify-between border-l-4", rowBorder[rec.status as keyof typeof rowBorder])}>
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                            {statusIcons[rec.status]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-main">
                              {new Date(rec.date + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'short', weekday: 'long' })}
                            </p>
                          </div>
                        </div>
                        <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", badgeColor[rec.status as keyof typeof badgeColor])}>
                          {rec.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
