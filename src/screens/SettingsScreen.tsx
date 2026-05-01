import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { colors, typography, spacing, borderRadius, shadow } from '../theme';

export function SettingsScreen() {
  const navigate = useNavigate();
  const { currentUser, logout, settings, updateSettings, onboarding } = useStore();

  const [notifications, setNotifications] = useState(settings.notifications);
  const [slaSettings, setSlaSettings] = useState(settings.escalation);

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    updateSettings({ notifications: updated });
  };

  const handleSlaChange = (key: keyof typeof slaSettings, value: number) => {
    const updated = { ...slaSettings, [key]: value };
    setSlaSettings(updated);
    updateSettings({ escalation: updated });
  };

  const slaLabels: Record<string, string> = {
    pickup_sla: 'Pickup SLA (min)',
    dropoff_sla: 'Dropoff SLA (min)',
    homework_sla: 'Homework SLA (min)',
    errand_sla: 'Errand SLA (min)',
    tuition_sla: 'Tuition SLA (min)',
    meal_sla: 'Meal SLA (min)',
    shopping_sla: 'Shopping SLA (min)',
  };

  return (
    <div style={{ padding: spacing.md, paddingBottom: 80 }}>
      <h1 style={{ ...typography.heading, marginBottom: spacing.md }}>Settings</h1>

      <div style={{
        background: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        boxShadow: shadow.card,
      }}>
        <h3 style={{ ...typography.subheading, marginBottom: spacing.sm }}>Profile</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: colors.primary,
            color: colors.card,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...typography.subheading,
          }}>{currentUser?.avatar || '?'}</div>
          <div>
            <div style={{ ...typography.subheading }}>{currentUser?.name}</div>
            <div style={{ ...typography.small, color: colors.textSecondary }}>{currentUser?.role}</div>
          </div>
        </div>
        <div style={{ ...typography.small, color: colors.textSecondary, marginTop: spacing.sm }}>
          {currentUser?.email}
        </div>
      </div>

      <div style={{
        background: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        boxShadow: shadow.card,
      }}>
        <h3 style={{ ...typography.subheading, marginBottom: spacing.sm }}>Notifications</h3>
        {Object.entries(notifications).map(([key, value]) => (
          <label key={key} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing.sm} 0`,
            borderBottom: `1px solid ${colors.border}`,
            cursor: 'pointer',
          }}>
            <span style={{ ...typography.body }}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={() => handleNotificationToggle(key as any)}
              style={{ width: 20, height: 20 }}
            />
          </label>
        ))}
      </div>

      <div style={{
        background: colors.card,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        boxShadow: shadow.card,
      }}>
        <h3 style={{ ...typography.subheading, marginBottom: spacing.sm }}>Escalation Thresholds</h3>
        {Object.entries(slaLabels).map(([key, label]) => (
          <div key={key} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing.sm} 0`,
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <span style={{ ...typography.small }}>{label}</span>
            <input
              type="number"
              value={(slaSettings as any)[key]}
              onChange={e => handleSlaChange(key as any, parseInt(e.target.value) || 0)}
              style={{
                width: 60,
                padding: spacing.xs,
                borderRadius: borderRadius.sm,
                border: `1px solid ${colors.border}`,
                textAlign: 'center',
                ...typography.small,
              }}
            />
          </div>
        ))}
      </div>

      {onboarding && (
        <div style={{
          background: colors.card,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          marginBottom: spacing.md,
          boxShadow: shadow.card,
        }}>
          <h3 style={{ ...typography.subheading, marginBottom: spacing.sm }}>Family Info</h3>
          <div style={{ ...typography.small, color: colors.textSecondary }}>
            Helper: {onboarding.helperName || 'Not set'}
          </div>
          <div style={{ ...typography.small, color: colors.textSecondary }}>
            Children: {onboarding.children?.filter(c => c).join(', ') || 'Not set'}
          </div>
        </div>
      )}

      <button
        onClick={() => { logout(); navigate('/auth'); }}
        style={{
          width: '100%',
          padding: spacing.md,
          borderRadius: borderRadius.sm,
          background: colors.alert + '20',
          color: colors.alert,
          border: 'none',
          ...typography.button,
          minHeight: 48,
          cursor: 'pointer',
          marginTop: spacing.md,
        }}
      >Logout</button>

      <div style={{ textAlign: 'center', marginTop: spacing.lg, ...typography.small, color: colors.textSecondary }}>
        Molofu3 v3.7.2 — Family Command Centre
      </div>
    </div>
  );
}
