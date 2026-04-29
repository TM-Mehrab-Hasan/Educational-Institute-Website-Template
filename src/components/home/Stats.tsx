import React from 'react';
import { Users, BookOpen, UserCheck, Award } from 'lucide-react';

const stats = [
  { id: 1, label: "Students", value: "2,500+", icon: Users, color: "bg-blue-500" },
  { id: 2, label: "Teachers", value: "85+", icon: UserCheck, color: "bg-green-500" },
  { id: 3, label: "Classes", value: "12", icon: BookOpen, color: "bg-purple-500" },
  { id: 4, label: "Passing Rate", value: "98%", icon: Award, color: "bg-orange-500" },
];

const Stats = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
