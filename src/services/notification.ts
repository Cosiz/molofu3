import { useStore } from '../store';

let notificationTimeouts: Map<string, ReturnType<typeof setTimeout>> = new Map();

export function scheduleReminder(taskId: string, taskTitle: string, dueDate: string, minutesBefore = 30) {
  cancelReminder(taskId);
  const dueTime = new Date(dueDate).getTime();
  const reminderTime = dueTime - minutesBefore * 60 * 1000;
  const delay = reminderTime - Date.now();
  if (delay > 0) {
    const timeout = setTimeout(() => {
      sendNotification(`Reminder: ${taskTitle}`, `This task is due in ${minutesBefore} minutes.`);
    }, delay);
    notificationTimeouts.set(taskId, timeout);
  }
}

export function cancelReminder(taskId: string) {
  const timeout = notificationTimeouts.get(taskId);
  if (timeout) { clearTimeout(timeout); notificationTimeouts.delete(taskId); }
}

export function sendNotification(title: string, body: string) {
  if (useStore.getState().notificationsEnabled) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }
}

export function requestNotificationPermission() {
  if ('Notification' in window) Notification.requestPermission();
}
