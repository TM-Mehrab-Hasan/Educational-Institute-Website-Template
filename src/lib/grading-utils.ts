/**
 * Bangladesh Grading System
 * Based on percentage of marks obtained
 */

export interface GradeInfo {
  grade: string;
  gp: number;
}

/**
 * Calculate grade and GP based on percentage
 * Bangladesh Standard:
 * 80-100% = A+ (5.0)
 * 70-79% = A (4.0)
 * 60-69% = A- (3.5)
 * 50-59% = B+ (3.0)
 * 40-49% = B (2.0)
 * Below 40% = C (1.0)
 */
export function calculateGradeAndGP(percentage: number): GradeInfo {
  if (percentage >= 80) return { grade: 'A+', gp: 5.0 };
  if (percentage >= 70) return { grade: 'A', gp: 4.0 };
  if (percentage >= 60) return { grade: 'A-', gp: 3.5 };
  if (percentage >= 50) return { grade: 'B+', gp: 3.0 };
  if (percentage >= 40) return { grade: 'B', gp: 2.0 };
  return { grade: 'C', gp: 1.0 };
}

/**
 * Calculate percentage from marks
 * If maxMarks is not provided, assumes marks are out of 100
 */
export function calculatePercentage(obtainedMarks: number, maxMarks: number = 100): number {
  if (maxMarks <= 0) return 0;
  return Math.round((obtainedMarks / maxMarks) * 100);
}

/**
 * Get grade and GP with percentage calculation
 */
export function getGradeInfo(obtainedMarks: number, maxMarks: number = 100): GradeInfo & { percentage: number } {
  const percentage = calculatePercentage(obtainedMarks, maxMarks);
  const gradeInfo = calculateGradeAndGP(percentage);
  return { ...gradeInfo, percentage };
}
