import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Users, User, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const referrals = [
  {
    id: 1,
    candidate: 'Emily Davis',
    candidateId: '4',
    referredBy: 'Alex Johnson',
    date: '2024-05-01',
    status: 'Accepted',
  },
  {
    id: 2,
    candidate: 'Michael Chen',
    candidateId: '3',
    referredBy: 'Samantha Lee',
    date: '2024-04-28',
    status: 'Pending',
  },
  {
    id: 3,
    candidate: 'Olivia Martinez',
    candidateId: '6',
    referredBy: 'David Wilson',
    date: '2024-04-20',
    status: 'Rejected',
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Accepted': return 'success';
    case 'Pending': return 'warning';
    case 'Rejected': return 'error';
    default: return 'default';
  }
};

const Referral: React.FC = () => {
  const navigate = useNavigate();
  const handleCardClick = (candidateId: string) => {
    navigate('/candidates', { state: { candidateId } });
  };

  return (
    <div className="h-full p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white flex items-center">
          <Users size={28} className="mr-2 text-primary-600 dark:text-pink-400" />
          Referrals
        </h1>
        <div className="flex items-center space-x-4">
          <div className="bg-primary-100 text-primary-800 rounded-full px-4 py-2 text-sm font-medium">
            Total Referrals: {referrals.length}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {referrals.map((ref) => (
          <Card key={ref.id} className="p-6 cursor-pointer" onClick={() => handleCardClick(ref.candidateId)}>
            <div className="flex items-center mb-4">
              <User className="text-primary-600 dark:text-pink-400 mr-3" size={32} />
              <div>
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">{ref.candidate}</h2>
                <p className="text-sm text-secondary-500">Candidate</p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-secondary-500 mr-2">Referred by:</span>
              <span className="font-medium text-secondary-900 dark:text-white">{ref.referredBy}</span>
            </div>
            <div className="flex items-center mb-2">
              <Calendar size={16} className="text-secondary-400 mr-2" />
              <span className="text-sm text-secondary-500">{new Date(ref.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center mt-4">
              <Badge variant={statusColor(ref.status)}>
                {ref.status === 'Accepted' && <CheckCircle size={14} className="inline mr-1 text-success-500" />}
                {ref.status === 'Pending' && <Clock size={14} className="inline mr-1 text-warning-500" />}
                {ref.status === 'Rejected' && <Clock size={14} className="inline mr-1 text-error-500" />}
                {ref.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Referral; 