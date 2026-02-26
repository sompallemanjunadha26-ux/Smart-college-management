import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  User,
  ArrowRight
} from 'lucide-react';
import { Role } from './types';

interface LoginPageProps {
  onLogin: (role: Role) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const portals = [
    {
      role: 'Admin' as Role,
      title: 'Admin Portal',
      description: 'Full system access, manage all departments, students, faculty & resources.',
      icon: ShieldCheck,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      role: 'HOD' as Role,
      title: 'HOD Portal',
      description: 'Department head — monitor faculty, students & complaints.',
      icon: Users,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700'
    },
    {
      role: 'Mentor' as Role,
      title: 'Mentor Portal',
      description: 'Class mentor — track attendance, guide students, handle complaints.',
      icon: BookOpen,
      color: 'bg-emerald-600',
      hoverColor: 'hover:bg-emerald-700'
    },
    {
      role: 'Faculty' as Role,
      title: 'Faculty Portal',
      description: 'Manage classes, attendance, announcements & AI-powered quizzes.',
      icon: User,
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700'
    },
    {
      role: 'Student' as Role,
      title: 'Student Portal',
      description: 'View attendance, results, fee details, timetable & more.',
      icon: GraduationCap,
      color: 'bg-pink-600',
      hoverColor: 'hover:bg-pink-700'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center py-16 px-6 overflow-y-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 flex flex-col items-center"
      >
        <div className="w-32 h-32 bg-white rounded-full p-2 shadow-xl mb-6 flex items-center justify-center overflow-hidden">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-p3_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q" 
            alt="PVKK IT Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150?text=PVKK+IT";
            }}
          />
        </div>
        <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
          PVKK Institute of Technology
        </h1>
        <p className="text-slate-400 text-xl font-medium">
          Digital College Management System
        </p>
        
        <div className="mt-8">
          <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-slate-300 text-sm font-semibold backdrop-blur-sm">
            Select your portal to continue
          </span>
        </div>
      </motion.div>

      {/* Portals Grid */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal, index) => (
            <motion.div
              key={portal.role}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md flex flex-col justify-between group cursor-pointer hover:bg-white/[0.08] transition-all"
              onClick={() => onLogin(portal.role)}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 ${portal.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <portal.icon size={28} className="text-white" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-900 transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  {portal.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  {portal.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button 
                  className="text-orange-400 font-bold flex items-center gap-2 group-hover:text-orange-300 transition-colors"
                >
                  Login as {portal.role} <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-slate-500 text-sm"
      >
        © 2024 PVKK Institute of Technology • SmartClass v2.0
      </motion.p>
    </div>
  );
};
