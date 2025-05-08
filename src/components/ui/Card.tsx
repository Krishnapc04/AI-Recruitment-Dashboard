import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  clickable = false,
  onClick,
}) => {
  const baseClasses = 'bg-white dark:bg-[#18181b] rounded-lg shadow-sm border border-secondary-200 dark:border-secondary-800 overflow-hidden relative dark:shadow-[0_2px_16px_rgba(0,0,0,0.45)] transition-all duration-300';
  const clickableClasses = clickable 
    ? 'cursor-pointer transition-all duration-300 hover:shadow-md dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.65)]' 
    : '';
  
  return (
    <motion.div
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      whileHover={clickable ? { scale: 1.02 } : {}}
      whileTap={clickable ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-10 text-white">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;