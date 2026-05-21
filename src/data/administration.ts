export interface Person {
  id: number;
  name: string;
  designation: string;
  department?: string;
  email: string;
  phone: string;
  image: string;
  education?: string;
  bio?: string;
  joiningDate?: string;
  experience?: string;
}

export interface GoverningBodyMember {
  id: number;
  name: string;
  role: string;
  profession: string;
  image: string;
  email: string;
}

export const governingBody: GoverningBodyMember[] = [
  {
    id: 1,
    name: "Alhaj Md. Nasir Uddin",
    role: "Chairman",
    profession: "Industrialist & Philanthropist",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    email: "chairman@demo.edu.bd"
  },
  {
    id: 2,
    name: "Dr. AK Azad",
    role: "Member Secretary",
    profession: "Principal, Demo Model School & College",
    image: "/images/principal.jpeg",
    email: "principal@demo.edu.bd"
  },
  {
    id: 3,
    name: "Mr. Abdul Hye",
    role: "Guardian Member",
    profession: "Business Person",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    email: "hye@example.com"
  },
  {
    id: 4,
    name: "Mrs. Shamima Akhter",
    role: "Guardian Member",
    profession: "Social Worker",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    email: "shamima@example.com"
  },
  {
    id: 5,
    name: "Mr. Rafiqul Islam",
    role: "Teacher Representative",
    profession: "Head of Dept, Mathematics",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop",
    email: "rafiqul@example.com"
  }
];

export const teachers: Person[] = [
  { 
    id: 1, 
    name: "Dr. AK Azad", 
    designation: "Principal", 
    department: "Administration", 
    email: "principal@demo.edu.bd", 
    phone: "+880 1711-000001", 
    image: "/images/principal.jpeg",
    education: "PhD in Educational Leadership, DU",
    bio: "Dr. AK Azad has been leading Demo Model School & College since 2010. He is a visionary educator with over 25 years of experience in academic administration.",
    joiningDate: "2010-05-15",
    experience: "25+ Years"
  },
  { 
    id: 2, 
    name: "Mrs. Nasrin Sultana", 
    designation: "Vice Principal", 
    department: "Administration", 
    email: "vp@demo.edu.bd", 
    phone: "+880 1711-000002", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    education: "M.A. in English Literature, JU",
    bio: "Mrs. Nasrin Sultana joined the college in 2012 and has been instrumental in improving the academic standards and co-curricular activities.",
    joiningDate: "2012-08-10",
    experience: "18 Years"
  },
  { 
    id: 3, 
    name: "Mr. Rafiqul Islam", 
    designation: "Head of Dept", 
    department: "Mathematics", 
    email: "math.head@demo.edu.bd", 
    phone: "+880 1711-000003", 
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop",
    education: "M.Sc in Mathematics, BUET",
    bio: "Mr. Rafiqul Islam is a renowned mathematics teacher with a passion for helping students master complex mathematical concepts.",
    joiningDate: "2005-02-20",
    experience: "20 Years"
  },
  { 
    id: 4, 
    name: "Dr. Farzana Ahmed", 
    designation: "Senior Teacher", 
    department: "Physics", 
    email: "physics.sr@demo.edu.bd", 
    phone: "+880 1711-000004", 
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    education: "PhD in Physics, RU",
    bio: "Dr. Farzana Ahmed brings a wealth of knowledge in Physics and is dedicated to fostering a love for science among her students.",
    joiningDate: "2015-11-12",
    experience: "12 Years"
  },
  { 
    id: 5, 
    name: "Mr. Kamrul Hassan", 
    designation: "Assistant Teacher", 
    department: "English", 
    email: "kamrul@demo.edu.bd", 
    phone: "+880 1711-000005", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    education: "B.A. (Hons), M.A. in English, DU",
    bio: "Mr. Kamrul Hassan is an enthusiastic English teacher who focuses on improving communication skills and literary appreciation.",
    joiningDate: "2018-03-05",
    experience: "8 Years"
  },
  { 
    id: 6, 
    name: "Mrs. Shaila Akhter", 
    designation: "Senior Teacher", 
    department: "Biology", 
    email: "biology.sr@demo.edu.bd", 
    phone: "+880 1711-000006", 
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
    education: "M.Sc in Zoology, CU",
    bio: "Mrs. Shaila Akhter is passionate about biology and environmental science, inspiring students to explore the natural world.",
    joiningDate: "2014-06-25",
    experience: "15 Years"
  },
  { 
    id: 7, 
    name: "Mr. Zahid Hossain", 
    designation: "Head of Dept", 
    department: "Chemistry", 
    email: "chem.head@demo.edu.bd", 
    phone: "+880 1711-000007", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    education: "M.Sc in Chemistry, BUET",
    bio: "Mr. Zahid Hossain leads the Chemistry department with excellence, focusing on practical learning and scientific inquiry.",
    joiningDate: "2008-09-14",
    experience: "17 Years"
  },
  {
    id: 8,
    name: "Ms. Tania Kabir",
    designation: "Assistant Teacher",
    department: "Mathematics",
    email: "tania.math@demo.edu.bd",
    phone: "+880 1711-000008",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    education: "B.Sc (Hons) in Math, JU",
    bio: "Ms. Tania Kabir is a dynamic mathematics teacher known for her innovative teaching methods and student-centric approach.",
    joiningDate: "2020-01-10",
    experience: "5 Years"
  },
  {
    id: 9,
    name: "Mr. Aminul Haque",
    designation: "Senior Teacher",
    department: "History & Social Science",
    email: "history@demo.edu.bd",
    phone: "+880 1711-000009",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop",
    education: "M.A. in History, University of Dhaka",
    bio: "Mr. Aminul Haque brings deep expertise in Bangladeshi history and social studies, inspiring students to understand their cultural heritage and civic responsibilities.",
    joiningDate: "2013-07-01",
    experience: "12 Years"
  },
  {
    id: 10,
    name: "Mrs. Roksana Parvin",
    designation: "Senior Teacher",
    department: "Geography & Economics",
    email: "geography@demo.edu.bd",
    phone: "+880 1711-000010",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
    education: "M.Sc in Geography, Chittagong University",
    bio: "Mrs. Roksana Parvin is passionate about geography and economics, helping students understand global patterns and economic principles through engaging lessons.",
    joiningDate: "2016-01-15",
    experience: "9 Years"
  },
  {
    id: 11,
    name: "Mr. Sohel Rana",
    designation: "Assistant Teacher",
    department: "Business Studies",
    email: "business@demo.edu.bd",
    phone: "+880 1711-000011",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    education: "M.B.A. in Finance & Banking, BUET",
    bio: "Mr. Sohel Rana teaches Accounting, Finance, Business Entrepreneurship, and Business Organization with a focus on practical financial literacy and business acumen.",
    joiningDate: "2019-04-10",
    experience: "6 Years"
  },
  {
    id: 12,
    name: "Mr. Hafizur Rahman",
    designation: "Senior Teacher",
    department: "Islamic Studies",
    email: "islamicstudies@demo.edu.bd",
    phone: "+880 1711-000012",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=400&auto=format&fit=crop",
    education: "M.A. in Islamic Studies, Islamic University, Kushtia",
    bio: "Mr. Hafizur Rahman teaches Islamic Studies and Religion & Moral Education with deep scholarly knowledge and a compassionate, student-friendly approach.",
    joiningDate: "2011-09-01",
    experience: "14 Years"
  },
  {
    id: 13,
    name: "Mr. Monir Hossain",
    designation: "Assistant Teacher",
    department: "Physical Education",
    email: "pe@demo.edu.bd",
    phone: "+880 1711-000013",
    image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=400&auto=format&fit=crop",
    education: "B.P.Ed. & M.P.Ed. in Physical Education, BKSP",
    bio: "Mr. Monir Hossain promotes physical fitness, sportsmanship, and healthy lifestyles among students through dynamic physical education and career guidance programs.",
    joiningDate: "2017-06-20",
    experience: "8 Years"
  },
  {
    id: 14,
    name: "Mr. Imran Hossain",
    designation: "Assistant Teacher",
    department: "Arts & Culture",
    email: "arts@demo.edu.bd",
    phone: "+880 1711-000014",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    education: "B.F.A. & M.F.A. in Fine Arts, University of Dhaka",
    bio: "Mr. Imran Hossain nurtures creativity and cultural appreciation in students through visual arts, music, and traditional Bangladeshi art forms.",
    joiningDate: "2021-02-01",
    experience: "4 Years"
  },
  {
    id: 15,
    name: "Mr. Habibur Rahman",
    designation: "Assistant Teacher",
    department: "Agriculture",
    email: "agriculture@demo.edu.bd",
    phone: "+880 1711-000015",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
    education: "B.Sc. (Hons) in Agriculture, Bangladesh Agricultural University",
    bio: "Mr. Habibur Rahman teaches Agriculture Education with hands-on approaches, connecting students with sustainable farming practices and rural development.",
    joiningDate: "2022-03-15",
    experience: "3 Years"
  },
  {
    id: 16,
    name: "Mr. Nazmul Huda",
    designation: "Senior Teacher",
    department: "ICT & Computer Science",
    email: "ict.teacher@demo.edu.bd",
    phone: "+880 1711-000016",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    education: "B.Sc. in Computer Science & Engineering, BUET",
    bio: "Mr. Nazmul Huda teaches ICT and Digital Technology, equipping students with computational thinking and essential digital skills for the modern world.",
    joiningDate: "2016-08-01",
    experience: "9 Years"
  }
];

