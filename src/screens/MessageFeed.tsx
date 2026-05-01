import React, { useState } from 'react';
import { useStore } from '../store';
import { theme } from '../theme';
import { MessageBubble } from '../components/MessageBubble';
import { formatTime } from '../utils/time';

export const MessageFeed: React.FC = () => {
  const { messages, tasks, addMessage, currentUser } = useStore();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const taskMessageMap = tasks.filter((t) => messages.some((m) => m.task_id === t.id)).map((t) => ({ task: t, msgs: messages.filter((m) => m.task_id === t.id) }));

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedTaskId || !currentUser) return;
    addMessage({ id: `msg-${Date.now()}`, task_id: selectedTaskId, from_user_id: currentUser.id, text: newMessage.trim(), timestamp: new Date().toISOString(), read: false });
    setNewMessage('');
  };

  if (selectedTaskId) {
    const taskMsgs = messages.filter((m) => m.task_id === selectedTaskId);
    const task = tasks.find((t) => t.id === selectedTaskId);
    return (
      <div style={{ minHeight: '100vh', background: theme.colors.background, paddingBottom: 80 }}>
        <div style={{ background: theme.colors.primary, padding: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setSelectedTaskId(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{task?.title || 'Messages'}</div>
        </div>
        <div style={{ padding: 16, maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
          {taskMsgs.length === 0 ? (<div style={{ textAlign: 'center', color: theme.colors.textSecondary, padding: 48 }}>No messages yet</div>) : (
            taskMsgs.map((msg) => (<MessageBubble key={msg.id} text={msg.text} isOwn={msg.from_user_id === currentUser?.id} timestamp={formatTime(msg.timestamp)} read={msg.read} />))
          )}
        </div>
        <div style={{ position: 'fixed', bottom: 60, left: 0, right: 0, padding: '8px 16px', background: theme.colors.surface, borderTop: `1px solid ${theme.colors.border}`, display: 'flex', gap: 8 }}>
          <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '10px 14px', borderRadius: 24, border: `1px solid ${theme.colors.border}`, fontSize: 14, outline: 'none' }} onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }} />
          <button onClick={sendMessage} style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: theme.colors.info, color: '#fff', fontSize: 16, cursor: 'pointer' }}>➤</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background, paddingBottom: 80 }}>
      <div style={{ background: theme.colors.primary, padding: '16px', color: '#fff' }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Messages</div>
        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>{taskMessageMap.length} conversations</div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {taskMessageMap.length === 0 ? (<div style={{ textAlign: 'center', color: theme.colors.textSecondary, padding: 48 }}>No conversations yet. Messages appear when tasks have activity.</div>) : (
          taskMessageMap.map(({ task, msgs }) => {
            const lastMsg = msgs[msgs.length - 1];
            const unread = msgs.filter((m) => !m.read && m.from_user_id !== currentUser?.id).length;
            return (
              <div key={task.id} onClick={() => setSelectedTaskId(task.id)} style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 14, marginBottom: 8, boxShadow: theme.shadows.card, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{task.title}</div>
                  <div style={{ fontSize: 13, color: theme.colors.textSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 240 }}>{lastMsg?.text || 'No messages'}</div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: 8 }}>
                  <div style={{ fontSize: 11, color: theme.colors.textSecondary }}>{formatTime(lastMsg?.timestamp || '')}</div>
                  {unread > 0 && (<div style={{ background: theme.colors.accent, color: '#fff', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, marginTop: 4, marginLeft: 'auto' }}>{unread}</div>)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
