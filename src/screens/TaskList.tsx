import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { theme } from '../theme';
import { TaskCard } from '../components/TaskCard';

export const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const { tasks } = useStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  const filtered = tasks.filter((t) => {
    if (filter === 'pending') return t.status !== 'done';
    if (filter === 'done') return t.status === 'done';
    return true;
  }).sort((a, b) => {
    const prio = { high: 0, medium: 1, low: 2 };
    return prio[a.priority] - prio[b.priority] || new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background, paddingBottom: 80 }}>
      <div style={{ background: theme.colors.primary, padding: '16px', color: '#fff' }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Tasks</div>
        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>{tasks.length} total</div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px' }}>
        {(['all', 'pending', 'done'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 16px', borderRadius: 20, border: 'none', background: filter === f ? theme.colors.accent : theme.colors.surface, color: filter === f ? '#fff' : theme.colors.textSecondary, fontWeight: 600, fontSize: 13, cursor: 'pointer', boxShadow: filter === f ? 'none' : theme.shadows.card }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ padding: '0 16px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48, color: theme.colors.textSecondary }}>No tasks in this category</div>
        ) : (
          filtered.map((task) => (<TaskCard key={task.id} task={task} onPress={() => navigate(`/tasks/${task.id}`)} />))
        )}
      </div>
    </div>
  );
};
