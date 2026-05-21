"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Student } from './student-types';
import { safeStorage } from './storage-utils';

// Ensure student data has all required arrays
const ensureStudentDataComplete = (student: Student): Student => {
  return {
    ...student,
    records: student.records && student.records.length > 0 ? student.records : [],
    currentResults: student.currentResults && student.currentResults.length > 0 ? student.currentResults : [],
    fees: student.fees && student.fees.length > 0 ? student.fees : [],
    attendanceRecords: student.attendanceRecords && student.attendanceRecords.length > 0 ? student.attendanceRecords : [],
    attendance: student.attendance ?? 0
  };
};

export interface Guardian {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  children: Student[];
  profilePhoto?: string;
}

export interface Review {
  id: string;
  guardianId: string;
  guardianName: string;
  relation: string;
  content: string;
  rating: number;
  date: string;
}

interface GuardianAuthContextType {
  currentGuardian: Guardian | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  markFeePaidForStudent: (studentID: string, feeId: string) => void;
  linkStudent: (studentID: string) => Promise<{ success: boolean; message?: string }>;
  updateGuardian: (updatedGuardian: Guardian) => void;
  getStudentData: (studentID: string) => Student | null;
  submitReview: (rating: number, content: string, relation: string) => Promise<{ success: boolean; message?: string }>;
  getAllReviews: () => Review[];
}

const GuardianAuthContext = createContext<GuardianAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'dmc_guardians';
const REVIEWS_KEY = 'dmc_reviews';
const SESSION_KEY = 'dmc_guardian_session';

