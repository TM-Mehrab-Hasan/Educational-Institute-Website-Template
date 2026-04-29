"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { 
      name: t('nav.about'), 
      href: '/about',
      submenu: [
        { name: t('nav.history'), href: '/about/history' },
        { name: t('nav.mission'), href: '/about/mission-vision' },
        { name: t('nav.facilities'), href: '/about/facilities' },
      ]
    },
    { 
      name: t('nav.administration'), 
      href: '/administration',
      submenu: [
        { name: 'Principal Message', href: '/administration/principal-message' },
        { name: 'Governing Body', href: '/administration/governing-body' },
        { name: 'Teachers', href: '/administration/teachers' },
        { name: 'Staff', href: '/administration/staff' },
      ]
    },
    { 
      name: t('nav.academic'), 
      href: '/academic',
      submenu: [
        { name: 'Class Routine', href: '/academic/routine' },
        { name: 'Syllabus', href: '/academic/syllabus' },
        { name: 'Academic Calendar', href: '/academic/calendar' },
        { name: 'Holiday List', href: '/academic/holidays' },
      ]
    },
    { name: t('nav.admission'), href: '/admission' },
    { name: t('nav.results'), href: '/results' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 leading-tight">DEMO MODEL COLLEGE</h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Dhaka, Bangladesh</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <button 
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {item.name} <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform" />
                  </button>
                ) : (
                  <Link 
                    href={item.href}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}

                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden">
                    <div className="py-2">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-700 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[600px] pb-6" : "max-h-0"
        )}>
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-50 last:border-0">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                      className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700"
                    >
                      {item.name} <ChevronDown size={18} className={cn("transition-transform", activeSubmenu === item.name && "rotate-180")} />
                    </button>
                    <div className={cn(
                      "bg-gray-50 overflow-hidden transition-all duration-200",
                      activeSubmenu === item.name ? "max-h-60" : "max-h-0"
                    )}>
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-8 py-2 text-sm text-gray-600 hover:text-green-700"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
