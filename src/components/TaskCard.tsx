import React from 'react';
import { theme } from '../theme';
import type { Task } from '../types';

const priorityColors: Record<string, string> = { high: theme.colors.danger, medium: theme.colors.warning, low: theme.colors.info };
const statusColors: Record<string, string> = { pending: theme.colors.warning, accepted: theme.colors.info, in_progress: theme.colors.primary, arrived: theme.colors.success, done: theme.colors.success };
const typeIcons: Record<string, string> = { pickup: '🚗', dropoff: '📍', homework: '📚', errand: '🛒', tuition: '🎓' };

interface TaskCardProps { task: Task; onPress?: () => void; compact?: boolean; }

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, compact }) => (
  <div onClick={onPress} style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: compact ? 12 : 16, boxShadow: theme.shadows.card, borderLeft: `4px solid ${priorityColors[task.priority] || theme.colors.border}`, cursor: onPress ? 'pointer' : 'default', marginBottom: 8, opacity: task.status === 'done' ? 0.6 : 1 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20 }}>{typeIcons[task.task_type] || '📋'}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: theme.colors.textPrimary }}>{task.title}</span>
      </div>
      <span style={{ background: priorityColors[task.priority], color: '#fff', padding: '2px 8px', borderRadius: theme.borderRadius.pill, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>{task.priority}</span>
    </div>
    {!compact && <div style={{ fontSize: 13, color: theme.colors.textSecondary, marginBottom: 8 }}>{task.description}</div>}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ background: statusColors[task.status], color: '#fff', padding: '2px 8px', borderRadius: theme.borderRadius.pill, fontSize: 11, fontWeight: 500 }}>{task.status.replace('_', ' ')}</span>
      {task.location && <span style={{ fontSize: 12, color: theme.colors.textSecondary }}>📍 {task.location}</span>}
    </div>
  </div>
);
