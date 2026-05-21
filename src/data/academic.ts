export interface Subject {
  id: string;
  name: string;
  bengaliName?: string;
  marks: number;
  type: 'Compulsory' | 'Elective' | 'Optional';
}

export interface Period {
  time: string;       // e.g. "8:00 AM – 8:45 AM"
  subjectId: string;
  teacher?: string;   // teacher short name
}

// ── Teacher assignment map  (subjectId prefix → teacher name) ────────────────
// When a subject id starts with any key, that teacher is assigned.
export const subjectTeacherMap: Record<string, string> = {
  bn:   'Mrs. Nasrin Sultana',    // Bangla
  en:   'Mr. Kamrul Hassan',      // English
  math: 'Mr. Rafiqul Islam',      // Mathematics
  hm:   'Ms. Tania Kabir',        // Higher Mathematics
  phy:  'Dr. Farzana Ahmed',      // Physics
  che:  'Mr. Zahid Hossain',      // Chemistry
  bio:  'Mrs. Shaila Akhter',     // Biology
  sci:  'Mrs. Shaila Akhter',     // General/Elementary Science
  hss:  'Mr. Aminul Haque',       // History & Social Science
  his:  'Mr. Aminul Haque',       // History
  geo:  'Mrs. Roksana Parvin',    // Geography
  civ:  'Mr. Aminul Haque',       // Civics
  eco:  'Mrs. Roksana Parvin',    // Economics
  ict:  'Mr. Nazmul Huda',        // ICT / Digital Technology
  dt:   'Mr. Nazmul Huda',         // Digital Technology
  bgs:  'Mrs. Roksana Parvin',    // Bangladesh & Global Studies
  acc:  'Mr. Sohel Rana',          // Accounting
  fin:  'Mr. Sohel Rana',          // Finance & Banking
  ent:  'Mr. Sohel Rana',          // Business Entrepreneurship
  bom:  'Mr. Sohel Rana',          // Business Org & Management
  rel:  'Mr. Hafizur Rahman',     // Religion
  pe:   'Mr. Monir Hossain',      // Physical Education
  car:  'Mr. Monir Hossain',      // Career Education
  ll:   'Mrs. Nasrin Sultana',    // Life & Livelihood
  hw:   'Mrs. Shaila Akhter',     // Health Wellbeing
  arts: 'Mr. Imran Hossain',      // Arts & Culture
  agri: 'Mr. Habibur Rahman',     // Agriculture
  agr:  'Mr. Habibur Rahman',     // Agriculture (alt)
  gsci: 'Dr. Farzana Ahmed',      // General Science
  soc:  'Mr. Aminul Haque',       // Sociology
  log:  'Mrs. Roksana Parvin',    // Logic
  psy:  'Mrs. Roksana Parvin',    // Psychology
  isl:  'Mr. Hafizur Rahman',     // Islamic Studies
  hs:   'Mrs. Shaila Akhter',     // Home Science
};

export function getTeacherForSubject(subjectId: string): string {
  // Match longest prefix first
  const keys = Object.keys(subjectTeacherMap).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (subjectId.startsWith(key)) return subjectTeacherMap[key];
  }
  return 'TBA';
}

export interface DayRoutine {
  day: string;
  periods: Period[];
}

export interface ClassAcademicData {
  classNum: number;
  className: string;
  subjects: Subject[];
  subjectsByBackground?: Record<string, Subject[]>;
}

// ── Subject definitions per NCTB curriculum ─────────────────────────────────

