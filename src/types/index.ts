export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: 'open' | 'closed';
  department: string;
  applicants: number;
  postedDate: string;
  deadline?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  jobId: string;
  jobTitle: string;
  stage: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  resume: string;
  skills: string[];
  experience: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  audioUrl?: string;
}

export interface InsightData {
  id: string;
  date: string;
  applicants: number;
  interviews: number;
  offers: number;
  hires: number;
}

export interface SourceData {
  name: string;
  value: number;
}

export interface RoleData {
  name: string;
  count: number;
}