import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { theme } from '../theme';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, notificationsEnabled, setNotificationsEnabled } = useStore();

  if (!currentUser) { navigate('/auth'); return null; }

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background, paddingBottom: 80 }}>
      <div style={{ background: theme.colors.primary, padding: '16px', color: '#fff' }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Settings</div>
      </div>
      <div style={{ padding: '0 16px', marginTop: 16 }}>
        {/* Profile */}
        <div style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 16, boxShadow: theme.shadows.card, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: theme.colors.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>{currentUser.name.charAt(0)}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{currentUser.name}</div>
            <div style={{ fontSize: 13, color: theme.colors.textSecondary }}>{currentUser.email}</div>
            <div style={{ fontSize: 11, color: theme.colors.accent, fontWeight: 600, textTransform: 'uppercase', marginTop: 2 }}>{currentUser.role}</div>
          </div>
        </div>
        {/* Notification Toggles */}
        <div style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 16, boxShadow: theme.shadows.card, marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Notifications</div>
          {[
            { label: 'Push Notifications', key: 'push', value: notificationsEnabled },
            { label: 'Task Reminders', key: 'reminders', value: notificationsEnabled },
            { label: 'Escalation Alerts', key: 'escalations', value: true },
          ].map((item) => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${theme.colors.border}` }}>
              <span style={{ fontSize: 14 }}>{item.label}</span>
              <button onClick={() => item.key !== 'escalations' && setNotificationsEnabled(!item.value)} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', background: item.value ? theme.colors.success : theme.colors.border, cursor: item.key !== 'escalations' ? 'pointer' : 'default', position: 'relative', opacity: item.key === 'escalations' ? 0.6 : 1 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: item.value ? 22 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
          ))}
        </div>
        {/* Escalation Config */}
        <div style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 16, boxShadow: theme.shadows.card, marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Escalation Settings</div>
          <div style={{ fontSize: 13, color: theme.colors.textSecondary }}>
            <div style={{ marginBottom: 8 }}>⏰ Auto-escalate after: <strong>30 minutes</strong> overdue</div>
            <div style={{ marginBottom: 8 }}>📍 GPS lost alert: <strong>5 minutes</strong> no signal</div>
            <div>📞 Emergency contact: <strong>Helper's phone</strong></div>
          </div>
        </div>
        {/* Sign Out */}
        <button onClick={() => { useStore.getState().setCurrentUser(null); navigate('/auth'); }} style={{ width: '100%', padding: 14, borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.danger}`, background: 'transparent', color: theme.colors.danger, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Sign Out</button>
      </div>
    </div>
  );
};