const getSubjectsByClass = (classNum: number, background?: string): Subject[] => {
  // Class 1 & 2 — Primary Level (3 subjects)
  if (classNum <= 2) {
    return [
      { id: 'bn',   name: 'Bangla',      bengaliName: 'আমার বাংলা বই',    marks: 100, type: 'Compulsory' },
      { id: 'en',   name: 'English',     bengaliName: 'English for Today', marks: 100, type: 'Compulsory' },
      { id: 'math', name: 'Mathematics', bengaliName: 'গণিত',              marks: 100, type: 'Compulsory' },
    ];
  }

  // Class 3, 4, 5 — Primary Level (6 subjects)
  if (classNum <= 5) {
    return [
      { id: 'bn',   name: 'Bangla',                   bengaliName: 'আমার বাংলা বই',         marks: 100, type: 'Compulsory' },
      { id: 'en',   name: 'English',                  bengaliName: 'English for Today',      marks: 100, type: 'Compulsory' },
      { id: 'math', name: 'Mathematics',              bengaliName: 'প্রাথমিক গণিত',          marks: 100, type: 'Compulsory' },
      { id: 'sci',  name: 'Elementary Science',       bengaliName: 'প্রাথমিক বিজ্ঞান',       marks: 100, type: 'Compulsory' },
      { id: 'bgs',  name: 'Bangladesh & Global Studies', bengaliName: 'বাংলাদেশ ও বিশ্বপরিচয়', marks: 100, type: 'Compulsory' },
      { id: 'rel',  name: 'Religion & Moral Education', bengaliName: 'ধর্ম ও নৈতিক শিক্ষা', marks: 100, type: 'Compulsory' },
    ];
  }

  // Class 6, 7, 8 — Junior Secondary (10 subjects, unified)
  if (classNum <= 8) {
    return [
      { id: 'bn',   name: 'Bangla',                  marks: 100, type: 'Compulsory' },
      { id: 'en',   name: 'English',                 marks: 100, type: 'Compulsory' },
      { id: 'math', name: 'Mathematics',             marks: 100, type: 'Compulsory' },
      { id: 'sci',  name: 'Science',                 marks: 100, type: 'Compulsory' },
      { id: 'hss',  name: 'History & Social Science', bengaliName: 'ইতিহাস ও সামাজিক বিজ্ঞান', marks: 100, type: 'Compulsory' },
      { id: 'dt',   name: 'Digital Technology',      bengaliName: 'ডিজিটাল প্রযুক্তি',       marks: 100, type: 'Compulsory' },
      { id: 'll',   name: 'Life & Livelihood',        bengaliName: 'জীবন ও জীবিকা',           marks: 100, type: 'Compulsory' },
      { id: 'hw',   name: 'Health Wellbeing',         bengaliName: 'স্বাস্থ্য সুরক্ষা',        marks: 100, type: 'Compulsory' },
      { id: 'arts', name: 'Arts & Culture',           bengaliName: 'শিল্প ও সংস্কৃতি',        marks: 100, type: 'Compulsory' },
      { id: 'rel',  name: 'Religion Education',       marks: 100, type: 'Compulsory' },
    ];
  }

  // Class 9 & 10 — SSC Level
  if (classNum <= 10) {
    const compulsory: Subject[] = [
      { id: 'bn',   name: 'Bangla (1st & 2nd Paper)',  bengaliName: 'বাংলা (১ম ও ২য় পত্র)',              marks: 200, type: 'Compulsory' },
      { id: 'en',   name: 'English (1st & 2nd Paper)', bengaliName: 'ইংরেজি (১ম ও ২য় পত্র)',            marks: 200, type: 'Compulsory' },
      { id: 'math', name: 'Mathematics',               bengaliName: 'গণিত',                              marks: 100, type: 'Compulsory' },
      { id: 'ict',  name: 'ICT',                       bengaliName: 'তথ্য ও যোগাযোগ প্রযুক্তি',          marks: 50,  type: 'Compulsory' },
      { id: 'rel',  name: 'Religion & Moral Education', bengaliName: 'ধর্ম ও নৈতিক শিক্ষা',             marks: 100, type: 'Compulsory' },
      { id: 'pe',   name: 'Physical Education & Health', bengaliName: 'শারীরিক শিক্ষা, স্বাস্থ্য বিজ্ঞান ও খেলাধুলা', marks: 100, type: 'Compulsory' },
      { id: 'car',  name: 'Career Education',           bengaliName: 'ক্যারিয়ার এডুকেশন',               marks: 50,  type: 'Compulsory' },
    ];

    if (background === 'Science') {
      return [
        ...compulsory,
        { id: 'phy',  name: 'Physics',                    bengaliName: 'পদার্থবিজ্ঞান',               marks: 100, type: 'Elective' },
        { id: 'che',  name: 'Chemistry',                  bengaliName: 'রসায়ন',                        marks: 100, type: 'Elective' },
        { id: 'bio',  name: 'Biology',                    bengaliName: 'জীববিজ্ঞান',                   marks: 100, type: 'Elective' },
        { id: 'bgs',  name: 'Bangladesh & Global Studies', bengaliName: 'বাংলাদেশ ও বিশ্বপরিচয়',      marks: 100, type: 'Elective' },
        { id: 'hm',   name: 'Higher Mathematics',         bengaliName: 'উচ্চতর গণিত',                  marks: 100, type: 'Optional' },
      ];
    }

    if (background === 'Commerce') {
      return [
        ...compulsory,
        { id: 'acc',  name: 'Accounting',              bengaliName: 'হিসাববিজ্ঞান',           marks: 100, type: 'Elective' },
        { id: 'fin',  name: 'Finance & Banking',        bengaliName: 'ফিন্যান্স ও ব্যাংকিং',   marks: 100, type: 'Elective' },
        { id: 'ent',  name: 'Business Entrepreneurship', bengaliName: 'ব্যবসায় উদ্যোগ',       marks: 100, type: 'Elective' },
        { id: 'gsci', name: 'General Science',          bengaliName: 'বিজ্ঞান',                 marks: 100, type: 'Elective' },
        { id: 'agri', name: 'Agriculture Education',    bengaliName: 'কৃষিশিক্ষা',              marks: 100, type: 'Optional' },
      ];
    }

    // Arts
    return [
      ...compulsory,
      { id: 'his',  name: 'History of Bangladesh & World Civilization', bengaliName: 'বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা', marks: 100, type: 'Elective' },
      { id: 'geo',  name: 'Geography & Environment',   bengaliName: 'ভূগোল ও পরিবেশ',          marks: 100, type: 'Elective' },
      { id: 'civ',  name: 'Civics & Citizenship',      bengaliName: 'পৌরনীতি ও নাগরিকতা',      marks: 100, type: 'Elective' },
      { id: 'gsci', name: 'General Science',           bengaliName: 'বিজ্ঞান',                  marks: 100, type: 'Elective' },
      { id: 'eco',  name: 'Economics',                 bengaliName: 'অর্থনীতি',                 marks: 100, type: 'Optional' },
    ];
  }

  // Class 11 & 12 — HSC Level
  const paper = classNum === 11 ? '1st Paper' : '2nd Paper';
  const paperBn = classNum === 11 ? '১ম পত্র' : '২য় পত্র';

  const compulsory: Subject[] = [
    { id: `bn${classNum}`,  name: `Bangla (${paper})`,  bengaliName: `বাংলা (${paperBn})`,  marks: 100, type: 'Compulsory' },
    { id: `en${classNum}`,  name: `English (${paper})`, bengaliName: `ইংরেজি (${paperBn})`, marks: 100, type: 'Compulsory' },
    { id: `ict${classNum}`, name: 'ICT',                bengaliName: 'তথ্য ও যোগাযোগ প্রযুক্তি', marks: 100, type: 'Compulsory' },
  ];

  if (background === 'Science') {
    return [
      ...compulsory,
      { id: `phy${classNum}`, name: `Physics (${paper})`,           bengaliName: `পদার্থবিজ্ঞান (${paperBn})`,   marks: 100, type: 'Elective' },
      { id: `che${classNum}`, name: `Chemistry (${paper})`,         bengaliName: `রসায়ন (${paperBn})`,            marks: 100, type: 'Elective' },
      { id: `hm${classNum}`,  name: `Higher Mathematics (${paper})`, bengaliName: `উচ্চতর গণিত (${paperBn})`,   marks: 100, type: 'Elective' },
      { id: `bio${classNum}`, name: `Biology (${paper})`,           bengaliName: `জীববিজ্ঞান (${paperBn})`,      marks: 100, type: 'Optional' },
    ];
  }

  if (background === 'Commerce') {
    return [
      ...compulsory,
      { id: `acc${classNum}`, name: `Accounting (${paper})`,                          bengaliName: `হিসাববিজ্ঞান (${paperBn})`,                       marks: 100, type: 'Elective' },
      { id: `bom${classNum}`, name: `Business Organization & Management (${paper})`,  bengaliName: `ব্যবসায় সংগঠন ও ব্যবস্থাপনা (${paperBn})`,        marks: 100, type: 'Elective' },
      { id: `fin${classNum}`, name: classNum === 11 ? `Finance, Banking & Insurance (${paper})` : `Production Management & Marketing (${paper})`,
                              bengaliName: classNum === 11 ? `ফিন্যান্স, ব্যাংকিং ও বীমা (${paperBn})` : `উৎপাদন ব্যবস্থাপনা ও বিপণন (${paperBn})`,
                              marks: 100, type: 'Elective' },
      { id: `eco${classNum}`, name: `Economics (${paper})`, bengaliName: `অর্থনীতি (${paperBn})`, marks: 100, type: 'Optional' },
    ];
  }

  // HSC Arts — student chooses 3 electives + 1 optional from a pool; show full pool
  return [
    ...compulsory,
    { id: `civ${classNum}`,  name: `Civics & Good Governance (${paper})`,           bengaliName: `পৌরনীতি ও সুশাসন (${paperBn})`,                     marks: 100, type: 'Elective' },
    { id: `eco${classNum}`,  name: `Economics (${paper})`,                          bengaliName: `অর্থনীতি (${paperBn})`,                              marks: 100, type: 'Elective' },
    { id: `geo${classNum}`,  name: `Geography (${paper})`,                          bengaliName: `ভূগোল (${paperBn})`,                                marks: 100, type: 'Elective' },
    { id: `his${classNum}`,  name: `History / Islamic History & Culture (${paper})`, bengaliName: `ইতিহাস / ইসলামের ইতিহাস ও সংস্কৃতি (${paperBn})`,  marks: 100, type: 'Elective' },
    { id: `soc${classNum}`,  name: `Sociology / Social Work (${paper})`,            bengaliName: `সমাজবিজ্ঞান / সমাজকর্ম (${paperBn})`,               marks: 100, type: 'Elective' },
    { id: `log${classNum}`,  name: `Logic (${paper})`,                              bengaliName: `যুক্তিবিদ্যা (${paperBn})`,                         marks: 100, type: 'Elective' },
    { id: `psy${classNum}`,  name: `Psychology (${paper})`,                         bengaliName: `মনোবিজ্ঞান (${paperBn})`,                           marks: 100, type: 'Optional' },
    { id: `isl${classNum}`,  name: `Islamic Studies (${paper})`,                    bengaliName: `ইসলামশিক্ষা (${paperBn})`,                          marks: 100, type: 'Optional' },
    { id: `hs${classNum}`,   name: `Home Science (${paper})`,                       bengaliName: `গার্হস্থ্য বিজ্ঞান (${paperBn})`,                    marks: 100, type: 'Optional' },
    { id: `agr${classNum}`,  name: `Agriculture Education (${paper})`,              bengaliName: `কৃষিশিক্ষা (${paperBn})`,                           marks: 100, type: 'Optional' },
  ];
};

