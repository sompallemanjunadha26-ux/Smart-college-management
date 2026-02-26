import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  ClipboardList,
  MessageSquare,
  Send
} from 'lucide-react';
import { MOCK_STUDENTS } from '../mockData';
import { User } from '../types';

interface MentorDashboardProps {
  user: User;
  activeTab: string;
}

export const MentorDashboard: React.FC<MentorDashboardProps> = ({ user, activeTab }) => {
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // In a real app, we'd filter by the mentor's specific assigned class
  const classStudents = MOCK_STUDENTS.slice(0, 28); 
  const lowAttendance = classStudents.filter(s => s.attendance < 75);

  const stats = [
    { label: 'Class Strength', value: classStudents.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Present Today', value: '24', icon: CheckCircle2, color: 'bg-emerald-500' },
    { label: 'Absent Today', value: '4', icon: XCircle, color: 'bg-red-500' },
    { label: 'Low Attendance', value: lowAttendance.length, icon: ClipboardList, color: 'bg-amber-500' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setMessage('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="Send Message to Class">
            <form onSubmit={handleSendMessage} className="space-y-4">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your announcement here..."
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              />
              <Button type="submit" className="w-full gap-2">
                <Send size={18} /> Broadcast Message
              </Button>
              {showSuccess && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-100 text-emerald-700 rounded-xl text-center text-sm font-bold">
                  Message sent successfully!
                </motion.div>
              )}
            </form>
          </Card>

          <Card title="Low Attendance List">
            <Table 
              data={lowAttendance}
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Attendance', accessor: (s) => <Badge variant="danger">{s.attendance}%</Badge> },
                { header: 'Action', accessor: () => <button className="text-primary font-bold">Profile</button> }
              ]}
            />
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === 'attendance') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-header">Daily Attendance View</h2>
        <Card>
          <Table 
            data={classStudents}
            columns={[
              { header: 'Roll No', accessor: 'rollNo' },
              { header: 'Name', accessor: 'name' },
              { header: 'Status', accessor: (s) => (
                <Badge variant={s.id.includes('2') ? 'danger' : 'success'}>
                  {s.id.includes('2') ? 'Absent' : 'Present'}
                </Badge>
              )},
              { header: 'Last Updated', accessor: () => 'Today, 09:30 AM' }
            ]}
          />
        </Card>
      </div>
    );
  }

  return null;
};
