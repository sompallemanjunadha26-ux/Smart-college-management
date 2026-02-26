import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, title, subtitle, className = '', onClick }) => {
  return (
    <motion.div
      whileHover={onClick ? { y: -4 } : {}}
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg p-6 border border-slate-100 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-header">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </motion.div>
  );
};