// ── Academic data array ──────────────────────────────────────────────────────

export const academicData: ClassAcademicData[] = [];

for (let i = 1; i <= 12; i++) {
  if (i >= 9) {
    academicData.push({
      classNum: i,
      className: `Class ${i}`,
      // Default (compulsory only) for display in non-background contexts
      subjects: getSubjectsByClass(i, 'Science').filter(s => s.type === 'Compulsory'),
      subjectsByBackground: {
        Science:  getSubjectsByClass(i, 'Science'),
        Commerce: getSubjectsByClass(i, 'Commerce'),
        Arts:     getSubjectsByClass(i, 'Arts'),
      },
    });
  } else {
    academicData.push({
      classNum: i,
      className: `Class ${i}`,
      subjects: getSubjectsByClass(i),
    });
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export const getSubjects = (classNum: number, background?: string): Subject[] => {
  const data = academicData.find(d => d.classNum === classNum);
  if (!data) return [];
  if (background && data.subjectsByBackground?.[background]) {
    return data.subjectsByBackground[background];
  }
  return data.subjects;
};

// ── Routine generator ────────────────────────────────────────────────────────
// Produces a deterministic weekly timetable.
// Each day shows exactly `subjects.length` periods (no extras, no break inserted
// if there are only 3 subjects, etc.). A lunch break is added only when there
// are more than 5 subjects so the table stays readable.

export const generateRoutine = (classNum: number, background?: string): DayRoutine[] => {
  const subjects = getSubjects(classNum, background);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  const totalSubjects = subjects.length;

  // Build start times. School starts at 8:30 AM; each period = 45 min.
  // A 20-min break is inserted after the 3rd period if there are > 5 subjects.
  const hasBreak = totalSubjects > 5;
  const breakAfterPeriod = 3; // insert after period index 3 (0-based)

  const buildTimes = (): Array<{ start: string; end: string }> => {
    const times: Array<{ start: string; end: string }> = [];
    let hour = 8;
    let minute = 0;

    const fmt = (h: number, m: number) => {
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const mm = m.toString().padStart(2, '0');
      const ampm = h < 12 ? 'AM' : 'PM';
      return `${h12}:${mm} ${ampm}`;
    };

    const advance = (mins: number) => {
      minute += mins;
      while (minute >= 60) { minute -= 60; hour++; }
    };

    for (let p = 0; p < totalSubjects; p++) {
      if (hasBreak && p === breakAfterPeriod) {
        advance(20); // 20-min break
      }
      const startStr = fmt(hour, minute);
      advance(60); // 60-min period
      const endStr = fmt(hour, minute);
      times.push({ start: startStr, end: endStr });
    }

    return times;
  };

  const periodTimes = buildTimes();

  return days.map((day, dayIdx) => {
    const offset = dayIdx * Math.ceil(totalSubjects / days.length);
    const periods: Period[] = [];

    let breakInserted = false;

    for (let p = 0; p < totalSubjects; p++) {
      if (hasBreak && p === breakAfterPeriod && !breakInserted) {
        periods.push({ time: 'Tiffin Break', subjectId: 'break' });
        breakInserted = true;
      }

      const subjectIndex = (p + offset) % totalSubjects;
      const subject = subjects[subjectIndex];
      const timeIndex = hasBreak && p >= breakAfterPeriod ? p + 1 : p;
      const slot = periodTimes[Math.min(timeIndex, periodTimes.length - 1)];

      periods.push({
        time: `${slot.start} – ${slot.end}`,
        subjectId: subject.id,
        teacher: getTeacherForSubject(subject.id),
      });
    }

    return { day, periods };
  });
};