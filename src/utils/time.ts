import type { Task } from '../types';

export const now = () => new Date().toISOString();

export const todayStr = () => new Date().toISOString().split('T')[0];

export const formatTime = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-HK', { hour: '2-digit', minute: '2-digit', hour12: true });
};

export const formatDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-HK', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const isOverdue = (task: Task) => {
  return new Date() > new Date(task.due_date) && task.status !== 'done';
};

export const daysFromNow = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

export const getDayName = (date: Date) => date.toLocaleDateString('en-HK', { weekday: 'short' });
export const getDayNum = (date: Date) => date.getDate();