export const staff: Person[] = [
  {
    id: 101,
    name: "Mr. Abdul Karim",
    designation: "Office Head",
    department: "General Office",
    email: "karim@demo.edu.bd",
    phone: "+880 1711-111001",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    education: "Masters in Management, NU",
    bio: "Mr. Abdul Karim manages the college office operations with over 20 years of administrative experience.",
    joiningDate: "2005-04-01",
    experience: "22 Years"
  },
  {
    id: 102,
    name: "Mrs. Rahima Begum",
    designation: "Accountant",
    department: "Accounts",
    email: "accounts@demo.edu.bd",
    phone: "+880 1711-111002",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=400&auto=format&fit=crop",
    education: "B.Com, M.Com in Accounting",
    bio: "Mrs. Rahima Begum handles the financial records and accounting of the institution with high precision.",
    joiningDate: "2010-02-15",
    experience: "15 Years"
  },
  {
    id: 103,
    name: "Mr. Sumon Ahmed",
    designation: "IT In-charge",
    department: "IT Support",
    email: "it@demo.edu.bd",
    phone: "+880 1711-111003",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    education: "Diploma in Computer Science",
    bio: "Mr. Sumon Ahmed is responsible for the maintenance of computer labs and the college network.",
    joiningDate: "2015-08-10",
    experience: "10 Years"
  },
  {
    id: 104,
    name: "Mr. Selim Reza",
    designation: "Librarian",
    department: "Library",
    email: "library@demo.edu.bd",
    phone: "+880 1711-111004",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400&auto=format&fit=crop",
    education: "B.A. in Library Science",
    bio: "Mr. Selim Reza manages the college library, assisting students and faculty in accessing educational resources.",
    joiningDate: "2012-11-20",
    experience: "13 Years"
  }
];
