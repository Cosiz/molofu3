import { useStore } from '../store';
import { TaskCard } from '../components/TaskCard';
import { colors, typography, spacing, borderRadius, shadow } from '../theme';

export function HelperDashboard() {
  const { currentUser, tasks, updateTask } = useStore();

  const myTasks = tasks.filter(t => t.assigned_to === currentUser?.id);
  const activeTasks = myTasks.filter(t => t.status !== 'done');
  const nextTask = activeTasks[0];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleAction = (taskId: string, action: string) => {
    const statusMap: Record<string, string> = {
      accept: 'accepted',
      start: 'in_progress',
      done: 'done',
    };
    const newStatus = statusMap[action];
    if (newStatus) {
      updateTask(taskId, {
        status: newStatus as any,
        ...(newStatus === 'done' ? { completed_at: new Date().toISOString() } : {}),
      });
    }
  };

  return (
    <div style={{ padding: spacing.md, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ marginBottom: spacing.md }}>
        <h1 style={{ ...typography.heading }}>{greeting()}, {currentUser?.name?.split(' ')[0]}</h1>
        <p style={{ ...typography.small, color: colors.textSecondary }}>
          {activeTasks.length} task{activeTasks.length !== 1 ? 's' : ''} remaining today
        </p>
      </div>

      {/* Next Task - Big Card */}
      {nextTask ? (
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.lg,
          marginBottom: spacing.md,
          boxShadow: shadow.elevated,
          borderLeft: `4px solid ${colors.primary}`,
        }}>
          <div style={{ ...typography.small, color: colors.textSecondary, marginBottom: spacing.xs }}>Next Task</div>
          <div style={{ ...typography.heading, marginBottom: spacing.sm }}>{nextTask.title}</div>
          <div style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.md }}>
            Due: {new Date(nextTask.due_date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
          {nextTask.location && (
            <div style={{ ...typography.small, color: colors.primary, marginBottom: spacing.md }}> {nextTask.location}</div>
          )}
          <button
            onClick={() => handleAction(nextTask.id, nextTask.status === 'pending' ? 'accept' : nextTask.status === 'accepted' ? 'start' : 'done')}
            style={{
              width: '100%',
              padding: spacing.md,
              borderRadius: borderRadius.sm,
              background: nextTask.status === 'done' ? colors.secondary : colors.primary,
              color: colors.card,
              border: 'none',
              ...typography.button,
              minHeight: 56,
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            {nextTask.status === 'pending' ? '✅ Accept' : nextTask.status === 'accepted' ? '🚗 Start' : '✅ Done'}
          </button>
        </div>
      ) : (
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.xl,
          marginBottom: spacing.md,
          textAlign: 'center',
          boxShadow: shadow.card,
        }}>
          <div style={{ fontSize: 48, marginBottom: spacing.md }}>🎉</div>
          <div style={{ ...typography.subheading }}>All tasks done!</div>
          <div style={{ ...typography.small, color: colors.textSecondary }}>Well done. You can rest now.</div>
        </div>
      )}

      {/* All My Tasks */}
      <h2 style={{ ...typography.subheading, marginBottom: spacing.sm }}>My Tasks</h2>
      {myTasks.length === 0 ? (
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.lg,
          textAlign: 'center',
          color: colors.textSecondary,
          ...typography.body,
        }}>
          No tasks assigned yet.
        </div>
      ) : (
        myTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            showActions={true}
            onAction={(action) => handleAction(task.id, action)}
          />
        ))
      )}
    </div>
  );
}
