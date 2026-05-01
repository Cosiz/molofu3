import React from 'react';
import { useStore } from '../store';
import { theme } from '../theme';
import { getDayName, getDayNum } from '../utils/time';

const typeColors: Record<string, string> = { pickup: theme.colors.info, dropoff: theme.colors.accent, homework: theme.colors.warning, errand: theme.colors.success, tuition: theme.colors.primary };

export const ScheduleView: React.FC = () => {
  const { tasks } = useStore();
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() - today.getDay() + i); return d; });

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background, paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`, padding: '16px', color: '#fff' }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Weekly Schedule</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 8px', background: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}` }}>
        {weekDays.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          return (<div key={i} style={{ textAlign: 'center', padding: '4px 8px', borderRadius: theme.borderRadius.md, background: isToday ? theme.colors.accent : 'transparent', color: isToday ? '#fff' : theme.colors.textPrimary }}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>{getDayName(d)}</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{getDayNum(d)}</div>
          </div>);
        })}
      </div>
      <div style={{ padding: 16 }}>
        {weekDays.map((day, dayIdx) => {
          const dayTasks = tasks.filter((t) => new Date(t.due_date).toDateString() === day.toDateString()).sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
          if (dayTasks.length === 0) return null;
          return (
            <div key={dayIdx} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: theme.colors.textPrimary }}>{getDayName(day)}, {day.getDate()} {day.toLocaleString('en-HK', { month: 'short' })}</div>
              {dayTasks.map((task) => (
                <div key={task.id} style={{ background: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: 12, marginBottom: 8, boxShadow: theme.shadows.card, borderLeft: `4px solid ${typeColors[task.task_type] || theme.colors.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{task.title}</div>
                  <div style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 }}>{new Date(task.due_date).toLocaleTimeString('en-HK', { hour: '2-digit', minute: '2-digit' })} · {task.task_type}</div>
                </div>
              ))}
            </div>
          );
        })}
        {tasks.length === 0 && (<div style={{ textAlign: 'center', padding: 48, color: theme.colors.textSecondary }}>No events this week</div>)}
      </div>
    </div>
  );
};
