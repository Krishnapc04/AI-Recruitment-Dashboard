import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAppStore } from '../store/store';

const Jobs: React.FC = () => {
  const { jobs, filteredJobs, filterJobs } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  useEffect(() => {
    filterJobs(searchQuery, selectedStatuses);
  }, [searchQuery, selectedStatuses, filterJobs]);
  
  const handleStatusFilter = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };
  
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Job Listings</h1>
          <p className="text-secondary-600">Manage your open positions and track applicants</p>
        </div>
        <Button icon={<Plus size={18} />}>
          Create New Job
        </Button>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
            <input
              type="text"
              placeholder="Search jobs by title, location, or department..."
              className="pl-10 pr-4 py-2 w-full bg-white border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={18} className="mr-2 text-secondary-500" />
              <span className="text-secondary-700 text-sm font-medium">Status:</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedStatuses.includes('open')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
                onClick={() => handleStatusFilter('open')}
              >
                Open
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedStatuses.includes('closed')
                    ? 'bg-red-100 text-red-800'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
                onClick={() => handleStatusFilter('closed')}
              >
                Closed
              </button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6" clickable>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-secondary-900 dark:text-white">{job.title}</h2>
                    <p className="text-secondary-600 mt-1">{job.department} · {job.location}</p>
                  </div>
                  <Badge
                    variant={job.status === 'open' ? 'success' : 'error'}
                    className="capitalize"
                  >
                    {job.status}
                  </Badge>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-secondary-500">
                  <Calendar size={16} className="mr-1" />
                  <span>Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
                  {job.deadline && (
                    <span className="ml-4">
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium">
                      {job.applicants} applicants
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button size="sm">
                      View Applicants
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 p-8 text-center">
            <div className="text-secondary-400 mb-2">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900">No jobs found</h3>
            <p className="text-secondary-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;