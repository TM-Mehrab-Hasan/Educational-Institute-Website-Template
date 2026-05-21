"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Student, 
  AcademicRecord, 
  CurrentClassResult, 
  AttendanceRecord, 
  FeeRecord, 
  FeeStatus, 
  AttendanceStatus, 
  SubjectResult 
} from './student-types';
import { safeStorage } from './storage-utils';

export type { Student, AcademicRecord, CurrentClassResult, AttendanceRecord, FeeRecord, FeeStatus, AttendanceStatus, SubjectResult };

export interface Notice {
  id: string;
  title: string;
  body: string;
  date: string;
  category: 'Exam' | 'Fee' | 'Event' | 'General';
}

interface StudentAuthContextType {
  currentStudent: Student | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  markFeePaid: (feeId: string) => void;
  updateStudent: (student: Student) => void;
}

export interface RegisterData {
  name: string;
  studentID: string;
  email: string;
  password: string;
  currentClass: string;
}

const StudentAuthContext = createContext<StudentAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'dmc_students';
const SESSION_KEY = 'dmc_student_session';

const DEMO_STUDENT: Student = {
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
    // May 2026
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
    // April 2026
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
    // March 2026
    { date: '2026-03-31', status: 'Present' },
    { date: '2026-03-30', status: 'Present' },
    { date: '2026-03-27', status: 'Present' },
    { date: '2026-03-26', status: 'Absent' },
    { date: '2026-03-25', status: 'Present' },
    { date: '2026-03-24', status: 'Present' },
    { date: '2026-03-23', status: 'Late' },
    { date: '2026-03-20', status: 'Present' },
    { date: '2026-03-19', status: 'Present' },
    { date: '2026-03-18', status: 'Present' },
    { date: '2026-03-17', status: 'Absent' },
    { date: '2026-03-16', status: 'Present' },
    { date: '2026-03-13', status: 'Present' },
    { date: '2026-03-12', status: 'Present' },
    { date: '2026-03-11', status: 'Present' },
    { date: '2026-03-10', status: 'Present' },
    { date: '2026-03-09', status: 'Late' },
    { date: '2026-03-06', status: 'Present' },
    { date: '2026-03-05', status: 'Present' },
    { date: '2026-03-04', status: 'Absent' },
    { date: '2026-03-03', status: 'Present' },
    { date: '2026-03-02', status: 'Present' },
    // February 2026
    { date: '2026-02-26', status: 'Present' },
    { date: '2026-02-25', status: 'Present' },
    { date: '2026-02-24', status: 'Present' },
    { date: '2026-02-23', status: 'Absent' },
    { date: '2026-02-20', status: 'Present' },
    { date: '2026-02-19', status: 'Present' },
    { date: '2026-02-18', status: 'Present' },
    { date: '2026-02-17', status: 'Late' },
    { date: '2026-02-16', status: 'Present' },
    { date: '2026-02-13', status: 'Present' },
    { date: '2026-02-12', status: 'Absent' },
    { date: '2026-02-11', status: 'Present' },
    { date: '2026-02-10', status: 'Present' },
    { date: '2026-02-09', status: 'Present' },
    { date: '2026-02-06', status: 'Present' },
    { date: '2026-02-05', status: 'Present' },
    { date: '2026-02-04', status: 'Late' },
    { date: '2026-02-03', status: 'Present' },
    { date: '2026-02-02', status: 'Present' },
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
    {
      examName: '2nd Monthly Test',
      examType: 'Monthly Test',
      date: '2026-03-15',
      published: false,
      totalMarks: 300,
      obtainedMarks: 0,
      results: [],
    },
  ],
  records: [
    {
      class: 'Class 10 (SSC)', year: 2025, roll: '08', gpa: 5.00,
      position: 3, totalStudents: 120, attendancePercent: 94, group: 'Science',
      results: [
        { name: 'Bangla (1st & 2nd Paper)',  marks: 176, grade: 'A+', gp: 5.0 },
        { name: 'English (1st & 2nd Paper)', marks: 170, grade: 'A+', gp: 5.0 },
        { name: 'Mathematics',               marks: 92,  grade: 'A+', gp: 5.0 },
        { name: 'Physics',                   marks: 92,  grade: 'A+', gp: 5.0 },
        { name: 'Chemistry',                 marks: 88,  grade: 'A+', gp: 5.0 },
        { name: 'Biology',                   marks: 85,  grade: 'A+', gp: 5.0 },
        { name: 'Higher Mathematics',        marks: 95,  grade: 'A+', gp: 5.0 },
        { name: 'ICT',                       marks: 47,  grade: 'A+', gp: 5.0 },
        { name: 'Religion & Moral Ed.',      marks: 91,  grade: 'A+', gp: 5.0 },
        { name: 'Physical Education',        marks: 90,  grade: 'A+', gp: 5.0 },
        { name: 'Career Education',          marks: 49,  grade: 'A+', gp: 5.0 },
        { name: 'Bangladesh & Global Studies', marks: 88, grade: 'A+', gp: 5.0 },
      ]
    },
    {
      class: 'Class 9', year: 2024, roll: '12', gpa: 4.85,
      position: 8, totalStudents: 115, attendancePercent: 90, group: 'Science',
      results: [
        { name: 'Bangla (1st & 2nd Paper)',  marks: 162, grade: 'A+', gp: 5.0 },
        { name: 'English (1st & 2nd Paper)', marks: 148, grade: 'A',  gp: 4.0 },
        { name: 'Mathematics',               marks: 85,  grade: 'A+', gp: 5.0 },
        { name: 'Physics',                   marks: 78,  grade: 'A',  gp: 4.0 },
        { name: 'Chemistry',                 marks: 80,  grade: 'A+', gp: 5.0 },
        { name: 'Biology',                   marks: 76,  grade: 'A',  gp: 4.0 },
        { name: 'Higher Mathematics',        marks: 82,  grade: 'A+', gp: 5.0 },
        { name: 'ICT',                       marks: 42,  grade: 'A+', gp: 5.0 },
        { name: 'Religion & Moral Ed.',      marks: 88,  grade: 'A+', gp: 5.0 },
        { name: 'Physical Education',        marks: 87,  grade: 'A+', gp: 5.0 },
        { name: 'Career Education',          marks: 46,  grade: 'A+', gp: 5.0 },
        { name: 'Bangladesh & Global Studies', marks: 80, grade: 'A+', gp: 5.0 },
      ]
    },
    {
      class: 'Class 8', year: 2023, roll: '15', gpa: 4.67,
      position: 12, totalStudents: 110, attendancePercent: 88, group: 'General',
      results: [
        { name: 'Bangla',                marks: 79, grade: 'A',  gp: 4.0 },
        { name: 'English',               marks: 70, grade: 'A',  gp: 4.0 },
        { name: 'Mathematics',           marks: 81, grade: 'A+', gp: 5.0 },
        { name: 'Science',               marks: 72, grade: 'A',  gp: 4.0 },
        { name: 'History & Social Sci.', marks: 75, grade: 'A',  gp: 4.0 },
        { name: 'Digital Technology',    marks: 80, grade: 'A+', gp: 5.0 },
        { name: 'Life & Livelihood',     marks: 78, grade: 'A',  gp: 4.0 },
        { name: 'Health Wellbeing',      marks: 82, grade: 'A+', gp: 5.0 },
        { name: 'Arts & Culture',        marks: 76, grade: 'A',  gp: 4.0 },
        { name: 'Religion Education',    marks: 85, grade: 'A+', gp: 5.0 },
      ]
    },
  ],
  fees: [
    { id: 'f1', title: 'Monthly Fee – May 2026', amount: 2500, dueDate: '2026-05-10', paidDate: '2026-05-08', status: 'Paid', type: 'Monthly', receiptNo: 'REC-20260508-001' },
    { id: 'f2', title: 'Monthly Fee – April 2026', amount: 2500, dueDate: '2026-04-10', paidDate: '2026-04-07', status: 'Paid', type: 'Monthly', receiptNo: 'REC-20260407-002' },
    { id: 'f3', title: 'Monthly Fee – March 2026', amount: 2500, dueDate: '2026-03-10', paidDate: '2026-03-09', status: 'Paid', type: 'Monthly', receiptNo: 'REC-20260309-003' },
    { id: 'f4', title: 'Half Yearly Exam Fee', amount: 1500, dueDate: '2026-06-05', status: 'Pending', type: 'Exam' },
    { id: 'f5', title: 'Monthly Fee – June 2026', amount: 2500, dueDate: '2026-06-10', status: 'Pending', type: 'Monthly' },
    { id: 'f6', title: 'Library Fine', amount: 100, dueDate: '2026-05-20', status: 'Overdue', type: 'Other' },
  ],
};

