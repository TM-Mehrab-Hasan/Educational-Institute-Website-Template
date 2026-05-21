"use client";

import React, { useState, useEffect } from 'react';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { useGuardianAuth, Review } from '@/lib/GuardianAuthContext';
import { cn } from '@/lib/utils';

export default function GuardianReviewForm() {
  const { currentGuardian, submitReview, getAllReviews } = useGuardianAuth();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [relation, setRelation] = useState('Father');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [existingReview, setExistingReview] = useState<Review | null>(null);

  useEffect(() => {
    if (currentGuardian) {
      const allReviews = getAllReviews();
      const myReview = allReviews.find(r => r.guardianId === currentGuardian.id);
      if (myReview) {
        setExistingReview(myReview);
        setRating(myReview.rating);
        setContent(myReview.content);
        setRelation(myReview.relation);
      }
    }
  }, [currentGuardian, getAllReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    const result = await submitReview(rating, content, relation);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      // Refresh existing review state
      const allReviews = getAllReviews();
      const myReview = allReviews.find(r => r.guardianId === currentGuardian?.id);
      if (myReview) setExistingReview(myReview);
    }
  };

  if (!currentGuardian) return null;

  return (
    <div className="bg-white rounded-3xl p-8 border border-ui-border shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-text-main uppercase tracking-tight">Institutional Feedback</h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Share your experience with us</p>
        </div>
        <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
          <Star size={24} className="fill-brand-primary" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 block">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  rating >= s ? "text-orange-400" : "text-slate-200"
                )}
              >
                <Star size={24} className={cn(rating >= s ? "fill-orange-400" : "")} />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2 block">Relationship to Student</label>
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ui-bg border border-ui-border focus:ring-2 focus:ring-brand-primary/20 outline-none text-sm font-bold text-text-main transition-all"
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Legal Guardian">Legal Guardian</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Uncle/Aunt">Uncle/Aunt</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2 block">Your Feedback</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell us about your experience with the college, faculty, or facilities..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-ui-bg border border-ui-border focus:ring-2 focus:ring-brand-primary/20 outline-none text-sm font-bold text-text-main transition-all resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg",
            submitted 
              ? "bg-green-500 text-white shadow-green-500/20" 
              : "bg-brand-primary hover:bg-brand-secondary text-white shadow-brand-primary/20"
          )}
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : submitted ? (
            <><CheckCircle2 size={16} /> Review Updated</>
          ) : (
            <><Send size={16} /> {existingReview ? 'Update Review' : 'Submit Review'}</>
          )}
        </button>

        {existingReview && (
          <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
            Last updated: {new Date(existingReview.date).toLocaleDateString()}
          </p>
        )}
      </form>
    </div>
  );
}
