import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoginPage } from './LoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SplashScreen } from './components/SplashScreen';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { HODDashboard } from './dashboards/HODDashboard';
import { MentorDashboard } from './dashboards/MentorDashboard';
import { FacultyDashboard } from './dashboards/FacultyDashboard';
import { StudentDashboard } from './dashboards/StudentDashboard';
import { Role, User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (role: Role) => {
    const mockUser: User = {
      id: '1',
      name: role === 'Student' ? 'John Doe' : role === 'Admin' ? 'Super Admin' : `Prof. ${role} User`,
      email: `${role.toLowerCase()}@pvkk.edu`,
      role: role,
      department: role === 'Admin' ? undefined : 'CSE',
    };
    setUser(mockUser);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'Admin':
        return <AdminDashboard activeTab={activeTab} />;
      case 'HOD':
        return <HODDashboard user={user} activeTab={activeTab} />;
      case 'Mentor':
        return <MentorDashboard user={user} activeTab={activeTab} />;
      case 'Faculty':
        return <FacultyDashboard user={user} activeTab={activeTab} />;
      case 'Student':
        return <StudentDashboard user={user} activeTab={activeTab} />;
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-bg flex">
      <Sidebar 
        role={user.role} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      
      <main 
        className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-[260px]'}`}
      >
        <Header user={user} />
        
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderDashboard()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Notifications / Banners */}
      {user.role === 'Mentor' && (
        <div className="fixed bottom-8 right-8 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-header text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold">Parent Notified Successfully</span>
          </motion.div>
        </div>
      )}
    </div>
    </>
  );
}
