import React, { useState, useMemo } from 'react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Bus, 
  Library, 
  Wallet, 
  Plus,
  Filter,
  Download,
  Search,
  Trash2,
  Edit2,
  Smartphone,
  Monitor,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_FACULTY, MOCK_MENTORS, MOCK_HODS, MOCK_BUS_ROUTES, MOCK_HOSTELS, MOCK_BOOKS, DEPARTMENTS, SECTIONS, YEARS, MOCK_PLACEMENTS, MOCK_EVENTS } from '../mockData';
import { Student, Faculty, Mentor, HOD, BusRoute, Hostel, Book, Placement, Event } from '../types';
import { motion } from 'motion/react';

interface AdminDashboardProps {
  activeTab: string;
}

import { AttendanceChart, FeeCollectionChart, DeptStrengthChart } from '../components/Charts';
import { StudentDashboard } from './StudentDashboard';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ activeTab }) => {
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [faculty, setFaculty] = useState<Faculty[]>(MOCK_FACULTY);
  const [mentors, setMentors] = useState<Mentor[]>(MOCK_MENTORS);
  const [hods, setHods] = useState<HOD[]>(MOCK_HODS);
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>(MOCK_BUS_ROUTES);
  const [hostels, setHostels] = useState<Hostel[]>(MOCK_HOSTELS);
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [placements, setPlacements] = useState<Placement[]>(MOCK_PLACEMENTS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  
  const [studentSearch, setStudentSearch] = useState('');
  const [facultySearch, setFacultySearch] = useState('');
  const [mentorSearch, setMentorSearch] = useState('');
  const [hodSearch, setHodSearch] = useState('');
  const [transportSearch, setTransportSearch] = useState('');
  const [hostelSearch, setHostelSearch] = useState('');
  const [librarySearch, setLibrarySearch] = useState('');
  const [placementSearch, setPlacementSearch] = useState('');
  const [eventSearch, setEventSearch] = useState('');

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [isHodModalOpen, setIsHodModalOpen] = useState(false);
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
  const [isHostelModalOpen, setIsHostelModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [editingHod, setEditingHod] = useState<HOD | null>(null);
  const [editingTransport, setEditingTransport] = useState<BusRoute | null>(null);
  const [editingHostel, setEditingHostel] = useState<Hostel | null>(null);
  const [editingLibrary, setEditingLibrary] = useState<Book | null>(null);
  const [editingPlacement, setEditingPlacement] = useState<Placement | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Stats
  const stats = useMemo(() => [
    { label: 'Total Students', value: students.length.toLocaleString(), icon: GraduationCap, color: 'bg-blue-500' },
    { label: 'Total Faculty', value: faculty.length.toString(), icon: Users, color: 'bg-emerald-500' },
    { label: 'Departments', value: '6', icon: Building2, color: 'bg-purple-500' },
    { label: 'Hostel Students', value: hostels.reduce((acc, h) => acc + h.studentCount, 0).toString(), icon: Building2, color: 'bg-orange-500' },
    { label: 'Bus Students', value: busRoutes.reduce((acc, b) => acc + b.studentCount, 0).toString(), icon: Bus, color: 'bg-indigo-500' },
    { label: 'Placements', value: placements.length.toString(), icon: Briefcase, color: 'bg-pink-500' },
    { label: 'Fee Collection', value: '₹2.4Cr', icon: Wallet, color: 'bg-amber-500' },
    { label: 'Total Books', value: books.reduce((acc, b) => acc + b.copies, 0).toLocaleString(), icon: Library, color: 'bg-cyan-500' },
  ], [students.length, faculty.length, hostels, busRoutes, books, placements.length]);

  const toggleMobilePreview = () => setIsMobilePreview(!isMobilePreview);

  // Filtering
  const filteredPlacements = useMemo(() => {
    return placements.filter(p => 
      p.companyName.toLowerCase().includes(placementSearch.toLowerCase()) ||
      p.eligibleDepts.some(d => d.toLowerCase().includes(placementSearch.toLowerCase()))
    );
  }, [placements, placementSearch]);

  const filteredEvents = useMemo(() => {
    return events.filter(e => 
      e.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
      e.type.toLowerCase().includes(eventSearch.toLowerCase())
    );
  }, [events, eventSearch]);

  // Filtering
  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.department.toLowerCase().includes(studentSearch.toLowerCase())
    );
  }, [students, studentSearch]);

  const filteredFaculty = useMemo(() => {
    return faculty.filter(f => 
      f.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.facultyId.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.department.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.subject.toLowerCase().includes(facultySearch.toLowerCase())
    );
  }, [faculty, facultySearch]);

  const filteredMentors = useMemo(() => {
    return mentors.filter(m => 
      m.name.toLowerCase().includes(mentorSearch.toLowerCase()) ||
      m.assignedClass.toLowerCase().includes(mentorSearch.toLowerCase()) ||
      m.department.toLowerCase().includes(mentorSearch.toLowerCase())
    );
  }, [mentors, mentorSearch]);

  const filteredHods = useMemo(() => {
    return hods.filter(h => 
      h.name.toLowerCase().includes(hodSearch.toLowerCase()) ||
      h.department.toLowerCase().includes(hodSearch.toLowerCase())
    );
  }, [hods, hodSearch]);

  const filteredTransport = useMemo(() => {
    return busRoutes.filter(b => 
      b.busNumber.toLowerCase().includes(transportSearch.toLowerCase()) ||
      b.route.toLowerCase().includes(transportSearch.toLowerCase()) ||
      b.driverName.toLowerCase().includes(transportSearch.toLowerCase())
    );
  }, [busRoutes, transportSearch]);

  const filteredHostels = useMemo(() => {
    return hostels.filter(h => 
      h.name.toLowerCase().includes(hostelSearch.toLowerCase()) ||
      h.wardenName.toLowerCase().includes(hostelSearch.toLowerCase())
    );
  }, [hostels, hostelSearch]);

  const filteredLibrary = useMemo(() => {
    return books.filter(b => 
      b.name.toLowerCase().includes(librarySearch.toLowerCase()) ||
      b.department.toLowerCase().includes(librarySearch.toLowerCase())
    );
  }, [books, librarySearch]);

  // Handlers
  const handleDelete = (type: string, id: string) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      switch (type) {
        case 'student': setStudents(prev => prev.filter(s => s.id !== id)); break;
        case 'faculty': setFaculty(prev => prev.filter(f => f.id !== id)); break;
        case 'mentor': setMentors(prev => prev.filter(m => m.id !== id)); break;
        case 'hod': setHods(prev => prev.filter(h => h.id !== id)); break;
        case 'transport': setBusRoutes(prev => prev.filter(b => b.id !== id)); break;
        case 'hostel': setHostels(prev => prev.filter(h => h.id !== id)); break;
        case 'library': setBooks(prev => prev.filter(b => b.id !== id)); break;
        case 'placement': setPlacements(prev => prev.filter(p => p.id !== id)); break;
        case 'event': setEvents(prev => prev.filter(e => e.id !== id)); break;
      }
    }
  };

  const handleSaveStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studentData: Partial<Student> = {
      name: formData.get('name') as string,
      rollNo: formData.get('rollNo') as string,
      department: formData.get('department') as string,
      year: parseInt(formData.get('year') as string),
      section: formData.get('section') as string,
      feeStatus: formData.get('feeStatus') as any,
      transport: formData.get('transport') as any,
      parentNumber: formData.get('parentNumber') as string,
      address: formData.get('address') as string,
      dob: formData.get('dob') as string,
      bloodGroup: formData.get('bloodGroup') as string,
    };

    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...studentData } : s));
    } else {
      const newStudent: Student = {
        ...studentData as Student,
        id: `s-${Date.now()}`,
        email: `${studentData.name?.toLowerCase().replace(/\s/g, '')}@pvkk.edu`,
        attendance: 100,
        sgpa: 0,
        cgpa: 0,
      };
      setStudents(prev => [newStudent, ...prev]);
    }
    setIsStudentModalOpen(false);
    setEditingStudent(null);
  };

  const handleSaveFaculty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const facultyData: Partial<Faculty> = {
      name: formData.get('name') as string,
      facultyId: formData.get('facultyId') as string,
      department: formData.get('department') as string,
      subject: formData.get('subject') as string,
      email: formData.get('email') as string,
      dob: formData.get('dob') as string,
      bloodGroup: formData.get('bloodGroup') as string,
      address: formData.get('address') as string,
    };

    if (editingFaculty) {
      setFaculty(prev => prev.map(f => f.id === editingFaculty.id ? { ...f, ...facultyData } : f));
    } else {
      const newFaculty: Faculty = {
        ...facultyData as Faculty,
        id: `f-${Date.now()}`,
        yearHandling: [1],
      };
      setFaculty(prev => [newFaculty, ...prev]);
    }
    setIsFacultyModalOpen(false);
    setEditingFaculty(null);
  };

  const handleSaveMentor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const mentorData: Partial<Mentor> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      department: formData.get('department') as string,
      assignedClass: formData.get('assignedClass') as string,
    };

    if (editingMentor) {
      setMentors(prev => prev.map(m => m.id === editingMentor.id ? { ...m, ...mentorData } : m));
    } else {
      const newMentor: Mentor = {
        ...mentorData as Mentor,
        id: `m-${Date.now()}`,
      };
      setMentors(prev => [newMentor, ...prev]);
    }
    setIsMentorModalOpen(false);
    setEditingMentor(null);
  };

  const handleSaveHod = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const hodData: Partial<HOD> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      department: formData.get('department') as string,
      dob: formData.get('dob') as string,
      bloodGroup: formData.get('bloodGroup') as string,
    };

    if (editingHod) {
      setHods(prev => prev.map(h => h.id === editingHod.id ? { ...h, ...hodData } : h));
    } else {
      const newHod: HOD = {
        ...hodData as HOD,
        id: `hod-${Date.now()}`,
      };
      setHods(prev => [newHod, ...prev]);
    }
    setIsHodModalOpen(false);
    setEditingHod(null);
  };

  const handleSaveTransport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const transportData: Partial<BusRoute> = {
      busNumber: formData.get('busNumber') as string,
      route: formData.get('route') as string,
      capacity: parseInt(formData.get('capacity') as string),
      driverName: formData.get('driverName') as string,
      studentCount: parseInt(formData.get('studentCount') as string),
    };

    if (editingTransport) {
      setBusRoutes(prev => prev.map(b => b.id === editingTransport.id ? { ...b, ...transportData } : b));
    } else {
      const newTransport: BusRoute = {
        ...transportData as BusRoute,
        id: `bus-${Date.now()}`,
      };
      setBusRoutes(prev => [newTransport, ...prev]);
    }
    setIsTransportModalOpen(false);
    setEditingTransport(null);
  };

  const handleSaveHostel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const hostelData: Partial<Hostel> = {
      name: formData.get('name') as string,
      totalRooms: parseInt(formData.get('totalRooms') as string),
      roomCapacity: parseInt(formData.get('roomCapacity') as string),
      wardenName: formData.get('wardenName') as string,
      studentCount: parseInt(formData.get('studentCount') as string),
    };

    if (editingHostel) {
      setHostels(prev => prev.map(h => h.id === editingHostel.id ? { ...h, ...hostelData } : h));
    } else {
      const newHostel: Hostel = {
        ...hostelData as Hostel,
        id: `h-${Date.now()}`,
      };
      setHostels(prev => [newHostel, ...prev]);
    }
    setIsHostelModalOpen(false);
    setEditingHostel(null);
  };

  const handleSaveLibrary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const libraryData: Partial<Book> = {
      name: formData.get('name') as string,
      department: formData.get('department') as string,
      year: parseInt(formData.get('year') as string),
      copies: parseInt(formData.get('copies') as string),
      issuedCount: parseInt(formData.get('issuedCount') as string),
    };

    if (editingLibrary) {
      setBooks(prev => prev.map(b => b.id === editingLibrary.id ? { ...b, ...libraryData } : b));
    } else {
      const newBook: Book = {
        ...libraryData as Book,
        id: `b-${Date.now()}`,
      };
      setBooks(prev => [newBook, ...prev]);
    }
    setIsLibraryModalOpen(false);
    setEditingLibrary(null);
  };

  const handleSavePlacement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const placementData: Partial<Placement> = {
      companyName: formData.get('companyName') as string,
      package: formData.get('package') as string,
      eligibleDepts: (formData.get('eligibleDepts') as string).split(',').map(d => d.trim()),
      criteria: parseFloat(formData.get('criteria') as string),
      driveDate: formData.get('driveDate') as string,
      status: formData.get('status') as 'Upcoming' | 'Ongoing' | 'Completed',
    };

    if (editingPlacement) {
      setPlacements(prev => prev.map(p => p.id === editingPlacement.id ? { ...p, ...placementData } : p));
    } else {
      const newPlacement: Placement = {
        ...placementData as Placement,
        id: `p-${Date.now()}`,
      };
      setPlacements(prev => [newPlacement, ...prev]);
    }
    setIsPlacementModalOpen(false);
    setEditingPlacement(null);
  };

  const handleSaveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventData: Partial<Event> = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      type: formData.get('type') as any,
      description: formData.get('description') as string,
      participantCount: parseInt(formData.get('participantCount') as string),
    };

    if (editingEvent) {
      setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? { ...ev, ...eventData } : ev));
    } else {
      const newEvent: Event = {
        ...eventData as Event,
        id: `ev-${Date.now()}`,
      };
      setEvents(prev => [newEvent, ...prev]);
    }
    setIsEventModalOpen(false);
    setEditingEvent(null);
  };

  if (isMobilePreview) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-100 p-8 rounded-3xl">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-xl font-bold text-header">Mobile App Preview</h2>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsMobilePreview(false)}>
            <Monitor size={16} /> Exit Preview
          </Button>
        </div>
        <div className="relative w-[375px] h-[812px] bg-white rounded-[60px] shadow-2xl border-[12px] border-slate-900 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl z-50"></div>
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className="p-6 pt-12">
              <StudentDashboard user={{ id: '1', name: 'Student', role: 'student', email: '' }} activeTab="dashboard" />
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-header">Admin Overview</h2>
            <Button variant="outline" size="sm" className="gap-2" onClick={toggleMobilePreview}>
              <Smartphone size={16} /> Mobile Preview
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download size={18} /> Export Data
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all group cursor-pointer overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 -mr-8 -mt-8 rounded-full group-hover:scale-110 transition-transform`}></div>
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${stat.color} text-white shadow-lg`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-header">{stat.value}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Smart Alerts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card title="Attendance Trends (Department-wise)">
              <AttendanceChart data={[
                { name: 'CSE', attendance: 88 },
                { name: 'ECE', attendance: 82 },
                { name: 'EEE', attendance: 75 },
                { name: 'MECH', attendance: 70 },
                { name: 'AIDS', attendance: 92 },
                { name: 'AIML', attendance: 90 },
              ]} />
            </Card>
            <Card title="Fee Collection (Monthly)">
              <FeeCollectionChart data={[
                { month: 'Jan', amount: 4500000 },
                { month: 'Feb', amount: 5200000 },
                { month: 'Mar', amount: 4800000 },
                { month: 'Apr', amount: 6100000 },
                { month: 'May', amount: 5500000 },
                { month: 'Jun', amount: 6700000 },
              ]} />
            </Card>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-header flex items-center gap-2">
              <AlertCircle className="text-red-500" size={20} />
              Smart Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-red-900">Low Attendance Alert</p>
                  <p className="text-xs text-red-700">42 students in Mechanical dept have attendance below 75%.</p>
                </div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                  <Wallet size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-900">Fee Pending &gt; 30 Days</p>
                  <p className="text-xs text-amber-700">128 students have pending fees for the current semester.</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                  <Library size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900">Low Library Stock</p>
                  <p className="text-xs text-blue-700">"Data Structures" textbook copies are below the threshold (3 left).</p>
                </div>
              </div>
            </div>

            <Card title="Department Strength">
              <DeptStrengthChart data={[
                { name: 'CSE', value: 400 },
                { name: 'ECE', value: 300 },
                { name: 'EEE', value: 200 },
                { name: 'MECH', value: 150 },
                { name: 'AIDS', value: 120 },
                { name: 'AIML', value: 110 },
              ]} />
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="Recent Student Registrations">
            <Table<Student> 
              data={students.slice(0, 5)}
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Roll No', accessor: 'rollNo' },
                { header: 'Dept', accessor: 'department' },
                { header: 'Status', accessor: (s) => (
                  <Badge variant={s.feeStatus === 'Paid' ? 'success' : s.feeStatus === 'Partial' ? 'warning' : 'danger'}>
                    {s.feeStatus}
                  </Badge>
                )}
              ]}
            />
          </Card>
          <Card title="Faculty Overview">
            <Table<Faculty> 
              data={faculty.slice(0, 5)}
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Dept', accessor: 'department' },
                { header: 'Subject', accessor: 'subject' },
              ]}
            />
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === 'analytics') {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-header">Enterprise Analytics Dashboard</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="Attendance Trends (Department-wise)">
            <AttendanceChart data={[
              { name: 'CSE', attendance: 88 },
              { name: 'ECE', attendance: 82 },
              { name: 'EEE', attendance: 75 },
              { name: 'MECH', attendance: 70 },
              { name: 'AIDS', attendance: 92 },
              { name: 'AIML', attendance: 90 },
            ]} />
          </Card>
          <Card title="Fee Collection (Monthly)">
            <FeeCollectionChart data={[
              { month: 'Jan', amount: 4500000 },
              { month: 'Feb', amount: 5200000 },
              { month: 'Mar', amount: 4800000 },
              { month: 'Apr', amount: 6100000 },
              { month: 'May', amount: 5500000 },
              { month: 'Jun', amount: 6700000 },
            ]} />
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card title="Department Strength">
            <DeptStrengthChart data={[
              { name: 'CSE', value: 400 },
              { name: 'ECE', value: 300 },
              { name: 'EEE', value: 200 },
              { name: 'MECH', value: 150 },
              { name: 'AIDS', value: 120 },
              { name: 'AIML', value: 110 },
            ]} />
          </Card>
          <Card title="Placement Success Rate">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-black text-primary">84%</p>
                <p className="text-sm font-bold text-slate-500 mt-2">Overall Success Rate</p>
              </div>
            </div>
          </Card>
          <Card title="Faculty Distribution">
            <div className="h-64 flex items-center justify-center italic text-slate-400">
              Distribution Chart Placeholder
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === 'placements') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-header">Placement Management</h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search placements..." 
                value={placementSearch}
                onChange={(e) => setPlacementSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
            <Button className="gap-2" onClick={() => { setEditingPlacement(null); setIsPlacementModalOpen(true); }}>
              <Plus size={18} /> Add Drive
            </Button>
          </div>
        </div>
        <Card>
          <Table<Placement> 
            data={filteredPlacements}
            columns={[
              { header: 'Company', accessor: 'companyName' },
              { header: 'Package', accessor: 'package' },
              { header: 'Eligible Depts', accessor: (p) => p.eligibleDepts.join(', ') },
              { header: 'Min CGPA', accessor: 'criteria' },
              { header: 'Drive Date', accessor: 'driveDate' },
              { header: 'Status', accessor: (p) => (
                <Badge variant={p.status === 'Upcoming' ? 'info' : p.status === 'Ongoing' ? 'warning' : 'success'}>
                  {p.status}
                </Badge>
              )},
              { header: 'Actions', accessor: (p) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingPlacement(p); setIsPlacementModalOpen(true); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete('placement', p.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>

        <Modal 
          isOpen={isPlacementModalOpen} 
          onClose={() => setIsPlacementModalOpen(false)} 
          title={editingPlacement ? 'Edit Placement Drive' : 'Add New Placement Drive'}
        >
          <form onSubmit={handleSavePlacement} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Company Name</label>
                <input name="companyName" defaultValue={editingPlacement?.companyName} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Package (LPA)</label>
                <input name="package" defaultValue={editingPlacement?.package} placeholder="e.g. 12 LPA" required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Eligible Departments (Comma separated)</label>
              <input name="eligibleDepts" defaultValue={editingPlacement?.eligibleDepts.join(', ')} placeholder="CSE, ECE, AIDS" required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Min CGPA</label>
                <input name="criteria" type="number" step="0.1" defaultValue={editingPlacement?.criteria} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Drive Date</label>
                <input name="driveDate" type="date" defaultValue={editingPlacement?.driveDate} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Status</label>
                <select name="status" defaultValue={editingPlacement?.status || 'Upcoming'} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">Save Placement Drive</Button>
          </form>
        </Modal>
      </div>
    );
  }

  if (activeTab === 'events') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-header">Event Management</h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
            <Button className="gap-2" onClick={() => { setEditingEvent(null); setIsEventModalOpen(true); }}>
              <Plus size={18} /> Add Event
            </Button>
          </div>
        </div>
        <Card>
          <Table<Event> 
            data={filteredEvents}
            columns={[
              { header: 'Event Title', accessor: 'title' },
              { header: 'Date', accessor: 'date' },
              { header: 'Type', accessor: 'type' },
              { header: 'Participants', accessor: 'participantCount' },
              { header: 'Actions', accessor: (ev) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingEvent(ev); setIsEventModalOpen(true); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete('event', ev.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>

        <Modal 
          isOpen={isEventModalOpen} 
          onClose={() => setIsEventModalOpen(false)} 
          title={editingEvent ? 'Edit Event' : 'Add New Event'}
        >
          <form onSubmit={handleSaveEvent} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Event Title</label>
              <input name="title" defaultValue={editingEvent?.title} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Date</label>
                <input name="date" type="date" defaultValue={editingEvent?.date} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Type</label>
                <input name="type" defaultValue={editingEvent?.type} placeholder="e.g. Workshop, Seminar" required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Participant Count</label>
              <input name="participantCount" type="number" defaultValue={editingEvent?.participantCount} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea name="description" defaultValue={editingEvent?.description} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 resize-none h-24" />
            </div>
            <Button type="submit" className="w-full mt-4">Save Event</Button>
          </form>
        </Modal>
      </div>
    );
  }

  if (activeTab === 'students') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-header">Student Management</h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={18} /> Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={18} /> Export
            </Button>
            <Button className="gap-2" onClick={() => { setEditingStudent(null); setIsStudentModalOpen(true); }}>
              <Plus size={18} /> Add Student
            </Button>
          </div>
        </div>
        <Card>
          <Table<Student> 
            data={filteredStudents}
            columns={[
              { header: 'Roll No', accessor: 'rollNo' },
              { header: 'Name', accessor: 'name' },
              { header: 'Department', accessor: 'department' },
              { header: 'Year', accessor: (s) => `${s.year} Year` },
              { header: 'Section', accessor: 'section' },
              { header: 'Transport', accessor: 'transport' },
              { header: 'Fee Status', accessor: (s) => (
                <Badge variant={s.feeStatus === 'Paid' ? 'success' : s.feeStatus === 'Partial' ? 'warning' : 'danger'}>
                  {s.feeStatus}
                </Badge>
              )},
              { header: 'Actions', accessor: (s) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingStudent(s); setIsStudentModalOpen(true); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete('student', s.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>

        <Modal 
          isOpen={isStudentModalOpen} 
          onClose={() => setIsStudentModalOpen(false)} 
          title={editingStudent ? 'Edit Student' : 'Add New Student'}
        >
          <form onSubmit={handleSaveStudent} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input name="name" defaultValue={editingStudent?.name} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Roll Number</label>
                <input name="rollNo" defaultValue={editingStudent?.rollNo} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Department</label>
                <select name="department" defaultValue={editingStudent?.department || DEPARTMENTS[0]} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Year</label>
                <select name="year" defaultValue={editingStudent?.year || 1} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Section</label>
                <select name="section" defaultValue={editingStudent?.section || SECTIONS[0]} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Parent Number</label>
                <input name="parentNumber" defaultValue={editingStudent?.parentNumber} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Blood Group</label>
                <input name="bloodGroup" defaultValue={editingStudent?.bloodGroup} placeholder="e.g. O+" required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
              <input name="dob" type="date" defaultValue={editingStudent?.dob} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Address</label>
              <textarea name="address" defaultValue={editingStudent?.address} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 resize-none h-20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Fee Status</label>
                <select name="feeStatus" defaultValue={editingStudent?.feeStatus || 'Paid'} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Transport</label>
                <select name="transport" defaultValue={editingStudent?.transport || 'Day Scholar'} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="Day Scholar">Day Scholar</option>
                  <option value="Bus">Bus</option>
                  <option value="Hostel">Hostel</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">Save Student Record</Button>
          </form>
        </Modal>
      </div>
    );
  }

  if (activeTab === 'faculty') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-header">Faculty Management</h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search faculty..." 
                value={facultySearch}
                onChange={(e) => setFacultySearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
            <Button className="gap-2" onClick={() => { setEditingFaculty(null); setIsFacultyModalOpen(true); }}>
              <Plus size={18} /> Add Faculty
            </Button>
          </div>
        </div>
        <Card>
          <Table<Faculty> 
            data={filteredFaculty}
            columns={[
              { header: 'ID', accessor: 'facultyId' },
              { header: 'Name', accessor: 'name' },
              { header: 'Department', accessor: 'department' },
              { header: 'Subject', accessor: 'subject' },
              { header: 'Email', accessor: 'email' },
              { header: 'Actions', accessor: (f) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingFaculty(f); setIsFacultyModalOpen(true); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete('faculty', f.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>

        <Modal 
          isOpen={isFacultyModalOpen} 
          onClose={() => setIsFacultyModalOpen(false)} 
          title={editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}
        >
          <form onSubmit={handleSaveFaculty} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input name="name" defaultValue={editingFaculty?.name} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Faculty ID</label>
                <input name="facultyId" defaultValue={editingFaculty?.facultyId} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Department</label>
                <select name="department" defaultValue={editingFaculty?.department || DEPARTMENTS[0]} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Subject</label>
                <input name="subject" defaultValue={editingFaculty?.subject} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input name="email" type="email" defaultValue={editingFaculty?.email} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
                <input name="dob" type="date" defaultValue={editingFaculty?.dob} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Blood Group</label>
                <input name="bloodGroup" defaultValue={editingFaculty?.bloodGroup} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Address</label>
              <textarea name="address" defaultValue={editingFaculty?.address} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 resize-none h-20" />
            </div>
            <Button type="submit" className="w-full mt-4">Save Faculty Record</Button>
          </form>
        </Modal>
      </div>
    );
  }

  if (activeTab === 'mentors') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-header">Mentor Management</h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search mentors..." 
                value={mentorSearch}
                onChange={(e) => setMentorSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
            <Button className="gap-2" onClick={() => { setEditingMentor(null); setIsMentorModalOpen(true); }}>
              <Plus size={18} /> Add Mentor
            </Button>
          </div>
        </div>
        <Card>
          <Table<Mentor> 
            data={filteredMentors}
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Assigned Class', accessor: 'assignedClass' },
              { header: 'Department', accessor: 'department' },
              { header: 'Phone', accessor: 'phone' },
              { header: 'Email', accessor: 'email' },
              { header: 'Actions', accessor: (m) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingMentor(m); setIsMentorModalOpen(true); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete('mentor', m.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>

        <Modal 
          isOpen={isMentorModalOpen} 
          onClose={() => setIsMentorModalOpen(false)} 
          title={editingMentor ? 'Edit Mentor' : 'Add New Mentor'}
        >
          <form onSubmit={handleSaveMentor} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input name="name" defaultValue={editingMentor?.name} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input name="email" type="email" defaultValue={editingMentor?.email} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Phone</label>
                <input name="phone" defaultValue={editingMentor?.phone} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Department</label>
                <select name="department" defaultValue={editingMentor?.department || DEPARTMENTS[0]} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Assigned Class</label>
                <input name="assignedClass" defaultValue={editingMentor?.assignedClass} placeholder="e.g. CSE-3-A" required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">Save Mentor Record</Button>
          </form>
        </Modal>
      </div>
    );
  }

  if (activeTab === 'hods') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-header">HOD Management</h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search HODs..." 
                value={hodSearch}
                onChange={(e) => setHodSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
            <Button className="gap-2" onClick={() => { setEditingHod(null); setIsHodModalOpen(true); }}>
              <Plus size={18} /> Add HOD
            </Button>
          </div>
        </div>
        <Card>
          <Table<HOD> 
            data={filteredHods}
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Department', accessor: 'department' },
              { header: 'Email', accessor: 'email' },
              { header: 'Phone', accessor: 'phone' },
              { header: 'DOB', accessor: 'dob' },
              { header: 'Actions', accessor: (h) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingHod(h); setIsHodModalOpen(true); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete('hod', h.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>

        <Modal 
          isOpen={isHodModalOpen} 
          onClose={() => setIsHodModalOpen(false)} 
          title={editingHod ? 'Edit HOD' : 'Add New HOD'}
        >
          <form onSubmit={handleSaveHod} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input name="name" defaultValue={editingHod?.name} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input name="email" type="email" defaultValue={editingHod?.email} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Phone</label>
                <input name="phone" defaultValue={editingHod?.phone} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Department</label>
                <select name="department" defaultValue={editingHod?.department || DEPARTMENTS[0]} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Blood Group</label>
                <input name="bloodGroup" defaultValue={editingHod?.bloodGroup} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
              <input name="dob" type="date" defaultValue={editingHod?.dob} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <Button type="submit" className="w-full mt-4">Save HOD Record</Button>
          </form>
        </Modal>
      </div>
    );
  }

  if (activeTab === 'transport') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-header">Transport Management</h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search routes..." 
                value={transportSearch}
                onChange={(e) => setTransportSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
            <Button className="gap-2" onClick={() => { setEditingTransport(null); setIsTransportModalOpen(true); }}>
              <Plus size={18} /> Add Route
            </Button>
          </div>
        </div>
        <Card>
          <Table<BusRoute> 
            data={filteredTransport}
            columns={[
              { header: 'Bus No', accessor: 'busNumber' },
              { header: 'Route', accessor: 'route' },
              { header: 'Driver', accessor: 'driverName' },
              { header: 'Capacity', accessor: 'capacity' },
              { header: 'Students', accessor: 'studentCount' },
              { header: 'Actions', accessor: (b) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingTransport(b); setIsTransportModalOpen(true); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete('transport', b.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>

        <Modal 
          isOpen={isTransportModalOpen} 
          onClose={() => setIsTransportModalOpen(false)} 
          title={editingTransport ? 'Edit Route' : 'Add New Route'}
        >
          <form onSubmit={handleSaveTransport} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Bus Number</label>
                <input name="busNumber" defaultValue={editingTransport?.busNumber} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Driver Name</label>
                <input name="driverName" defaultValue={editingTransport?.driverName} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Route Details</label>
              <input name="route" defaultValue={editingTransport?.route} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Capacity</label>
                <input name="capacity" type="number" defaultValue={editingTransport?.capacity} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Student Count</label>
                <input name="studentCount" type="number" defaultValue={editingTransport?.studentCount} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">Save Route Record</Button>
          </form>
        </Modal>
      </div>
    );
  }

  if (activeTab === 'hostel') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-header">Hostel Management</h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search hostels..." 
                value={hostelSearch}
                onChange={(e) => setHostelSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
            <Button className="gap-2" onClick={() => { setEditingHostel(null); setIsHostelModalOpen(true); }}>
              <Plus size={18} /> Add Hostel
            </Button>
          </div>
        </div>
        <Card>
          <Table<Hostel> 
            data={filteredHostels}
            columns={[
              { header: 'Hostel Name', accessor: 'name' },
              { header: 'Warden', accessor: 'wardenName' },
              { header: 'Total Rooms', accessor: 'totalRooms' },
              { header: 'Capacity/Room', accessor: 'roomCapacity' },
              { header: 'Students', accessor: 'studentCount' },
              { header: 'Actions', accessor: (h) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingHostel(h); setIsHostelModalOpen(true); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete('hostel', h.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>

        <Modal 
          isOpen={isHostelModalOpen} 
          onClose={() => setIsHostelModalOpen(false)} 
          title={editingHostel ? 'Edit Hostel' : 'Add New Hostel'}
        >
          <form onSubmit={handleSaveHostel} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Hostel Name</label>
              <input name="name" defaultValue={editingHostel?.name} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Warden Name</label>
              <input name="wardenName" defaultValue={editingHostel?.wardenName} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Total Rooms</label>
                <input name="totalRooms" type="number" defaultValue={editingHostel?.totalRooms} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Room Cap.</label>
                <input name="roomCapacity" type="number" defaultValue={editingHostel?.roomCapacity} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Students</label>
                <input name="studentCount" type="number" defaultValue={editingHostel?.studentCount} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">Save Hostel Record</Button>
          </form>
        </Modal>
      </div>
    );
  }

  if (activeTab === 'library') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-header">Library Management</h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search books..." 
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-64"
              />
            </div>
            <Button className="gap-2" onClick={() => { setEditingLibrary(null); setIsLibraryModalOpen(true); }}>
              <Plus size={18} /> Add Book
            </Button>
          </div>
        </div>
        <Card>
          <Table<Book> 
            data={filteredLibrary}
            columns={[
              { header: 'Book Name', accessor: 'name' },
              { header: 'Department', accessor: 'department' },
              { header: 'Year', accessor: 'year' },
              { header: 'Total Copies', accessor: 'copies' },
              { header: 'Issued', accessor: 'issuedCount' },
              { header: 'Status', accessor: (b) => (
                b.copies - b.issuedCount < 3 
                  ? <Badge variant="danger">Low Stock</Badge>
                  : <Badge variant="success">Available</Badge>
              )},
              { header: 'Actions', accessor: (b) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingLibrary(b); setIsLibraryModalOpen(true); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete('library', b.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>

        <Modal 
          isOpen={isLibraryModalOpen} 
          onClose={() => setIsLibraryModalOpen(false)} 
          title={editingLibrary ? 'Edit Book' : 'Add New Book'}
        >
          <form onSubmit={handleSaveLibrary} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Book Name</label>
              <input name="name" defaultValue={editingLibrary?.name} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Department</label>
                <select name="department" defaultValue={editingLibrary?.department || DEPARTMENTS[0]} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Year</label>
                <select name="year" defaultValue={editingLibrary?.year || 1} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Total Copies</label>
                <input name="copies" type="number" defaultValue={editingLibrary?.copies} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Issued Count</label>
                <input name="issuedCount" type="number" defaultValue={editingLibrary?.issuedCount} required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">Save Book Record</Button>
          </form>
        </Modal>
      </div>
    );
  }

  return null;
};
