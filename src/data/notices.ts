export interface Notice {
  id: number;
  title: string;
  date: string;
  category: string;
  isUrgent?: boolean;
  content: string;
}

export const notices: Notice[] = [
  { 
    id: 1, 
    title: "Class XI Online Admission Guidelines for Session 2026-27", 
    date: "25 Apr 2026", 
    category: "Admission", 
    isUrgent: true,
    content: `
      <p>Dear Applicants and Parents,</p>
      <p>We are pleased to announce the commencement of the Class XI Online Admission process for the academic session 2026-2027 at Demo Model School & College. Following the Ministry of Education guidelines, the admission process will be conducted entirely online through the central admission portal.</p>
      <h3>Key Dates:</h3>
      <ul>
        <li>Application Start: May 1, 2026</li>
        <li>Application Deadline: May 15, 2026</li>
        <li>First Merit List: May 25, 2026</li>
        <li>Admission Period: June 1 - June 10, 2026</li>
      </ul>
      <h3>Required Documents:</h3>
      <p>Candidates are requested to keep digital copies of the following documents ready for the application:</p>
      <ul>
        <li>SSC Transcript/Mark sheet</li>
        <li>Testimonial from the previous school</li>
        <li>Passport size photographs</li>
        <li>Birth Certificate</li>
      </ul>
      <p>For any technical assistance during the application process, please contact our help desk at +880 1234 567890 or email us at admissions@demomodelcollege.edu.</p>
    `
  },
  { 
    id: 2, 
    title: "SSC 2026 Test Examination Schedule and Seat Plan", 
    date: "22 Apr 2026", 
    category: "Examination",
    isUrgent: true,
    content: `
      <p>Dear Students and Parents,</p>
      <p>The SSC 2026 Test Examination schedule and seat plan have been finalized. Please check the details below for your class and roll number.</p>
      <h3>Examination Schedule:</h3>
      <ul>
        <li>SSC Test Exam: May 1-15, 2026</li>
        <li>Exam Time: 10:00 AM to 1:00 PM</li>
        <li>Reporting Time: 9:30 AM</li>
        <li>Venue: Main School Campus</li>
      </ul>
      <h3>Important Information:</h3>
      <ul>
        <li>Admit cards will be distributed one week before examination</li>
        <li>Seat plan will be available online on April 28, 2026</li>
        <li>Students must reach the examination hall 30 minutes early</li>
        <li>No mobile phones allowed in the examination center</li>
      </ul>
      <p>For any issues with seat arrangement, contact the examination department by April 27, 2026.</p>
    `
  },
  { 
    id: 3, 
    title: "Inter-College Sports Tournament 2026 Registration", 
    date: "20 Apr 2026", 
    category: "Sports",
    isUrgent: false,
    content: `
      <p>Dear Students,</p>
      <p>Demo Model School & College is organizing the Inter-College Sports Tournament 2026. All students are invited to participate and represent our college.</p>
      <h3>Event Details:</h3>
      <ul>
        <li>Date: May 20-25, 2026</li>
        <li>Venue: City Sports Complex</li>
        <li>Registration Deadline: May 5, 2026</li>
      </ul>
      <h3>Sports Categories:</h3>
      <ul>
        <li>Cricket (Boys & Girls)</li>
        <li>Football (Boys)</li>
        <li>Badminton (Singles & Doubles)</li>
        <li>Table Tennis</li>
        <li>Volleyball</li>
        <li>Athletics</li>
      </ul>
      <h3>Registration Process:</h3>
      <ol>
        <li>Download registration form from the notice board</li>
        <li>Fill in details and submit to the sports department</li>
        <li>Pay registration fee: 500 BDT per event</li>
      </ol>
      <p>For more details, contact the Sports Department.</p>
    `
  },
  { 
    id: 4, 
    title: "HSC 2025 Form Fill-up Notice for Regular Students", 
    date: "18 Apr 2026", 
    category: "Admission",
    isUrgent: true,
    content: `
      <p>Dear HSC 2025 Regular Students,</p>
      <p>The HSC 2025 form fill-up process has started. All regular students must complete their registration by the deadline mentioned below.</p>
      <h3>Important Dates:</h3>
      <ul>
        <li>Form Fill-up Start: April 18, 2026</li>
        <li>Form Fill-up Deadline: April 30, 2026</li>
        <li>Late Fee: 2000 BDT (May 1-7)</li>
        <li>Very Late Fee: 4000 BDT (May 8-15)</li>
      </ul>
      <h3>Required Information:</h3>
      <ul>
        <li>Valid Student ID</li>
        <li>Parent/Guardian Contact Information</li>
        <li>Subject Selection (Science/Commerce/Humanities)</li>
        <li>Roll Board Selection</li>
      </ul>
      <h3>Form Submission:</h3>
      <ul>
        <li>Online: Visit the central HSC portal</li>
        <li>Offline: Visit the school office with required documents</li>
      </ul>
      <p>Students who fail to submit form by the deadline may not be allowed to sit for HSC examination. Contact the office for any clarification.</p>
    `
  },
  { 
    id: 5, 
    title: "Academic Holiday Notice: Eid-ul-Fitr 2026", 
    date: "15 Apr 2026", 
    category: "Holiday",
    isUrgent: false,
    content: `
      <p>Dear Parents and Students,</p>
      <p>In celebration of Eid-ul-Fitr, the school will observe academic holidays as per the following schedule.</p>
      <h3>Holiday Period:</h3>
      <ul>
        <li>School Closed: April 10-15, 2026 (5 days)</li>
        <li>Classes Resume: April 16, 2026 (Wednesday)</li>
        <li>Administrative Office: Closed</li>
      </ul>
      <h3>Post-Holiday Schedule:</h3>
      <ul>
        <li>April 16-19: Regular Classes</li>
        <li>April 20: Special Assembly</li>
        <li>April 21-25: Regular Classes</li>
      </ul>
      <h3>Important Reminders:</h3>
      <ul>
        <li>All students should return by April 16 for regular classes</li>
        <li>Assignments given before the holiday must be submitted on the first day of school</li>
        <li>No classes will be held during the holiday period</li>
      </ul>
      <p>Wishing all our students, staff, and parents a blessed Eid celebration!</p>
    `
  }
];
