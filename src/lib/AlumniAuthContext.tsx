"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { safeStorage } from './storage-utils';

export interface Alumni {
  id: string;
  name: string;
  email: string;
  phone: string;
  batch: string;
  department: string;
  profession?: string;
  organization?: string;
  location?: string;
  profilePhoto?: string;
  bio?: string;
  skills?: string[];
  donations?: { project: string; amount: number; date: string }[];
  eventRegistrations?: string[];
  jobApplications?: string[];
  impactPoints?: number;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  type: string;
  posted: string;
  postedBy: string; // Alumni ID
  description?: string;
  location?: string;
  requirements?: string;
  link?: string;
}

interface AlumniAuthContextType {
  currentAlumni: Alumni | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, batch: string, department: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateAlumni: (updatedAlumni: Alumni) => void;
  getAllAlumni: () => Alumni[];
  donate: (project: string, amount: number) => Promise<{ success: boolean }>;
  registerForEvent: (eventId: string) => Promise<{ success: boolean }>;
  applyForJob: (jobId: string) => Promise<{ success: boolean }>;
  postJob: (job: Omit<JobOpportunity, 'id' | 'posted' | 'postedBy'>) => Promise<{ success: boolean }>;
  getJobs: () => JobOpportunity[];
}

const AlumniAuthContext = createContext<AlumniAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'dmc_alumni';
const SESSION_KEY = 'dmc_alumni_session';
const JOBS_KEY = 'dmc_alumni_jobs';

