import React from 'react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { 
  Users, 
  GraduationCap, 
  Wallet, 
  ClipboardList,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_FACULTY } from '../mockData';
import { User } from '../types';

interface HODDashboardProps {
  user: User;
  activeTab: string;
}

export const HODDashboard: React.FC<HODDashboardProps> = ({ user, activeTab }) => {
  const deptStudents = MOCK_STUDENTS.filter(s => s.department === user.department);
  const deptFaculty = MOCK_FACULTY.filter(f => f.department === user.department);
  const lowAttendance = deptStudents.filter(s => s.attendance < 75);

  const stats = [
    { label: 'Dept Students', value: deptStudents.length, icon: GraduationCap, color: 'bg-blue-500' },
    { label: 'Faculty Count', value: deptFaculty.length, icon: Users, color: 'bg-emerald-500' },
    { label: 'Avg Attendance', value: '84%', icon: ClipboardList, color: 'bg-purple-500' },
    { label: 'Fee Collection', value: '92%', icon: Wallet, color: 'bg-amber-500' },
  ];

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
          <Card title="Low Attendance Alert" subtitle="Students below 75% attendance">
            <Table 
              data={lowAttendance.slice(0, 5)}
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Roll No', accessor: 'rollNo' },
                { header: 'Attendance', accessor: (s) => (
                  <span className="text-red-500 font-bold">{s.attendance}%</span>
                )}
              ]}
            />
            <Button variant="ghost" className="w-full mt-4">View All Low Attendance</Button>
          </Card>
          <Card title="Recent Complaints" subtitle="Department level monitoring">
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-header">Lab Equipment Issue</span>
                    <Badge variant="warning">Pending</Badge>
                  </div>
                  <p className="text-sm text-slate-600">The computers in Lab 3 are not responding properly since yesterday.</p>
                  <p className="text-xs text-slate-400 mt-2">Reported by Student {i} • 2 hours ago</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === 'faculty') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-header">{user.department} Faculty List</h2>
        <Card>
          <Table 
            data={deptFaculty}
            columns={[
              { header: 'ID', accessor: 'facultyId' },
              { header: 'Name', accessor: 'name' },
              { header: 'Subject', accessor: 'subject' },
              { header: 'Email', accessor: 'email' },
            ]}
          />
        </Card>
      </div>
    );
  }

  if (activeTab === 'students') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-header">{user.department} Student List (Year-wise)</h2>
        <Card>
          <Table 
            data={deptStudents}
            columns={[
              { header: 'Roll No', accessor: 'rollNo' },
              { header: 'Name', accessor: 'name' },
              { header: 'Year', accessor: (s) => `${s.year} Year` },
              { header: 'Section', accessor: 'section' },
              { header: 'Attendance', accessor: (s) => `${s.attendance}%` },
            ]}
          />
        </Card>
      </div>
    );
  }

  if (activeTab === 'attendance') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-500" />
          <h2 className="text-2xl font-bold text-header">Low Attendance Monitoring</h2>
        </div>
        <Card>
          <Table 
            data={lowAttendance}
            columns={[
              { header: 'Roll No', accessor: 'rollNo' },
              { header: 'Name', accessor: 'name' },
              { header: 'Attendance', accessor: (s) => (
                <Badge variant="danger">{s.attendance}%</Badge>
              )},
              { header: 'Parent Contact', accessor: 'parentNumber' },
              { header: 'Action', accessor: () => <Button size="sm">Notify Parent</Button> },
            ]}
          />
        </Card>
      </div>
    );
  }

  return null;
};
