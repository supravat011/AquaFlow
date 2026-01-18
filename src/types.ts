export enum UserRole {
  CONSUMER = 'CONSUMER',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface SupplySchedule {
  id: string;
  zone: string;
  morningSlot: string;
  eveningSlot: string;
  status: 'On Time' | 'Delayed' | 'Maintenance';
}

export interface BillRecord {
  month: string;
  usage: number; // in Liters
  amount: number; // in Currency
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Complaint {
  id: string;
  category: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}