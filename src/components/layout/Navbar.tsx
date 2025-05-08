import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/store';

const Navbar: React.FC = () => {
  const user = useAppStore((state) => state.user);
  
  return (
    <header className="bg-white border-b border-secondary-200 h-16 flex items-center px-6">
      <div className="w-full flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-secondary-50 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center">
          <motion.div
            className="relative mr-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Bell size={20} className="text-secondary-600" />
            <span className="absolute -top-1 -right-1 bg-primary-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              3
            </span>
          </motion.div>
          
          <div className="flex items-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover mr-2"
              />
            ) : (
              <UserCircle size={24} className="mr-2 text-secondary-500" />
            )}
            <div>
              <p className="text-sm font-medium text-secondary-900">{user?.name || 'User'}</p>
              <p className="text-xs text-secondary-500">{user?.role || 'Role'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;