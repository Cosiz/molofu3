import { useStore } from '../store';
import { colors, typography, spacing, borderRadius, shadow, taskTypeColors } from '../theme';
import { getDayName, getDayNumber, isToday } from '../utils/time';

export function ScheduleView() {
  const { tasks } = useStore();

  // Get this week's dates
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  // Group tasks by date
  const tasksByDate: Record<string, typeof tasks> = {};
  tasks.forEach(task => {
    const date = task.due_date.split('T')[0];
    if (!tasksByDate[date]) tasksByDate[date] = [];
    tasksByDate[date].push(task);
  });

  return (
    <div style={{ padding: spacing.md, paddingBottom: 80 }}>
      <h1 style={{ ...typography.heading, marginBottom: spacing.md }}>Weekly Schedule</h1>

      {/* Week Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 2,
        marginBottom: spacing.sm,
      }}>
        {weekDays.map((date, i) => {
          const dayDate = new Date(date);
          const isTodayDate = isToday(date);
          return (
            <div key={date} style={{
              textAlign: 'center',
              padding: spacing.sm,
              borderRadius: borderRadius.sm,
              background: isTodayDate ? colors.primary : 'transparent',
              color: isTodayDate ? colors.card : colors.textPrimary,
            }}>
              <div style={{ ...typography.small, fontWeight: isTodayDate ? 600 : 400 }}>
                {getDayName(date)}
              </div>
              <div style={{ ...typography.heading, fontSize: 18 }}>
                {getDayNumber(date)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 2,
      }}>
        {weekDays.map(date => {
          const dayTasks = tasksByDate[date] || [];
          const isTodayDate = isToday(date);
          return (
            <div key={date} style={{
              minHeight: 100,
              background: isTodayDate ? colors.primary + '10' : colors.card,
              borderRadius: borderRadius.sm,
              padding: spacing.xs,
              border: isTodayDate ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
            }}>
              {dayTasks.map(task => (
                <div key={task.id} style={{
                  padding: `${spacing.xs} ${spacing.xs * 2}`,
                  borderRadius: 4,
                  background: taskTypeColors[task.task_type] || colors.primary,
                  color: colors.card,
                  ...typography.small,
                  marginBottom: 2,
                  fontSize: 10,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }} title={task.title}>
                  {task.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginTop: spacing.md,
        ...typography.small,
      }}>
        {Object.entries(taskTypeColors).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: color }} />
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
