import type { User, Task, Message } from '../types';
import { daysFromNow, now } from '../utils/time';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Sarah Chen', role: 'commander', email: 'sarah@example.com' },
  { id: 'u2', name: 'Maria Santos', role: 'helper', email: 'maria@example.com' },
  { id: 'u3', name: 'David Chen', role: 'observer', email: 'david@example.com' },
];

export const mockTasks: Task[] = [
  {
    id: 't1', title: 'Pick up Emma from school', description: 'School ends at 3:30pm. Gate B.',
    assigned_to: 'u2', created_by: 'u1', status: 'pending', priority: 'high',
    due_date: daysFromNow(0).replace('T', 'T15:30:00'), location: "St. Paul's Primary",
    task_type: 'pickup', sla_minutes: 30, created_at: now(),
  },
  {
    id: 't2', title: "Emma's Math Tuition", description: '4:30pm at Learning Centre, TST.',
    assigned_to: 'u2', created_by: 'u1', status: 'pending', priority: 'high',
    due_date: daysFromNow(0).replace('T', 'T16:30:00'), location: 'TST Learning Centre',
    task_type: 'tuition', sla_minutes: 15, created_at: now(),
  },
  {
    id: 't3', title: 'Buy groceries', description: 'Milk, eggs, bread, fruits for dinner.',
    assigned_to: 'u2', created_by: 'u1', status: 'accepted', priority: 'medium',
    due_date: daysFromNow(0).replace('T', 'T17:00:00'), location: 'Wellcome, TST',
    task_type: 'errand', sla_minutes: 60, created_at: now(),
  },
  {
    id: 't4', title: "Jake's Soccer Practice", description: '5:00pm at Kowloon Park.',
    assigned_to: 'u2', created_by: 'u1', status: 'pending', priority: 'medium',
    due_date: daysFromNow(0).replace('T', 'T17:00:00'), location: 'Kowloon Park',
    task_type: 'dropoff', sla_minutes: 30, created_at: now(),
  },
  {
    id: 't5', title: 'Help with homework', description: 'Chinese essay due tomorrow.',
    assigned_to: 'u2', created_by: 'u1', status: 'pending', priority: 'low',
    due_date: daysFromNow(0).replace('T', 'T19:00:00'), location: 'Home',
    task_type: 'homework', sla_minutes: 120, created_at: now(),
  },
  {
    id: 't6', title: 'Prepare dinner', description: 'Chicken soup, rice, vegetables.',
    assigned_to: 'u2', created_by: 'u1', status: 'done', priority: 'medium',
    due_date: daysFromNow(-1).replace('T', 'T18:00:00'), location: 'Home',
    task_type: 'errand', sla_minutes: 60, created_at: now(), completed_at: now(),
  },
];

export const mockMessages: Message[] = [
  { id: 'm1', task_id: 't1', from_user_id: 'u2', text: 'I will be at the school gate by 3:25.', timestamp: now(), read: true },
  { id: 'm2', task_id: 't1', from_user_id: 'u1', text: 'Great, thank you! Emma has her umbrella.', timestamp: now(), read: true },
  { id: 'm3', task_id: 't3', from_user_id: 'u2', text: 'Should I get organic eggs?', timestamp: now(), read: false },
];
