import { useState } from 'react';
import { useStore } from '../store';
import { TaskCard } from '../components/TaskCard';
import { EscalationBanner } from '../components/EscalationBanner';
import { CreateTaskForm } from '../components/CreateTaskForm';
import { colors, typography, spacing, borderRadius, shadow } from '../theme';
import { isToday } from '../utils/time';

export function CommanderDashboard() {
  const { currentUser, tasks, escalations, isOnboardingComplete } = useStore();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const todayTasks = tasks.filter(t => isToday(t.due_date));
  const activeEscalations = escalations.filter(e => !e.resolved);
  const pendingCount = todayTasks.filter(t => t.status === 'pending').length;
  const inProgressCount = todayTasks.filter(t => t.status === 'in_progress' || t.status === 'accepted').length;
  const doneCount = todayTasks.filter(t => t.status === 'done').length;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div style={{ padding: spacing.md, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ marginBottom: spacing.md }}>
        <h1 style={{ ...typography.heading }}>{greeting()}, {currentUser?.name?.split(' ')[0]}</h1>
        <p style={{ ...typography.small, color: colors.textSecondary }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Escalation Banner */}
      <EscalationBanner escalations={escalations} tasks={tasks} />

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing.sm, marginBottom: spacing.md }}>
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          textAlign: 'center',
          boxShadow: shadow.card,
        }}>
          <div style={{ ...typography.heading, color: colors.primary }}>{todayTasks.length}</div>
          <div style={{ ...typography.small, color: colors.textSecondary }}>Tasks Today</div>
        </div>
        <div style={{
          background: activeEscalations.length > 0 ? colors.alert + '20' : colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          textAlign: 'center',
          boxShadow: shadow.card,
        }}>
          <div style={{ ...typography.heading, color: activeEscalations.length > 0 ? colors.alert : colors.primary }}>
            {activeEscalations.length}
          </div>
          <div style={{ ...typography.small, color: colors.textSecondary }}>Alerts</div>
        </div>
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          textAlign: 'center',
          boxShadow: shadow.card,
        }}>
          <div style={{ ...typography.heading, color: colors.secondary }}>{doneCount}/{todayTasks.length}</div>
          <div style={{ ...typography.small, color: colors.textSecondary }}>Completed</div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div style={{ marginBottom: spacing.sm }}>
        <h2 style={{ ...typography.subheading, marginBottom: spacing.sm }}>Today's Tasks</h2>
        {todayTasks.length === 0 ? (
          <div style={{
            background: colors.card,
            borderRadius: borderRadius.md,
            padding: spacing.lg,
            textAlign: 'center',
            color: colors.textSecondary,
            ...typography.body,
          }}>
            No tasks for today. Tap + to create one.
          </div>
        ) : (
          todayTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>

      {/* GPS Preview Card */}
      <div style={{
        background: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginTop: spacing.md,
        boxShadow: shadow.card,
      }}>
        <h3 style={{ ...typography.subheading, marginBottom: spacing.sm }}>📍 Helper Status</h3>
        <div style={{
          background: colors.background,
          borderRadius: borderRadius.sm,
          padding: spacing.md,
          minHeight: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.textSecondary,
          ...typography.small,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: spacing.sm }}>️</div>
            <div>Maria is currently {inProgressCount > 0 ? 'on a task' : 'available'}</div>
            {inProgressCount > 0 && <div style={{ color: colors.primary, marginTop: 4 }}>● Live tracking active</div>}
          </div>
        </div>
      </div>

      {/* Floating + Button */}
      <button
        onClick={() => setShowCreateForm(true)}
        style={{
          position: 'fixed',
          bottom: 80,
          right: spacing.lg,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: colors.primary,
          color: colors.card,
          border: 'none',
          fontSize: 28,
          boxShadow: shadow.elevated,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
        }}
      >+</button>

      {/* Create Task Modal */}
      {showCreateForm && <CreateTaskForm onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}
