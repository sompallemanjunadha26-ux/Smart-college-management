import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { 
  GraduationCap, 
  Wallet, 
  TrendingUp, 
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Zap,
  Clock,
  MapPin,
  AlertCircle,
  Briefcase,
  Trophy,
  CheckCircle,
  Info,
  CreditCard,
  Download,
  ArrowRight,
  Users,
  Building2
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_PLACEMENTS, MOCK_EVENTS, MOCK_ACTIVITIES, MOCK_ASSIGNMENTS } from '../mockData';
import { User, Placement, Event as CollegeEvent, Activity, Assignment } from '../types';
import { motion } from 'motion/react';
import { AttendanceChart } from '../components/Charts';

interface StudentDashboardProps {
  user: User;
  activeTab: string;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, activeTab }) => {
  const [quizCode, setQuizCode] = useState('');
  const student = MOCK_STUDENTS[0]; // Mocking current student
  const [placements] = useState<Placement[]>(MOCK_PLACEMENTS);
  const [events] = useState<CollegeEvent[]>(MOCK_EVENTS);
  const [activities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [assignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [appliedPlacements, setAppliedPlacements] = useState<string[]>([]);

  const handleApply = (placementId: string) => {
    if (!appliedPlacements.includes(placementId)) {
      setAppliedPlacements(prev => [...prev, placementId]);
    }
  };

  const stats = [
    { label: 'Overall Attendance', value: `${student.attendance}%`, icon: GraduationCap, color: 'bg-blue-500' },
    { label: 'Fee Status', value: student.feeStatus, icon: Wallet, color: student.feeStatus === 'Paid' ? 'bg-emerald-500' : 'bg-red-500' },
    { label: 'Current SGPA', value: student.sgpa, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Overall CGPA', value: student.cgpa, icon: BarChart3, color: 'bg-orange-500' },
  ];

  const getPerformanceIndicator = () => {
    if (student.cgpa >= 9) return { label: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (student.cgpa >= 7.5) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    return { label: 'Needs Improvement', color: 'text-amber-600', bg: 'bg-amber-50' };
  };

  const performance = getPerformanceIndicator();

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-header">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Performance Prediction" className="relative overflow-hidden">
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl ${performance.bg} flex items-center justify-between`}>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</p>
                      <p className={`text-xl font-black ${performance.color}`}>{performance.label}</p>
                    </div>
                    <TrendingUp size={32} className={performance.color} />
                  </div>
                  <p className="text-sm text-slate-600">Based on your attendance ({student.attendance}%) and CGPA ({student.cgpa}), your predicted performance for next semester is <span className="font-bold">High</span>.</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Progress to Target (9.0 CGPA)</span>
                      <span>{Math.round((student.cgpa / 9) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(student.cgpa / 9) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Attendance Progress">
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * student.attendance) / 100} className="text-primary" />
                      </svg>
                      <span className="absolute text-2xl font-black text-header">{student.attendance}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Classes Attended</p>
                      <p className="text-lg font-bold text-header">142</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Total Classes</p>
                      <p className="text-lg font-bold text-header">180</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card title="Today's Timetable">
              <div className="space-y-4">
                {[
                  { time: '09:00 AM', subject: 'Data Structures', faculty: 'Prof. Smith', room: 'L-101' },
                  { time: '11:00 AM', subject: 'AI Basics', faculty: 'Dr. Jones', room: 'L-102' },
                  { time: '02:00 PM', subject: 'Lab: Java', faculty: 'Ms. Davis', room: 'Lab-4' },
                ].map((cls, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 transition-all">
                    <div className="text-center min-w-[80px]">
                      <p className="text-xs font-bold text-primary">{cls.time}</p>
                      <Clock size={16} className="mx-auto text-slate-400 mt-1" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-header">{cls.subject}</h4>
                      <p className="text-xs text-slate-500">{cls.faculty}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-100">
                      <MapPin size={12} /> {cls.room}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card title="Enter Quiz Code" className="bg-primary text-white">
              <p className="text-sm text-white/80 mb-4">Join an active AI-generated quiz session.</p>
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                  placeholder="CODE123"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 font-black tracking-widest text-center text-2xl outline-none focus:bg-white/20 transition-all"
                />
                <Button variant="secondary" className="w-full py-4 bg-white text-primary hover:bg-slate-100">Join Quiz</Button>
              </div>
            </Card>

            <Card title="Activity Timeline">
              <div className="space-y-6">
                {activities.map((act, idx) => (
                  <div key={act.id} className="flex gap-4 relative">
                    {idx !== activities.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-100"></div>
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      act.type === 'attendance' ? 'bg-blue-100 text-blue-600' : 
                      act.type === 'fee' ? 'bg-emerald-100 text-emerald-600' : 
                      act.type === 'quiz' ? 'bg-purple-100 text-purple-600' : 
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {act.type === 'attendance' ? <CheckCircle size={18} /> : 
                       act.type === 'fee' ? <Wallet size={18} /> : 
                       act.type === 'quiz' ? <Zap size={18} /> : 
                       <Info size={18} />}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-bold text-header">{act.action}</p>
                      <p className="text-xs text-slate-400 font-medium">{act.time}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors">
                  View Full History
                </button>
              </div>
            </Card>

            <Card title="Digital ID Card Preview" className="bg-slate-900 text-white border-none">
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="flex gap-4 items-start mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border-2 border-white/20">
                    <img src={`https://picsum.photos/seed/${student.id}/100`} alt="ID" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg leading-tight">{student.name}</h4>
                    <p className="text-xs text-white/60 font-medium uppercase tracking-widest">{student.rollNo}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-wider text-white/40 mb-6">
                  <div>
                    <p>Department</p>
                    <p className="text-white text-xs mt-1">{student.department}</p>
                  </div>
                  <div>
                    <p>Valid Thru</p>
                    <p className="text-white text-xs mt-1">2026</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-6 h-1 bg-primary/40 rounded-full"></div>)}
                  </div>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'placements') {
    const appliedList = placements.filter(p => appliedPlacements.includes(p.id));

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-header">Placement Drives</h2>
          <div className="flex gap-3">
            <Badge variant="info">Eligible for {placements.filter(p => student.cgpa >= p.criteria).length} Companies</Badge>
          </div>
        </div>

        {appliedList.length > 0 && (
          <Card title="Applied Companies" className="bg-slate-50 border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appliedList.map(p => (
                <div key={p.id} className="p-4 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-header">{p.companyName}</p>
                    <p className="text-xs text-slate-500">{p.package} • {p.driveDate}</p>
                  </div>
                  <Badge variant="success">Applied</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placements.map((p) => {
            const isApplied = appliedPlacements.includes(p.id);
            const isEligible = student.cgpa >= p.criteria;

            return (
              <Card key={p.id} className="hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                    {p.companyName[0]}
                  </div>
                  <Badge variant={p.status === 'Upcoming' ? 'info' : p.status === 'Ongoing' ? 'warning' : 'success'}>
                    {p.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-header mb-1">{p.companyName}</h3>
                <p className="text-2xl font-black text-primary mb-4">{p.package}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Calendar size={14} /> Drive Date: {p.driveDate}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <GraduationCap size={14} /> Min CGPA: {p.criteria}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Building2 size={14} /> Depts: {p.eligibleDepts.join(', ')}
                  </div>
                </div>
                <Button 
                  className="w-full gap-2" 
                  disabled={!isEligible || isApplied}
                  onClick={() => handleApply(p.id)}
                >
                  {!isEligible ? 'Not Eligible' : isApplied ? 'Applied Successfully' : 'Apply Now'} 
                  {!isApplied && isEligible && <ArrowRight size={16} />}
                  {isApplied && <CheckCircle size={16} />}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeTab === 'events') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-header">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((e) => (
            <Card key={e.id} className="flex gap-6 p-0 overflow-hidden">
              <div className="w-40 bg-slate-100 relative shrink-0">
                <img src={`https://picsum.photos/seed/${e.id}/400/600`} alt={e.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant="info" className="bg-white/90 backdrop-blur shadow-sm">{e.type}</Badge>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-header mb-2">{e.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{e.description}</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {e.date}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {e.participantCount}+ Registered</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-6">Register Now</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'assignments') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-header">My Assignments</h2>
        <Card>
          <Table<Assignment> 
            data={assignments}
            columns={[
              { header: 'Assignment Title', accessor: 'title' },
              { header: 'Subject', accessor: 'subject' },
              { header: 'Deadline', accessor: 'deadline' },
              { header: 'Status', accessor: (a) => (
                <Badge variant={a.status === 'Pending' ? 'warning' : a.status === 'Submitted' ? 'info' : 'success'}>
                  {a.status}
                </Badge>
              )},
              { header: 'Action', accessor: (a) => (
                <Button variant="outline" size="sm" disabled={a.status !== 'Pending'}>
                  {a.status === 'Pending' ? 'Upload' : 'View'}
                </Button>
              )}
            ]}
          />
        </Card>
      </div>
    );
  }

  if (activeTab === 'attendance') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-header">Subject-wise Attendance</h2>
          <Button variant="outline" className="gap-2">
            <FileText size={18} /> Generate Monthly PDF
          </Button>
        </div>
        
        {student.attendance < 75 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-4 text-red-700"
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="font-bold">Low Attendance Warning!</p>
              <p className="text-sm">Your overall attendance is {student.attendance}%, which is below the required 75%. Please contact your mentor.</p>
            </div>
          </motion.div>
        )}

        <Card>
          <Table 
            data={[
              { subject: 'Data Structures', total: 40, present: 36, percentage: 90 },
              { subject: 'AI Basics', total: 35, present: 30, percentage: 85 },
              { subject: 'Circuit Theory', total: 38, present: 28, percentage: 73 },
              { subject: 'Thermodynamics', total: 42, present: 40, percentage: 95 },
            ]}
            columns={[
              { header: 'Subject', accessor: 'subject' },
              { header: 'Total Classes', accessor: 'total' },
              { header: 'Attended', accessor: 'present' },
              { header: 'Percentage', accessor: (s) => (
                <Badge variant={s.percentage < 75 ? 'danger' : 'success'}>
                  {s.percentage}%
                </Badge>
              )},
            ]}
          />
        </Card>
      </div>
    );
  }

  if (activeTab === 'fees') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-header">Fee Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card title="Current Dues">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-slate-500">Total Outstanding</p>
                  <p className="text-4xl font-black text-header">₹45,000</p>
                </div>
                <Badge variant="warning">Partial Payment Done</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tuition Fee</span>
                  <span className="font-bold">₹85,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Hostel Fee</span>
                  <span className="font-bold">₹40,000</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between text-sm">
                  <span className="text-slate-500">Paid Amount</span>
                  <span className="font-bold text-emerald-600">-₹80,000</span>
                </div>
              </div>
              <Button className="w-full py-4">Pay Outstanding Balance</Button>
            </div>
          </Card>
          <Card title="Payment History">
            <Table 
              data={[
                { date: '2025-08-15', amount: '₹80,000', type: 'Online', status: 'Success' },
                { date: '2024-08-10', amount: '₹1,20,000', type: 'Bank Transfer', status: 'Success' },
              ]}
              columns={[
                { header: 'Date', accessor: 'date' },
                { header: 'Amount', accessor: 'amount' },
                { header: 'Status', accessor: (p) => <Badge variant="success">{p.status}</Badge> }
              ]}
            />
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === 'profile') {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-header" />
          <div className="relative pt-16 flex flex-col items-center">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center text-header overflow-hidden">
              <img src={`https://picsum.photos/seed/${student.id}/200`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-header">{student.name}</h2>
            <p className="text-slate-500 font-medium">{student.rollNo} • {student.department}</p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-bold text-header border-b border-slate-100 pb-2">Academic Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Year</p>
                  <p className="font-bold">{student.year} Year</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Section</p>
                  <p className="font-bold">{student.section}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">SGPA</p>
                  <p className="font-bold">{student.sgpa}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">CGPA</p>
                  <p className="font-bold">{student.cgpa}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="font-bold text-header border-b border-slate-100 pb-2">Personal Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Blood Group</p>
                  <p className="font-bold">{student.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">DOB</p>
                  <p className="font-bold">{student.dob}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-slate-500">Address</p>
                  <p className="font-bold">{student.address}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};
