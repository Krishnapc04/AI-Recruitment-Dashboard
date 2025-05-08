import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-secondary-100 dark:bg-secondary-800/80 text-secondary-800 dark:text-white dark:shadow-[0_0_10px_rgba(236,72,153,0.2)]',
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-white dark:shadow-[0_0_10px_rgba(236,72,153,0.2)]',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-white dark:shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-white dark:shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-white dark:shadow-[0_0_10px_rgba(239,68,68,0.2)]',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-white dark:shadow-[0_0_10px_rgba(59,130,246,0.2)]',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;