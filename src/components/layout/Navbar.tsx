import React, { useEffect } from 'react';
import { Bell, Search, UserCircle, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/store';

const Navbar: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    // Check if user has a dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <header className="bg-white dark:bg-black border-b border-secondary-200 dark:border-secondary-700/50 h-16 flex items-center px-6 dark:shadow-[0_0_15px_rgba(236,72,153,0.1)]">
      <div className="w-full flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 dark:text-pink-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-secondary-50 dark:bg-secondary-900/80 border border-secondary-200 dark:border-secondary-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-400 dark:shadow-[0_0_10px_rgba(236,72,153,0.1)]"
          />
        </div>
        
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="mr-6 p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-900/80 transition-all duration-300 dark:shadow-[0_0_10px_rgba(236,72,153,0.1)]"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-secondary-600 dark:text-pink-400" />
            ) : (
              <Moon size={20} className="text-secondary-600 dark:text-pink-400" />
            )}
          </button>

          <motion.div
            className="relative mr-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Bell size={20} className="text-secondary-600 dark:text-pink-400" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-violet-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs dark:shadow-[0_0_10px_rgba(236,72,153,0.3)]">
              3
            </span>
          </motion.div>
          
          <div className="flex items-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover mr-2 dark:shadow-[0_0_10px_rgba(236,72,153,0.2)]"
              />
            ) : (
              <UserCircle size={24} className="mr-2 text-secondary-500 dark:text-pink-400" />
            )}
            <div>
              <p className="text-sm font-medium text-secondary-900 dark:text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-secondary-500 dark:text-pink-400/80">{user?.role || 'Role'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;