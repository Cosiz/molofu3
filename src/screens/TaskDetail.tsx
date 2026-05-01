import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { theme } from '../theme';
import { MessageBubble } from '../components/MessageBubble';
import { formatTime } from '../utils/time';

const statusFlow = ['pending', 'accepted', 'in_progress', 'arrived', 'done'] as const;
const statusLabels: Record<string, string> = { pending: '⏳ Assigned', accepted: '✅ Accepted', in_progress: '🚗 In Transit', arrived: '📍 Arrived', done: '✔️ Done' };
const priorityColors: Record<string, string> = { high: theme.colors.danger, medium: theme.colors.warning, low: theme.colors.info };

export const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, messages, updateTask, addMessage, currentUser } = useStore();
  const [newMessage, setNewMessage] = useState('');

  const task = tasks.find((t) => t.id === id);
  if (!task) return <div style={{ padding: 24 }}>Task not found</div>;

  const currentStatusIdx = statusFlow.indexOf(task.status as typeof statusFlow[number]);
  const taskMessages = messages.filter((m) => m.task_id === task.id);
  const nextStatus = statusFlow[currentStatusIdx + 1];

  const sendMessage = () => {
    if (!newMessage.trim() || !currentUser) return;
    addMessage({ id: `msg-${Date.now()}`, task_id: task.id, from_user_id: currentUser.id, text: newMessage.trim(), timestamp: new Date().toISOString(), read: false });
    setNewMessage('');
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background, paddingBottom: 80 }}>
      <div style={{ background: theme.colors.primary, padding: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{task.title}</div>
      </div>

      {/* Status Stepper */}
      <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {statusFlow.map((s, i) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: i <= currentStatusIdx ? theme.colors.success : theme.colors.border, color: i <= currentStatusIdx ? '#fff' : theme.colors.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</div>
            <div style={{ fontSize: 9, marginTop: 4, color: i <= currentStatusIdx ? theme.colors.textPrimary : theme.colors.textSecondary, textAlign: 'center' }}>{statusLabels[s].split(' ')[0]}</div>
          </div>
        ))}
      </div>

      {/* Info Grid */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 16, marginBottom: 16, boxShadow: theme.shadows.card }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: theme.colors.textSecondary, fontSize: 13 }}>Priority</span>
            <span style={{ background: priorityColors[task.priority], color: '#fff', padding: '2px 8px', borderRadius: theme.borderRadius.pill, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>{task.priority}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: theme.colors.textSecondary, fontSize: 13 }}>Due</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{formatTime(task.due_date)}</span>
          </div>
          {task.location && (<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ color: theme.colors.textSecondary, fontSize: 13 }}>Location</span><span style={{ fontSize: 14 }}>📍 {task.location}</span></div>)}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: theme.colors.textSecondary, fontSize: 13 }}>Type</span>
            <span style={{ fontSize: 14 }}>{task.task_type}</span>
          </div>
        </div>

        {nextStatus && (
          <button onClick={() => updateTask(task.id, { status: nextStatus })} style={{ width: '100%', padding: 14, borderRadius: theme.borderRadius.md, border: 'none', background: theme.colors.accent, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 16 }}>
            Mark as {statusLabels[nextStatus]}
          </button>
        )}

        {/* Message Feed */}
        <div style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 16, marginBottom: 16, boxShadow: theme.shadows.card }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Messages</div>
          <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 12 }}>
            {taskMessages.length === 0 ? (<div style={{ textAlign: 'center', color: theme.colors.textSecondary, fontSize: 13 }}>No messages yet</div>) : (
              taskMessages.map((msg) => (<MessageBubble key={msg.id} text={msg.text} isOwn={msg.from_user_id === currentUser?.id} timestamp={formatTime(msg.timestamp)} read={msg.read} />))
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '8px 12px', borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.border}`, fontSize: 14 }} onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }} />
            <button onClick={sendMessage} style={{ padding: '8px 16px', borderRadius: theme.borderRadius.md, border: 'none', background: theme.colors.info, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
