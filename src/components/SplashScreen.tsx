import React from 'react';
import { motion } from 'motion/react';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#0f172a] z-[100] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut"
        }}
        className="flex flex-col items-center"
      >
        <div className="w-48 h-48 bg-white rounded-full p-4 shadow-2xl shadow-orange-500/20 mb-8 flex items-center justify-center overflow-hidden">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-p3_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q_p_q" 
            alt="PVKK IT Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback if the image fails to load
              e.currentTarget.src = "https://via.placeholder.com/200?text=PVKK+IT";
            }}
          />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-black text-white tracking-tight text-center"
        >
          PVKK Institute of Technology
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 1.5 }}
          className="h-1 bg-orange-500 mt-4 rounded-full w-48"
        />
      </motion.div>
    </div>
  );
};
