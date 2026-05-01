import { useStore } from '../store';
import { colors, typography, spacing, borderRadius, shadow } from '../theme';
import { timeAgo, isToday } from '../utils/time';

export function ObserverDashboard() {
  const { currentUser, tasks, messages } = useStore();

  const todayTasks = tasks.filter(t => isToday(t.due_date));
  const completedTasks = tasks.filter(t => t.status === 'done').sort((a, b) =>
    new Date(b.completed_at || '').getTime() - new Date(a.completed_at || '').getTime()
  );
  const pendingTasks = tasks.filter(t => t.status !== 'done');
  const helperTasks = tasks.filter(t => t.assigned_to !== currentUser?.id);

  return (
    <div style={{ padding: spacing.md, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ marginBottom: spacing.md }}>
        <h1 style={{ ...typography.heading }}>Family Status</h1>
        <p style={{ ...typography.small, color: colors.textSecondary }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: spacing.sm, marginBottom: spacing.md }}>
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          textAlign: 'center',
          boxShadow: shadow.card,
        }}>
          <div style={{ ...typography.heading, color: colors.primary }}>{todayTasks.length}</div>
          <div style={{ ...typography.small, color: colors.textSecondary }}>Today's Tasks</div>
        </div>
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          textAlign: 'center',
          boxShadow: shadow.card,
        }}>
          <div style={{ ...typography.heading, color: colors.secondary }}>{completedTasks.length}</div>
          <div style={{ ...typography.small, color: colors.textSecondary }}>Completed</div>
        </div>
      </div>

      {/* Helper Status */}
      <div style={{
        background: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        boxShadow: shadow.card,
      }}>
        <h3 style={{ ...typography.subheading, marginBottom: spacing.sm }}> Helper Status</h3>
        {helperTasks.length === 0 ? (
          <div style={{ ...typography.small, color: colors.textSecondary }}>No active tasks for helper</div>
        ) : (
          helperTasks.slice(0, 3).map(task => (
            <div key={task.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: `${spacing.sm} 0`,
              borderBottom: `1px solid ${colors.border}`,
              ...typography.small,
            }}>
              <span>{task.title}</span>
              <span style={{ color: task.status === 'done' ? colors.secondary : colors.primary }}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Activity Timeline */}
      <h2 style={{ ...typography.subheading, marginBottom: spacing.sm }}>Recent Activity</h2>
      {completedTasks.length === 0 ? (
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.lg,
          textAlign: 'center',
          color: colors.textSecondary,
          ...typography.body,
        }}>
          No completed tasks yet today.
        </div>
      ) : (
        completedTasks.slice(0, 5).map(task => (
          <div key={task.id} style={{
            background: colors.card,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.sm,
            boxShadow: shadow.card,
            display: 'flex',
            gap: spacing.md,
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: colors.secondary,
              marginTop: 6,
              flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ ...typography.body }}>{task.title}</div>
              <div style={{ ...typography.small, color: colors.textSecondary }}>
                Completed {task.completed_at ? timeAgo(task.completed_at) : 'recently'}
              </div>
            </div>
            <span style={{
              ...typography.small,
              color: colors.secondary,
              fontWeight: 600,
            }}>✓ Done</span>
          </div>
        ))
      )}
    </div>
  );
}
