export type Role = 'Admin' | 'HOD' | 'Mentor' | 'Faculty' | 'Student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  avatar?: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  department: string;
  year: number;
  section: string;
  feeStatus: 'Paid' | 'Pending' | 'Partial';
  address: string;
  transport: 'Hostel' | 'Bus' | 'Day Scholar';
  parentNumber: string;
  dob: string;
  bloodGroup: string;
  attendance: number;
  sgpa: number;
  cgpa: number;
}

export interface Faculty {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  department: string;
  subject: string;
  yearHandling: number[];
  dob: string;
  bloodGroup: string;
  address: string;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  assignedClass: string; // e.g., "CSE-3-A"
}

export interface HOD {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  dob: string;
  bloodGroup: string;
}

export interface BusRoute {
  id: string;
  busNumber: string;
  route: string;
  capacity: number;
  driverName: string;
  studentCount: number;
}

export interface Hostel {
  id: string;
  name: string;
  totalRooms: number;
  roomCapacity: number;
  wardenName: string;
  studentCount: number;
}

export interface Book {
  id: string;
  name: string;
  department: string;
  year: number;
  copies: number;
  issuedCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  sender: string;
}

export interface Placement {
  id: string;
  companyName: string;
  package: string;
  eligibleDepts: string[];
  criteria: number; // CGPA
  driveDate: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface Internship {
  id: string;
  studentId: string;
  company: string;
  duration: string;
  stipend: string;
  status: 'Ongoing' | 'Completed';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'Workshop' | 'Seminar' | 'Cultural' | 'Sports';
  description: string;
  participantCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'info' | 'success';
  read: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  status: 'Pending' | 'Submitted' | 'Graded';
}

export interface Activity {
  id: string;
  action: string;
  time: string;
  type: 'attendance' | 'fee' | 'quiz' | 'leave' | 'complaint';
}