const DEMO_CHILD: Student = {
  id: 'std-1',
  studentID: '20241005',
  name: 'Ariful Islam',
  email: 'student@example.com',
  password: 'password123',
  currentClass: 'Class 11',
  section: 'Science',
  currentRoll: '05',
  group: 'Science',
  dateOfBirth: '2009-03-15',
  bloodGroup: 'O+',
  guardianName: 'Md. Zahidul Islam (Father)',
  guardianContact: '+880 1711-223344',
  address: 'House 45, Road 12, Dhanmondi, Dhaka-1209',
  attendance: 91,
  attendanceRecords: [
    { date: '2026-05-19', status: 'Present' },
    { date: '2026-05-18', status: 'Present' },
    { date: '2026-05-15', status: 'Present' },
    { date: '2026-05-14', status: 'Present' },
    { date: '2026-05-13', status: 'Absent' },
    { date: '2026-05-12', status: 'Present' },
    { date: '2026-05-11', status: 'Present' },
    { date: '2026-05-08', status: 'Present' },
    { date: '2026-05-07', status: 'Late' },
    { date: '2026-05-06', status: 'Present' },
    { date: '2026-05-05', status: 'Absent' },
    { date: '2026-05-04', status: 'Present' },
    { date: '2026-05-01', status: 'Present' },
    { date: '2026-04-30', status: 'Present' },
    { date: '2026-04-29', status: 'Present' },
    { date: '2026-04-28', status: 'Absent' },
    { date: '2026-04-27', status: 'Present' },
    { date: '2026-04-24', status: 'Present' },
    { date: '2026-04-23', status: 'Late' },
    { date: '2026-04-22', status: 'Present' },
    { date: '2026-04-21', status: 'Present' },
    { date: '2026-04-20', status: 'Present' },
    { date: '2026-04-17', status: 'Absent' },
    { date: '2026-04-16', status: 'Present' },
    { date: '2026-04-15', status: 'Present' },
    { date: '2026-04-14', status: 'Present' },
    { date: '2026-04-13', status: 'Present' },
    { date: '2026-04-10', status: 'Late' },
    { date: '2026-04-09', status: 'Present' },
    { date: '2026-04-08', status: 'Present' },
    { date: '2026-04-07', status: 'Present' },
    { date: '2026-04-06', status: 'Absent' },
    { date: '2026-04-03', status: 'Present' },
    { date: '2026-04-02', status: 'Present' },
    { date: '2026-04-01', status: 'Present' },
  ],
  currentResults: [
    {
      examName: 'Half Yearly Examination 2026',
      examType: 'Half Yearly',
      date: '2026-04-20',
      published: true,
      totalMarks: 650,
      obtainedMarks: 541,
      position: 4,
      results: [
        { name: 'Bangla', marks: 85, grade: 'A+', gp: 5.0 },
        { name: 'English', marks: 80, grade: 'A+', gp: 5.0 },
        { name: 'Physics', marks: 92, grade: 'A+', gp: 5.0 },
        { name: 'Chemistry', marks: 88, grade: 'A+', gp: 5.0 },
        { name: 'Higher Math', marks: 95, grade: 'A+', gp: 5.0 },
        { name: 'Biology', marks: 78, grade: 'A', gp: 4.0 },
        { name: 'ICT', marks: 23, grade: 'B', gp: 2.0 },
      ]
    },
    {
      examName: '1st Monthly Test',
      examType: 'Monthly Test',
      date: '2026-02-10',
      published: true,
      totalMarks: 300,
      obtainedMarks: 274,
      position: 3,
      results: [
        { name: 'Physics', marks: 45, grade: 'A+', gp: 5.0 },
        { name: 'Chemistry', marks: 42, grade: 'A+', gp: 5.0 },
        { name: 'Higher Math', marks: 48, grade: 'A+', gp: 5.0 },
        { name: 'Biology', marks: 39, grade: 'A', gp: 4.0 },
        { name: 'English', marks: 44, grade: 'A+', gp: 5.0 },
        { name: 'Bangla', marks: 41, grade: 'A+', gp: 5.0 },
      ]
    },
  ],
  records: [
    {
      class: 'Class 10 (SSC)', year: 2025, roll: '08', gpa: 5.00,
      position: 3, totalStudents: 120, attendancePercent: 94, group: 'Science',
      results: [
        { name: 'Mathematics', marks: 92, grade: 'A+', gp: 5.0 },
        { name: 'Physics', marks: 92, grade: 'A+', gp: 5.0 },
        { name: 'Chemistry', marks: 88, grade: 'A+', gp: 5.0 },
        { name: 'Biology', marks: 85, grade: 'A+', gp: 5.0 },
      ]
    }
  ],
  fees: [
    { id: 'f1', title: 'Monthly Fee – May 2026', amount: 2500, dueDate: '2026-05-10', paidDate: '2026-05-08', status: 'Paid', type: 'Monthly', receiptNo: 'REC-20260508-001' },
    { id: 'f2', title: 'Monthly Fee – April 2026', amount: 2500, dueDate: '2026-04-10', paidDate: '2026-04-07', status: 'Paid', type: 'Monthly', receiptNo: 'REC-20260407-002' },
    { id: 'f4', title: 'Half Yearly Exam Fee', amount: 1500, dueDate: '2026-06-05', status: 'Pending', type: 'Exam' },
    { id: 'f5', title: 'Monthly Fee – June 2026', amount: 2500, dueDate: '2026-06-10', status: 'Pending', type: 'Monthly' },
    { id: 'f6', title: 'Library Fine', amount: 100, dueDate: '2026-05-20', status: 'Overdue', type: 'Other' },
  ],
};

