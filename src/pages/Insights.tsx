import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  ArrowUpRight,
  TrendingUp,
  Users,
  Calendar,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppStore } from '../store/store';

const COLORS = ['#3b82f6', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'];

const Insights: React.FC = () => {
  const { insightData, sourceData, roleData } = useAppStore();
  const [timeframe, setTimeframe] = useState('4m'); // 1m, 3m, 4m, 1y
  
  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Insights</h1>
          <p className="text-secondary-600">Analytics and metrics about your recruitment process</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white border border-secondary-200 rounded-lg p-1">
            {['1m', '3m', '4m', '1y'].map((option) => (
              <button
                key={option}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeframe === option
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-600 hover:bg-secondary-50'
                }`}
                onClick={() => setTimeframe(option)}
              >
                {option}
              </button>
            ))}
          </div>
          
          <Button variant="outline" icon={<Download size={16} />}>
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-secondary-500">Total Applications</h3>
              <span className="flex items-center text-xs font-medium text-success-500">
                <ArrowUpRight size={14} />
                12%
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">670</span>
              <span className="ml-2 text-secondary-500">applications</span>
            </div>
            <div className="mt-4 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={insightData}>
                  <defs>
                    <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="applicants" stroke="#3b82f6" fillOpacity={1} fill="url(#colorApplicants)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-secondary-500">Conversion Rate</h3>
              <span className="flex items-center text-xs font-medium text-success-500">
                <ArrowUpRight size={14} />
                5%
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">18.5%</span>
              <span className="ml-2 text-secondary-500">applications to hire</span>
            </div>
            <div className="mt-4 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={insightData}>
                  <defs>
                    <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="hires" stroke="#14b8a6" fillOpacity={1} fill="url(#colorHires)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-secondary-500">Time to Hire</h3>
              <span className="flex items-center text-xs font-medium text-error-500">
                <ArrowUpRight size={14} />
                3%
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">24</span>
              <span className="ml-2 text-secondary-500">days average</span>
            </div>
            <div className="mt-4 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={insightData}>
                  <defs>
                    <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="interviews" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTime)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center">
              <TrendingUp size={18} className="mr-2 text-primary-600" />
              Application Funnel
            </h2>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Applications', value: 670 },
                  { name: 'Screening', value: 420 },
                  { name: 'Interview', value: 230 },
                  { name: 'Offer', value: 180 },
                  { name: 'Hired', value: 120 },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center">
              <Calendar size={18} className="mr-2 text-primary-600" />
              Applications Over Time
            </h2>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={insightData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorApplicants2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="applicants" name="Applications" stroke="#3b82f6" fillOpacity={1} fill="url(#colorApplicants2)" />
                <Area type="monotone" dataKey="interviews" name="Interviews" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorInterviews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center">
              <BarChart2 size={18} className="mr-2 text-primary-600" />
              Popular Roles
            </h2>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roleData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Applicants" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center">
              <Users size={18} className="mr-2 text-primary-600" />
              Sourcing Channels
            </h2>
          </div>
          
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Insights;