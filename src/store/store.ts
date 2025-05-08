import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Job, 
  Candidate, 
  ChatMessage, 
  InsightData, 
  SourceData, 
  RoleData, 
  User 
} from '../types';
import { 
  jobs as mockJobs, 
  candidates as mockCandidates, 
  insightData as mockInsightData,
  sourceData as mockSourceData,
  roleData as mockRoleData,
  chatMessages as mockChatMessages
} from '../data/mockData';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  
  // Jobs
  jobs: Job[];
  filteredJobs: Job[];
  filterJobs: (query: string, statuses: string[]) => void;
  
  // Candidates
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  filterCandidates: (query: string, stages: string[]) => void;
  
  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  
  // Insights
  insightData: InsightData[];
  sourceData: SourceData[];
  roleData: RoleData[];
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        // Mock login functionality
        if (email && password) {
          set({
            user: {
              id: '1',
              name: 'Sarah Thompson',
              email: email,
              avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
              role: 'Talent Acquisition Manager',
            },
            isAuthenticated: true,
          });
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Jobs
      jobs: mockJobs,
      filteredJobs: mockJobs,
      filterJobs: (query, statuses) => {
        const jobs = get().jobs;
        const filtered = jobs.filter((job) => {
          const matchesQuery = !query || 
            job.title.toLowerCase().includes(query.toLowerCase()) || 
            job.location.toLowerCase().includes(query.toLowerCase()) ||
            job.department.toLowerCase().includes(query.toLowerCase());
          
          const matchesStatus = !statuses.length || 
            statuses.includes(job.status);
          
          return matchesQuery && matchesStatus;
        });
        
        set({ filteredJobs: filtered });
      },
      
      // Candidates
      candidates: mockCandidates,
      filteredCandidates: mockCandidates,
      filterCandidates: (query, stages) => {
        const candidates = get().candidates;
        const filtered = candidates.filter((candidate) => {
          const matchesQuery = !query || 
            candidate.name.toLowerCase().includes(query.toLowerCase()) || 
            candidate.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
            candidate.location.toLowerCase().includes(query.toLowerCase());
          
          const matchesStage = !stages.length || 
            stages.includes(candidate.stage);
          
          return matchesQuery && matchesStage;
        });
        
        set({ filteredCandidates: filtered });
      },
      
      // Chat
      chatMessages: mockChatMessages,
      addChatMessage: (message) => {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          content: message.content,
          sender: message.sender,
          timestamp: new Date().toISOString(),
          audioUrl: message.audioUrl,
        };
        
        set({ chatMessages: [...get().chatMessages, newMessage] });
      },
      
      // Insights
      insightData: mockInsightData,
      sourceData: mockSourceData,
      roleData: mockRoleData,
    }),
    {
      name: 'ai-recruitment-store',
      // Only persist certain parts of the state
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);