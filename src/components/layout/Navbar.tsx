"use client";

import React, { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const t = useTranslations();
  const pathname = usePathname();

  const navItems = [
    { 
      name: t('nav.about'), 
      href: '/about' as any,
      submenu: [
        { name: t('nav.history'), href: '/about/history' as any },
        { name: t('nav.mission'), href: '/about/mission-vision' as any },
        { name: t('nav.facilities'), href: '/about/facilities' as any },
        { name: t('nav.achievements'), href: '/about/achievements' as any },
        { name: t('nav.rules'), href: '/about/rules' as any },
        { name: t('nav.organogram'), href: '/about/organogram' as any },
      ]
    },
    { 
      name: t('nav.administration'), 
      href: '/administration' as any,
      submenu: [
        { name: t('nav.principal_msg'), href: '/administration/principal-message' as any },
        { name: t('nav.governing'), href: '/administration/governing-body' as any },
        { name: t('nav.teachers'), href: '/administration/teachers' as any },
        { name: t('nav.staff'), href: '/administration/staff' as any },
      ]
    },
    { 
      name: t('nav.academic'), 
      href: '/academic' as any,
      submenu: [
        { name: t('nav.routine'), href: '/academic/routine' as any },
        { name: t('nav.syllabus'), href: '/academic/curriculum' as any },
        { name: t('nav.calendar'), href: '/academic/calendar' as any },
        { name: t('nav.holidays'), href: '/academic/holidays' as any },
        { name: t('nav.results'), href: '/results' as any },
        { name: t('notices.title'), href: '/notices' as any },
        { name: 'Events & Activities', href: '/academic/events' as any },
      ]
    },
    { name: t('nav.admission'), href: '/admission' as any },
    { name: t('nav.student'), href: '/student' as any },
    { name: t('nav.guardian'), href: '/guardian' as any },
    { name: t('nav.gallery'), href: '/gallery' as any },
    { name: t('nav.contact'), href: '/contact' as any },
  ];

  // Returns true if this top-level item or any of its submenus is active
  const isActive = (item: any) => {
    if (pathname === item.href) return true;
    if (item.href !== '/' && pathname.startsWith(item.href)) return true;
    if (item.submenu) {
      return item.submenu.some((sub: any) => pathname === sub.href || pathname.startsWith(sub.href + '/'));
    }
    return false;
  };

  // Returns true if a submenu link exactly matches the current path
  const isSubActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative w-16 h-16 bg-white rounded-xl flex items-center justify-center p-1 shadow-lg group-hover:shadow-green-100 transition-all border border-gray-100">
              <img 
                src="/images/logo.png" 
                alt="Demo Model School & College Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-none tracking-tight">
                DEMO MODEL <span className="text-green-700">SCHOOL & COLLEGE</span>
              </h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Dhaka, Bangladesh</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <Link 
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-2 text-sm font-medium transition-colors relative",
                        active
                          ? "text-green-700 font-bold"
                          : "text-gray-700 hover:text-green-700"
                      )}
                    >
                      {item.name}
                      <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform" />
                      {/* Active underline indicator */}
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-green-600 rounded-full" />
                      )}
                    </Link>
                  ) : (
                    <Link 
                      href={item.href}
                      className={cn(
                        "relative block px-4 py-2 text-sm font-medium transition-colors",
                        active
                          ? "text-green-700 font-bold"
                          : "text-gray-700 hover:text-green-700"
                      )}
                    >
                      {item.name}
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-green-600 rounded-full" />
                      )}
                    </Link>
                  )}

                  {item.submenu && (
                    <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden">
                      <div className="py-2">
                        {item.submenu.map((sub) => {
                          const subActive = isSubActive(sub.href);
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={cn(
                                "flex items-center px-4 py-2 text-sm transition-colors border-l-2",
                                subActive
                                  ? "border-green-600 bg-green-50 text-green-700 font-bold"
                                  : "border-transparent text-gray-600 hover:bg-green-50 hover:text-green-700"
                              )}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <div key={item.name} className={cn("border-b border-gray-50 last:border-0", active && "bg-green-50/60")}>
                  {item.submenu ? (
                    <>
                      <div className="flex items-center justify-between w-full px-4 py-3">
                        <Link 
                          href={item.href} 
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex-grow text-base font-medium",
                            active ? "text-green-700 font-bold" : "text-gray-700"
                          )}
                        >
                          {item.name}
                        </Link>
                        <button 
                          onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                          className="p-1 -mr-1 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <ChevronDown size={18} className={cn("transition-transform", activeSubmenu === item.name && "rotate-180")} />
                        </button>
                      </div>
                      <div className={cn(
                        "bg-gray-50 overflow-hidden transition-all duration-200",
                        activeSubmenu === item.name ? "max-h-60" : "max-h-0"
                      )}>
                        {item.submenu.map((sub) => {
                          const subActive = isSubActive(sub.href);
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={cn(
                                "block px-8 py-2 text-sm border-l-2 ml-4",
                                subActive
                                  ? "border-green-600 text-green-700 font-bold bg-green-50"
                                  : "border-transparent text-gray-600 hover:text-green-700"
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-base font-medium",
                        active ? "text-green-700 font-bold" : "text-gray-700"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
