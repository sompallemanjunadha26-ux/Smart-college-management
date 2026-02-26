import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  GraduationCap, 
  Bus, 
  Building2, 
  Library, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  MessageSquare,
  FileText,
  Calendar,
  Settings,
  Briefcase,
  Trophy,
  Bell,
  Clock,
  PieChart as ChartIcon
} from 'lucide-react';
import { Role } from '../types';

interface SidebarProps {
  role: Role;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activeTab: string;
  setActiveTab: (v: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  role, 
  collapsed, 
  setCollapsed, 
  activeTab, 
  setActiveTab,
  onLogout 
}) => {
  const adminLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: ChartIcon },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'faculty', label: 'Faculty', icon: Users },
    { id: 'mentors', label: 'Mentors', icon: UserSquare2 },
    { id: 'hods', label: 'HODs', icon: Building2 },
    { id: 'placements', label: 'Placements', icon: Briefcase },
    { id: 'events', label: 'Events', icon: Trophy },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'hostel', label: 'Hostel', icon: Building2 },
    { id: 'library', label: 'Library', icon: Library },
  ];

  const hodLinks = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Dept Analytics', icon: ChartIcon },
    { id: 'faculty', label: 'Faculty List', icon: Users },
    { id: 'students', label: 'Student List', icon: GraduationCap },
    { id: 'attendance', label: 'Low Attendance', icon: ClipboardList },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
  ];

  const mentorLinks = [
    { id: 'dashboard', label: 'Class Overview', icon: LayoutDashboard },
    { id: 'attendance', label: 'Daily Attendance', icon: ClipboardList },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'complaints', label: 'Complaints', icon: FileText },
  ];

  const facultyLinks = [
    { id: 'dashboard', label: 'My Classes', icon: Calendar },
    { id: 'timer', label: 'Live Class', icon: Clock },
    { id: 'attendance', label: 'Mark Attendance', icon: ClipboardList },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'quiz', label: 'AI Quiz', icon: Settings },
  ];

  const studentLinks = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'placements', label: 'Placements', icon: Briefcase },
    { id: 'events', label: 'Events', icon: Trophy },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'quiz', label: 'Enter Quiz', icon: Settings },
    { id: 'fees', label: 'Fee Details', icon: FileText },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'profile', label: 'My Profile', icon: UserSquare2 },
  ];

  const links = {
    Admin: adminLinks,
    HOD: hodLinks,
    Mentor: mentorLinks,
    Faculty: facultyLinks,
    Student: studentLinks,
  }[role];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className="fixed left-0 top-0 h-screen bg-header text-white flex flex-col z-40 transition-all duration-300"
    >
      <div className="p-6 flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden shadow-lg">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-p3_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q" 
                  alt="Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/50?text=P";
                  }}
                />
              </div>
              <span className="text-xl font-bold tracking-tight">PVKK IT</span>
            </motion.div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden shadow-lg mx-auto mb-2">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-p3_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q" 
                alt="Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/50?text=P";
                }}
              />
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 hover:bg-white/10 rounded-lg transition-colors ${collapsed ? 'mx-auto' : ''}`}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
              activeTab === link.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <link.icon size={22} />
            {!collapsed && <span className="font-medium">{link.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut size={22} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};
