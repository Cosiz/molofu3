import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { StatusStepper } from '../components/StatusStepper';
import { MessageBubble } from '../components/MessageBubble';
import { colors, typography, spacing, borderRadius, shadow, statusColors, taskTypeLabels } from '../theme';
import { formatDateTime, timeAgo } from '../utils/time';

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, tasks, updateTask, messages, addMessage } = useStore();
  const [newMessage, setNewMessage] = useState('');

  const task = tasks.find(t => t.id === id);
  const taskMessages = messages.filter(m => m.task_id === id).sort((a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  if (!task) {
    return (
      <div style={{ padding: spacing.xl, textAlign: 'center' }}>
        <p style={{ ...typography.body, color: colors.textSecondary }}>Task not found</p>
        <button onClick={() => navigate('/tasks')} style={{
          marginTop: spacing.md,
          padding: spacing.md,
          borderRadius: borderRadius.sm,
          background: colors.primary,
          color: colors.card,
          border: 'none',
          cursor: 'pointer',
        }}>Back to Tasks</button>
      </div>
    );
  }

  const statusColor = statusColors[task.status] || colors.textSecondary;
  const isCommander = currentUser?.role === 'commander';
  const isHelper = currentUser?.role === 'helper';

  const handleStatusAction = (action: string) => {
    const statusMap: Record<string, string> = {
      accept: 'accepted',
      start: 'in_progress',
      arrive: 'arrived',
      done: 'done',
    };
    const newStatus = statusMap[action];
    if (newStatus) {
      updateTask(task.id, {
        status: newStatus as any,
        ...(newStatus === 'done' ? { completed_at: new Date().toISOString() } : {}),
      });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentUser) return;
    addMessage({
      id: `msg-${Date.now()}`,
      task_id: task.id,
      from_user_id: currentUser.id,
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    });
    setNewMessage('');
  };

  return (
    <div style={{ padding: spacing.md, paddingBottom: 80 }}>
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: colors.primary,
          ...typography.body,
          cursor: 'pointer',
          marginBottom: spacing.md,
          padding: 0,
        }}
      >← Back</button>

      {/* Task Info */}
      <div style={{
        background: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        boxShadow: shadow.card,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm }}>
          <h2 style={{ ...typography.heading, flex: 1 }}>{task.title}</h2>
          <span style={{
            ...typography.small,
            padding: `${spacing.xs} ${spacing.sm}`,
            borderRadius: borderRadius.sm,
            background: statusColor + '20',
            color: statusColor,
            fontWeight: 600,
            marginLeft: spacing.sm,
          }}>{task.status.replace('_', ' ')}</span>
        </div>

        {task.description && (
          <p style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.sm }}>{task.description}</p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.sm, ...typography.small, color: colors.textSecondary }}>
          <span>{taskTypeLabels[task.task_type]}</span>
          <span>•</span>
          <span>Due {formatDateTime(task.due_date)}</span>
          {task.location && (
            <>
              <span>•</span>
              <span>📍 {task.location}</span>
            </>
          )}
        </div>
      </div>

      {/* Status Stepper */}
      <div style={{
        background: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        boxShadow: shadow.card,
      }}>
        <StatusStepper task={task} />
      </div>

      {/* Action Buttons (Helper only) */}
      {isHelper && task.status !== 'done' && (
        <div style={{ marginBottom: spacing.md }}>
          <button
            onClick={() => handleStatusAction(
              task.status === 'pending' ? 'accept' :
              task.status === 'accepted' ? 'start' :
              task.status === 'in_progress' && (task.task_type === 'pickup' || task.task_type === 'dropoff') ? 'arrive' :
              'done'
            )}
            style={{
              width: '100%',
              padding: spacing.md,
              borderRadius: borderRadius.sm,
              background: colors.primary,
              color: colors.card,
              border: 'none',
              ...typography.button,
              minHeight: 56,
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            {task.status === 'pending' ? '✅ Accept Task' :
             task.status === 'accepted' ? '🚗 Start' :
             task.status === 'in_progress' && (task.task_type === 'pickup' || task.task_type === 'dropoff') ? '📍 Arrived' :
             '✅ Complete'}
          </button>
        </div>
      )}

      {/* Commander Actions */}
      {isCommander && (
        <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.md }}>
          <button
            onClick={() => { updateTask(task.id, { priority: task.priority === 'high' ? 'medium' : 'high' }); }}
            style={{
              flex: 1,
              padding: spacing.sm,
              borderRadius: borderRadius.sm,
              background: colors.background,
              border: `1px solid ${colors.border}`,
              ...typography.small,
              cursor: 'pointer',
            }}
          >Toggle Priority</button>
          <button
            onClick={() => { updateTask(task.id, { status: 'pending' }); }}
            style={{
              flex: 1,
              padding: spacing.sm,
              borderRadius: borderRadius.sm,
              background: colors.background,
              border: `1px solid ${colors.border}`,
              ...typography.small,
              cursor: 'pointer',
              color: colors.alert,
            }}
          >Reset Status</button>
        </div>
      )}

      {/* In-Task Messaging */}
      <div style={{
        background: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        boxShadow: shadow.card,
      }}>
        <h3 style={{ ...typography.subheading, marginBottom: spacing.sm }}>💬 Messages</h3>

        <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: spacing.md }}>
          {taskMessages.length === 0 ? (
            <p style={{ ...typography.small, color: colors.textSecondary, textAlign: 'center' }}>No messages yet</p>
          ) : (
            taskMessages.map(msg => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isSent={msg.from_user_id === currentUser?.id}
              />
            ))
          )}
        </div>

        <div style={{ display: 'flex', gap: spacing.sm }}>
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: spacing.md,
              borderRadius: borderRadius.sm,
              border: `1px solid ${colors.border}`,
              ...typography.body,
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            style={{
              padding: `0 ${spacing.md}`,
              borderRadius: borderRadius.sm,
              background: newMessage.trim() ? colors.primary : colors.textLight,
              color: colors.card,
              border: 'none',
              ...typography.button,
              minHeight: 44,
              cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
            }}
          >Send</button>
        </div>
      </div>
    </div>
  );
}
