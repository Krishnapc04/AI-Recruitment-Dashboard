import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Clock, CheckCircle, BarChart, Layers } from 'lucide-react';
import Card from '../components/ui/Card';
import { useAppStore } from '../store/store';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  change?: string;
  positive?: boolean;
}> = ({ title, value, icon, color, change, positive }) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-secondary-500 text-sm font-medium">{title}</p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
          {change && (
            <div className="mt-2 flex items-center">
              <span className={`text-xs font-medium ${positive ? 'text-success-500' : 'text-error-500'}`}>
                {positive ? '↑' : '↓'} {change}
              </span>
              <span className="text-xs text-secondary-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const { jobs, candidates, user } = useAppStore();
  
  const openJobs = jobs.filter(job => job.status === 'open').length;
  const totalCandidates = candidates.length;
  const inInterview = candidates.filter(c => c.stage === 'interview').length;
  const completedHires = candidates.filter(c => c.stage === 'hired').length;
  
  const recentCandidates = candidates.slice(0, 5);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Welcome back, {user?.name.split(' ')[0] || 'Recruiter'}!</h1>
          <p className="text-secondary-600">Here's what's happening with your recruitment today.</p>
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <Layers size={18} className="mr-2" />
            Weekly Report
          </motion.button>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <StatCard
            title="Open Positions"
            value={openJobs}
            icon={<Briefcase size={24} className="text-primary-600" />}
            color="bg-primary-100"
            change="12%"
            positive={true}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="Total Candidates"
            value={totalCandidates}
            icon={<Users size={24} className="text-secondary-600" />}
            color="bg-secondary-100"
            change="8%"
            positive={true}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="In Interview Stage"
            value={inInterview}
            icon={<Clock size={24} className="text-accent-600" />}
            color="bg-accent-100"
            change="5%"
            positive={true}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="Completed Hires"
            value={completedHires}
            icon={<CheckCircle size={24} className="text-success-500" />}
            color="bg-green-100"
            change="3%"
            positive={true}
          />
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Candidates</h2>
            <Link to="/candidates" className="text-primary-600 text-sm hover:underline">View all</Link>
          </div>
          
          <div className="space-y-4">
            {recentCandidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center p-3 hover:bg-secondary-50 rounded-lg transition-colors">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="h-10 w-10 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-secondary-900">{candidate.name}</h3>
                  <p className="text-sm text-secondary-500">{candidate.jobTitle}</p>
                </div>
                <div>
                  <div className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${candidate.stage === 'applied' ? 'bg-secondary-100 text-secondary-800' : ''}
                    ${candidate.stage === 'screening' ? 'bg-blue-100 text-blue-800' : ''}
                    ${candidate.stage === 'interview' ? 'bg-accent-100 text-accent-800' : ''}
                    ${candidate.stage === 'offer' ? 'bg-purple-100 text-purple-800' : ''}
                    ${candidate.stage === 'hired' ? 'bg-green-100 text-green-800' : ''}
                    ${candidate.stage === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {candidate.stage.charAt(0).toUpperCase() + candidate.stage.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            <button className="text-primary-600 text-sm hover:underline">View all</button>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 border border-secondary-200 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">Review Applications</p>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Today</span>
              </div>
              <p className="text-sm text-secondary-500 mt-1">5 applications for Senior Frontend Developer</p>
            </div>
            
            <div className="p-3 border border-secondary-200 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">Schedule Interviews</p>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Tomorrow</span>
              </div>
              <p className="text-sm text-secondary-500 mt-1">3 candidates for Data Scientist role</p>
            </div>
            
            <div className="p-3 border border-secondary-200 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">Send Offer Letter</p>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">May 5</span>
              </div>
              <p className="text-sm text-secondary-500 mt-1">Samantha Lee - Product Manager</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full flex items-center justify-center py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
              <Clock size={16} className="mr-2" />
              Schedule New Task
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;