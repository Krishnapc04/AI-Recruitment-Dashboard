import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, User, Mail, Phone, MapPin, Calendar, FileText, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppStore } from '../store/store';
import Badge from '../components/ui/Badge';

const Candidates: React.FC = () => {
  const { candidates, filteredCandidates, filterCandidates } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  
  useEffect(() => {
    filterCandidates(searchQuery, selectedStages);
  }, [searchQuery, selectedStages, filterCandidates]);
  
  const handleStageFilter = (stage: string) => {
    if (selectedStages.includes(stage)) {
      setSelectedStages(selectedStages.filter(s => s !== stage));
    } else {
      setSelectedStages([...selectedStages, stage]);
    }
  };
  
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'applied': return 'bg-secondary-100 text-secondary-800';
      case 'screening': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-accent-100 text-accent-800';
      case 'offer': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-secondary-100 text-secondary-800';
    }
  };
  
  const candidate = candidates.find(c => c.id === selectedCandidate);
  
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Candidates</h1>
          <p className="text-secondary-600">Manage and track candidate applications</p>
        </div>
        <Button icon={<User size={18} />}>
          Add Candidate
        </Button>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
            <input
              type="text"
              placeholder="Search candidates by name, role, or location..."
              className="pl-10 pr-4 py-2 w-full bg-white border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={18} className="mr-2 text-secondary-500" />
              <span className="text-secondary-700 text-sm font-medium">Stage:</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'].map((stage) => (
                <button
                  key={stage}
                  className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                    selectedStages.includes(stage)
                      ? getStageColor(stage)
                      : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                  }`}
                  onClick={() => handleStageFilter(stage)}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {filteredCandidates.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05 }}
            >
              {filteredCandidates.map((candidate) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className={`p-4 ${selectedCandidate === candidate.id ? 'border-primary-500 ring-1 ring-primary-500' : ''}`}
                    clickable
                    onClick={() => setSelectedCandidate(candidate.id)}
                  >
                    <div className="flex items-center">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-secondary-900 dark:text-white">{candidate.name}</h3>
                        <p className="text-sm text-secondary-500">{candidate.jobTitle}</p>
                        <div className="mt-1 flex items-center text-xs text-secondary-500">
                          <MapPin size={12} className="mr-1" />
                          <span>{candidate.location}</span>
                          <span className="mx-2">•</span>
                          <Calendar size={12} className="mr-1" />
                          <span>Applied {new Date(candidate.appliedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <div className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getStageColor(candidate.stage)}`}>
                          {candidate.stage}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-secondary-400 mb-2">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-secondary-900">No candidates found</h3>
              <p className="text-secondary-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
        
        <div>
          <AnimatePresence mode="wait">
            {selectedCandidate && candidate ? (
              <motion.div
                key={selectedCandidate}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 sticky top-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Candidate Details</h2>
                    <button
                      onClick={() => setSelectedCandidate(null)}
                      className="text-secondary-500 hover:text-secondary-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="text-center mb-6">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="h-24 w-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white">{candidate.name}</h3>
                    <p className="text-secondary-600">{candidate.jobTitle}</p>
                    <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize mt-2 ${getStageColor(candidate.stage)}`}>
                      {candidate.stage}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail size={18} className="text-secondary-500 mr-3" />
                      <div>
                        <p className="text-sm text-secondary-500">Email</p>
                        <p className="font-medium text-secondary-900 dark:text-white">{candidate.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone size={18} className="text-secondary-500 mr-3" />
                      <div>
                        <p className="text-sm text-secondary-500">Phone</p>
                        <p className="font-medium text-secondary-900 dark:text-white">{candidate.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin size={18} className="text-secondary-500 mr-3" />
                      <div>
                        <p className="text-sm text-secondary-500">Location</p>
                        <p className="font-medium text-secondary-900 dark:text-white">{candidate.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar size={18} className="text-secondary-500 mr-3" />
                      <div>
                        <p className="text-sm text-secondary-500">Applied Date</p>
                        <p className="font-medium text-secondary-900 dark:text-white">{new Date(candidate.appliedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock size={18} className="text-secondary-500 mr-3" />
                      <div>
                        <p className="text-sm text-secondary-500">Experience</p>
                        <p className="font-medium text-secondary-900 dark:text-white">{candidate.experience} years</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FileText size={18} className="text-secondary-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-secondary-500">Skills</p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {candidate.skills.map((skill, index) => (
                            <Badge key={index} variant="primary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full">
                      Schedule Interview
                    </Button>
                    <Button variant="outline" className="w-full">
                      Send Email
                    </Button>
                    <Button variant="ghost" className="w-full" icon={<FileText size={16} />}>
                      View Resume
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="p-6 text-center">
                  <User size={48} className="mx-auto text-secondary-300 mb-4" />
                  <h3 className="text-lg font-medium text-secondary-800">No candidate selected</h3>
                  <p className="text-secondary-600 mt-1">
                    Select a candidate from the list to view their details
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Candidates;