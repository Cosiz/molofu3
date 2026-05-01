import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { theme } from '../theme';
import { TaskCard } from '../components/TaskCard';
import { startEscalationPolling } from '../services/escalation';
import { formatTime, isOverdue } from '../utils/time';

export const CommanderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, tasks, escalations } = useStore();
  const [pollStarted, setPollStarted] = useState(false);

  useEffect(() => {
    if (!currentUser) { navigate('/auth'); return; }
    if (!pollStarted) { startEscalationPolling(); setPollStarted(true); }
  }, [currentUser, navigate, pollStarted]);

  if (!currentUser) return null;

  const pending = tasks.filter((t) => t.status !== 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress' || t.status === 'arrived').length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const activeEscalations = escalations.filter((e) => !e.resolved);

  const todayTasks = tasks.filter((t) => {
    return new Date(t.due_date).toDateString() === new Date().toDateString();
  }).sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());

  const greeting = new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening';

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`, padding: '24px 16px 32px', color: theme.colors.textInverse }}>
        <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>{new Date().toLocaleDateString('en-HK', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>Good {greeting}, {currentUser.name.split(' ')[0]}</div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginTop: -16 }}>
        {[
          { label: 'Pending', count: pending, color: theme.colors.warning },
          { label: 'Active', count: inProgress, color: theme.colors.info },
          { label: 'Done', count: done, color: theme.colors.success },
        ].map((stat) => (
          <div key={stat.label} style={{ flex: 1, background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 16, textAlign: 'center', boxShadow: theme.shadows.card, borderTop: `3px solid ${stat.color}` }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.count}</div>
            <div style={{ fontSize: 12, color: theme.colors.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Escalation Banner */}
      {activeEscalations.length > 0 && (
        <div style={{ margin: '16px', padding: 12, background: theme.colors.danger, color: '#fff', borderRadius: theme.borderRadius.md, fontWeight: 600, fontSize: 14 }}>
          ⚠️ {activeEscalations.length} task{activeEscalations.length > 1 ? 's are' : ' is'} overdue!
        </div>
      )}

      {/* Today's Tasks */}
      <div style={{ padding: '0 16px', marginTop: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: theme.colors.textPrimary }}>Today's Tasks</div>
        {todayTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 32, color: theme.colors.textSecondary, fontSize: 14 }}>No tasks for today 🎉</div>
        ) : (
          todayTasks.map((task) => (
            <TaskCard key={task.id} task={task} onPress={() => navigate(`/tasks/${task.id}`)} compact />
          ))
        )}
      </div>

      {/* GPS Preview */}
      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: theme.colors.textPrimary }}>Helper Status</div>
        <div style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 16, boxShadow: theme.shadows.card, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: theme.colors.success, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📍</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: theme.colors.textPrimary }}>Maria Santos</div>
            <div style={{ fontSize: 12, color: theme.colors.textSecondary }}>Status: Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};
