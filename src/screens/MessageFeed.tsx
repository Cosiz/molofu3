import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { colors, typography, spacing, borderRadius, shadow } from '../theme';
import { timeAgo } from '../utils/time';

export function MessageFeed() {
  const { currentUser, tasks, messages } = useStore();
  const navigate = useNavigate();

  // Group messages by task
  const taskMessages: Record<string, typeof messages> = {};
  messages.forEach(msg => {
    if (!taskMessages[msg.task_id]) taskMessages[msg.task_id] = [];
    taskMessages[msg.task_id].push(msg);
  });

  // Get conversation previews
  const conversations = Object.entries(taskMessages).map(([taskId, msgs]) => {
    const task = tasks.find(t => t.id === taskId);
    const sorted = [...msgs].sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const latest = sorted[0];
    const unreadCount = msgs.filter(m => m.from_user_id !== currentUser?.id && !m.read).length;

    return { taskId, task, latest, unreadCount, totalMessages: msgs.length };
  }).sort((a, b) =>
    new Date(b.latest.timestamp).getTime() - new Date(a.latest.timestamp).getTime()
  );

  return (
    <div style={{ padding: spacing.md, paddingBottom: 80 }}>
      <h1 style={{ ...typography.heading, marginBottom: spacing.md }}>Messages</h1>

      {conversations.length === 0 ? (
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.xl,
          textAlign: 'center',
          color: colors.textSecondary,
          ...typography.body,
        }}>
          <div style={{ fontSize: 48, marginBottom: spacing.md }}>💬</div>
          No conversations yet
        </div>
      ) : (
        conversations.map(conv => (
          <div
            key={conv.taskId}
            onClick={() => navigate(`/tasks/${conv.taskId}`)}
            style={{
              background: colors.card,
              borderRadius: borderRadius.md,
              padding: spacing.md,
              marginBottom: spacing.sm,
              boxShadow: shadow.card,
              cursor: 'pointer',
              display: 'flex',
              gap: spacing.md,
              alignItems: 'flex-start',
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: colors.primary + '20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0,
            }}>💬</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ ...typography.subheading }}>
                  {conv.task?.title || 'Task conversation'}
                </span>
                <span style={{ ...typography.small, color: colors.textSecondary }}>
                  {timeAgo(conv.latest.timestamp)}
                </span>
              </div>
              <p style={{
                ...typography.small,
                color: colors.textSecondary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {conv.latest.text}
              </p>
            </div>
            {conv.unreadCount > 0 && (
              <div style={{
                minWidth: 20,
                height: 20,
                borderRadius: 10,
                background: colors.primary,
                color: colors.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...typography.small,
                fontWeight: 600,
              }}>{conv.unreadCount}</div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
