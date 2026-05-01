import { useStore } from '../store';
import type { Task } from '../types';
import { isOverdue } from '../utils/time';

let pollingInterval: ReturnType<typeof setInterval> | null = null;

export function startEscalationPolling(intervalMs = 30000) {
  stopEscalationPolling();
  pollingInterval = setInterval(() => {
    const tasks = useStore.getState().tasks;
    const existing = useStore.getState().escalations;
    tasks.forEach((task) => {
      if (task.status === 'done') return;
      if (isOverdue(task)) {
        const alreadyEscalated = existing.some((e) => e.task_id === task.id && !e.resolved);
        if (!alreadyEscalated) {
          const minutesOverdue = Math.floor((Date.now() - new Date(task.due_date).getTime()) / 60000);
          useStore.getState().addEscalation({
            id: `esc-${task.id}-${Date.now()}`,
            task_id: task.id,
            triggered_at: new Date().toISOString(),
            reason: 'overdue',
            severity: minutesOverdue > 30 ? 'critical' : 'warning',
            resolved: false,
          });
        }
      }
    });
  }, intervalMs);
}

export function stopEscalationPolling() {
  if (pollingInterval) { clearInterval(pollingInterval); pollingInterval = null; }
}

export function checkOverdueTasks(): Task[] {
  return useStore.getState().tasks.filter(isOverdue);
}
