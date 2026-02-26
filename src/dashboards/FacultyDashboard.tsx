import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { 
  Calendar, 
  ClipboardList, 
  Settings, 
  FileText,
  Upload,
  Zap,
  Check,
  X,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Users
} from 'lucide-react';
import { MOCK_STUDENTS } from '../mockData';
import { User } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FacultyDashboardProps {
  user: User;
  activeTab: string;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ user, activeTab }) => {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [quizCode, setQuizCode] = useState('');
  const [isClassLive, setIsClassLive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startClass = () => {
    setIsClassLive(true);
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const stopClass = () => {
    setIsClassLive(false);
    if (timerInterval) clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  const todayClasses = [
    { time: '09:00 AM', subject: 'Data Structures', class: 'CSE-3-A', room: 'L-101' },
    { time: '11:00 AM', subject: 'Algorithms', class: 'CSE-3-B', room: 'L-102' },
    { time: '02:00 PM', subject: 'Lab: Java', class: 'CSE-2-C', room: 'Lab-4' },
  ];

  const classStudents = MOCK_STUDENTS.slice(0, 15);

  const toggleAttendance = (id: string) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const generateQuiz = () => {
    setQuizGenerated(true);
    setQuizCode(Math.random().toString(36).substring(2, 8).toUpperCase());
  };

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-header">Today's Schedule</h2>
          {isClassLive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-4 bg-red-50 border border-red-100 px-4 py-2 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-black text-red-600 uppercase tracking-wider">Live Class</span>
              </div>
              <div className="w-px h-4 bg-red-200"></div>
              <span className="text-lg font-mono font-bold text-red-700">{formatTime(timer)}</span>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todayClasses.map((cls, idx) => (
            <Card key={idx} className={`relative overflow-hidden group transition-all ${isClassLive && idx === 0 ? 'ring-2 ring-primary border-primary bg-primary/5' : ''}`}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full flex items-center justify-center text-primary">
                <Calendar size={20} />
              </div>
              <p className="text-primary font-bold mb-1">{cls.time}</p>
              <h3 className="text-xl font-bold text-header mb-2">{cls.subject}</h3>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Class: {cls.class}</span>
                <span>Room: {cls.room}</span>
              </div>
              <Button 
                size="sm" 
                className="w-full mt-4 gap-2"
                onClick={isClassLive && idx === 0 ? stopClass : startClass}
                variant={isClassLive && idx === 0 ? 'danger' : 'primary'}
              >
                {isClassLive && idx === 0 ? (
                  <><Pause size={16} /> End Class</>
                ) : (
                  <><Play size={16} /> Start Class</>
                )}
              </Button>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card title="Quick Announcement">
              <div className="space-y-4">
                <textarea 
                  placeholder="Send a message to your current class..."
                  className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                />
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2"><Upload size={18} /> Attach File</Button>
                  <Button className="flex-1">Send Now</Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card title="Class Timer Controls">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-5xl font-mono font-black text-header mb-2">{formatTime(timer)}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Elapsed Time</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={resetTimer}
                    disabled={isClassLive}
                  >
                    <RotateCcw size={18} />
                  </Button>
                  <Button 
                    className="flex-[2] gap-2"
                    onClick={isClassLive ? stopClass : startClass}
                    variant={isClassLive ? 'danger' : 'primary'}
                  >
                    {isClassLive ? <Pause size={18} /> : <Play size={18} />}
                    {isClassLive ? 'Stop' : 'Start'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'attendance') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-header">Mark Attendance: CSE-3-A</h2>
          <Button variant="primary">Submit Attendance</Button>
        </div>
        <Card>
          <Table 
            data={classStudents}
            columns={[
              { header: 'Roll No', accessor: 'rollNo' },
              { header: 'Name', accessor: 'name' },
              { header: 'Action', accessor: (s) => (
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleAttendance(s.id)}
                    className={`p-2 rounded-lg transition-all ${attendance[s.id] ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}
                  >
                    <Check size={18} />
                  </button>
                  <button 
                    onClick={() => toggleAttendance(s.id)}
                    className={`p-2 rounded-lg transition-all ${!attendance[s.id] && attendance[s.id] !== undefined ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-400'}`}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            ]}
          />
        </Card>
      </div>
    );
  }

  if (activeTab === 'quiz') {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-header">AI Quiz Generator</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="Generate New Quiz">
            <div className="space-y-6">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload size={40} className="mx-auto text-slate-400 mb-4" />
                <p className="font-bold text-header">Upload Study Material</p>
                <p className="text-sm text-slate-500">PDF, Images or Text files supported</p>
              </div>
              <Button 
                onClick={generateQuiz} 
                className="w-full gap-2 py-6 text-lg"
                disabled={quizGenerated}
              >
                <Zap size={20} /> Generate Quiz with AI
              </Button>
            </div>
          </Card>

          {quizGenerated && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card title="Quiz Details" className="bg-primary/5 border-primary/20">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-2">Share this code with students:</p>
                    <div className="bg-white border-2 border-primary rounded-2xl p-6 text-center">
                      <span className="text-4xl font-black text-primary tracking-widest">{quizCode}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-500">Questions</p>
                      <p className="text-xl font-bold text-header">15</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-500">Time Limit</p>
                      <p className="text-xl font-bold text-header">20m</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (activeTab === 'leave') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card title="Apply for Leave">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">From Date</label>
                <input type="date" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">To Date</label>
                <input type="date" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Reason</label>
              <textarea className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
            <Button className="w-full py-4">Submit Application</Button>
          </form>
        </Card>
      </div>
    );
  }

  return null;
};