export const GuardianAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [currentGuardian, setCurrentGuardian] = useState<Guardian | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedGuardians = safeStorage.get<Guardian[]>(STORAGE_KEY, []);
    const storedSession = localStorage.getItem(SESSION_KEY);

    let initialGuardians: Guardian[];
    if (storedGuardians && storedGuardians.length > 0) {
      initialGuardians = storedGuardians;
    } else {
      initialGuardians = [
        {
          id: 'grd-1',
          name: 'Md. Zahidul Islam',
          email: 'guardian@example.com',
          phone: '+880 1711-223344',
          password: 'password123',
          children: [DEMO_CHILD]
        }
      ];
    }

    // Ensure demo guardian has complete children data
    initialGuardians = initialGuardians.map(g => {
      if (g.id === 'grd-1' && (!g.children || g.children.length === 0)) {
        return { ...g, children: [DEMO_CHILD] };
      }
      if (g.id === 'grd-1' && g.children) {
        return {
          ...g,
          children: g.children.map(c => ensureStudentDataComplete(c))
        };
      }
      return g;
    });

    setGuardians(initialGuardians);
    safeStorage.set(STORAGE_KEY, initialGuardians);

    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        let fresh = initialGuardians.find(g => g.id === session.id);
        
        // If guardian found but missing children data, merge with demo
        if (fresh && fresh.id === 'grd-1') {
          if (!fresh.children || fresh.children.length === 0) {
            fresh = { ...fresh, children: [DEMO_CHILD] };
          } else {
            // Verify each child has complete data
            fresh = {
              ...fresh,
              children: fresh.children.map(child => 
                (child.studentID === DEMO_CHILD.studentID && (!child.fees || !child.attendanceRecords))
                  ? DEMO_CHILD
                  : ensureStudentDataComplete(child)
              )
            };
          }
        }
        
        setCurrentGuardian(fresh ?? session);
      } catch (error) {
        console.error('Error restoring session:', error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (currentGuardian) {
      safeStorage.set(SESSION_KEY, currentGuardian);
    } else {
      safeStorage.remove(SESSION_KEY);
    }
  }, [currentGuardian, isLoading]);

  const login = async (email: string, password: string) => {
    let guardian = guardians.find(g => g.email === email && g.password === password);
    if (guardian) {
      // Ensure demo guardian has complete student data
      if (guardian.id === 'grd-1' && (!guardian.children || guardian.children.length === 0)) {
        guardian = { ...guardian, children: [DEMO_CHILD] };
      } else if (guardian.children) {
        // Validate and complete all children data
        guardian = {
          ...guardian,
          children: guardian.children.map(c => ensureStudentDataComplete(c))
        };
      }
      setCurrentGuardian(guardian);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password. Please try again.' };
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    if (guardians.find(g => g.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newGuardian: Guardian = {
      id: `grd-${Date.now()}`,
      name,
      email,
      phone,
      password,
      children: []
    };

    const updated = [...guardians, newGuardian];
    setGuardians(updated);
    safeStorage.set(STORAGE_KEY, updated);
    setCurrentGuardian(newGuardian);
    return { success: true };
  };

  const logout = () => {
    setCurrentGuardian(null);
  };

  const linkStudent = async (studentID: string) => {
    if (!currentGuardian) return { success: false, message: 'Not logged in' };
    
    // Check if already linked
    if (currentGuardian.children.find(c => c.studentID === studentID)) {
      return { success: false, message: 'Student already linked to your account' };
    }

    // Find student in "database"
    const storedStudents = safeStorage.get<Student[]>('dmc_students', []);
    const student = storedStudents.find(s => s.studentID === studentID);

    if (!student) {
      return { success: false, message: 'Student ID not found in system' };
    }

    // Link student
    const updatedGuardian = {
      ...currentGuardian,
      children: [...currentGuardian.children, student]
    };

    setCurrentGuardian(updatedGuardian);
    const updatedGuardians = guardians.map(g => g.id === updatedGuardian.id ? updatedGuardian : g);
    setGuardians(updatedGuardians);
    safeStorage.set(STORAGE_KEY, updatedGuardians);

    return { success: true };
  };

  const markFeePaidForStudent = (studentID: string, feeId: string) => {
    if (!currentGuardian) return;

    const updatedChildren = currentGuardian.children.map(child => {
      if (child.studentID === studentID) {
        return {
          ...child,
          fees: child.fees.map(f => f.id === feeId ? {
            ...f,
            status: 'Paid' as const,
            paidDate: new Date().toISOString(),
            receiptNo: `REC-${Date.now()}`
          } : f)
        };
      }
      return child;
    });

    const updatedGuardian = { ...currentGuardian, children: updatedChildren };
    setCurrentGuardian(updatedGuardian);
    
    const updatedGuardians = guardians.map(g => g.id === updatedGuardian.id ? updatedGuardian : g);
    setGuardians(updatedGuardians);
    safeStorage.set(STORAGE_KEY, updatedGuardians);

    // Also update student's record in localStorage so it's globally synced
    const storedStudents = safeStorage.get<Student[]>('dmc_students', []);
    if (storedStudents && storedStudents.length > 0) {
      const updatedStudents = storedStudents.map(s => {
        if (s.studentID === studentID) {
          return {
            ...s,
            fees: s.fees.map(f => f.id === feeId ? {
              ...f,
              status: 'Paid' as const,
              paidDate: new Date().toISOString(),
              receiptNo: `REC-${Date.now()}`
            } : f)
          };
        }
        return s;
      });
      safeStorage.set('dmc_students', updatedStudents);
    }
  };

  const updateGuardian = (updatedGuardian: Guardian) => {
    setCurrentGuardian(updatedGuardian);
    const updatedGuardians = guardians.map(g => g.id === updatedGuardian.id ? updatedGuardian : g);
    setGuardians(updatedGuardians);
    safeStorage.set(STORAGE_KEY, updatedGuardians);
  };

  const submitReview = async (rating: number, content: string, relation: string) => {
    if (!currentGuardian) return { success: false, message: 'Not logged in' };

    const reviews = safeStorage.get<Review[]>(REVIEWS_KEY, []);
    
    // Check if already reviewed
    const existing = reviews.find(r => r.guardianId === currentGuardian.id);
    
    const newReview: Review = {
      id: existing ? existing.id : `rev-${Date.now()}`,
      guardianId: currentGuardian.id,
      guardianName: currentGuardian.name,
      relation,
      content,
      rating,
      date: new Date().toISOString()
    };

    let updatedReviews;
    if (existing) {
      updatedReviews = reviews.map(r => r.id === existing.id ? newReview : r);
    } else {
      updatedReviews = [newReview, ...reviews];
    }

    safeStorage.set(REVIEWS_KEY, updatedReviews);
    return { success: true };
  };

  const getAllReviews = useCallback(() => {
    return safeStorage.get<Review[]>(REVIEWS_KEY, []);
  }, []);

  // Dynamically fetch fresh student data from central storage
  const getStudentData = useCallback((studentID: string): Student | null => {
    // First try to get from central student storage
    const storedStudents = safeStorage.get<Student[]>('dmc_students', []);
    const freshStudent = storedStudents.find(s => s.studentID === studentID);
    
    if (freshStudent) {
      return ensureStudentDataComplete(freshStudent);
    }

    // Fallback to guardian's cached copy if not in central storage
    if (currentGuardian) {
      const cachedStudent = currentGuardian.children.find(c => c.studentID === studentID);
      return cachedStudent ? ensureStudentDataComplete(cachedStudent) : null;
    }

    return null;
  }, [currentGuardian]);

  return (
    <GuardianAuthContext.Provider value={{ 
      currentGuardian, 
      isLoading, 
      login, 
      register, 
      logout,
      markFeePaidForStudent,
      linkStudent,
      updateGuardian,
      getStudentData,
      submitReview,
      getAllReviews
    }}>
      {children}
    </GuardianAuthContext.Provider>
  );
};

export const useGuardianAuth = () => {
  const context = useContext(GuardianAuthContext);
  if (context === undefined) {
    throw new Error('useGuardianAuth must be used within a GuardianAuthProvider');
  }
  return context;
};