export const StudentAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedStudents = safeStorage.get<Student[]>(STORAGE_KEY, []);
    const storedSession = localStorage.getItem(SESSION_KEY);
    
    let initialStudents: Student[];
    if (storedStudents && storedStudents.length > 0) {
      initialStudents = storedStudents;
    } else {
      initialStudents = [DEMO_STUDENT];
    }
    safeStorage.set(STORAGE_KEY, initialStudents);
    setStudents(initialStudents);
    if (storedSession) {
      const session: Student = JSON.parse(storedSession);
      const fresh = initialStudents.find(s => s.id === session.id) ?? session;
      setCurrentStudent(fresh);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (currentStudent) {
      safeStorage.set(SESSION_KEY, currentStudent);
    } else {
      safeStorage.remove(SESSION_KEY);
    }
  }, [currentStudent, isLoading]);

  const login = async (email: string, password: string) => {
    const student = students.find(s => s.email === email && s.password === password);
    if (student) {
      setCurrentStudent(student);
      return { success: true };
    }
    return { success: false, message: 'Invalid Student ID / Email or password. Please try again.' };
  };

  const register = async (data: RegisterData) => {
    if (students.find(s => s.email === data.email)) {
      return { success: false, message: 'This email is already registered.' };
    }
    if (students.find(s => s.studentID === data.studentID)) {
      return { success: false, message: 'This Student ID is already registered.' };
    }
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      studentID: data.studentID,
      name: data.name,
      email: data.email,
      password: data.password,
      currentClass: data.currentClass,
      section: '',
      currentRoll: 'TBD',
      group: '',
      dateOfBirth: '',
      bloodGroup: '',
      guardianName: '',
      guardianContact: '',
      address: '',
      attendance: 0,
      attendanceRecords: [],
      currentResults: [],
      records: [],
      fees: [],
    };
    const updated = [...students, newStudent];
    setStudents(updated);
    safeStorage.set(STORAGE_KEY, updated);
    setCurrentStudent(newStudent);
    return { success: true };
    };

    const updateStudent = (updatedStudent: Student) => {
    const updatedStudents = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    setStudents(updatedStudents);
    setCurrentStudent(updatedStudent);
    safeStorage.set(STORAGE_KEY, updatedStudents);
    };

    const markFeePaid = (feeId: string) => {
    if (!currentStudent) return;
    const updatedFees = currentStudent.fees.map(f => 
      f.id === feeId ? { ...f, status: 'Paid' as const, paidDate: new Date().toISOString(), receiptNo: `REC-${Date.now()}` } : f
    );
    const updatedStudent = { ...currentStudent, fees: updatedFees };
    updateStudent(updatedStudent);
  };

  const logout = () => setCurrentStudent(null);

  return (
    <StudentAuthContext.Provider value={{ currentStudent, isLoading, login, register, logout, markFeePaid, updateStudent }}>
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (context === undefined) throw new Error('useStudentAuth must be used within a StudentAuthProvider');
  return context;
};
