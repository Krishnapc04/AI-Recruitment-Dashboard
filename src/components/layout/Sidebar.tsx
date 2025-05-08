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
  return (
    <Link to={to} className="block">
      <motion.div
        className={`flex items-center px-4 py-3 rounded-lg mb-1 transition-colors
        ${active 
          ? 'bg-primary-100 text-primary-700' 
          : 'text-secondary-600 hover:bg-secondary-100'
        }`}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{label}</span>
        {active && (
          <motion.div
            layoutId="activeIndicator"
            className="ml-auto w-1.5 h-6 bg-primary-600 rounded-full"
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
    <div className="h-screen bg-white border-r border-secondary-200 w-64 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary-700 flex items-center">
          <Users size={24} className="mr-2 text-primary-600" />
          TalentAI
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
      
      <div className="p-4 border-t border-secondary-200">
        <NavItem
          to="/settings"
          icon={<Settings size={20} />}
          label="Settings"
          active={location.pathname === '/settings'}
        />
        <button
          onClick={logout}
          className="flex items-center px-4 py-3 rounded-lg w-full text-left
            text-secondary-600 hover:bg-secondary-100 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;