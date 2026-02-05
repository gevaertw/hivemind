// Types for the Hivemind application

export interface Profile {
  id: string;
  name: string;
  role: string;
  department: string;
  description: string;
  avatar?: string;
}

export interface CustomerEvent {
  id: string;
  customerId: string;
  customerName: string;
  type: 'email' | 'call' | 'meeting' | 'ticket' | 'purchase' | 'feedback' | 'social';
  title: string;
  description: string;
  timestamp: Date;
  source: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  priority?: 'low' | 'medium' | 'high';
  metadata?: Record<string, unknown>;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  industry: string;
  status: 'active' | 'at-risk' | 'churned' | 'prospect';
  healthScore: number;
  lastContact: Date;
  totalRevenue: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PeriodOption {
  value: string;
  label: string;
  days: number;
}

export const PERIOD_OPTIONS: PeriodOption[] = [
  { value: '1d', label: 'Last 24 hours', days: 1 },
  { value: '7d', label: 'Last 7 days', days: 7 },
  { value: '14d', label: 'Last 2 weeks', days: 14 },
  { value: '30d', label: 'Last 30 days', days: 30 },
  { value: '90d', label: 'Last 3 months', days: 90 },
  { value: '365d', label: 'Last year', days: 365 },
  { value: 'all', label: 'All time', days: 9999 },
];
