import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md dark:focus:ring-offset-black';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 dark:bg-gradient-to-r dark:from-yellow-500 dark:via-pink-500 dark:to-violet-500 dark:hover:from-yellow-400 dark:hover:via-pink-400 dark:hover:to-violet-400 dark:shadow-[0_0_15px_rgba(236,72,153,0.3)]',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 dark:bg-secondary-500 dark:hover:bg-secondary-400 dark:shadow-[0_0_15px_rgba(100,116,139,0.3)]',
    outline: 'border border-secondary-300 dark:border-secondary-600 bg-transparent text-secondary-700 dark:text-white hover:bg-secondary-50 dark:hover:bg-secondary-800/80 focus:ring-secondary-500 dark:shadow-[0_0_15px_rgba(236,72,153,0.1)]',
    ghost: 'bg-transparent text-secondary-700 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800/80 focus:ring-secondary-500',
    success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500 dark:bg-success-600 dark:hover:bg-success-500 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    error: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500 dark:bg-error-600 dark:hover:bg-error-500 dark:shadow-[0_0_15px_rgba(239,68,68,0.3)]',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed dark:shadow-none';
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled || isLoading ? disabledClasses : ''}
    ${className}
  `;
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;