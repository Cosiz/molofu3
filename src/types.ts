export type UserRole = 'commander' | 'helper' | 'observer';

export type TaskStatus = 'pending' | 'accepted' | 'in_progress' | 'arrived' | 'done';

export type TaskType = 'pickup' | 'dropoff' | 'homework' | 'errand' | 'tuition' | 'meal' | 'shopping';

export type Priority = 'high' | 'medium' | 'low';

export type EscalationReason = 'overdue' | 'no_response' | 'gps_lost';

export type EscalationSeverity = 'warning' | 'critical';

export interface GeoPoint {
  lat: number;
  lng: number;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  created_by: string;
  status: TaskStatus;
  priority: Priority;
  due_date: string;
  location?: string;
  task_type: TaskType;
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
  reason: EscalationReason;
  severity: EscalationSeverity;
  resolved: boolean;
}

export interface Settings {
  notifications: {
    push: boolean;
    sound: boolean;
    email: boolean;
  };
  escalation: {
    pickup_sla: number;
    dropoff_sla: number;
    homework_sla: number;
    errand_sla: number;
    tuition_sla: number;
    meal_sla: number;
    shopping_sla: number;
  };
}

export interface OnboardingData {
  commanderName: string;
  helperName: string;
  helperPhone: string;
  children: string[];
  defaultPickup: string;
  defaultDropoff: string;
  notificationsEnabled: boolean;
}
