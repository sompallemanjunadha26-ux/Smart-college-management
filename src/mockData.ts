import { Student, Faculty, Mentor, HOD, BusRoute, Hostel, Book, Placement, Internship, Event, Notification, Activity, Assignment } from './types';

export const DEPARTMENTS = ['AIDS', 'AIML', 'CSE', 'ECE', 'EEE', 'Mechanical'];
export const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const YEARS = [1, 2, 3, 4];

// Mock Students
export const MOCK_STUDENTS: Student[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `s-${i}`,
  rollNo: `22BK1A0${501 + i}`,
  name: [
    'Arjun Reddy', 'Priya Sharma', 'Rahul Verma', 'Sneha Kapoor', 'Vikram Singh',
    'Ananya Das', 'Karthik Raja', 'Meera Nair', 'Siddharth Rao', 'Ishita Gupta',
    'Aditya Malhotra', 'Tanvi Joshi', 'Rohan Mehra', 'Kavya Iyer', 'Yash Bansal'
  ][i % 15] + ` ${i + 1}`,
  email: `student${i + 1}@pvkk.edu`,
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  year: YEARS[i % YEARS.length],
  section: SECTIONS[i % SECTIONS.length],
  feeStatus: i % 5 === 0 ? 'Pending' : i % 8 === 0 ? 'Partial' : 'Paid',
  address: `${100 + i}, Academic Street, Knowledge City`,
  transport: i % 3 === 0 ? 'Hostel' : i % 3 === 1 ? 'Bus' : 'Day Scholar',
  parentNumber: `+91 98765432${i.toString().padStart(2, '0')}`,
  dob: '2004-05-15',
  bloodGroup: ['A+', 'B+', 'O+', 'AB+'][i % 4],
  attendance: 70 + (i % 30),
  sgpa: 7.5 + (i % 20) / 10,
  cgpa: 8.0 + (i % 15) / 10,
}));

// Mock Faculty
export const MOCK_FACULTY: Faculty[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `f-${i}`,
  facultyId: `FAC${100 + i}`,
  name: [
    'Dr. Ramesh Babu', 'Prof. Sunita Rao', 'Dr. Amit Shah', 'Prof. Lakshmi Devi',
    'Dr. Suresh Kumar', 'Prof. Anita Desai', 'Dr. Rajesh Khanna', 'Prof. Geeta Bali'
  ][i % 8] + ` ${i + 1}`,
  email: `faculty${i + 1}@pvkk.edu`,
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  subject: [
    'Data Structures', 'AI Basics', 'Circuit Theory', 'Thermodynamics',
    'Machine Learning', 'Digital Electronics', 'Fluid Mechanics', 'Operating Systems'
  ][i % 8],
  yearHandling: [YEARS[i % YEARS.length]],
  dob: '1980-08-20',
  bloodGroup: 'O+',
  address: 'Faculty Quarters, Block ' + String.fromCharCode(65 + (i % 5)),
}));

// Mock Mentors
export const MOCK_MENTORS: Mentor[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `m-${i}`,
  name: `Mentor ${i + 1}`,
  email: `mentor${i + 1}@pvkk.edu`,
  phone: `+91 91234567${i.toString().padStart(2, '0')}`,
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  assignedClass: `${DEPARTMENTS[i % DEPARTMENTS.length]}-${YEARS[i % YEARS.length]}-${SECTIONS[i % SECTIONS.length]}`,
}));

// Mock HODs
export const MOCK_HODS: HOD[] = DEPARTMENTS.map((dept, i) => ({
  id: `hod-${i}`,
  name: `Dr. HOD ${dept}`,
  email: `hod.${dept.toLowerCase()}@pvkk.edu`,
  phone: `+91 99887766${i.toString().padStart(2, '0')}`,
  department: dept,
  dob: '1975-03-10',
  bloodGroup: 'B+',
}));

// Mock Transport
export const MOCK_BUS_ROUTES: BusRoute[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `bus-${i}`,
  busNumber: `TS 09 AB ${1000 + i}`,
  route: `Route ${i + 1} - City Center to Campus`,
  capacity: 50,
  driverName: `Driver ${i + 1}`,
  studentCount: 42 + i,
}));

// Mock Hostels
export const MOCK_HOSTELS: Hostel[] = [
  { id: 'h1', name: 'Aryabhatta Boys Hostel', totalRooms: 100, roomCapacity: 4, wardenName: 'Mr. Warden A', studentCount: 380 },
  { id: 'h2', name: 'Kalpana Girls Hostel', totalRooms: 80, roomCapacity: 3, wardenName: 'Ms. Warden B', studentCount: 230 },
];

// Mock Library
export const MOCK_BOOKS: Book[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `b-${i}`,
  name: `Textbook of ${['Physics', 'Math', 'Coding', 'Electronics'][i % 4]} Vol ${i + 1}`,
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  year: YEARS[i % YEARS.length],
  copies: 10 + i,
  issuedCount: 5 + i,
}));

export const MOCK_PLACEMENTS: Placement[] = [
  { id: 'p1', companyName: 'Google', package: '45 LPA', eligibleDepts: ['CSE', 'AIDS', 'AIML'], criteria: 8.5, driveDate: '2026-03-15', status: 'Upcoming' },
  { id: 'p2', companyName: 'Microsoft', package: '42 LPA', eligibleDepts: ['CSE', 'ECE'], criteria: 8.0, driveDate: '2026-03-20', status: 'Upcoming' },
  { id: 'p3', companyName: 'Amazon', package: '32 LPA', eligibleDepts: ['CSE', 'ECE', 'EEE'], criteria: 7.5, driveDate: '2026-02-10', status: 'Completed' },
  { id: 'p4', companyName: 'TCS', package: '7 LPA', eligibleDepts: DEPARTMENTS, criteria: 6.5, driveDate: '2026-04-05', status: 'Upcoming' },
];

export const MOCK_INTERNSHIPS: Internship[] = [
  { id: 'i1', studentId: 's-0', company: 'Adobe', duration: '6 Months', stipend: '50,000', status: 'Ongoing' },
  { id: 'i2', studentId: 's-1', company: 'Salesforce', duration: '3 Months', stipend: '40,000', status: 'Completed' },
];

export const MOCK_EVENTS: Event[] = [
  { id: 'e1', title: 'AI Hackathon 2026', date: '2026-03-10', type: 'Workshop', description: '24-hour hackathon on Generative AI', participantCount: 150 },
  { id: 'e2', title: 'Annual Cultural Fest', date: '2026-04-15', type: 'Cultural', description: 'Biggest cultural event of the year', participantCount: 2000 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Low Attendance', message: 'Your attendance is below 75% in Data Structures.', time: '2 hours ago', type: 'alert', read: false },
  { id: 'n2', title: 'Fee Reminder', message: 'Semester fee payment deadline is approaching.', time: '5 hours ago', type: 'info', read: false },
  { id: 'n3', title: 'Placement Drive', message: 'Google drive scheduled for March 15th.', time: '1 day ago', type: 'success', read: true },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a1', action: 'Attendance marked for AI Basics', time: '09:30 AM', type: 'attendance' },
  { id: 'a2', action: 'Fee paid for Semester 4', time: 'Yesterday', type: 'fee' },
  { id: 'a3', action: 'Quiz attempted: Operating Systems', time: '2 days ago', type: 'quiz' },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: 'as1', title: 'Neural Networks Implementation', subject: 'AIML', deadline: '2026-03-05', status: 'Pending' },
  { id: 'as2', title: 'Database Schema Design', subject: 'DBMS', deadline: '2026-02-28', status: 'Submitted' },
];
