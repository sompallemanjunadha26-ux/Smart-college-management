import React, { useState } from 'react';
import { Bell, Search, User, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { User as UserType, Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../mockData';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  user: UserType;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const searchResults = searchQuery.length > 2 ? [
    { id: '1', title: 'Manjunadha Sompalle', type: 'Student', rollNo: '21A91A0501', dept: 'CSE' },
    { id: '2', title: 'Prof. John Doe', type: 'Faculty', rollNo: 'F101', dept: 'ECE' },
    { id: '3', title: 'Data Structures Lab', type: 'Room', rollNo: 'L-101', dept: 'CSE' },
  ].filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.rollNo.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="relative">
        <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-xl w-96 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Global Smart Search (Students, Faculty, Roll No...)" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(e.target.value.length > 2);
            }}
            onFocus={() => searchQuery.length > 2 && setShowSearchResults(true)}
            className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
          />
        </div>

        <AnimatePresence>
          {showSearchResults && searchResults.length > 0 && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowSearchResults(false)} />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Search Results</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {searchResults.map((res) => (
                    <div key={res.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-none flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-header">{res.title}</p>
                        <p className="text-xs text-slate-500">{res.type} • {res.rollNo} • {res.dept}</p>
                      </div>
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                        <User size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Bell size={22} className="text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-bold text-header">Notifications</h3>
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div 
                          key={n.id} 
                          className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!n.read ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            n.type === 'alert' ? 'bg-red-100 text-red-600' : 
                            n.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {n.type === 'alert' ? <AlertCircle size={18} /> : 
                             n.type === 'success' ? <CheckCircle size={18} /> : 
                             <Info size={18} />}
                          </div>
                          <div className="space-y-1">
                            <p className={`text-sm leading-tight ${!n.read ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                              {n.title}
                            </p>
                            <p className="text-xs text-slate-500 line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{n.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400">
                        <Bell size={32} className="mx-auto mb-2 opacity-20" />
                        <p className="text-sm">No new notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center border-t border-slate-100">
                    <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-header">{user.name}</p>
            <p className="text-xs text-slate-500 font-medium">{user.role} {user.department ? `• ${user.department}` : ''}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};
