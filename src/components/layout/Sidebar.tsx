import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Briefcase, Users, BarChart2, MessageSquare, Settings, LogOut } from 'lucide-react';
import { useAppStore } from '../../store/store';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
  const activeClasses =
    'bg-blue-100 text-blue-700 dark:bg-gradient-to-r dark:from-pink-500/20 dark:via-violet-500/20 dark:to-yellow-500/20 dark:text-white dark:shadow-[0_0_15px_rgba(236,72,153,0.3)] font-semibold';

  return (
    <Link to={to} className="block">
      <motion.div
        className={`flex items-center px-4 py-3 rounded-lg mb-1 transition-all duration-300
        ${active ? activeClasses : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800/80 dark:hover:shadow-[0_0_10px_rgba(59,130,246,0.1)]'}`}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className={`mr-3 ${active ? 'text-pink-400' : ''}`}>{icon}</span>
        <span className="font-medium">{label}</span>
        {active && (
          <motion.div
            layoutId="activeIndicator"
            className="ml-auto w-1.5 h-6 bg-gradient-to-b from-yellow-400 via-pink-500 to-violet-500 rounded-full dark:shadow-[0_0_10px_rgba(236,72,153,0.4)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const logout = useAppStore((state) => state.logout);
  
  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/jobs', icon: <Briefcase size={20} />, label: 'Jobs' },
    { to: '/candidates', icon: <Users size={20} />, label: 'Candidates' },
    { to: '/insights', icon: <BarChart2 size={20} />, label: 'Insights' },
    { to: '/chatbot', icon: <MessageSquare size={20} />, label: 'Chatbot' },
  ];
  
  return (
    <div className="h-screen bg-white dark:bg-black border-r border-secondary-200 dark:border-secondary-700/50 w-64 flex flex-col dark:shadow-[0_0_15px_rgba(236,72,153,0.1)]">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary-700 dark:text-white flex items-center">
          <Users size={24} className="mr-2 text-primary-600 dark:text-pink-400" />
          Dokkaabi
        </h1>
      </div>
      
      <nav className="mt-6 flex-1 px-2">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.to}
          />
        ))}
      </nav>
      
      <div className="p-4 border-t border-secondary-200 dark:border-secondary-700/50">
        <NavItem
          to="/settings"
          icon={<Settings size={20} />}
          label="Settings"
          active={location.pathname === '/settings'}
        />
        <button
          onClick={logout}
          className="flex items-center px-4 py-3 rounded-lg w-full text-left
            text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800/80 transition-all duration-300 dark:hover:shadow-[0_0_10px_rgba(236,72,153,0.1)]"
        >
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;