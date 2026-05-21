export type FeeStatus = 'Paid' | 'Pending' | 'Overdue';
export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export interface SubjectResult {
  name: string;
  marks: number;
  grade: string;
  gp: number;
}

export interface AcademicRecord {
  class: string;
  year: number;
  roll: string;
  gpa: number;
  position: number;
  totalStudents: number;
  results: SubjectResult[];
  attendancePercent: number;
  group?: string;
}

export interface CurrentClassResult {
  examName: string;
  examType: 'Monthly Test' | 'Half Yearly' | 'Final' | 'Weekly Test';
  date: string;
  results: SubjectResult[];
  totalMarks: number;
  obtainedMarks: number;
  position?: number;
  published: boolean;
}

export interface AttendanceRecord {
  date: string;
  status: AttendanceStatus;
  subject?: string;
}

export interface FeeRecord {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: FeeStatus;
  type: 'Monthly' | 'Exam' | 'Registration' | 'Other';
  receiptNo?: string;
}

export interface Student {
  id: string;
  studentID: string;
  name: string;
  email: string;
  password?: string;
  currentClass: string;
  section: string;
  currentRoll: string;
  group: string;
  dateOfBirth: string;
  bloodGroup: string;
  guardianName: string;
  guardianContact: string;
  address: string;
  records: AcademicRecord[];
  currentResults: CurrentClassResult[];
  fees: FeeRecord[];
  attendance: number;
  attendanceRecords: AttendanceRecord[];
  profilePhoto?: string;
}
