export interface Achievement {
  id: number;
  year: string;
  title: string;
  description: string;
  category: 'Academic' | 'Sports' | 'Cultural' | 'Infrastructural';
}

export interface Infrastructure {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface CoreValue {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    year: "2023",
    title: "Best Model College Award",
    description: "Awarded by the Ministry of Education for excellence in academic administration and student performance.",
    category: "Academic"
  },
  {
    id: 2,
    year: "2022",
    title: "National ICT Champion",
    description: "Our students secured the first position in the National High School Programming Contest.",
    category: "Academic"
  },
  {
    id: 3,
    year: "2021",
    title: "Regional Sports Championship",
    description: "Winner of the Inter-College Cricket Tournament for the third consecutive year.",
    category: "Sports"
  },
  {
    id: 4,
    year: "2019",
    title: "Science Fair Excellence",
    description: "Top honors at the Central Science Fair for our innovative 'Green Dhaka' project.",
    category: "Academic"
  }
];

export const infrastructure: Infrastructure[] = [
  {
    id: 1,
    title: "Modern Science Labs",
    description: "Fully equipped Physics, Chemistry, and Biology laboratories with advanced experimental setups.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Digital Library",
    description: "An extensive collection of 20,000+ books and journals with a high-speed digital resource center.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Smart Classrooms",
    description: "Interactive multimedia boards and high-speed Wi-Fi in every classroom to enhance learning.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Auditorium",
    description: "A 500-seat multi-purpose hall for cultural events, seminars, and academic conferences.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop"
  }
];

export const coreValues: CoreValue[] = [
  {
    id: 1,
    title: "Integrity",
    description: "Upholding the highest moral and ethical standards in all aspects of college life.",
    icon: "Shield"
  },
  {
    id: 2,
    title: "Innovation",
    description: "Encouraging creative thinking and modern approaches to teaching and learning.",
    icon: "Lightbulb"
  },
  {
    id: 3,
    title: "Excellence",
    description: "Striving for perfection in academic performance and co-curricular activities.",
    icon: "Star"
  },
  {
    id: 4,
    title: "Service",
    description: "Fostering a sense of responsibility and commitment to the community and nation.",
    icon: "Heart"
  }
];
