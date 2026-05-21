"use client";

import React from 'react';
import { Users, BookOpen, UserCheck, Award } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const Stats = () => {
  const { t } = useLanguage();

  const stats = [
    { id: 1, label: t('stats.students.label'), value: t('stats.students.value'), icon: Users, color: "bg-brand-primary/10 text-brand-primary" },
    { id: 2, label: t('stats.teachers.label'), value: t('stats.teachers.value'), icon: UserCheck, color: "bg-brand-primary/10 text-brand-primary" },
    { id: 3, label: t('stats.classes.label'), value: t('stats.classes.value'), icon: BookOpen, color: "bg-brand-primary/10 text-brand-primary" },
    { id: 4, label: t('stats.passing_rate.label'), value: t('stats.passing_rate.value'), icon: Award, color: "bg-brand-primary/10 text-brand-primary" },
  ];

  return (
    <section className="py-12 bg-ui-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-ui-surface p-6 rounded-xl shadow-sm border border-ui-border flex items-center space-x-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-main">{stat.value}</p>
                <p className="text-sm text-text-muted font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
