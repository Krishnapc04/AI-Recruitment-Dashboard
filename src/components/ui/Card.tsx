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
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-secondary-200 overflow-hidden';
  const clickableClasses = clickable 
    ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' 
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
      {children}
    </motion.div>
  );
};

export default Card;