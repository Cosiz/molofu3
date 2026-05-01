export interface User {
  id: string;
  name: string;
  role: 'commander' | 'helper' | 'observer';
  email: string;
  avatar?: string;
  phone?: string;
}

export interface GeoPoint {
  lat: number;
  lng: number;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  created_by: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'arrived' | 'done';
  priority: 'high' | 'medium' | 'low';
  due_date: string;
  location?: string;
  task_type: 'pickup' | 'dropoff' | 'homework' | 'errand' | 'tuition';
  sla_minutes: number;
  created_at: string;
  completed_at?: string;
  gps_log?: GeoPoint[];
}

export interface Message {
  id: string;
  task_id: string;
  from_user_id: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Escalation {
  id: string;
  task_id: string;
  triggered_at: string;
  reason: 'overdue' | 'no_response' | 'gps_lost';
  severity: 'warning' | 'critical';
  resolved: boolean;
}