export function AlumniAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentAlumni, setCurrentAlumni] = useState<Alumni | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pre-seed dummy data if empty
    const allAlumni = safeStorage.get<any[]>(STORAGE_KEY, []);
    if (allAlumni.length === 0) {
      const dummyAlumni = [
        {
          id: 'alumni-1',
          name: 'Tanvir Ahmed',
          email: 'alumni@example.com',
          phone: '+880 1700-000000',
          batch: 'Class of 2012',
          department: 'Science',
          password: 'password123',
          profession: 'Senior Software Engineer',
          organization: 'Tech Corp',
          impactPoints: 1250,
          donations: [{ project: 'Digital Library', amount: 5000, date: '2026-05-10' }],
          eventRegistrations: ['event-1'],
          jobApplications: []
        },
        {
          id: 'alumni-2',
          name: 'Sultana Razia',
          email: 'razia@example.com',
          phone: '+880 1700-111111',
          batch: 'Class of 2015',
          department: 'Business Studies',
          password: 'password123',
          profession: 'Marketing Manager',
          organization: 'Global Brands',
          impactPoints: 850
        }
      ];
      safeStorage.set(STORAGE_KEY, dummyAlumni);
    }

    // Pre-seed jobs
    const allJobs = safeStorage.get<JobOpportunity[]>(JOBS_KEY, []);
    if (allJobs.length === 0) {
      const dummyJobs = [
        { id: 'job-1', title: 'Senior UX Designer', company: 'TechSolutions Ltd', type: 'Full-time', posted: '2 days ago', postedBy: 'alumni-1' },
        { id: 'job-2', title: 'Marketing Manager', company: 'Global Brands', type: 'Remote', posted: '5 days ago', postedBy: 'alumni-2' },
        { id: 'job-3', title: 'Software Engineer (Java)', company: 'Innovate Soft', type: 'Contract', posted: '1 week ago', postedBy: 'alumni-1' },
      ];
      safeStorage.set(JOBS_KEY, dummyJobs);
    }

    const session = safeStorage.get<Alumni | null>(SESSION_KEY, null);
    if (session) {
      setCurrentAlumni(session);
    }
    setIsLoading(false);
  }, []);

  const getAllAlumni = useCallback(() => {
    return safeStorage.get<any[]>(STORAGE_KEY, []);
  }, []);

  const getJobs = useCallback(() => {
    return safeStorage.get<JobOpportunity[]>(JOBS_KEY, []);
  }, []);

  const saveToStorage = (alumni: Alumni) => {
    safeStorage.set(SESSION_KEY, alumni);
    const allAlumni = getAllAlumni();
    const index = allAlumni.findIndex(a => a.id === alumni.id);
    if (index !== -1) {
      const password = allAlumni[index].password;
      allAlumni[index] = { ...alumni, password };
      safeStorage.set(STORAGE_KEY, allAlumni);
    }
  };

  const login = async (email: string, password: string) => {
    const allAlumni = getAllAlumni();
    const alumni = allAlumni.find((a: any) => a.email === email && a.password === password);
    if (alumni) {
      const { password: _, ...alumniData } = alumni;
      setCurrentAlumni(alumniData);
      safeStorage.set(SESSION_KEY, alumniData);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = async (name: string, email: string, phone: string, batch: string, department: string, password: string) => {
    const allAlumni = getAllAlumni();
    if (allAlumni.find((a: any) => a.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    const newAlumni: any = {
      id: `alumni-${Date.now()}`,
      name, email, phone, batch, department, password,
      impactPoints: 0, donations: [], eventRegistrations: [], jobApplications: []
    };
    const updatedAlumni = [...allAlumni, newAlumni];
    safeStorage.set(STORAGE_KEY, updatedAlumni);
    const { password: _, ...alumniData } = newAlumni;
    setCurrentAlumni(alumniData);
    safeStorage.set(SESSION_KEY, alumniData);
    return { success: true };
  };

  const logout = () => {
    setCurrentAlumni(null);
    safeStorage.remove(SESSION_KEY);
  };

  const updateAlumni = (updatedAlumni: Alumni) => {
    setCurrentAlumni(updatedAlumni);
    saveToStorage(updatedAlumni);
  };

  const donate = async (project: string, amount: number) => {
    if (!currentAlumni) return { success: false };
    const newDonation = { project, amount, date: new Date().toISOString() };
    const updatedAlumni = {
      ...currentAlumni,
      donations: [...(currentAlumni.donations || []), newDonation],
      impactPoints: (currentAlumni.impactPoints || 0) + Math.floor(amount / 10)
    };
    updateAlumni(updatedAlumni);
    return { success: true };
  };

  const registerForEvent = async (eventId: string) => {
    if (!currentAlumni) return { success: false };
    if (currentAlumni.eventRegistrations?.includes(eventId)) return { success: true };
    const updatedAlumni = {
      ...currentAlumni,
      eventRegistrations: [...(currentAlumni.eventRegistrations || []), eventId],
      impactPoints: (currentAlumni.impactPoints || 0) + 50
    };
    updateAlumni(updatedAlumni);
    return { success: true };
  };

  const applyForJob = async (jobId: string) => {
    if (!currentAlumni) return { success: false };
    if (currentAlumni.jobApplications?.includes(jobId)) return { success: true };
    const updatedAlumni = {
      ...currentAlumni,
      jobApplications: [...(currentAlumni.jobApplications || []), jobId]
    };
    updateAlumni(updatedAlumni);
    return { success: true };
  };

  const postJob = async (job: Omit<JobOpportunity, 'id' | 'posted' | 'postedBy'>) => {
    if (!currentAlumni) return { success: false };
    const allJobs = getJobs();
    const newJob: JobOpportunity = {
      ...job,
      id: `job-${Date.now()}`,
      posted: 'Just now',
      postedBy: currentAlumni.id
    };
    safeStorage.set(JOBS_KEY, [newJob, ...allJobs]);
    return { success: true };
  };

  return (
    <AlumniAuthContext.Provider value={{ 
      currentAlumni, isLoading, login, register, logout, updateAlumni, 
      getAllAlumni, donate, registerForEvent, applyForJob, postJob, getJobs 
    }}>
      {children}
    </AlumniAuthContext.Provider>
  );
}

export function useAlumniAuth() {
  const context = useContext(AlumniAuthContext);
  if (context === undefined) {
    throw new Error('useAlumniAuth must be used within an AlumniAuthProvider');
  }
  return context;
}
