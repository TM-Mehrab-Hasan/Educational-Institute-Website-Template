"use client";

import React, { useState } from 'react';
import { CreditCard, CheckCircle, Clock, AlertTriangle, Receipt, Download, ArrowRight, X, Banknote, Loader } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import ReceiptPDF from '@/lib/pdf/ReceiptPDF';
import { FeeRecord, Student } from '@/lib/student-types';
import { useStudentAuth } from '@/lib/StudentAuthContext';
import { cn } from '@/lib/utils';

export default function FeePortal({ fees: initialFees, student, onPay }: { fees: FeeRecord[]; student?: Student; onPay?: (feeId: string) => void }) {
  // Only use useStudentAuth if onPay callback is not provided
  const studentAuth = !onPay ? useStudentAuth() : null;
  const fees = initialFees || [];
  const [payingFeeId, setPayingFeeId] = useState<string | null>(null);
  const [paidSuccess, setPaidSuccess] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Paid' | 'Overdue'>('All');
  const [loadingFeeId, setLoadingFeeId] = useState<string | null>(null);

  const totalPaid = fees.filter(f => f.status === 'Paid').reduce((acc, f) => acc + f.amount, 0);
  const totalDue = fees.filter(f => f.status !== 'Paid').reduce((acc, f) => acc + f.amount, 0);
  const overdue = fees.filter(f => f.status === 'Overdue');

  const filtered = filter === 'All' ? fees : fees.filter(f => f.status === filter);

  const handlePay = async (feeId: string) => {
    setPayingFeeId(null);
    if (onPay) {
      onPay(feeId);
    } else if (studentAuth) {
      studentAuth.markFeePaid(feeId);
    }
    setPaidSuccess(feeId);
    setTimeout(() => setPaidSuccess(null), 3000);
  };

  const openReceiptPDF = async (fee: FeeRecord) => {
    setLoadingFeeId(fee.id);
    try {
      const logoUrl = `${window.location.origin}/images/logo.png`;
      const blob = await pdf(
        <ReceiptPDF data={{
          studentName:  student?.name  ?? 'Student',
          studentID:    student?.studentID ?? 'N/A',
          className:    student?.currentClass ?? 'N/A',
          roll:         student?.currentRoll ?? 'N/A',
          receiptNo:    fee.receiptNo ?? `REC-${fee.id.toUpperCase()}`,
          paidDate:     fee.paidDate ?? new Date().toLocaleDateString(),
          fees:         [fee],
          totalAmount:  fee.amount,
          schoolName:   'Demo Model School & College',
          logoUrl,
        }} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFeeId(null);
    }
  };

  const statusConfig = {
    Paid:    { icon: CheckCircle,   color: 'text-green-600',  bg: 'bg-green-50 border-green-100',   badge: 'bg-green-100 text-green-700' },
    Pending: { icon: Clock,         color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-100', badge: 'bg-yellow-100 text-yellow-700' },
    Overdue: { icon: AlertTriangle, color: 'text-red-600',    bg: 'bg-red-50 border-red-100',       badge: 'bg-red-100 text-red-700' },
  };

  const typeColor: Record<string, string> = {
    Monthly:      'bg-brand-primary/10 text-brand-primary',
    Exam:         'bg-purple-100 text-purple-700',
    Registration: 'bg-blue-100 text-blue-700',
    Other:        'bg-slate-100 text-slate-500',
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* Payment Modal */}
      {payingFeeId && (() => {
        const fee = fees.find(f => f.id === payingFeeId)!;
        return (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-in zoom-in-90 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-text-main uppercase tracking-tight">Confirm Payment</h3>
                <button onClick={() => setPayingFeeId(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="bg-ui-bg rounded-2xl p-6 mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Fee</span>
                  <span className="text-sm font-bold text-text-main">{fee.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Amount</span>
                  <span className="text-xl font-black text-brand-primary">৳{fee.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Due Date</span>
                  <span className="text-sm font-bold text-text-main">{new Date(fee.dueDate).toLocaleDateString('en-BD', { day:'numeric', month:'long', year:'numeric' })}</span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 text-center mb-6">
                This is a demo payment simulation. No real transaction will occur.
              </p>
              <button
                onClick={() => handlePay(fee.id)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-primary/20 transition-all"
              >
                <Banknote size={16} /> Confirm & Pay ৳{fee.amount.toLocaleString()}
              </button>
            </div>
          </div>
        );
      })()}

      {/* Success Toast */}
      {paidSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle size={20} />
          <div>
            <p className="font-black text-sm">Payment Successful!</p>
            <p className="text-xs text-white/80">Receipt generated.</p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-ui-border shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-500/20">
            <AlertTriangle size={22} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Due</p>
            <p className="text-2xl font-black text-text-main">৳{totalDue.toLocaleString()}</p>
            <p className="text-[10px] font-bold text-slate-400">{fees.filter(f => f.status !== 'Paid').length} unpaid items</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-ui-border shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/20">
            <CheckCircle size={22} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Paid</p>
            <p className="text-2xl font-black text-text-main">৳{totalPaid.toLocaleString()}</p>
            <p className="text-[10px] font-bold text-slate-400">{fees.filter(f => f.status === 'Paid').length} payments</p>
          </div>
        </div>
        <div className={cn(
          "rounded-3xl p-6 border shadow-xl flex items-center gap-4",
          overdue.length > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
        )}>
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", overdue.length > 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600")}>
            {overdue.length > 0 ? <AlertTriangle size={22} /> : <CheckCircle size={22} />}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Overdue</p>
            <p className={cn("text-2xl font-black", overdue.length > 0 ? "text-red-600" : "text-green-600")}>
              {overdue.length > 0 ? `৳${overdue.reduce((a,f)=>a+f.amount,0).toLocaleString()}` : 'Clear!'}
            </p>
            <p className="text-[10px] font-bold text-slate-400">{overdue.length} overdue item{overdue.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Fee List */}
      <div className="bg-white rounded-3xl shadow-xl border border-ui-border overflow-hidden">
        <div className="px-8 py-5 border-b border-ui-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-ui-bg/30">
          <h3 className="text-sm font-black text-text-main uppercase tracking-widest">Fee Ledger</h3>
          <div className="flex gap-2">
            {(['All', 'Pending', 'Paid', 'Overdue'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === f
                    ? "bg-brand-primary text-white"
                    : "bg-white border border-ui-border text-slate-400 hover:border-brand-primary hover:text-brand-primary"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-ui-border">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Receipt size={48} className="text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-400">No {filter.toLowerCase()} fees found.</p>
            </div>
          ) : filtered.map(fee => {
            const cfg = statusConfig[fee.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={fee.id} className={cn("px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-ui-bg/30")}>
                <div className="flex items-center gap-4">
                  <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border", cfg.bg)}>
                    <StatusIcon size={18} className={cfg.color} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">{fee.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider", typeColor[fee.type])}>
                        {fee.type}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {fee.status === 'Paid' && fee.paidDate
                          ? `Paid ${new Date(fee.paidDate).toLocaleDateString()}`
                          : `Due ${new Date(fee.dueDate).toLocaleDateString()}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 ml-15 sm:ml-0">
                  <div className="text-right">
                    <p className="text-lg font-black text-text-main">৳{fee.amount.toLocaleString()}</p>
                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg", cfg.badge)}>
                      {fee.status}
                    </span>
                  </div>

                  {fee.status === 'Paid' ? (
                    <button
                      onClick={() => openReceiptPDF(fee)}
                      disabled={loadingFeeId === fee.id}
                      title={fee.receiptNo ? `Receipt: ${fee.receiptNo}` : 'View Receipt'}
                      className="p-2.5 bg-ui-bg hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors text-slate-400 border border-ui-border disabled:opacity-50"
                    >
                      {loadingFeeId === fee.id ? <Loader size={16} className="animate-spin" /> : <Download size={16} />}
                    </button>
                  ) : (
                    <button
                      onClick={() => setPayingFeeId(fee.id)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-md shadow-brand-primary/20"
                    >
                      Pay <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
